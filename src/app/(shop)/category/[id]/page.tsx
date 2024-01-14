import { ProductGrid, Title } from "@/components";
import { Category } from "@/interfaces";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: Category;
  };
}

const seedProducts = initialData.products;

export default function ({ params }: Props) {
  const { id } = params;

  const products = seedProducts.filter((prod) => prod.gender === id);

  const labels: Record<Category, string> = {
    men: "Hombres",
    women: "Mujeres",
    kid: "Niños",
    unisex: "todos",
  };

  /*   if (id === "kids") {
    notFound();
  } */

  return (
    <>
      <Title title={`Articulos para ${labels[id]}`} subtitle="Todos los Productos" clasname="mb-2" />
      <ProductGrid products={products} />
    </>
  );
}
