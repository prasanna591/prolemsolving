import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/lib/products";
import { Reveal } from "@/components/reveal";
import { ProductArt } from "@/components/product-art";

const badgeTone = {
  brand: "badge--brand",
  accp: "badge--accp",
  accg: "badge--accg",
  neutral: "badge--neutral",
} as const;

export function ProductCard({ product, delay = 0, anchor = true }: { product: Product; delay?: number; anchor?: boolean }) {
  return (
    <Reveal delay={delay} className="h-full">
      <article className="product-card h-full">
        <div className={`product-visual ${product.tone}`}>
          <ProductArt product={product} />
        </div>
        <div className="product-body">
          <span className={`badge ${badgeTone[product.statusTone]}`}>{product.status}</span>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <div className="product-meta">
            <span>{product.category}</span>
            {anchor ? (
              <Link href={`/products/${product.id}`}>
                View product <ArrowRight size={15} strokeWidth={2.5} aria-hidden="true" />
              </Link>
            ) : (
              <span style={{ color: "var(--color-faint)" }}>On the bench</span>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}