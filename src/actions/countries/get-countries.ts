"use server";

import prisma from "@/lib/prisma";
//import { sleep } from "@/utils";

export const getCountries = async () => {
  try {
    //await sleep(3);
    const countries = await prisma.country.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return countries;
  } catch (error) {
    console.log(error);
    return [];
  }
};
