"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { useRouter } from "next/navigation";
import { ProductImage } from "@/components";

export const ProductsInCart = () => {
  /*   const router = useRouter();
  const totalItemsInCart = useCartStore((state) => state.getTotalItems());
  if (totalItemsInCart === 0) {
    router.push("/empty");
  } */

  const productsInCart = useCartStore((state) => state.cart);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    //console.log(loaded);
  }, []);

  if (!loaded) {
    return (
      <>
        <div className="flex mb-5 ">
          <Image width={100} height={100} src={"/imgs/image-load-1.jpg"} alt={"loading image"} className="mr-5 rounded" style={{ width: "100px", height: "100px" }} />
          <div className="animate-pulse bg-gray-600 w-full rounded">
            <p>&nbsp;</p> {/* <p>{prod.title}</p> */}
            <p>&nbsp;</p> {/* <p>{prod.price}</p> */}
          </div>
        </div>
        <div className="flex mb-5 ">
          <Image width={100} height={100} src={"/imgs/image-load-1.jpg"} alt={"loading image"} className="mr-5 rounded" style={{ width: "100px", height: "100px" }} />
          <div className="animate-pulse bg-gray-600 w-full rounded">
            <p>&nbsp;</p> {/* <p>{prod.title}</p> */}
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      {productsInCart.map((prod) => (
        <div key={prod.slug + prod.size} className="flex mb-5">
          <ProductImage width={100} height={100} src={prod.image} alt={prod.title} className="mr-5 rounded" style={{ width: "100px", height: "100px" }} />
          <div>
            <span>{`${prod.size} - ${prod.title} `}</span>
            <span className="font-bold">{`(${prod.quantity})`}</span>
            <p className="font-bold">{currencyFormat(prod.price * prod.quantity)}</p>
          </div>
        </div>
      ))}
    </>
  );
};
