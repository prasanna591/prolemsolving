import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/lib/products";
import { SectionHeading } from "@/components/section-heading";

interface ScrollCardsProps {
  items: Product[];
  eyebrow?: string;
  title?: string;
  lede?: string;
}

const ACCENT: Record<Product["statusTone"], string> = {
  brand: "var(--color-brand)",
  accp: "var(--color-brand)",
  accg: "var(--color-brand-deep)",
  neutral: "var(--color-faint)",
};

/**
 * Static product deck — a responsive grid of cards. The former horizontal
 * pinned scroller was removed; every product always stacks in a normal grid.
 */
export function ScrollCards({ items, eyebrow = "On the bench", title, lede }: ScrollCardsProps) {
  return (
    <section className="sc-sec" aria-label={eyebrow}>
      <div className="sc-pin">
        <header className="container-x sc-head">
          <SectionHeading eyebrow={eyebrow} eyebrowTone="g" title={title} lede={lede} />
        </header>

        <div className="sc-viewport">
          <ul className="sc-track container-x">
            {items.map((p) => (
              <li key={p.id} className="sc-card">
                <div className="sc-card-acc" style={{ background: ACCENT[p.statusTone] }} aria-hidden="true" />
                <div className="sc-card-body">
                  <header className="sc-top">
                    <span className={`badge ${statusTone(p.statusTone)}`}>{p.status}</span>
                    <span className="sc-cat">{p.category}</span>
                  </header>
                  <h3 className="sc-title">{p.name}</h3>
                  <em className="sc-tag">{p.tagline}</em>
                  <p className="sc-desc">{p.description}</p>
                  <ul className="sc-focus">
                    {p.focus.slice(0, 3).map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                  <Link href={`/products/${p.id}`} className="sc-link link-line font-bold" style={{ color: "var(--color-brand)" }}>
                    Explore {p.name} <ArrowRight size={15} strokeWidth={2.5} aria-hidden="true" style={{ display: "inline", verticalAlign: "middle" }} />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <footer className="container-x sc-foot">
          <span className="sc-all">
            <Link href="/products" className="link-line font-bold" style={{ color: "var(--color-navy)" }}>
              All products
            </Link>
          </span>
        </footer>
      </div>
    </section>
  );
}

function statusTone(t: Product["statusTone"]): string {
  return { brand: "badge--brand", accp: "badge--brand", accg: "badge--brand", neutral: "badge--neutral" }[t];
}