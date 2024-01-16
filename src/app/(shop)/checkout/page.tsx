import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import { currencyFormat } from "@/utils";
import Image from "next/image";
import Link from "next/link";

const productInCart = [initialData.products[0], initialData.products[1], initialData.products[2]];

export default function CheckoutPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Verificar Órden" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <span>Ajustar elementos</span>
            <Link href="/cart" className="underline mb-5">
              Editar carrito
            </Link>
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
                  <p>{currencyFormat(prod.price)} x 3</p>
                  <p className="font-bold">Subtotal: {currencyFormat(prod.price * 3)}</p>
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
              <span className="text-right">{currencyFormat(100)}</span>
              <span>Impuestos (15%):</span>
              <span className="text-right">{currencyFormat(100)}</span>
              <span className="mt-5 text-2xl">Total:</span>
              <span className="mt-5 text-2xl text-right">{currencyFormat(100)}</span>
            </div>
            <div className="mt-5 mb-2 w-full">
              <p className="mb-5">
                <span className="text-xs">
                  Al hacer clic en &quot;Confirmar compra&quot;, aceptas nuestros&nbsp;
                  <a href="#" className="underline">
                    términos y condiciones
                  </a>{" "}
                  y{" "}
                  <a href="#" className="underline">
                    política de privacidad
                  </a>
                </span>
              </p>
              <Link href="/orders/123" className="flex btn-primary justify-center">
                Confirmar compra
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
