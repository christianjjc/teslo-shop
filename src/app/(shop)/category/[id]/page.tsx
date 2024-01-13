import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export default function ({ params }: Props) {
  const { id } = params;
  if (id === "kids") {
    notFound();
  }
  return (
    <main>
      <h1>Category Page {id}</h1>
    </main>
  );
}
