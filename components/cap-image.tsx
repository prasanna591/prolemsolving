import Image from "next/image";
import type { StaticImageData } from "next/image";
import { ImageIcon } from "lucide-react";
import type { Capability } from "@/lib/content";

/**
 * Real shots per capability, keyed by `Capability["visual"]`.
 *
 * Deliberately empty. Every entry falls back to the labelled placeholder
 * below, so each capability row already holds a correctly-sized slot before any
 * artwork exists. To fill one in: drop the file in `app/images/`, import it,
 * and set `{ src, alt }` here. Nothing else changes — the frame, the aspect
 * ratio and the alt text all come from this map.
 *
 * The map is `Partial` on purpose. A capability with no artwork should not be a
 * type error; it should render a placeholder. Making the key optional is what
 * lets rows be added one at a time.
 */
import one_solution from "@/app/images/optimized/1_solution.webp";
import two_solution from "@/app/images/optimized/2_solution.webp";
import three_solution from "@/app/images/optimized/3_solution.webp";
import four_solution from "@/app/images/optimized/4_solution.webp";
import five_solution from "@/app/images/optimized/5_solution.webp";
import six_solution from "@/app/images/optimized/6_solution.webp";

const shots: Partial<Record<Capability["visual"], { src: StaticImageData; alt: string }>> = {
  dashboard: { src: one_solution, alt: "Custom software development solution" },
  automation: { src: two_solution, alt: "AI automation solution" },
  integrate: { src: three_solution, alt: "ERP/CRM integration solution" },
  mobile: { src: four_solution, alt: "Web and mobile application solution" },
  transform: { src: five_solution, alt: "Digital transformation solution" },
};

/**
 * Capability artwork for the Solutions editorial rows.
 *
 * Replaces the hand-built `cs-*` div mockups, which read as generic wireframes
 * rather than as this company's work. A placeholder that says what belongs
 * there is more honest than an anonymous chart, and it keeps the row's height
 * stable while the real screenshots are being produced.
 */
export function CapImage({ visual, label }: { visual: Capability["visual"]; label: string }) {
  const shot = shots[visual];

  return (
    <div className="wsd-media">
      {shot ? (
        <Image
          src={shot.src}
          alt={shot.alt}
          sizes="(max-width: 1024px) 100vw, 45vw"
          className="cap-img"
        />
      ) : (
        <div className="cap-slot" role="img" aria-label={`${label} — image placeholder`}>
          <span className="cap-slot__icon" aria-hidden="true">
            <ImageIcon size={26} strokeWidth={1.5} />
          </span>
          <span className="cap-slot__label">{label}</span>
          <span className="cap-slot__hint">Image placeholder</span>
        </div>
      )}
    </div>
  );
}
