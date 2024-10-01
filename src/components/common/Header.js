import Link from "next/link";
import React from "react";
import Logo from "./Logo";
import Image from "next/image";
import buymeCoffeeIcon from "@/app/buy-me-a-coffee-icon.png";

const Header = () => {
  return (
    <header className="z-20 px-4 lg:px-6 h-14 flex items-center fixed top-0 w-full bg-white border">
      <Logo />
      <nav className="ml-auto flex items-center gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/dashboard"
        >
          Dashboard
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#"
        >
          About
        </Link>
        <a
          target="_blank"
          className="text-sm font-medium hover:underline underline-offset-4"
          href="https://buymeacoffee.com/modakverma"
        >
          <Image
            className="w-7 h-7 rounded-full"
            src={buymeCoffeeIcon}
            alt="buy-me-a-coffee-icon"
            width={250}
            height={250}
          />
        </a>
      </nav>
    </header>
  );
};

export default Header;
