import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Magnetic } from "@/components/magnetic";
import { Button } from "@/components/button";
import { SectionHeading } from "@/components/section-heading";
import { EydShowcase } from "@/components/eyd-showcase";
import { FaqSection } from "@/components/faq";
import { HeroScene } from "@/components/hero-scene";
import { ProductArt } from "@/components/product-art";
import { featured, inDevelopment, type Product } from "@/lib/products";
import { faqs } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { productsSchema, breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/structured";
import { JsonLd } from "@/components/jsonld";
import productHeroBg from "@/app/images/product_hero_bg.webp";

export const metadata = pageMetadata({
  title: "Software Products & Product Development",
  description:
    "The software products PSM is building in Pondicherry — EYD, LECOM, Boowa, Aura and Founder OS. SaaS product development in real estate, health and learning.",
  path: "/products",
});

const eyd = featured.find((p) => p.id === "eyd")!;
const portfolio: Product[] = [...featured.filter((p) => p.id !== "eyd"), ...inDevelopment];

const HOW_WE_BUILD = [
  ["01", "Discover", "Understand the problem, the people, the environment, and the opportunity."],
  ["02", "Define", "Turn observations into a clear product direction."],
  ["03", "Design", "Create experiences that are simple, useful, and intuitive."],
  ["04", "Build", "Develop the technology, infrastructure, and product ecosystem."],
  ["05", "Learn", "Put the product in the real world and learn from actual users."],
  ["06", "Evolve", "Continuously improve the product as the problem and market evolve."],
];

const statusToneClass: Record<string, string> = {
  brand: "badge--brand",
  accp: "badge--brand",
  accg: "badge--brand",
  neutral: "badge--neutral",
};

export default function ProductsPage() {
  return (
    <div className="page-shell">
      <JsonLd data={productsSchema([...featured, ...inDevelopment])} />
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Products", path: "/products" }])} />
      <JsonLd
        data={webPageSchema({
          path: "/products",
          name: "Software products by PSM",
          description:
            "The PSM product portfolio — EYD, LECOM, BOOWA, Aura and Founder OS: software products built around real, observed problems.",
          breadcrumb: [{ name: "Home", path: "/" }, { name: "Products", path: "/products" }],
        })}
      />

      {/* ============ HERO — background visual right, text left ============ */}
      <HeroScene
        eyebrow="PSM Product Portfolio"
        image={productHeroBg}
        title={
          <>
            Products Built Around <em className="hh-grad">Real Problems.</em>
          </>
        }
        lede="We build practical technology products that simplify complex experiences, connect people and businesses, and create better ways to solve everyday problems."
      >
        <div className="hero-scene__cta">
          <Button href="/products/eyd" variant="primary" size="lg" arrow>
            Discover EYD
          </Button>
          <Button href="/products#portfolio" variant="ghost" size="lg" arrow>
            Browse the portfolio
          </Button>
        </div>
      </HeroScene>

      {/* ============ EYD — the showcase ============ */}
      <section className="sec sec--white" id="eyd" style={{ paddingTop: "2rem" }}>
        <div className="container-x grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
          <div>
            <Reveal>
              <div className="flex flex-wrap items-center gap-3">
                <span className="eyebrow eyebrow--p" style={{ marginBottom: 0 }}>Featured product</span>
                <span className="badge badge--brand">{eyd.status}</span>
              </div>
              <h2 className="h2 mt-5" style={{ fontSize: "clamp(2rem, 4.6vw, 3.4rem)" }}>
                EYD &mdash; <em className="grad-text">Explore Your Dreams.</em>
              </h2>
              <p className="mt-5 dek" style={{ fontSize: "1.05rem" }}>{eyd.description}</p>
              <p className="mt-4 text" style={{ fontSize: "0.98rem", color: "var(--color-sub)" }}>
                Everything from discovering a property to handing over the keys &mdash; in one connected ecosystem.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {eyd.focus.map((f) => (
                  <span key={f} className="badge badge--neutral">{f}</span>
                ))}
              </div>
              <div className="mt-6 pfolio-meta" style={{ color: "var(--color-brand)" }}>{eyd.category.toUpperCase()}</div>
              <div className="mt-8">
                <Magnetic strength={5}>
                  <Button href="/contact" variant="dark" arrow>See EYD in a walkthrough</Button>
                </Magnetic>
              </div>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <EydShowcase />
          </Reveal>
        </div>
      </section>

      {/* ============ PRODUCT PORTFOLIO ============ */}
      <section className="sec sec--soft" id="portfolio" style={{ scrollMarginTop: "4rem" }}>
        <div className="container-x">
          <SectionHeading
            eyebrow="Products We're Building"
            eyebrowTone="p"
            title="A portfolio of products, not a catalogue of cards"
            lede="Each product lives in a different industry, but they share one foundation — every one of them started as a real problem."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {portfolio.map((p, i) => (
              <Reveal key={p.id} delay={(i % 2) * 80}>
                <article className="pcard" id={p.id} style={{ scrollMarginTop: "6rem" }}>
                  <div className="pcard-visual">
                    <div className={`product-visual ${p.tone}`} style={{ minHeight: 180, padding: 0, border: 0, borderRadius: "1rem" }}>
                      <ProductArt product={p} />
                    </div>
                  </div>
                  <div className="pcard-body">
                    <span className={`badge ${statusToneClass[p.statusTone]}`}>{p.status}</span>
                    <h3 className="pfolio-name">{p.name} <em className="lowercase">&mdash;</em> <span style={{ fontSize: "0.8em", color: "var(--color-sub)", fontWeight: 700 }}>{p.tagline}</span></h3>
                    <p className="pcard-desc">{p.description}</p>
                    <div className="pfolio-focus mt-4">
                      {p.focus.map((f) => (
                        <span key={f}>{f}</span>
                      ))}
                    </div>
                    <div className="pcard-foot">
                      <span className="pfolio-meta">{p.category}</span>
                      <Link href={`/products/${p.id}`} className="pfolio-cta">
                        Explore {p.name} <ArrowRight size={15} strokeWidth={2.5} aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ONE COMPANY. MANY PROBLEMS. ============ */}
      <section className="sec sec--warm">
        <div className="container-x">
          <Reveal className="text-center">
            <span className="eyebrow eyebrow--g" style={{ marginBottom: "1.1rem" }}>One company. Many problems.</span>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1" style={{ fontWeight: 800, letterSpacing: "-0.03em", fontSize: "clamp(1.9rem, 4.4vw, 3.2rem)" }}>
              <span>Real problems.</span>
              <span className="grad-text">Clear thinking.</span>
              <span>Practical technology.</span>
            </div>
            <p className="dek mx-auto mt-8 max-w-[700px]" style={{ fontSize: "1.12rem" }}>
              Our products may operate in different industries, but they share the same foundation. We look for problems where
              technology can create a fundamentally better experience &mdash; then build products around them.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ HOW WE BUILD ============ */}
      <section className="sec sec--white">
        <div className="container-x">
          <SectionHeading
            eyebrow="How we build"
            eyebrowTone="g"
            title="From a real problem to a real product"
            lede="One deliberate sequence — repeated for every product on this page."
            align="center"
          />
          <div className="hwb-grid mt-12">
            {HOW_WE_BUILD.map(([n, t, d], i) => (
              <Reveal key={n} delay={(i % 3) * 70}>
                <div className="hwb-card">
                  <div className="hwb-num">{n}</div>
                  <h3 className="hwb-title">{t}</h3>
                  <p className="hwb-desc">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ OUR PRODUCT PHILOSOPHY ============ */}
      <section className="sec relative overflow-hidden bg-navy text-white noise">
        <div className="container-x relative z-[2]">
          <Reveal>
            <span className="eyebrow eyebrow--light">Our Product Philosophy</span>
            <p className="stmnt mt-6">
              Technology should disappear <span className="text-[#9cc0ff]">into the experience.</span>
            </p>
            <div className="mt-8 max-w-[560px]">
              <p className="text-white/65" style={{ fontSize: "1.08rem" }}>
                The best products don&rsquo;t make people think about the technology behind them. They simply make difficult things
                easier. That&rsquo;s what we aim to build at PSM.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <FaqSection
        eyebrow="Product questions"
        title="Questions about the PSM product portfolio"
        lede="What the products are, how they are built, and what stage each one is at."
      />

      {/* ============ BUILDING FOR WHAT'S NEXT ============ */}
      <section className="sec sec--white">
        <div className="container-x text-center">
          <Reveal>
            <span className="eyebrow eyebrow--p">Building for what&rsquo;s next</span>
            <h2 className="h2 mx-auto mt-5 mb-5 max-w-[760px]">
              Our current products represent only <em className="grad-text">the beginning.</em>
            </h2>
            <p className="dek mx-auto max-w-[640px]">
              We are building a portfolio of technology products that can grow independently, solve meaningful problems, and
              eventually serve users at scale.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {["Different problems.", "Different products.", "One mindset."].map((s) => (
                <span key={s} className="badge badge--neutral" style={{ padding: "0.55rem 1rem" }}>{s}</span>
              ))}
            </div>
            <div className="mt-12">
              <div className="inline-flex items-center gap-3" aria-hidden="true">
                {Array.from({ length: 3 }).map((_, i) => (
                  <span key={i} className="pulse-dot" style={{ width: 8, height: 8, borderRadius: 999, background: "var(--color-brand)", display: "inline-block", opacity: 0.6 }} />
                ))}
              </div>
              <p className="mt-3 stmnt stmnt--lg">
                <span className="grad-text">Problem Solving Mind</span>
              </p>
              <p style={{ fontWeight: 700, color: "var(--color-sub)" }}>Building Products. Solving Problems.</p>
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Magnetic strength={5}>
                <Button href="/work" variant="dark" arrow>Explore Our Work</Button>
              </Magnetic>
              <Magnetic strength={5}>
                <Button href="/contact" variant="primary" arrow>Start a Conversation</Button>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}