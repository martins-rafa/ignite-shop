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

import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";

export function Cart() {
  const { cart, removeFromCart, cartTotalPrice } = useContext(CartContext);
  const cartTotalQuantity = cart.length;

  const formattedTotalPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cartTotalPrice);

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
            <button>Buy</button>
          </CartFooter>
        </CartContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
