import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { allProducts, DEDICATED, type Product } from "@/lib/products";
import { ProductArt } from "@/components/product-art";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/button";
import { JsonLd } from "@/components/jsonld";
import { productSchema, breadcrumbSchema } from "@/lib/structured";
import { pageMetadata } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

/** Only the slugs returned by generateStaticParams are built; unknown
 *  slugs 404 instead of rendering on demand, which keeps the crawlable URL
 *  surface finite. */
export const dynamicParams = false;

export function generateStaticParams() {
  return allProducts.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = allProducts.find((p) => p.id === slug);
  if (!product) return {};
  return pageMetadata({
    title: product.name,
    description: product.seoDescription,
    path: DEDICATED[product.id] ?? `/products/${product.id}`,
  });
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = allProducts.find((p) => p.id === slug);
  if (!product) notFound();

  const dedicated = DEDICATED[product.id];
  if (dedicated) return <DedicatedNotice product={product} href={dedicated} />;

  const others = allProducts.filter((p) => p.id !== product.id);

  return (
    <div className="page-shell">
      <JsonLd data={productSchema(product)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: product.name, path: `/products/${product.id}` },
        ])}
      />

      {/* ---- identity + visual ---- */}
      <header className="sec sec--white">
        <div className="container-x">
          <Reveal delay={40}>
            <Link href="/products" className="link-line font-bold" style={{ color: "var(--color-brand)" }}>
              <ArrowLeft size={14} aria-hidden="true" style={{ display: "inline", verticalAlign: "middle", marginRight: "0.3rem" }} />
              All products
            </Link>
          </Reveal>

          <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <Reveal delay={80}>
                <div className="flex flex-wrap items-center gap-3">
                  <span className={`badge ${toneClass(product.statusTone)}`}>{product.status}</span>
                  <span className="eyebrow eyebrow--p" style={{ marginBottom: 0 }}>{product.category}</span>
                </div>
                <h1 className="display mt-6">
                  {product.name} <em className="grad-text">&mdash; {product.tagline}</em>
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="dek lead mt-6" style={{ maxWidth: "34rem" }}>{product.description}</p>
              </Reveal>
              <Reveal delay={220}>
                <div className="pfolio-focus mt-7">
                  {product.focus.map((f) => (
                    <span key={f}>{f}</span>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={280}>
                <div className="mt-10">
                  <Button href="/contact" variant="dark" size="lg" arrow>Discuss this with PSM</Button>
                </div>
              </Reveal>
            </div>

            <Reveal delay={160}>
              <div className={`product-visual ${product.tone}`}>
                <ProductArt product={product} />
              </div>
            </Reveal>
          </div>
        </div>
      </header>

      {/* ---- why it exists ---- */}
      <section className="sec sec--plum">
        <div className="container-x grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal>
            <span className="eyebrow eyebrow--g">The problem behind it</span>
            <h2 className="h2 mt-5">
              Real problems. <em className="grad-text">Connected solutions.</em>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="dek lead">
              Every {product.name} build started the same way this portfolio does — with a problem observed in the
              real world, not with technology looking for a use. The product exists so that a specific, familiar
              difficulty stops being a daily friction.
            </p>
            <p className="dek lead mt-4">
              {product.name} is currently in development. We build deliberately, validate with real use, and only
              put the product in front of real users when it genuinely solves the problem it was started for.
            </p>
          </Reveal>
        </div>
      </section>

      {product.media ? (
        <section className="sec sec--white">
          <div className="container-x">
            <Reveal>
              <span className="eyebrow eyebrow--p">In the world</span>
              <h2 className="h2 mt-5">
                {product.name} in real <em className="grad-text">context</em>
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {product.media.map((m, i) => (
                <Reveal key={`${m.alt}-${i}`} delay={i * 100} className={i === 0 ? "md:col-span-2" : ""}>
                  <div className="product-media">
                    <Image src={m.src} alt={m.alt} sizes="(max-width: 768px) 100vw, 720px" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* ---- rest of the bench ---- */}
      <section className="sec sec--soft">
        <div className="container-x">
          <Reveal>
            <span className="eyebrow eyebrow--p">Also on the bench</span>
            <h2 className="h2 mt-5">More products from PSM</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {others.map((p, i) => (
              <ProductCard key={p.id} product={p} delay={i * 60} />
            ))}
          </div>
          <Reveal delay={120} className="mt-10">
            <Link href="/products" className="link-line font-bold" style={{ color: "var(--color-brand)" }}>
              View the full portfolio <ArrowUpRight size={15} aria-hidden="true" style={{ display: "inline", verticalAlign: "middle" }} />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function toneClass(t: Product["statusTone"]): string {
  return { brand: "badge--brand", accp: "badge--accp", accg: "badge--accg", neutral: "badge--neutral" }[t];
}

/** Thin pointer page — the real content lives on the dedicated product URL. */
function DedicatedNotice({ product, href }: { product: Product; href: string }) {
  return (
    <div className="page-shell">
      <section className="sec sec--plum">
        <div className="container-x max-w-[820px]">
          <Reveal>
            <span className="eyebrow eyebrow--p">{product.category}</span>
            <h1 className="h-hero mt-6 mb-5">
              {product.name} <em className="grad-text">&mdash; {product.tagline}</em>
            </h1>
            <p className="dek lead">{product.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={href} variant="primary" size="lg" arrow>
                Explore {product.name}
              </Button>
              <Button href="/products" variant="ghost" size="lg" arrow>
                All products
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}