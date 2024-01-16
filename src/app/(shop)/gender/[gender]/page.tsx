import { Metadata, ResolvingMetadata } from "next";
import { redirect } from "next/navigation";
import { Gender } from "@prisma/client";
import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";

interface Props {
  params: {
    gender: string;
  };
  searchParams: {
    page?: string;
  };
}

const labels: Record<string, string> = {
  men: "Hombres",
  women: "Mujeres",
  kid: "Niños",
  unisex: "todos",
};

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  // read route params
  const gender = params.gender;
  // fetch data
  //const product = await fetch(`https://.../${id}`).then((res) => res.json())
  //const product = await getProductBySlug(gender);
  // optionally access and extend (rather than replace) parent metadata
  //const previousImages = (await parent).openGraph?.images || []

  return {
    title: "Articulos para " + labels[gender],
    description: "Todos los que necesitas para " + labels[gender],
    openGraph: {
      title: "Articulos para " + labels[gender],
      description: "Todo lo que necesitas para " + labels[gender],
    },
  };
}

export default async function GenderByIdPage({ params, searchParams }: Props) {
  const { gender } = params;
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({
    page,
    gender: gender as Gender,
  });
  if (products.length === 0) {
    redirect(`/gender/${gender}`);
  }
  /*   const labels: Record<string, string> = {
    men: "Hombres",
    women: "Mujeres",
    kid: "Niños",
    unisex: "todos",
  }; */
  /*   if (id === "kids") {
    notFound();
  } */
  return (
    <>
      <Title title={`Articulos para ${labels[gender]}`} subtitle="Todos los Productos" clasname="mb-2" />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
