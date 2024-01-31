"use client";

import { useEffect, useState } from "react";
import { getProductStockBySlug } from "@/actions";
import { titleFont } from "@/config/fonts";

interface Props {
  slug: string;
}

export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getStock = async () => {
      const stock = await getProductStockBySlug(slug);
      setStock(stock);
      setIsLoading(false);
    };

    getStock();
  }, [slug]);

  return (
    <>
      {isLoading ? (
        <h2 className={`${titleFont.className} antialiased font-bold text-md animate-pulse bg-gray-500`}>&nbsp;</h2>
      ) : (
        <h2 className={`${titleFont.className} antialiased font-bold text-md`}>Stock: {stock}</h2>
      )}
    </>
  );
};
