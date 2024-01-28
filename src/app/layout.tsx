import type { Metadata } from "next";
import { inter } from "@/config/fonts";
import "./globals.css";
import { Provider } from "@/components";

export const metadata: Metadata = {
  title: {
    template: "%s - Teslo | Shop",
    default: "Home - Teslo | Shop",
  },
  description: "Una tienda virtual de Productos",
  /*  openGraph: {
    title: {
      template: "%s - Teslo | Shop",
      default: "Home - Teslo | Shop",
    },
    description: "Una tienda virtual de Productos",
  }, */
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
