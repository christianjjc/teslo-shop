"use server";

import { PaypalOrderStatusResponse } from "@/interfaces";
import { revalidatePath } from "next/cache";

export const paypalCheckPayment = async (paypalTransactionId: string) => {
  console.log({ paypalTransactionId });

  const authToken = await getPaypalBearerToken();
  console.log({ authToken });
  if (!authToken) {
    return {
      ok: false,
      message: "No se pudo obtener el token de verificación",
    };
  }
  const resp = await verifyPaypalPayment(paypalTransactionId, authToken);

  if (!resp) {
    return {
      ok: false,
      message: "Error al verificar el pago",
    };
  }

  const { status, purchase_units } = resp;
  console.log({ status, purchase_units });
  if (status.toUpperCase() !== "COMPLETED") {
    return {
      ok: false,
      message: "Aun no se ha pagado en Paypal.",
    };
  }

  //* ACTUALIZAMOS LA BD CON EL ESTADO DEL PAGO

  const { invoice_id: orderId } = purchase_units[0];

  try {
    await prisma?.order.update({
      where: {
        id: orderId,
      },
      data: {
        isPaid: true,
        paidAt: new Date(),
      },
    });
  } catch (error) {
    return {
      ok: false,
      message: "500 - No se pudo actualizar la orden.",
    };
  }

  //* REVALIDAMOS UN PATH
  revalidatePath(`orders/${orderId}`);

  return {
    ok: true,
    message: "201",
  };
};

const getPaypalBearerToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
  const PAYPAL_OAUTH_URL = process.env.PAYPAL_OAUTH_URL ?? "";

  const base64Token = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`, "utf-8").toString("base64");

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("Authorization", `Basic ${base64Token}`);

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  };

  try {
    const result = await fetch(PAYPAL_OAUTH_URL, { ...requestOptions, cache: "no-store" }).then((response) => response.json());
    return result.access_token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const verifyPaypalPayment = async (paypalTransactionId: string, bearerToken: string): Promise<PaypalOrderStatusResponse | null> => {
  const PAYPAL_ORDERS_URL = `${process.env.PAYPAL_ORDERS_URL}/${paypalTransactionId}`;

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${bearerToken}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const response = await fetch(PAYPAL_ORDERS_URL, { ...requestOptions, cache: "no-store" }).then((r) => r.json());
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};
