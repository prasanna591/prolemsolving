import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/button";
import { allProducts } from "@/lib/products";

const CARD_TONES: Record<string, { bg: string; border: string; accent: string }> = {
  "product-visual__tone--brand": {
    bg: "linear-gradient(180deg, rgba(30,58,95,0.06) 0%, rgba(30,58,95,0.02) 100%)",
    border: "rgba(30,58,95,0.15)",
    accent: "var(--color-brand)",
  },
  "product-visual__tone--accp": {
    bg: "linear-gradient(180deg, rgba(124,58,237,0.06) 0%, rgba(124,58,237,0.02) 100%)",
    border: "rgba(124,58,237,0.15)",
    accent: "var(--color-accp)",
  },
  "product-visual__tone--accg": {
    bg: "linear-gradient(180deg, rgba(13,148,136,0.06) 0%, rgba(13,148,136,0.02) 100%)",
    border: "rgba(13,148,136,0.15)",
    accent: "var(--color-accg)",
  },
};

/**
 * A deliberately shallow product strip, not the full deck.
 *
 * The homepage previously carried a five-card product deck that repeated what
 * the hero and the What We Do section already link to, two bands apart. This is
 * the replacement: every product's name and one-line promise, linked through to
 * `/products`, which keeps the depth.
 *
 * `allProducts`, not `featured`. `featured` is only the first three of the five
 * (EYD, LECOM, BOOWA) — Aura and Founder OS sit in a parallel `inDevelopment`
 * array, and reading `featured` alone silently dropped two products from the
 * homepage while the copy above the strip said five.
 */
export function HomeProductsStrip() {
  // Exclude LECOM and Founder OS from homepage product strip
  const homepageProducts = allProducts.filter(
    (p) => p.id !== "lecom" && p.id !== "founder-os"
  );

  return (
    <section className="sec sec--plum">
      <div className="container-x">
        <SectionHeading
          eyebrow="Our products"
          title="Products built for people"
        />

        <p className="mt-6 text-center text-sm" style={{ color: "var(--color-sub)" }}>
          Different stages, one standard —{" "}
          {homepageProducts.map((p) => `${p.name} ${p.status.toLowerCase()}`).join(", ")}.
        </p>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-center max-w-[800px] mx-auto">
          {homepageProducts.map((p, i) => {
            const tone = CARD_TONES[p.tone] || CARD_TONES["product-visual__tone--brand"];
            return (
              <Reveal key={p.id} delay={i * 80} className="h-full">
                <li className="card h-full max-w-xs mx-auto" style={{
                  background: tone.bg,
                  borderColor: tone.border,
                } as CSSProperties}>
                  <div style={{ background: tone.bg, border: `1px solid ${tone.border}`, padding: "0.5rem 0.75rem", borderRadius: "0.5rem", display: "inline-block", marginBottom: "0.75rem" }}>
                    <span className="badge badge--brand" style={{ background: "transparent", border: "none", color: tone.accent }}>{p.status}</span>
                  </div>
                  <h3 className="mt-4 mb-1" style={{ fontSize: "1.2rem", fontWeight: 800, letterSpacing: "-0.02em" }}>
                    {p.name}
                  </h3>
                  <p className="dek" style={{ fontSize: "0.92rem" }}>{p.tagline}</p>
                  <Link
                    href="/products"
                    className="link-line mt-4 inline-flex items-center gap-1.5 self-start font-bold"
                    style={{ color: tone.accent, fontSize: "0.88rem" }}
                    aria-label={`Learn more about ${p.name}`}
                  >
                    Details
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </Link>
                </li>
              </Reveal>
            );
          })}
        </ul>

        <Reveal delay={120}>
          <div className="mt-12 flex justify-center">
            <Button href="/products" variant="ghost" size="lg" arrow>
              Explore products
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
