import Image from "next/future/image";
import logo from "../../assets/logo.svg";
import Link from "next/link";
import { HeaderContainer } from "./styles";
import { Cart } from "../Cart";

export function Header() {
  return (
    <HeaderContainer>
      <Link href="/">
        <a>
          <Image src={logo} alt="" />
        </a>
      </Link>

      <Cart />
    </HeaderContainer>
  );
}
