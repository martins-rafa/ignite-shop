import { createContext, ReactNode, useState } from "react";

export interface ProductProps {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  numberPrice: number;
  description: string;
  defaultPriceId: string;
}

interface CartContextData {
  cart: ProductProps[];
  checkIfProductIsAlreadyInCart: (productId: string) => boolean;
  addToCart: (product: ProductProps) => void;
  removeFromCart: (productId: string) => void;
  cartTotalPrice: number;
}

interface CartContextProviderProps {
  children: ReactNode;
}

export const CartContext = createContext({} as CartContextData);

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cart, setCart] = useState<ProductProps[]>([]);

  const cartTotalPrice = cart.reduce((total, product) => {
    return total + product.numberPrice;
  }, 0);

  function checkIfProductIsAlreadyInCart(productId: string) {
    return cart.some((product) => product.id === productId);
  }

  function addToCart(product: ProductProps) {
    setCart((state) => [...state, product]);
  }

  function removeFromCart(productId: string) {
    setCart((state) => state.filter((product) => product.id !== productId));
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        checkIfProductIsAlreadyInCart,
        addToCart,
        removeFromCart,
        cartTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
