import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/jsonld";
import { breadcrumbSchema, motivesSchema } from "@/lib/structured";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/button";
import { problems, values } from "@/lib/content";

export const metadata = pageMetadata({
  title: "Why PSM Exists",
  description:
    "Why PSM exists: technology should solve problems, not create complexity. The values behind our custom software and AI work in Pondicherry.",
  path: "/about/motives",
});

const principles = [
  { t: "Think Clearly", d: "Understand the real problem before rushing toward a solution." },
  { t: "Build Practically", d: "Choose technology based on what the product needs — not what's trending." },
  { t: "Stay Close to Reality", d: "Real users, real businesses and real feedback matter more than assumptions." },
  { t: "Take Ownership", d: "We care about the outcome, not just completing a task." },
];

const completes: { from: string; to: string }[] = [
  { from: "Complex", to: "Connected" },
  { from: "Disconnected", to: "Simple" },
  { from: "Manual", to: "Intelligent" },
  { from: "Slow", to: "Scalable" },
];

export default function MotivesPage() {
  return (
    <div className="page-shell">
      <JsonLd data={motivesSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
          { name: "Why PSM Exists", path: "/about/motives" },
        ])}
      />

      {/* 01 — statement */}
      <section className="sec sec--white">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <Reveal>
              <span className="eyebrow">Why PSM exists</span>
              <h1 className="h-hero mt-5">
                Technology should solve problems,<em className="grad-text"> not create more complexity.</em>
              </h1>
            </Reveal>
            <Reveal delay={120}>
              <p className="dek lead mt-7">
                Businesses and people deal with complicated processes every day — disconnected systems, repetitive work,
                fragmented information, inefficient workflows, and experiences that simply don&rsquo;t work as well as they could.
              </p>
              <p className="dek lead mt-4">
                PSM exists to change that. We understand problems deeply, then turn them into practical products and
                systems that make life and work simpler — measured by outcomes, not output.
              </p>
            </Reveal>
          </div>

          <Reveal delay={160}>
            <div className="card card--raised">
              {completes.map((c) => (
                <div key={c.from} className="trans-row" style={{ padding: "0.35rem 0" }}>
                  <span className="trans-chip trans-chip--in">{c.from}</span>
                  <span className="trans-arrow" aria-hidden="true">→</span>
                  <span className="trans-chip trans-chip--out">{c.to}</span>
                </div>
              ))}
              <div className="mt-5 pt-5" style={{ borderTop: "1px solid var(--color-linesoft)" }}>
                <p className="dek" style={{ fontSize: "0.96rem" }}>
                  <strong style={{ color: "var(--color-navy)" }}>What we are:</strong> a product company — measured by
                  products that ship, systems that keep working, and problems that stop being problems.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 02 — the problems that motivate us */}
      <section className="sec sec--warm">
        <div className="container-x">
          <Reveal>
            <span className="eyebrow eyebrow--g">The problems that motivate us</span>
            <h2 className="h2 mt-5">
              We don&rsquo;t look for work. <em className="grad-text">We look for pain worth removing.</em>
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {problems.map((p, i) => (
              <Reveal key={p.problem} delay={(i % 2) * 70}>
                <div className="problem-card">
                  <div className="pb-side pb-in">
                    <span className="pb-tag">The problem</span>
                    <h3>{p.problem}</h3>
                    <p>{p.desc}</p>
                  </div>
                  <div className="pb-side pb-out">
                    <span className="pb-tag">The outcome</span>
                    <h3 style={{ color: "var(--color-brand)" }}>{p.outcome}</h3>
                    <p>Built as a proper system — not a patch, not a promise.</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 03 — values */}
      <section className="sec sec--soft">
        <div className="container-x">
          <Reveal>
            <span className="eyebrow eyebrow--g">Values that hold us together</span>
            <h2 className="h2 mt-5">
              Four habits, <em className="grad-text">one gauge:</em> did the problem get solved?
            </h2>
          </Reveal>
          <Reveal className="mt-12">
            <ol className="habits">
              {values.map((v, i) => (
                <li key={v.title} className="habit">
                  <span className="habit-ix" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="h3">{v.title}</h3>
                    <p className="dek mt-2" style={{ fontSize: "0.98rem" }}>{v.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* 04 — principles */}
      <section className="sec sec--white">
        <div className="container-x">
          <Reveal>
            <span className="eyebrow eyebrow--p">Principles in practice</span>
            <h2 className="h2 mt-5">How we go about it</h2>
          </Reveal>
          <div className="mt-12 grid gap-x-8 gap-y-10 md:grid-cols-2">
            {principles.map((p, i) => (
              <Reveal key={p.t} delay={i * 70} className="prin" as="article">
                <span className="prin-num">0{i + 1}</span>
                <h3 className="prin-title">{p.t}</h3>
                <p className="prin-desc">{p.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 05 — philosophy */}
      <section className="sec sec--soft">
        <div className="container-x text-center">
          <Reveal>
            <span className="eyebrow eyebrow--g">The philosophy</span>
            <p className="stmnt mx-auto mt-6" style={{ maxWidth: "48rem" }}>
              We don&rsquo;t want to build more technology.
              <br />
              We want to build <em className="grad-text">technology that matters.</em>
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Button href="/about" variant="dark" arrow>More about PSM</Button>
              <Button href="/products" variant="primary" arrow>See the products</Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 06 — CTA */}
      <CtaBand
        title="Have a Problem Worth Solving?"
        lede="Tell us what you're trying to solve. We'll explore what technology can do about it."
        ctaLabel="Let's Talk"
      />
    </div>
  );
}