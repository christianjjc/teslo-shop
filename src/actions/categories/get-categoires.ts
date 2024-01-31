"use server";

import prisma from "@/lib/prisma";
//import { sleep } from "@/utils";

export const getCategories = async () => {
  try {
    //await sleep(3);
    const categories = await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return categories;
  } catch (error) {
    console.log(error);
    return [];
  }
};
