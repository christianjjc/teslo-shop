"use client";

import { useCartStore } from "@/store";
import Link from "next/link";

export const CheckoutButton = () => {
  const productInCart = useCartStore((state) => state.getTotalItems());
  return (
    <div className="mt-5 mb-2 w-full">
      <Link href={productInCart === 0 ? "/empty" : "/checkout/address"} className="flex btn-primary justify-center">
        Checkout
      </Link>
    </div>
  );
};
