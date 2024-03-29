"use client";
import { useState } from "react";
import { QuantitySelector, SizeSelector } from "@/components";
import type { Product, Size, CartProduct } from "@/interfaces";
import { useCartStore } from "@/store";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const addProducttoCart = useCartStore((state) => state.addProductToCart);

  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);
  const addToCart = () => {
    setPosted(true);
    if (!size) return;
    console.log({ size, quantity, posted, product });
    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity: quantity,
      size: size,
      image: product.images[0],
    };
    addProducttoCart(cartProduct);
    setPosted(false);
    setQuantity(1);
    setSize(undefined);
  };

  //if (quantity < 1) setQuantity(1);

  return (
    <>
      {posted && !size && <span className="fade-in mt-2 text-red-500">Debe de seleccionar una talla</span>}

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
