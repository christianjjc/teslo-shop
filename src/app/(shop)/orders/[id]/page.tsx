import Image from "next/image";
import { redirect } from "next/navigation";

import { PaypalButton, ProductImage, Title } from "@/components";
import { currencyFormat } from "@/utils";
import { getOrderById } from "@/actions";
import { IsPaidFlag } from "../ui/ispaid-flag/IsPaidFlag";

//import { initialData } from "@/seed/seed";
//import Link from "next/link";
//import clsx from "clsx";
//import { IoCartOutline } from "react-icons/io5";

interface Props {
  params: { id: string };
}

//const productInCart = [initialData.products[0], initialData.products[1], initialData.products[2]];

export default async function OrderPage({ params }: Props) {
  const { id } = params;

  const { ok, order } = await getOrderById(id);
  //console.log(JSON.stringify(order));
  //console.log({ order });
  //console.log(order!.OrderItem);

  if (!ok) {
    redirect("/");
  }

  const address = order!.OrderAddress;

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        {/* <Title title={`Órden N° ${id}`} /> */}
        <Title title={`Órden N° ${id.split("-").at(-1)}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <IsPaidFlag isPaid={order!.isPaid} />

            {/* Items */}
            {order?.OrderItem.map((item, i) => (
              <div key={item.product.slug + i++} className="flex mb-5">
                <ProductImage width={100} height={100} src={item.product.ProductImage[0].url} alt={item.product.title} className="mr-5 rounded" style={{ width: "100px", height: "100px" }} />
                <div>
                  <p>{item.product.title}</p>
                  <p>
                    {currencyFormat(item.price)} x {item.quantity}
                  </p>
                  <p className="font-bold">Subtotal: {currencyFormat(item.price * item.quantity)}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Checkout */}
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl font-bold mb-2">Dirección de Entrega:</h2>

            <div className="mb-10">
              <p className="capitalize">{address!.firstName + " " + address!.lastName}</p>
              <p className="capitalize">{address!.address} </p>
              <p className="capitalize">{address!.address2} </p>
              <p className="capitalize">
                {address!.city}, {address!.countryId}{" "}
              </p>
              <p>{address!.postalCode} </p>
              <p className="capitalize">{address!.phone} </p>
            </div>
            <div className="w-full h-0.5 rounded bg-gray-100 mb-10"></div>

            <h2 className="text-2xl mb-2">Resumen de Orden</h2>

            <div className="grid grid-cols-2">
              <span>N° Productos:</span>
              <span className="text-right">{order?.itemsInOrder === 1 ? `1 artículo` : `${order?.itemsInOrder} artículos`} </span>
              <span>Subtotal:</span>
              <span className="text-right">{currencyFormat(order!.subtotal)}</span>
              <span>Impuestos (15%):</span>
              <span className="text-right">{currencyFormat(order!.tax)}</span>
              <span className="mt-5 text-2xl">Total:</span>
              <span className="mt-5 text-2xl text-right">{currencyFormat(order!.total)}</span>
            </div>
            <div className="mt-5 mb-2 w-full">{order!.isPaid ? <IsPaidFlag isPaid={order!.isPaid} /> : <PaypalButton orderId={order!.id} amount={order!.total} />}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
