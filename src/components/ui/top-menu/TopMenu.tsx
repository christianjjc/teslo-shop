"use client";
import React, { useEffect, useState } from "react";
import { titleFont } from "@/config/fonts";
import { useCartStore, useUIStore } from "@/store";
import Link from "next/link";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";

export const TopMenu = () => {
  const openMenu = useUIStore((state) => state.openSideMenu);
  const totalItemsInCart = useCartStore((state) => state.getTotalItems());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <nav className="flex px-5 justify-between items-center w-full">
      <div>
        <Link href="/">
          <span className={`${titleFont.className} antialiased font-bold`}>Teslo</span>
          <span> | Shop</span>
        </Link>
      </div>
      <div className="hidden sm:block">
        <Link href="/gender/men" className="m-2 p-2 rounded-md transition-all hover:bg-gray-100">
          Hombres
        </Link>
        <Link href="/gender/women" className="m-2 p-2 rounded-md transition-all hover:bg-gray-100">
          Mujeres
        </Link>
        <Link href="/gender/kid" className="m-2 p-2 rounded-md transition-all hover:bg-gray-100">
          Niños
        </Link>
      </div>

      <div className="flex items-center">
        <Link href="/search" className="mx-2">
          <IoSearchOutline className="w-5 h-5" />
        </Link>

        <Link href={totalItemsInCart === 0 && loaded ? "/empty" : "/cart"}>
          <div className="relative">
            {totalItemsInCart > 0 && loaded && (
              <span className="fade-in absolute text-xs px-1 rounded-full font-bold -top-2 bg-blue-700 text-white -right-2">{totalItemsInCart}</span>
            )}
            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>

        <button onClick={openMenu} className="m-2 p-2 rounded-md trnasition-all hover:bg-gray-100">
          Menú
        </button>
      </div>
    </nav>
  );
};
