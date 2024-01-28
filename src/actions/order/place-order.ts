"use server";

import { auth } from "@/auth.config";
import type { Address, Size } from "@/interfaces";
import prisma from "@/lib/prisma";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (productIds: ProductToOrder[], address: Address) => {
  //! PARA INSERTAR UNA ORDEN EN NUESTRA BD DEBEMOS USAR NUESTRO USER ID
  //! Tomamos la sessión

  //console.log({ address });

  const session = await auth();
  const userId = session?.user.id;

  // * Verificar Session de Usuario
  if (!userId) {
    return {
      ok: false,
      message: "No hay sessión de usuario",
    };
  }
  //console.log({ productIds, address, userId });

  // Obtener la información de los productos
  // Recordar que puedo llevarme más de 2 productos con el mismo id, pero distinta talla

  //* Traeme de la BD todos los productos que tengan el ID igual a los Id de los productos en el arreglo de ProductsToOrder
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds.map((p) => p.productId),
      },
    },
  });

  // * calcular las cantidades
  const itemsInOrder = productIds.reduce((acum, p) => acum + p.quantity, 0);

  // * calcular las cantidades
  const { subtotal, tax, total } = productIds.reduce(
    (totals, item) => {
      const productQuantity = item.quantity;
      const product = products.find((p) => p.id === item.productId);
      if (!product) throw new Error(`El item ${item.productId} no existe - 500`);
      const subTotal = product.price * productQuantity;
      totals.subtotal += subTotal;
      totals.tax += subTotal * 0.15;
      totals.total += subTotal * 1.15;

      //console.log({ totals });

      return totals;
      //console.log({ subtotal, tax, total });
      //return { subtotal: 0, tax: 0, total: 0 };
    },
    { subtotal: 0, tax: 0, total: 0 }
  );

  //console.log({ productIds });

  try {
    //* Crear la Transacción para Grabar en la Base de datos

    const prismaTx = await prisma.$transaction(async (tx) => {
      //* 1.actualizar el stock de productos en la bd
      const updatedProductsPromises = products.map(async (prod) => {
        const productQuantity = productIds.filter((p) => p.productId === prod.id).reduce((acum, item) => item.quantity + acum, 0);

        if (productQuantity === 0) throw new Error(`El item: ${prod.id} no tiene cantidad definida`);

        return tx.product.update({
          where: {
            id: prod.id,
          },
          data: {
            inStock: {
              decrement: productQuantity,
            },
          },
        });
      });

      const updatedProducts = await Promise.all(updatedProductsPromises);

      //* verificar valores negativos en la existencias = NO HAY STOCK
      updatedProducts.forEach((product) => {
        if (product.inStock < 0) {
          throw new Error(`${product.title} no tiene inventario suficiente.`);
        }
      });

      //* 2.crear la orden - maestro - detalle
      const order = await tx.order.create({
        data: {
          userId: userId,
          itemsInOrder: itemsInOrder,
          subtotal: subtotal,
          tax: tax,
          total: total,

          OrderItem: {
            createMany: {
              data: productIds.map((p) => ({
                quantity: p.quantity,
                size: p.size,
                productId: p.productId,
                price: products.find((prod) => prod.id === p.productId)?.price ?? 0,
              })),
            },
          },
        },
      });
      //console.log({ order });

      //* Validar si el price es '0' entonces lanzar un error

      //* 3.crear la dirección de la orden
      const { country, ...restAddress } = address;
      //* Debo insertar por separado para que sepa que no es el objeto de la relación
      const orderAddress = await tx.orderAddress.create({
        data: {
          ...restAddress,
          countryId: country,
          orderId: order.id,
        },
      });
      return {
        order: order,
        updateProducts: updatedProducts,
        orderAddress: orderAddress,
      };
    });
    return {
      ok: true,
      order: prismaTx.order,
      prismaTx: prismaTx,
    };
  } catch (error: any) {
    return {
      ok: false,
      message: error?.message,
    };
  }
};
