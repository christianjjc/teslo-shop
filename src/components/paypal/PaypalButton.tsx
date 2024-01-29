"use client";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { CreateOrderData, CreateOrderActions, OnApproveData, OnApproveActions } from "@paypal/paypal-js";
import { paypalCheckPayment, setTransactionId } from "@/actions";

interface Props {
  orderId: string;
  amount: number;
}

export const PaypalButton = ({ orderId, amount }: Props) => {
  const [{ isPending }] = usePayPalScriptReducer();

  const roundedAmount = Math.round(amount * 100) / 100; //numero con 2 decimales

  if (isPending) {
    return (
      <div className="animate-pulse">
        <div className="h-11 bg-gray-300 rounded"></div>
        <div className="h-11 bg-gray-300 rounded mt-5"></div>
      </div>
    );
  }

  const createOrder = async (data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {
    const transactionId = await actions.order.create({
      purchase_units: [
        {
          invoice_id: orderId,
          amount: {
            value: `${roundedAmount}`,
          },
        },
      ],
    });

    console.log({ transactionId });

    // TODO: Guardar el txId en la orden en la base de datos
    const { ok, message } = await setTransactionId(transactionId, orderId);

    if (!ok) {
      throw new Error(message);
    }
    return transactionId;
  };

  const onAprobe = async (data: OnApproveData, actions: OnApproveActions) => {
    //console.log("On Aprobe");
    const details = await actions.order?.capture();
    if (!details) return;
    await paypalCheckPayment(details.id); //id de la transacción
  };
  return <PayPalButtons createOrder={createOrder} onApprove={onAprobe} />;
};
