import Image from "next/future/image";
import { HomeContainer, Product } from "../styles/pages/home";

import { useKeenSlider } from "keen-slider/react";

import "keen-slider/keen-slider.min.css";
import { stripe } from "../lib/stripe";
import { GetStaticProps } from "next";
import Stripe from "stripe";
import Link from "next/link";
import Head from "next/head";
import { CartButton } from "../components/CartButton";
import { MouseEvent, useContext } from "react";
import { CartContext, ProductProps } from "../contexts/CartContext";

interface HomeProps {
  products: ProductProps[];
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: "auto",
      spacing: 48,
    },
  });

  const { addToCart, checkIfProductIsAlreadyInCart } = useContext(CartContext);

  function handleAddToCart(
    e: MouseEvent<HTMLButtonElement>,
    product: ProductProps
  ) {
    e.preventDefault();
    addToCart(product);
  }

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => {
          return (
            <Link
              href={`/product/${product.id}`}
              key={product.id}
              prefetch={false}
            >
              <Product className="keen-slider__slide">
                <Image src={product.imageUrl} width={520} height={480} alt="" />

                <footer>
                  <div>
                    <strong>{product.name}</strong>
                    <span>{product.price}</span>
                  </div>

                  <CartButton
                    size="large"
                    bgColor="green"
                    disabled={checkIfProductIsAlreadyInCart(product.id)}
                    onClick={(e) => handleAddToCart(e, product)}
                  />
                </footer>
              </Product>
            </Link>
          );
        })}
      </HomeContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price.unit_amount / 100),
      numberPrice: price.unit_amount / 100,
      defaultPriceId: price.id,
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2hours
  };
};
