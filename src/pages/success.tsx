import { GetServerSideProps } from "next";
import Image from "next/future/image";
import Head from "next/head";
import Link from "next/link";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import {
  ImageContainer,
  ImagesDisplayContainer,
  SuccessContainer,
} from "../styles/pages/success";

interface SuccessProps {
  customerName: string;
  productsImages: string[];
}

export default function Success({
  customerName,
  productsImages,
}: SuccessProps) {
  return (
    <>
      <Head>
        <title>Success| Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <ImagesDisplayContainer>
          {productsImages.map((image, index) => (
            <ImageContainer key={index}>
              <Image src={image} alt="" width={120} height={110} />
            </ImageContainer>
          ))}
        </ImagesDisplayContainer>

        <h1>Success!</h1>

        <p>
          Uhuul <strong>{customerName}</strong>, your{" "}
          <strong>{productsImages.length}</strong> T-Shirts is already on the
          way!
        </p>

        <Link href="/">
          <a>Back to catalog</a>
        </Link>
      </SuccessContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  });

  const customerName = session.customer_details.name;
  const productsImages = session.line_items.data.map((item) => {
    const product = item.price.product as Stripe.Product;
    return product.images[0];
  });

  return {
    props: {
      customerName,
      productsImages,
    },
  };
};
