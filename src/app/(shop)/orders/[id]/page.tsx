import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { IoCartOutline } from "react-icons/io5";

interface Props {
  params: { id: string };
}

const productInCart = [initialData.products[0], initialData.products[1], initialData.products[2]];

export default function ({ params }: Props) {
  const { id } = params;
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Órden N° ${id}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <div
              className={clsx("flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5", {
                "bg-red-500": false,
                "bg-green-700": true,
              })}>
              <IoCartOutline size={30} />
              {/* <span className="mx-2">Pendiente de pago</span> */}
              <span className="mx-2">Pagada</span>
            </div>

            {/* Items */}
            {productInCart.map((prod) => (
              <div key={prod.slug} className="flex mb-5">
                <Image
                  width={100}
                  height={100}
                  src={`/products/${prod.images[0]}`}
                  alt={prod.title}
                  className="mr-5 rounded"
                  style={{ width: "100px", height: "100px" }}
                />
                <div>
                  <p>{prod.title}</p>
                  <p>{prod.price} x 3</p>
                  <p className="font-bold">Subtotal: ${prod.price * 3}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Checkout */}
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl font-bold mb-2">Dirección de Entrega:</h2>

            <div className="mb-10">
              <p>Fernando Herrera</p>
              <p>Av. Siempre viva 123</p>
              <p>Col. Centro</p>
              <p>Alcaldía Cuauhtemoc</p>
              <p>Ciudad de México</p>
              <p>CP 123</p>
              <p>123456</p>
            </div>
            <div className="w-full h-0.5 rounded bg-gray-100 mb-10"></div>

            <h2 className="text-2xl mb-2">Resumen de Orden</h2>

            <div className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right">3 artículos</span>
              <span>Subtotal</span>
              <span className="text-right">$ 100</span>
              <span>Impuestos (15%):</span>
              <span className="text-right">$ 100</span>
              <span className="mt-5 text-2xl">Total:</span>
              <span className="mt-5 text-2xl text-right">$ 100</span>
            </div>
            <div className="mt-5 mb-2 w-full">
              <div
                className={clsx("flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5", {
                  "bg-red-500": false,
                  "bg-green-700": true,
                })}>
                <IoCartOutline size={30} />
                {/* <span className="mx-2">Pendiente de pago</span> */}
                <span className="mx-2">Pagada</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
