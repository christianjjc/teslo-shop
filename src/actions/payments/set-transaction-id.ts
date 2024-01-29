"use server";

import prisma from "@/lib/prisma";

export const setTransactionId = async (txId: string, orderId: string) => {
  try {
    const order = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        //isPaid: true,
        //paidAt: new Date(),
        transactionId: txId,
      },
    });

    if (!order) {
      return {
        ok: false,
        message: "No se encotró una orden con el id: " + orderId.split("-").at(-1),
      };
    }

    return {
      ok: true,
      message: "201",
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "No se pudo registrar el id de la transacción",
    };
  }
};
