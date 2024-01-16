"use server";

import prisma from "@/lib/prisma";
//import { sleep } from "@/utils";

export const getProductStockBySlug = async (slug: string): Promise<number> => {
  try {
    //await sleep(3);

    const stock = await prisma.product.findFirst({
      where: {
        slug: slug,
      },
      select: { inStock: true }, //aqui le digo que campo deseo devolver
    });
    return stock?.inStock ?? 0;
  } catch (error) {
    return 0;
  }
};
