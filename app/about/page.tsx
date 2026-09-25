import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/button";
import { SectionHeading } from "@/components/section-heading";
import { ProductArt } from "@/components/product-art";
import { CtaBand } from "@/components/cta-band";
import { allProducts } from "@/lib/products";
import { founders } from "@/lib/founders";
import { pageMetadata } from "@/lib/seo";
import workingPic from "@/app/images/working_pic.png";
import { aboutSchema, breadcrumbSchema } from "@/lib/structured";
import { JsonLd } from "@/components/jsonld";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Problem Solving Mind (PSM) is a product-focused technology company built by Prasanna Venkatesan R. and Maniyarasan S. We start with the problem, not the technology.",
  path: "/about",
  keywords: [
    "about PSM",
    "Problem Solving Mind company",
    "Prasanna Venkatesan",
    "Maniyarasan",
    "product technology company Pune",
    "PSM founders",
  ],
});

/* ---------------- copy blocks ---------------- */

const productionSteps = ["Problem", "Understanding", "Ideas", "Technology", "Product", "Impact"];

const transforms = [
  { from: "Complex", to: "Connected" },
  { from: "Disconnected", to: "Simple" },
  { from: "Manual", to: "Intelligent" },
  { from: "Slow", to: "Scalable" },
];

const stages = [
  { n: "01", t: "Understand", d: "Understand the people, process, environment and problem." },
  { n: "02", t: "Question", d: "Challenge assumptions and find what is actually causing the problem." },
  { n: "03", t: "Design", d: "Turn the opportunity into a simple and meaningful experience." },
  { n: "04", t: "Build", d: "Use software, AI, automation and engineering to make the idea real." },
  { n: "05", t: "Validate", d: "Put the solution into the real world and learn from it." },
  { n: "06", t: "Evolve", d: "Improve continuously as users, businesses and markets change." },
];

const loopNodes = ["REAL-WORLD PROBLEMS", "INSIGHTS", "PRODUCTS", "SOLUTIONS", "EXPERIENCE", "NEW INSIGHTS"];

const principles = [
  { t: "Think Clearly", d: "Understand the real problem before rushing toward a solution.", pull: "", ac: "#0d6efd" },
  { t: "Build Practically", d: "Choose technology based on what the product needs — not what's trending.", pull: "lg:mt-16", ac: "#4f9bff" },
  { t: "Stay Close to Reality", d: "Real users, real businesses and real feedback matter more than assumptions.", pull: "lg:mt-28", ac: "#0d6efd" },
  { t: "Take Ownership", d: "We care about the outcome, not just completing a task.", pull: "lg:mt-44", ac: "#0d6efd" },
];

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  left: (i * 53) % 100,
  size: 3 + ((i * 7) % 6),
  dur: 9 + ((i * 5) % 9),
  delay: -((i * 3.7) % 18),
  opacity: 0.12 + ((i * 11) % 20) / 100,
  drift: (i % 2 === 0 ? 1 : -1) * (8 + ((i * 13) % 40)),
}));

const timeline = [
  { t: "PSM Begins", d: "Problem Solving Mind starts with a simple idea: technology should solve meaningful problems." },
  { t: "First Builds", d: "Early software and technology projects turn ideas into practical systems." },
  { t: "Real-World Experience", d: "PSM begins working with businesses and organizations on real operational problems." },
  { t: "Product Direction", d: "The focus expands toward building scalable products rather than only delivering individual projects." },
  { t: "Today", d: "Multiple products are currently being developed across different domains." },
  { t: "Next", d: "Build products capable of reaching users beyond individual projects and markets." },
];

const domainLabels: Record<string, { domain: string }> = {
  lecom: { domain: "Communication & Learning" },
  eyd: { domain: "Real Estate & Construction" },
  boowa: { domain: "Hyperlocal Delivery" },
  aura: { domain: "Proactive Healthcare Assistance" },
  founder: { domain: "Founder Productivity" },
};

/* ---------------- product + service loop ring ---------------- */

function LoopRing() {
  const c = 230;
  const labelsR = 208;
  const arrowsR = 166;
  const pt = (i: number, r: number) => {
    const a = ((-90 + i * 60) * Math.PI) / 180;
    return { x: c + r * Math.cos(a), y: c + r * Math.sin(a) };
  };
  return (
    <svg viewBox="0 0 460 460" className="loop-ring" role="img" aria-label="The PSM product and service loop: real-world problems lead to insights, products, solutions, experience and new insights">
      <circle cx={c} cy={c} r={arrowsR + 6} fill="none" className="loop-track" />
      <g className="loop-spin">
        <circle cx={c} cy={c} r={arrowsR + 6} fill="none" className="loop-dashed" />
      </g>
      {loopNodes.map((_, i) => {
        const a = pt(i, arrowsR);
        const b = pt(i + 1, arrowsR);
        const large = 0;
        return (
          <path
            key={`ar-${i}`}
            d={`M ${a.x} ${a.y} A ${arrowsR} ${arrowsR} 0 ${large} 1 ${b.x} ${b.y}`}
            className="loop-arrow"
            markerEnd="url(#loopArrow)"
          />
        );
      })}
      {loopNodes.map((label, i) => {
        const p = pt(i, labelsR);
        return (
          <text key={`lb-${i}`} x={p.x} y={p.y} textAnchor="middle" dy="0.32em" className="loop-label">
            {label}
          </text>
        );
      })}
      <g>
        <circle cx={c} cy={c} r={86} className="loop-hub" />
        <circle cx={c} cy={c} r={86} className="loop-hub-ring" />
        <text x={c} y={c - 8} textAnchor="middle" className="loop-hub-title">PSM</text>
        <text x={c} y={c + 16} textAnchor="middle" className="loop-hub-sub">the loop</text>
      </g>
      <defs>
        <marker id="loopArrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L7,3.5 L0,7 z" className="loop-arrowhead" />
        </marker>
      </defs>
    </svg>
  );
}

/* ---------------- main page ---------------- */

export default function AboutPage() {
  return (
    <div className="page-shell">
      <JsonLd
        data={aboutSchema([
          { name: "Prasanna Venkatesan R.", jobTitle: "Founder" },
          { name: "Maniyarasan S.", jobTitle: "Co-founder" },
        ])}
      />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />

      {/* 01 — HERO */}
      <header className="sec sec--white about-hero">
        <div className="container-x grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div>
            <Reveal>
              <span className="eyebrow">About &mdash; Problem Solving Mind</span>
            </Reveal>
            <Reveal delay={90}>
              <h1 className="display mt-6">
                We believe every problem is an{" "}
                <em className="grad-text">opportunity to build something better.</em>
              </h1>
            </Reveal>
            <Reveal delay={180}>
              <p className="lede mt-7 max-w-[560px]">
                Problem Solving Mind is a product-focused technology company building practical software, AI-powered
                solutions, and intelligent platforms for real-world problems.
              </p>
            </Reveal>
          </div>

          <Reveal delay={220} className="mx-auto w-full max-w-[320px]">
            <div className="psm-flow">
              {productionSteps.map((label, i) => (
                <div key={label} className="pf-wrap">
                  <Reveal className="pf-item" delay={i * 110}>
                    <span className="pf-dot" style={{ background: i === 2 ? "var(--color-brand-light)" : i === 4 ? "var(--color-navy)" : "var(--color-brand)" }} />
                    <span className="pf-label">{label}</span>
                  </Reveal>
                  {i < productionSteps.length - 1 && <span className="pf-line" />}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </header>

      {/* 02 — WHY PSM EXISTS */}
      <section className="sec sec--warm">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <Reveal>
              <span className="eyebrow eyebrow--ink">Why we exist</span>
              <h2 className="h2 mt-5">
                Technology should solve problems, <em className="grad-text">not create more complexity.</em>
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="dek lead mt-6">
                Businesses and people deal with complicated processes every day — disconnected systems, repetitive work,
                fragmented information, inefficient workflows, and experiences that simply don&rsquo;t work as well as they could.
              </p>
              <p className="dek lead mt-4">
                We believe technology can do better. PSM exists to understand those problems deeply and turn them into
                practical products and systems that make life and work simpler.
              </p>
              <Link href="/about/motives" className="link-line font-bold mt-5" style={{ color: "var(--color-brand)", display: "inline-block" }}>
                Read about why PSM exists <ArrowRight size={14} aria-hidden="true" style={{ display: "inline", verticalAlign: "middle" }} />
              </Link>
            </Reveal>
          </div>

          <Reveal delay={150}>
            <div className="trans-grid">
              {transforms.map((row) => (
                <div key={row.from} className="trans-row">
                  <span className="trans-chip trans-chip--in">{row.from}</span>
                  <span className="trans-arrow" aria-hidden="true">
                    <ArrowRight size={16} />
                  </span>
                  <span className="trans-chip trans-chip--out">
                    <Check size={13} aria-hidden="true" />
                    {row.to}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 03 — THE PROBLEM-SOLVING MINDSET */}
      <section className="sec relative overflow-hidden bg-navy text-white noise">
        <div className="container-x relative z-[2]">
          <Reveal>
            <span className="eyebrow eyebrow--light">How we think</span>
            <h2 className="h2 mt-5">
              We don&rsquo;t start with technology.
            </h2>
            <p className="stmnt mt-3">
              We start <span className="text-[#9cc0ff]">with the problem.</span>
            </p>
          </Reveal>
          <div className="mt-12 grid gap-x-8 gap-y-0 md:grid-cols-2">
            {stages.map((s, i) => (
              <Reveal key={s.n} delay={i * 70} className="stage-row" as="article">
                <span className="stage-num">{s.n}</span>
                <div>
                  <h3 className="stage-title">{s.t}</h3>
                  <p className="stage-desc">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 04 — WHAT WE BUILD */}
      <section className="sec sec--white">
        <div className="container-x">
          <SectionHeading
            eyebrow="From ideas to real products"
            eyebrowTone="p"
            title="We build technology across the real world."
            lede="Our products explore problems across different industries and experiences. Our engineering capabilities also allow us to build and integrate technology for organizations with complex requirements."
          />
          <div className="mt-10 flex justify-center">
            <Reveal delay={80}>
              <Button href="/products" variant="dark" size="lg" arrow>Explore Our Products</Button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 05 — PRODUCT + SERVICE MODEL */}
      <section className="sec sec--warm overflow-hidden">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <Reveal>
              <span className="eyebrow eyebrow--g">Products + solutions</span>
              <h2 className="h2 mt-5">
                Products are our core. <em className="grad-text">Solutions extend our reach.</em>
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="dek lead mt-6">
                We are building our own technology products for problems that can be solved at scale. At the same time,
                we work with businesses that have unique challenges requiring specialized technology.
              </p>
              <p className="dek lead mt-4">
                This creates a continuous loop — every challenge, every build, feeds the next:
              </p>
              <p className="mt-6 font-extrabold" style={{ color: "var(--color-navy)", fontSize: "1.05rem" }}>
                Problems &rarr; Insights &rarr; Products &rarr; Solutions &rarr; Learning &rarr; Better Products
              </p>
            </Reveal>
          </div>
          <Reveal delay={150} className="mx-auto w-full max-w-[500px]">
            <LoopRing />
          </Reveal>
        </div>
      </section>

      {/* 06 — HOW WE WORK */}
      <section className="sec sec--white">
        <div className="container-x">
          <SectionHeading
            eyebrow="How we work"
            eyebrowTone="g"
            title="Small team. Serious problems."
            lede="We prefer focused teams, direct communication, fast experimentation, and taking responsibility from idea to execution."
          />
          <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
            <div className="grid gap-x-8 gap-y-10 md:grid-cols-2">
              {principles.map((p, i) => (
                <Reveal key={p.t} delay={i * 80} className={`prin ${p.pull}`} style={{ "--ac": p.ac } as CSSProperties} as="article">
                  <span className="prin-num">0{i + 1}</span>
                  <h3 className="prin-title">{p.t}</h3>
                  <p className="prin-desc">{p.d}</p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={120}>
              <div className="hww-photo">
                <img
                  src={workingPic.src}
                  alt="The PSM team at work"
                  loading="lazy"
                  width={1536}
                  height={1024}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 07 — PEOPLE */}
      <section className="sec sec--warm relative overflow-hidden">
        <div className="particles" aria-hidden="true">
          {PARTICLES.map((p, i) => (
            <span
              key={i}
              className="particle"
              style={{
                left: `${p.left}%`,
                width: p.size,
                height: p.size,
                animationDuration: `${p.dur}s`,
                animationDelay: `${p.delay}s`,
                opacity: p.opacity,
                ["--p-drift" as string]: `${p.drift}px`,
              }}
            />
          ))}
        </div>
        <div className="container-x relative z-[1]">
          <SectionHeading
            eyebrow="People behind PSM"
            eyebrowTone="p"
            title="Built by people who like solving problems."
            lede="PSM is driven by a small, focused team with a shared interest in building useful technology and turning ideas into real products."
          />

          <Reveal className="mt-12">
            <div className="person-feature">
              <div className="person-photo person-photo--img">
                <img src={founders[0].photo} alt={`${founders[0].name}, founder of PSM`} width={812} height={904} />
                <span className="person-caption">Founder</span>
              </div>
              <div className="person-info">
                <span className="eyebrow eyebrow--ink">Founder</span>
                <h3 className="h3 mt-4" style={{ fontSize: "clamp(1.35rem, 2.4vw, 1.7rem)" }}>
                  <Link href="/about/founders/prasanna-venkatesan" className="link-line" style={{ color: "var(--color-navy)" }}>
                    Prasanna Venkatesan R.
                  </Link>
                </h3>
                <p className="dek lead mt-4">
                  Building PSM around product thinking, technology, problem-solving and long-term execution.
                </p>
                <Link href="/about/founders/prasanna-venkatesan" className="link-line font-bold mt-4" style={{ color: "var(--color-brand)", display: "inline-block" }}>
                  Read more <ArrowRight size={14} aria-hidden="true" style={{ display: "inline", verticalAlign: "middle" }} />
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="mt-8">
            <div className="person-person">
              <div className="person-photo person-photo--img">
                <img src={founders[1].photo} alt={`${founders[1].name}, co-founder of PSM`} width={912} height={1073} />
                <span className="person-caption">Co-founder</span>
              </div>
              <div className="person-info">
                <span className="eyebrow eyebrow--g">Co-founder</span>
                <h3 className="h3 mt-4" style={{ fontSize: "clamp(1.35rem, 2.4vw, 1.7rem)" }}>
                  <Link href="/about/founders/maniyarasan" className="link-line" style={{ color: "var(--color-navy)" }}>
                    Maniyarasan S.
                  </Link>
                </h3>
                <p className="dek lead mt-4">
                  Helping build PSM and turn ideas into practical products and solutions.
                </p>
                <Link href="/about/founders/maniyarasan" className="link-line font-bold mt-4" style={{ color: "var(--color-brand)", display: "inline-block" }}>
                  Read more <ArrowRight size={14} aria-hidden="true" style={{ display: "inline", verticalAlign: "middle" }} />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 08 — OUR JOURNEY */}
      <section className="sec sec--white">
        <div className="container-x">
          <SectionHeading
            eyebrow="Our journey"
            eyebrowTone="g"
            title="From ideas to building a company."
            lede="A straight, factual account — no fabricated milestones."
          />
          <ol className="tl mt-14">
            {timeline.map((item, i) => (
              <Reveal key={item.t} delay={i * 60} as="li" className="tl-item">
                <span className="tl-dot" />
                <span className="tl-num">0{i + 1}</span>
                <h3 className="tl-title">{item.t}</h3>
                <p className="tl-desc">{item.d}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 09 — CURRENT PRODUCTS */}
      <section className="sec sec--soft">
        <div className="container-x">
          <SectionHeading
            eyebrow="What we're building"
            eyebrowTone="p"
            title="We're already building."
            lede="PSM is currently developing products across communication, real estate, local commerce, healthcare, and entrepreneurship."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {allProducts.map((p, i) => {
              const meta = domainLabels[p.visual];
              return (
                <Reveal key={p.id} delay={i * 70} className="cur-card">
                  <Link href={`/products/${p.id}`} style={{ textDecoration: "none", display: "contents" }}>
                    <ProductArt product={p} />
                    <span className="cur-name">{p.name}</span>
                    <span className="cur-domain">{meta?.domain}</span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
          <div className="mt-10 flex justify-center">
            <Reveal delay={80}>
              <Button href="/products" variant="primary" size="lg" arrow>Explore Products</Button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 10 — VISION */}
      <section className="sec relative overflow-hidden bg-navy text-white noise" style={{ minHeight: "100vh" }}>
        <div className="vg-stage" aria-hidden="true">
          <span className="vg-ring" style={{ animationDelay: "-3.2s" }} />
          <span className="vg-ring" style={{ animationDelay: "-1.6s" }} />
          <span className="vg-ring" />
          <span className="vg-orbit" />
        </div>
        <div className="container-x relative z-[2] flex min-h-[calc(100vh-2rem)] flex-col items-center justify-center py-24 text-center">
          <Reveal>
            <span className="eyebrow eyebrow--light">The long-term vision</span>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="stmnt stmnt--xl mt-8">
              From local problems
              <br />
              <span className="grad-text">to global products.</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mx-auto mt-8 max-w-[600px] text-white/70" style={{ fontSize: "1.12rem", lineHeight: 1.7 }}>
              We want to build technology products that begin with real problems, prove their value in the real world,
              and eventually reach people and businesses at scale.
            </p>
          </Reveal>
          <div className="mt-12 flex items-center justify-center gap-6 md:gap-12">
            {["Build.", "Learn.", "Scale."].map((w, i) => (
              <Reveal key={w} delay={i * 140}>
                <span className="vis-word">{w}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 11 — FINAL STATEMENT */}
      <section className="sec sec--white text-center final-sec">
        <div className="container-x mx-auto max-w-[820px]">
          <Reveal>
            <span className="eyebrow">Problem Solving Mind</span>
          </Reveal>
          <Reveal delay={120}>
            <p className="stmnt mt-8">
              We don&rsquo;t want to build more technology.
            </p>
          </Reveal>
          <Reveal delay={320}>
            <p className="stmnt mt-4">
              We want to build <em className="grad-text">technology that matters.</em>
            </p>
          </Reveal>
          <Reveal delay={440}>
            <div className="mt-10 flex justify-center">
              <Button href="/products" variant="dark" size="lg" arrow>Explore What We&rsquo;re Building</Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 12 — FINAL CTA */}
      <CtaBand
        title="Have a Problem Worth Solving?"
        lede="Tell us what you're trying to solve. We'll explore what technology can do about it."
        ctaLabel="Let's Talk"
      />
    </div>
  );
}