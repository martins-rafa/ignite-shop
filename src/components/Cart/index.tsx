import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/future/image";
import { X } from "phosphor-react";
import { CartButton } from "../CartButton";
import {
  CartClose,
  CartContent,
  CartFooter,
  CartFooterDetails,
  CartProductCard,
  CartProductDetails,
  CartProductImageContainer,
} from "./styles";

import { useContext, useState } from "react";
import { CartContext } from "../../contexts/CartContext";
import axios from "axios";

export function Cart() {
  const { cart, removeFromCart, cartTotalPrice } = useContext(CartContext);
  const cartTotalQuantity = cart.length;

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);

  const formattedTotalPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cartTotalPrice);

  async function handleBuyProducts() {
    try {
      setIsCreatingCheckoutSession(true);

      const response = await axios.post("/api/checkout", {
        products: cart,
      });

      const { checkoutUrl } = response.data;
      window.location.href = checkoutUrl;
    } catch (error) {
      setIsCreatingCheckoutSession(false);
      alert("Something went wrong :( Please try again later");
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <CartButton />
      </Dialog.Trigger>

      <Dialog.Portal>
        <CartContent>
          <CartClose>
            <X size={24} weight="bold" />
          </CartClose>

          <h2>Cart</h2>

          <section>
            {cartTotalQuantity <= 0 && <p>Seems like your cart is empty :(</p>}

            {cart.map((product) => {
              return (
                <CartProductCard key={product.id}>
                  <CartProductImageContainer>
                    <Image
                      width={100}
                      height={93}
                      alt=""
                      src={product.imageUrl}
                    />
                  </CartProductImageContainer>

                  <CartProductDetails>
                    <p>{product.name}</p>
                    <strong>{product.price}</strong>
                    <button
                      onClick={() => {
                        removeFromCart(product.id);
                      }}
                    >
                      Remove
                    </button>
                  </CartProductDetails>
                </CartProductCard>
              );
            })}
          </section>

          <CartFooter>
            <CartFooterDetails>
              <div>
                <span>Quantity</span>
                <p>{`${
                  cartTotalQuantity === 1
                    ? cartTotalQuantity + " item"
                    : cartTotalQuantity + " items"
                }`}</p>
              </div>

              <div>
                <span>Total</span>
                <p>{formattedTotalPrice}</p>
              </div>
            </CartFooterDetails>
            <button
              onClick={handleBuyProducts}
              disabled={isCreatingCheckoutSession || cartTotalQuantity < 1}
            >
              Buy
            </button>
          </CartFooter>
        </CartContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
