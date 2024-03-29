export const revalidate = 604800; // 7 días;

import { notFound } from "next/navigation";
import { titleFont } from "@/config/fonts";
import { ProductSlideShow, ProductSlideShowMobile, QuantitySelector, SizeSelector, StockLabel } from "@/components";
import { getProductBySlug } from "@/actions";
import { Metadata, ResolvingMetadata } from "next";
import { AddToCart } from "./ui/AddToCart";
import { currencyFormat } from "@/utils";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  // read route params
  const slug = params.slug;
  // fetch data
  //const product = await fetch(`https://.../${id}`).then((res) => res.json())
  const product = await getProductBySlug(slug);
  // optionally access and extend (rather than replace) parent metadata
  //const previousImages = (await parent).openGraph?.images || []
  return {
    title: product?.title ?? "Producto no encontrado",
    description: product?.description ?? "",
    /* openGraph: {
      title: product?.title ?? "Producto no encontrado",
      description: product?.description ?? "",
      images: [`products/${product?.images[1]}`],
    }, */
  };
}

export default async function ProductSlugPage({ params }: Props) {
  const { slug } = params;
  const product = await getProductBySlug(slug);
  //console.log({ product });
  if (!product) {
    notFound();
  }
  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* Slideshow */}
      <div className="col-span-1 md:col-span-2 ">
        <ProductSlideShow title={product.title} images={product.images} className="hidden md:block" />
        <ProductSlideShowMobile title={product.title} images={product.images} className="block md:hidden" />
      </div>
      {/* Detalles del producto */}
      <div className="col-span-1 px-5  ">
        <StockLabel slug={product.slug} />
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>{product.title}</h1>
        <p className="text-lg mb-5">{currencyFormat(product.price)}</p>

        <AddToCart product={product} />

        {/* Descripción */}
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
