import { Button } from "@/components/ui/button";
import { Coffee } from "lucide-react";
import buymeCoffeeIcon from "@/app/buy-me-a-coffee-icon.png";
import Image from "next/image";

export default function BuyMeCoffeeSection() {
  return (
    <section className="bg-gradient-to-r from-secondary/30 to-secondary/10 py-16">
      <div className="container mx-auto px-4 text-center">
        <Image
          className="w-16 h-16 mb-6 rounded-full mx-auto"
          src={buymeCoffeeIcon}
          alt="buy-me-a-coffee-icon"
          width={250}
          height={250}
        />
        <h2 className="text-3xl font-bold text-primary mb-4">
          Enjoy My Content? Buy Me a Coffee!
        </h2>
        <p className="text-lg text-primary/80 mb-8 max-w-2xl mx-auto">
          If you find my work helpful or entertaining, consider supporting me
          with a virtual coffee. Your support helps me create more amazing
          content for you!
        </p>
        <a
          target="_blank"
          href="https://buymeacoffee.com/modakverma"
          size="lg"
          className="bg-secondary/90 flex max-w-xs items-center justify-center mx-auto w-full hover:bg-secondary text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          <Coffee className="mr-2 h-5 w-5" />
          Buy Me a Coffee
        </a>
        <p className="mt-6 text-primary/70 text-sm">
          Every sip of support is deeply appreciated!
        </p>
      </div>
    </section>
  );
}
