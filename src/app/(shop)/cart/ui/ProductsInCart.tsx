"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useCartStore } from "@/store";
import { QuantitySelector } from "@/components";
import Link from "next/link";
import { currencyFormat } from "@/utils";

export const ProductsInCart = () => {
  const updateProductsQuantity = useCartStore((state) => state.updateProductsQuantity);
  const removeProductOfCart = useCartStore((state) => state.removeProductOfCart);
  const productsInCart = useCartStore((state) => state.cart);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    console.log(loaded);
  }, []);

  if (!loaded) {
    return (
      // <p>Cargando...</p>;
      <>
        <div className="flex mb-5 ">
          <Image
            width={100}
            height={100}
            src={"/imgs/image-load-1.jpg"}
            alt={"loading image"}
            className="mr-5 rounded"
            style={{ width: "100px", height: "100px" }}
          />
          <div className="animate-pulse bg-gray-600 w-full rounded">
            <p>&nbsp;</p> {/* <p>{prod.title}</p> */}
            <p>&nbsp;</p> {/* <p>{prod.price}</p> */}
          </div>
        </div>
        <div className="flex mb-5 ">
          <Image
            width={100}
            height={100}
            src={"/imgs/image-load-1.jpg"}
            alt={"loading image"}
            className="mr-5 rounded"
            style={{ width: "100px", height: "100px" }}
          />
          <div className="animate-pulse bg-gray-600 w-full rounded">
            <p>&nbsp;</p> {/* <p>{prod.title}</p> */}
          </div>
        </div>
      </>
    );
  }

  //<h2 className={`${titleFont.className} antialiased font-bold text-md animate-pulse bg-gray-500`}>&nbsp;</h2>

  return (
    <>
      {productsInCart.map((prod) => (
        <div key={prod.slug + prod.size} className="flex mb-5">
          <Image
            width={100}
            height={100}
            src={`/products/${prod.image}`}
            alt={prod.title}
            className="mr-5 rounded"
            style={{ width: "100px", height: "100px" }}
          />
          <div>
            <Link href={`/product/${prod.slug}`} className="cursor-pointer hover:underline">
              <p>{`${prod.size} - ${prod.title}`}</p>
            </Link>
            <p>{currencyFormat(prod.price)}</p>
            <QuantitySelector quantity={prod.quantity} onQuantityChanged={(quantity) => updateProductsQuantity(prod, quantity)} />
            <button onClick={() => removeProductOfCart(prod)} className="underline mt-3">
              Remover
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
