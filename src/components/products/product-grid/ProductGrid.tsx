import { Product } from "@/interfaces";
import { ProductGridItem } from "./ProductGridItem";

interface Props {
  products: Product[];
}

export const ProductGrid = ({ products }: Props) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
      {products.map((prod) => (
        <ProductGridItem key={prod.slug} product={prod} />
      ))}
    </div>
  );
};
