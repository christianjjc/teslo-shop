import { create } from "zustand";
import { CartProduct } from "@/interfaces";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];

  getTotalItems: () => number;

  getSumaryInformation: () => {
    subTotal: number;
    tax: number;
    total: number;
    itemsInCart: number;
  };

  addProductToCart: (product: CartProduct) => void;

  updateProductsQuantity: (product: CartProduct, quantity: number) => void;
  removeProductOfCart: (product: CartProduct) => void;
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

      getSumaryInformation: () => {
        const { cart } = get();
        const subTotal = cart.reduce((acum, item) => acum + item.quantity * item.price, 0);
        const tax = subTotal * 0.15;
        const total = subTotal + tax;
        const itemsInCart = cart.reduce((acum, item) => acum + item.quantity, 0);
        return {
          subTotal,
          tax,
          total,
          itemsInCart,
        };
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

      updateProductsQuantity: (product: CartProduct, quantity: number) => {
        //console.log({ product, quantity });
        const { cart } = get();
        const updatedCartInProduct = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: quantity };
          }
          return item;
        });
        set({ cart: updatedCartInProduct });
        //const quantityNew = cart.filter((el) => el.id === product.id && el.size === product.size).reduce((acum, item) => acum + item.quantity, 0);
        //return quantity + quantityNew;
      },

      removeProductOfCart: (product: CartProduct) => {
        const { cart } = get();
        //console.log({ product });
        const updatedCartInProduct = cart.filter((item) => !(item.id === product.id && item.size === product.size));
        //console.log({ updatedCartInProduct });
        set({ cart: updatedCartInProduct });
      },
    }),
    {
      name: "shopping-cart",
      //skipHydration: true,  --> Esto es para poder evitar la hidratación del lado del cliente.
    }
  )
);
