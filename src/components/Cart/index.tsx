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

import tShirt from "../../assets/t-shit.png";

export function Cart() {
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
            {/* <p>Seems like your cart is empty :(</p> */}

            <CartProductCard>
              <CartProductImageContainer>
                <Image width={100} height={93} alt="" src={tShirt} />
              </CartProductImageContainer>

              <CartProductDetails>
                <p>T-Shirt</p>
                <strong>$ 49.99</strong>
                <button>Remove</button>
              </CartProductDetails>
            </CartProductCard>
          </section>

          <CartFooter>
            <CartFooterDetails>
              <div>
                <span>Quantity</span>
                <p>2 items</p>
              </div>

              <div>
                <span>Total</span>
                <p>$ 99.98</p>
              </div>
            </CartFooterDetails>
            <button>Buy</button>
          </CartFooter>
        </CartContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
