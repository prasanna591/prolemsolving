import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeroScene } from "@/components/hero-scene";
import { Reveal } from "@/components/reveal";
import { Magnetic } from "@/components/magnetic";
import { Button } from "@/components/button";
import { SectionHeading } from "@/components/section-heading";
import { ProductArt } from "@/components/product-art";
import { JsonLd } from "@/components/jsonld";
import { CtaBand } from "@/components/cta-band";
import { featured } from "@/lib/products";
import { eydPageSchema } from "@/lib/structured";
import { pageMetadata } from "@/lib/seo";
import heroBg from "@/app/images/building.webp";
import reference from "@/app/images/EYD_referance.webp";

export const metadata = pageMetadata({
  title: "EYD — Explore Your Dreams",
  description:
    "EYD is PSM's home ecosystem — explore homes in 3D, compare options, connect with builders and professionals, and build. Starting in Tamil Nadu.",
  path: "/eyd",
});

const eyd = featured.find((p) => p.id === "eyd")!;

const JOURNEY = ["Explore", "Experience", "Compare", "Connect", "Build"];

const STEPS: { n: string; t: string; d: string }[] = [
  { n: "01", t: "Explore", d: "Discover homes, designs, builders, professionals and projects." },
  { n: "02", t: "Experience", d: "Explore homes and designs through interactive and immersive experiences." },
  { n: "03", t: "Compare", d: "Understand your options before making decisions." },
  { n: "04", t: "Connect", d: "Find and connect with the right people and businesses." },
  { n: "05", t: "Build", d: "Move from planning toward building your home." },
];

const AUDIENCES: { who: string; d: string }[] = [
  { who: "Home Seekers", d: "Discover and plan your home." },
  { who: "Builders & Construction Companies", d: "Showcase projects and connect with potential customers." },
  { who: "Architects & Engineers", d: "Make your expertise discoverable." },
  { who: "Contractors & Professionals", d: "Connect your skills with real projects." },
  { who: "Material Suppliers", d: "Showcase products and reach home-building customers." },
];

export default function EydPage() {
  return (
    <div className="page-shell">
      <JsonLd data={eydPageSchema()} />

      {/* ============ HERO ============ */}
      <HeroScene
        eyebrow="A PSM product"
        image={heroBg}
        title={
          <>
            EYD &mdash; <em className="hh-grad">Explore Your Dreams.</em>
          </>
        }
        lede="EYD is a digital ecosystem that connects home seekers with the people, products and services behind building a home."
      >
        <p style={{ fontWeight: 800, letterSpacing: "-0.02em", fontSize: "clamp(1.15rem, 2.4vw, 1.6rem)", marginTop: "1.4rem" }}>
          Your Dream Home. <span className="grad-text">One Connected Journey.</span>
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1" style={{ fontWeight: 700, fontSize: "0.98rem" }}>
          {JOURNEY.map((s, i) => (
            <span key={s} style={{ color: i === JOURNEY.length - 1 ? "var(--color-brand)" : "var(--color-sub)" }}>
              {s}
              {i < JOURNEY.length - 1 && <span aria-hidden="true" style={{ margin: "0 0.5rem", opacity: 0.5 }}>·</span>}
            </span>
          ))}
        </div>
        <div className="hero-scene__cta">
          <Button href="/contact" variant="primary" size="lg" arrow>
            Explore EYD
          </Button>
          <Button href="/contact" variant="ghost" size="lg" arrow>
            Join the Ecosystem
          </Button>
        </div>
      </HeroScene>

      {/* ============ MORE THAN A PROPERTY ============ */}
      <section className="sec sec--white">
        <div className="container-x grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="The real problem"
              eyebrowTone="p"
              title="Building a Home Is More Than Finding a Property"
            />
            <Reveal delay={120}>
              <p className="dek lead mt-6">
                A home involves builders, architects, engineers, contractors, materials and many other decisions.
              </p>
              <p className="dek lead mt-4">
                EYD brings these parts together in one connected experience.
              </p>
              <div className="mt-7">
                <Link href="#how-it-works" className="link-line font-bold" style={{ color: "var(--color-brand)" }}>
                  See how it works <ArrowRight size={15} strokeWidth={2.5} aria-hidden="true" style={{ display: "inline", verticalAlign: "middle" }} />
                </Link>
              </div>
            </Reveal>
          </div>
          <Reveal delay={160}>
            <div className="product-media">
              <Image src={reference} alt="EYD — an early design reference for the platform" sizes="(max-width: 1024px) 100vw, 620px" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ HOW EYD WORKS ============ */}
      <section className="sec sec--plum" id="how-it-works" style={{ scrollMarginTop: "4rem" }}>
        <div className="container-x">
          <SectionHeading
            eyebrow="How EYD works"
            eyebrowTone="g"
            title="One Journey, Five Steps"
            lede="Explore. Experience. Compare. Connect. Build — the same sequence for every home, at every stage."
            align="center"
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={(i % 3) * 70} className={i === 3 ? "sm:col-span-2 lg:col-span-1" : ""}>
                <article className="hwb-card" style={{ height: "100%" }}>
                  <div className="hwb-num">{s.n}</div>
                  <h3 className="hwb-title">{s.t}</h3>
                  <p className="hwb-desc">{s.d}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ONE ECOSYSTEM ============ */}
      <section className="sec sec--soft">
        <div className="container-x">
          <SectionHeading
            eyebrow="Who it serves"
            eyebrowTone="p"
            title="One Ecosystem. Many Possibilities."
            lede="EYD is built for both sides of the journey — the people looking for a home, and the people who build them."
          />
          <ul className="rule-list mt-12">
            {AUDIENCES.map((a, i) => (
              <Reveal key={a.who} as="li" delay={i * 60}>
                <span className="rl-ix" aria-hidden="true">0{i + 1}</span>
                <div>
                  <strong style={{ fontSize: "1.1rem", color: "var(--color-navy)" }}>{a.who}</strong>
                  <p className="dek mt-1">{a.d}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ MORE THAN A LISTING ============ */}
      <section className="sec sec--white">
        <div className="container-x grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="The scope"
              eyebrowTone="g"
              title="More Than a Property Listing"
            />
            <Reveal delay={120}>
              <p className="dek lead mt-6">
                EYD is being built around the complete home-building journey — from the first idea to the people, products
                and services needed to turn it into reality.
              </p>
            </Reveal>
          </div>
          <Reveal delay={160}>
            <div className={`product-visual ${eyd.tone}`} style={{ borderRadius: "1.5rem", border: "1px solid var(--color-linesoft)" }}>
              <ProductArt product={eyd} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ STARTING IN TAMIL NADU ============ */}
      <section className="sec sec--plum">
        <div className="container-x grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Where it starts"
              eyebrowTone="p"
              title="Starting in Tamil Nadu"
            />
            <Reveal delay={120}>
              <p className="dek lead mt-6">
                We&rsquo;re starting locally, learning from real users and businesses, and building the ecosystem step by step.
              </p>
            </Reveal>
          </div>
          <Reveal delay={160}>
            <ul className="eydc-steps" style={{ background: "var(--color-page)", border: "1px solid var(--color-linesoft)", borderRadius: "1.25rem", padding: "1.4rem 1.6rem", boxShadow: "var(--shadow-soft)" }}>
              {["Real home seekers", "Local builders", "Architects & engineers", "Contractors", "Material suppliers"].map((x) => (
                <li key={x}>
                  <b aria-hidden="true">→</b>
                  {x}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ============ ABOUT EYD ============ */}
      <section className="sec sec--soft">
        <div className="container-x">
          <SectionHeading
            eyebrow="About EYD"
            eyebrowTone="g"
            title="EYD — Explore Your Dreams is a product initiative of Problem Solving Mind."
            lede="We believe technology should solve real problems and make complex journeys simpler."
          />
          <Reveal delay={120} className="mt-8">
            <Link href="/about" className="link-line font-bold" style={{ color: "var(--color-brand)" }}>
              More about Problem Solving Mind <ArrowRight size={15} strokeWidth={2.5} aria-hidden="true" style={{ display: "inline", verticalAlign: "middle" }} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ============ BUILD YOUR DREAM ============ */}
      <section className="sec final-sec">
        <div className="container-x text-center">
          <Reveal>
            <span className="eyebrow eyebrow--p">Get involved</span>
            <h2 className="h2 mx-auto mt-5 mb-5 max-w-[760px]">
              Build Your Dream <em className="grad-text">With EYD</em>
            </h2>
            <p className="dek mx-auto max-w-[640px]">
              Whether you&rsquo;re planning a home or part of the construction ecosystem, EYD is being built for you.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Magnetic strength={5}>
                <Button href="/contact" variant="primary" size="lg" arrow>
                  I&rsquo;m Building a Home
                </Button>
              </Magnetic>
              <Magnetic strength={5}>
                <Button href="/contact" variant="dark" size="lg" arrow>
                  Join the Ecosystem
                </Button>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Have a Problem Worth Solving?"
        lede="Tell us what you're trying to solve. We'll explore what technology can do about it."
        ctaLabel="Start a Conversation"
      />
    </div>
  );
}
