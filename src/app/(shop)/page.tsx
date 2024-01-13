import { ProductGrid, Title } from "@/components";
import { initialData } from "@/seed/seed";

const products = initialData.products;

export default function Home() {
  return (
    <>
      <Title title="Tienda" subtitle="Todos los Productos" clasname="mb-2" />
      <ProductGrid products={products} />
    </>
  );
}
