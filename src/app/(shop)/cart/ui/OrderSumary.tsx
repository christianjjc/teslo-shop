"use client";

import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { useEffect, useState } from "react";

export const OrderSumary = () => {
  const [loaded, setLoaded] = useState(false);

  const { subTotal, tax, total, itemsInCart } = useCartStore((state) => state.getSumaryInformation());

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return (
      <>
        <div className="grid grid-cols-2 animate-pulse">
          <span>N° Productos:</span>
          <span className="text-right">...</span>
          <span>Subtotal:</span>
          <span className="text-right">...</span>
          <span>Impuestos (15%):</span>
          <span className="text-right">...</span>
          <span className="mt-5 text-2xl">Total:</span>
          <span className="mt-5 text-2xl text-right">...</span>
        </div>
      </>
    );
  }

  return (
    <>
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
    </>
  );
};
