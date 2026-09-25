import type { Product } from "@/lib/products";
import eydShot from "@/app/images/eyd.png";
import lecomShot from "@/app/images/lecom.png";
import boowaShot from "@/app/images/boowa.png";
import auraShot from "@/app/images/aura.png";
import founderShot from "@/app/images/founder_OS.png";

const shots: Record<Product["visual"], { src: string; alt: string }> = {
  eyd: { src: eydShot.src, alt: "EYD — 3D property and home-building platform" },
  lecom: { src: lecomShot.src, alt: "LECOM — communication and learning platform" },
  boowa: { src: boowaShot.src, alt: "BOOWA — hyperlocal scheduled-delivery platform" },
  aura: { src: auraShot.src, alt: "Aura — proactive health companion" },
  founder: { src: founderShot.src, alt: "Founder OS — founder productivity app" },
};

/**
 * Product previews — real product screenshots inside a shared card shell.
 */
export function ProductArt({ product }: { product: Product }) {
  const shot = shots[product.visual];
  return (
    <div className="art art--shot">
      <img src={shot.src} alt={shot.alt} loading="lazy" />
    </div>
  );
}