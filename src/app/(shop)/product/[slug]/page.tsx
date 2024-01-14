import { notFound } from "next/navigation";
import { initialData } from "@/seed/seed";
import { tittleFont } from "@/config/fonts";
import { QuantitySelector, SizeSelector } from "@/components";

interface Props {
  params: {
    slug: string;
  };
}

export default function ({ params }: Props) {
  const { slug } = params;
  const product = initialData.products.find((prod) => prod.slug === slug);
  if (!product) {
    notFound();
  }
  return (
    <div className="mt-5 mb-20 grid md:grid-cols-3 gap-3">
      {/* Slideshow */}

      <div className="col-span-1 md:col-span-2 ">
        <h1>Hola Mundo</h1>
      </div>

      {/* Detalles del producto */}

      <div className="col-span-1 px-5  ">
        <h1 className={`${tittleFont.className} antialiased font-bold text-xl`}>{product.title}</h1>
        <p className="text-lg mb-5">$ {product.price}</p>
        {/* Selector de Tallas */}
        <SizeSelector selectedSize={product.sizes[0]} availableSizes={product.sizes} />

        {/* Selector de Cantidad */}
        <QuantitySelector quantity={2} />

        {/* Botón */}

        <button className="btn-primary my-5">Agregar al Carrito</button>

        {/* Descripción */}

        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
