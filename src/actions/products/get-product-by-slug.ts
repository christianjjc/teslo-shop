"use server";

import prisma from "@/lib/prisma";

export const getProductBySlug = async (slug: string) => {
  try {
    const product = await prisma.product.findFirst({
      include: {
        //ProductImage
        ProductImage: true,
        /* {
          select: {
            url: true,
            id: true,
            productId: true,
          },
        }, */
      },
      where: {
        slug: slug,
      },
    });

    if (!product) return null;

    //const { ProductImage, ...rest } = product;

    return {
      ...product,
      images: product.ProductImage.map((image) => image.url),
    };
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener el producto por slug");
  }
};
