import { create } from "zustand";
import { CartProduct } from "@/interfaces";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];

  getTotalItems: () => number;

  addProductToCart: (product: CartProduct) => void;

  //updateProductQuantity
  //removeProduct
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      //Methods

      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((acum, item) => acum + item.quantity, 0);
      },

      addProductToCart: (product: CartProduct) => {
        const { cart } = get();
        //1. Revisar si el producto exste en el carrito con la talla seleccionada.
        const productInCart = cart.some((item) => item.id === product.id && item.size === product.size);
        if (!productInCart) return set({ cart: [...cart, product] });

        //2. Encontramos el producto con la talla
        const updatedCartInProduct = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: item.quantity + product.quantity };
          }
          return item;
        });

        set({ cart: updatedCartInProduct });
      },
    }),
    {
      name: "shopping-cart",
      //skipHydration: true,  --> Esto es para poder evitar la hidratación del lado del cliente.
    }
  )
);
