"use client";
import { useState } from "react";
import { QuantitySelector, SizeSelector } from "@/components";
import { Product, Size } from "@/interfaces";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);

  const addToCart = () => {
    setPosted(true);
    if (!size) return;
    console.log({ size, quantity, posted });
  };

  //if (quantity < 1) setQuantity(1);

  return (
    <>
      {posted && !size && <span className="mt-2 text-red-500">Debe de seleccionar una talla</span>}

      {/* Selector de Tallas */}
      <SizeSelector selectedSize={size} availableSizes={product.sizes} onSizeChanged={setSize} />
      {/* Selector de Cantidad */}
      <QuantitySelector quantity={quantity} onQuantityChanged={setQuantity} />
      {/* Botón */}
      <button className="btn-primary my-5" onClick={addToCart}>
        Agregar al Carrito
      </button>
    </>
  );
};
