"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";

import { placeOrder } from "@/actions";
import { useAddressStore, useCartStore } from "@/store";
import { currencyFormat } from "@/utils";

export const PlaceOrder = () => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const address = useAddressStore((state) => state.address);

  const { subTotal, tax, total, itemsInCart } = useCartStore((state) => state.getSumaryInformation());

  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);
    //await sleep(3);

    const productsToOrder = cart.map((prod) => ({
      productId: prod.id,
      quantity: prod.quantity,
      size: prod.size,
    }));

    //! Server Action
    const resp = await placeOrder(productsToOrder, address);
    if (!resp.ok) {
      console.log({ resp });
      setIsPlacingOrder(false);
      setErrorMessage(resp.message);
      return;
    }
    //* Todo salió bien
    clearCart();
    router.replace("/orders/" + resp.order?.id);
  };

  if (!loaded) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-7">
      <h2 className="text-2xl font-bold mb-2">Dirección de Entrega:</h2>
      <div className="mb-10">
        <p className="capitalize">{address.firstName + " " + address.lastName}</p>
        <p className="capitalize">{address.address} </p>
        <p className="capitalize">{address.address2} </p>
        <p className="capitalize">
          {address.city}, {address.country}{" "}
        </p>
        <p>{address.postalCode} </p>
        <p className="capitalize">{address.phone} </p>
      </div>
      <div className="w-full h-0.5 rounded bg-gray-100 mb-10"></div>
      <h2 className="text-2xl mb-2">Resumen de Orden</h2>
      <div className="grid grid-cols-2">
        <span>N° Productos:</span>
        <span className="text-right">{itemsInCart === 1 ? `1 artículo` : `${itemsInCart} artículos`} </span>
        <span>Subtotal:</span>
        <span className="text-right">{currencyFormat(subTotal)}</span>
        <span>Impuestos (15%):</span>
        <span className="text-right">{currencyFormat(tax)}</span>
        <span className="mt-5 text-2xl">Total:</span>
        <span className="mt-5 text-2xl text-right">{currencyFormat(total)}</span>
      </div>
      <div className="mt-5 mb-2 w-full">
        <p className="mb-5">
          <span className="text-xs">
            Al hacer clic en &quot;Confirmar compra&quot;, aceptas nuestros&nbsp;
            <a href="#" className="underline">
              términos y condiciones
            </a>{" "}
            y{" "}
            <a href="#" className="underline">
              política de privacidad
            </a>
          </span>
        </p>
        <p className="text-red-500">{errorMessage}</p>
        <button
          //href="/orders/123"
          onClick={onPlaceOrder}
          className={clsx({
            "btn-primary": !isPlacingOrder,
            "btn-disabled": isPlacingOrder,
          })}>
          Confirmar Orden
        </button>
      </div>
    </div>
  );
};
