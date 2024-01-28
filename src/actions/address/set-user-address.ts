"use server";

import { Address } from "@/interfaces";
import prisma from "@/lib/prisma";

export const setUserAddress = async (address: Address, userId: string) => {
  try {
    const savedAddress = createOrReplaceAddress(address, userId);

    return {
      ok: true,
      address: savedAddress,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "No se pudo grabar la dirección",
    };
  }
};

const createOrReplaceAddress = async (address: Address, userId: string) => {
  try {
    const storeAddress = await prisma.userAddress.findUnique({
      where: {
        userId: userId,
      },
    });

    const addressToSave = {
      userId: userId,
      firstName: address.firstName,
      lastName: address.lastName,
      address: address.address,
      address2: address.address2,
      postalCode: address.postalCode,
      countryId: address.country,
      phone: address.phone,
      city: address.city,
    };

    if (!storeAddress) {
      //aqui si no existe la direccion
      const newAddress = await prisma.userAddress.create({
        data: addressToSave,
      });
      return newAddress;
    }

    //aqui se actualiza
    const updatedAddress = await prisma.userAddress.update({
      where: {
        userId: userId,
      },
      data: addressToSave,
    });
    return updatedAddress;
  } catch (error) {
    console.log(error);
    throw new Error("No se pudo grabar en la base de datos");
  }
};
