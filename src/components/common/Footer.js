import React from "react";
import { Facebook, Github, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
      <p className="text-xs text-gray-500 dark:text-gray-400">
        © 2024 QuickCompress. All rights reserved.
      </p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link
          className="text-xs hover:underline underline-offset-4"
          href="/terms-of-services"
        >
          Terms of Service
        </Link>
        <Link
          className="text-xs hover:underline underline-offset-4"
          href="/privacy"
        >
          Privacy
        </Link>
      </nav>
      <div className="flex gap-4 sm:gap-6 ml-8">
        <Link className="text-xs hover:underline underline-offset-4" href="#">
          <Facebook className="h-4 w-4" />
        </Link>
        <Link className="text-xs hover:underline underline-offset-4" href="#">
          <Twitter className="h-4 w-4" />
        </Link>
        <Link className="text-xs hover:underline underline-offset-4" href="#">
          <Instagram className="h-4 w-4" />
        </Link>
        <Link className="text-xs hover:underline underline-offset-4" href="#">
          <Linkedin className="h-4 w-4" />
        </Link>
        <Link className="text-xs hover:underline underline-offset-4" href="#">
          <Github className="h-4 w-4" />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
