import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/button";
import { allProducts } from "@/lib/products";

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
  return (
    <section className="sec sec--plum">
      <div className="container-x">
        <SectionHeading
          eyebrow="Our products"
          title="Products built for people"
          lede="Five products in development, each one started from a problem we watched happen in the real world."
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {allProducts.map((p, i) => (
            <Reveal key={p.id} delay={(i % 5) * 60} className="h-full">
              <li className="card h-full">
                <span className="badge badge--brand">In Development</span>
                <h3 className="mt-4 mb-1" style={{ fontSize: "1.2rem", fontWeight: 800, letterSpacing: "-0.02em" }}>
                  {p.name}
                </h3>
                <p className="dek" style={{ fontSize: "0.92rem" }}>{p.tagline}</p>
                <Link
                  href="/products"
                  className="link-line mt-4 inline-flex items-center gap-1.5 self-start font-bold"
                  style={{ color: "var(--color-brand)", fontSize: "0.88rem" }}
                  aria-label={`Learn more about ${p.name}`}
                >
                  Details
                  <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              </li>
            </Reveal>
          ))}
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
