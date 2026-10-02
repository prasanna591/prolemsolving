import { ArrowUpRight, Box, CaseUpper, Cpu, Orbit, Rocket, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { SectionHeading } from "@/components/section-heading";
import { CaseStudyEditorial } from "@/components/case-study";
import { Reveal } from "@/components/reveal";
import { CtaBand } from "@/components/cta-band";
import { caseStudies, benchPatterns, resultsSummary } from "@/lib/caseStudies";
import { faqs } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { workSchema, breadcrumbSchema, faqSchema } from "@/lib/structured";
import { FaqSection } from "@/components/faq";
import { JsonLd } from "@/components/jsonld";
import workHeroBg from "@/app/images/founders_about.webp";

export const metadata = pageMetadata({
  title: "Our Work & Case Studies",
  description:
    "Selected work from PSM: case studies in business automation, AI document intelligence and ERP/CRM integration — the systems behind EYD, LECOM, Boowa and Aura.",
  path: "/work",
});

const benchIcon = {
  transform: Box,
  implement: CaseUpper,
  system: Cpu,
  ai: Sparkles,
  launch: Rocket,
  decision: Orbit,
};

const resTone = { brand: "badge--brand", accp: "badge--accp", accg: "badge--accg", navy: "badge--navy" } as const;

export default function WorkPage() {
  return (
    <div className="page-shell">
      <JsonLd data={workSchema(caseStudies)} />
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Work", path: "/work" }])} />
      <PageHeader
        eyebrow="Work"
        eyebrowTone="p"
        image={workHeroBg}
        title={<>Real builds. <em className="grad-text">Honest outcomes.</em></>}
        lede="We show work the way it really happens: the problem, the thinking, the technology, and what changed. No inflated numbers — and no client names without their say-so."
      />

      {/* case studies */}
      <section className="sec sec--soft">
        <div className="container-x">
          <SectionHeading
            eyebrow="Selected work"
            title="Case studies from the bench"
            lede="Three builds that explain how we think — each one the seed of a product we're developing."
          />
          <div className="mt-12 flex flex-col gap-10">
            {caseStudies.map((cs) => (
              <div key={cs.id} id={cs.id} className="scroll-mt-28">
                <CaseStudyEditorial study={cs} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* bench patterns */}
      <section className="sec sec--white">
        <div className="container-x">
          <SectionHeading
            eyebrow="More from the bench"
            eyebrowTone="g"
            title="Systems, transformations and builds"
            lede="The work behind the stories — the build categories that keep the bench turning."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {benchPatterns.map((p, i) => {
              const Icon = benchIcon[p.icon];
              return (
                <Reveal key={p.title} delay={(i % 3) * 70}>
                  <div className="card card--raised h-full">
                    <span className="card-icon card-icon--ink">
                      <Icon size={22} aria-hidden="true" />
                    </span>
                    <h3 className="h3 mb-2">{p.title}</h3>
                    <p className="dek" style={{ fontSize: "0.97rem" }}>{p.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* results */}
      <section className="sec sec--plum">
        <div className="container-x">
          <SectionHeading
            eyebrow="Results"
            eyebrowTone="g"
            title="Measurable where we're allowed to measure"
            lede="We report outcomes honestly — the business decides what's shareable. Where metrics are confidential, we describe the change plainly rather than inflate it."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {resultsSummary.map((r, i) => (
              <Reveal key={r.title} delay={(i % 2) * 70}>
                <div className="card card--raised h-full">
                  <span className={`badge ${resTone[r.tone]}`}>{r.badge}</span>
                  <h3 className="h3 mt-5 mb-2" style={{ fontSize: "1.25rem" }}>{r.title}</h3>
                  <p className="dek" style={{ fontSize: "0.96rem" }}>{r.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 mx-auto max-w-[640px] text-center">
            <p className="dek" style={{ fontSize: "0.98rem" }}>
              <ArrowUpRight size={14} aria-hidden="true" style={{ display: "inline", verticalAlign: "middle" }} />{" "}
              We&rsquo;d rather share one verifiable outcome than ten impressive-looking claims.
            </p>
          </Reveal>
        </div>
      </section>

      <FaqSection />

      <CtaBand title="Want outcomes like these in your business?" lede="Bring us a problem. We'll show you the build — and keep it honest about what technology can't do." />
    </div>
  );
}