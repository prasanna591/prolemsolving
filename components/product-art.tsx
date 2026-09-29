import Image from "next/image";
import type { StaticImageData } from "next/image";
import type { Product } from "@/lib/products";
import eydShot from "@/app/images/eyd.webp";
import lecomShot from "@/app/images/lecom.webp";
import boowaShot from "@/app/images/boowa.webp";
import auraShot from "@/app/images/aura.webp";
import founderShot from "@/app/images/founder_OS.webp";

const shots: Record<Product["visual"], { src: StaticImageData; alt: string }> = {
  eyd: { src: eydShot, alt: "EYD — 3D property and home-building platform" },
  lecom: { src: lecomShot, alt: "LECOM — communication and learning platform" },
  boowa: { src: boowaShot, alt: "BOOWA — hyperlocal scheduled-delivery platform" },
  aura: { src: auraShot, alt: "Aura — proactive health companion" },
  founder: { src: founderShot, alt: "Founder OS — founder productivity app" },
};

/**
 * Product previews — real product screenshots inside a shared card shell.
 */
export function ProductArt({ product }: { product: Product }) {
  const shot = shots[product.visual];
  return (
    <div className="art art--shot">
      <Image src={shot.src} alt={shot.alt} sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px" />
    </div>
  );
}