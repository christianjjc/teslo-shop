"use server";

import prisma from "@/lib/prisma";

export const deleteUserAddress = async (userId: string) => {
  try {
    await prisma.userAddress.deleteMany({
      where: {
        userId: userId,
      },
    });
    return {
      ok: true,
      message: "Dirección eliminads",
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "No se pudo remover la dirección",
    };
  }
};
