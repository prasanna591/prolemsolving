import { ArrowUpRight } from "lucide-react";
import { HeroScene } from "@/components/hero-scene";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Magnetic } from "@/components/magnetic";
import { Button } from "@/components/button";
import { CtaBand } from "@/components/cta-band";
import { FaqSection } from "@/components/faq";
import { CapVisual } from "@/components/cap-visual";
import { problems, capabilities, faqs } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { servicesSchema, breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/structured";
import { JsonLd } from "@/components/jsonld";
import solutionHeroBg from "@/app/images/solution_hero.webp";

export const metadata = pageMetadata({
  title: "AI Automation, Custom Software & ERP/CRM Integration",
  description:
    "PSM builds custom software, AI automation and workflow systems for businesses — ERP and CRM integration, web and mobile apps, dashboards. Pondicherry.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <div className="page-shell">
      <JsonLd data={servicesSchema(capabilities)} />
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Solutions", path: "/solutions" }])} />
      <JsonLd
        data={webPageSchema({
          path: "/solutions",
          name: "Business software, AI automation and integration — PSM",
          description:
            "PSM builds custom business software, AI and workflow automation, ERP/CRM integration, web and mobile applications, and digital transformation for companies with manual operations.",
          breadcrumb: [{ name: "Home", path: "/" }, { name: "Solutions", path: "/solutions" }],
        })}
      />

      {/* ============ HERO — background visual right, text left ============ */}
      <HeroScene
        eyebrow="Solutions"
        image={solutionHeroBg}
        title={
          <>
            We solve business problems with technology — <em className="hh-grad">not the other way around.</em>
          </>
        }
        lede="Tell us the problem. We'll design the software, the automation, the integrations — whatever the situation genuinely calls for. Here's how we frame it."
      >
        <div className="hero-scene__cta">
          <Button href="/contact" variant="primary" size="lg" arrow>
            Tell us the problem
          </Button>
          <Button href="/solutions#capabilities" variant="ghost" size="lg" arrow>
            See how we solve
          </Button>
        </div>
      </HeroScene>

      {/* business problems */}
      <section className="sec sec--soft">
        <div className="container-x">
          <SectionHeading
            eyebrow="Business problems we solve"
            title="The pain we keep walking into"
            lede="Every solution starts as an actual problem. If your business has one of these, there's a strong chance we can help."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {problems.map((p, i) => (
              <Reveal key={p.problem} delay={(i % 3) * 70}>
                <div className="card card--raised h-full flex flex-col">
                  <h3 className="h3 mb-2">{p.problem}</h3>
                  <p className="dek flex-1" style={{ fontSize: "0.96rem" }}>{p.desc}</p>
                  <span className="badge badge--accg mt-5" style={{ alignSelf: "flex-start", whiteSpace: "normal", textAlign: "left" }}>
                    <ArrowUpRight size={14} aria-hidden="true" /> {p.outcome}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* capabilities — editorial rows */}
      <section className="sec sec--white" id="capabilities" style={{ scrollMarginTop: "4rem" }}>
        <div className="container-x">
          {capabilities.map((cap, idx) => (
            <div key={cap.id} className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${idx ? "mt-20 lg:mt-28" : ""}`}>
              <Reveal className={idx % 2 ? "lg:order-2" : ""}>
                <SectionHeading
                  eyebrow={cap.eyebrow}
                  eyebrowTone={cap.eyebrowTone}
                  title={cap.title}
                  lede={cap.lede}
                />
                <ul className="mt-8 flex flex-col gap-4">
                  {cap.points.map((pt) => (
                    <li key={pt.title} className="flex items-start gap-3">
                      <span className="card-icon" style={{ width: "1.6rem", height: "1.6rem", borderRadius: "0.5rem", marginBottom: 0, flex: "none" }}>
                        <ArrowUpRight size={14} aria-hidden="true" />
                      </span>
                      <p style={{ fontSize: "0.99rem" }}>
                        <strong>{pt.title}.</strong>{" "}
                        <span className="dek">{pt.desc}</span>
                      </p>
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={100} className={idx % 2 ? "lg:order-1" : ""}>
                <div className="wsd-media">
                  <CapVisual visual={cap.visual} />
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      {/* end-to-end integration */}
      <section className="sec relative overflow-hidden bg-navy text-white noise">
        <div className="container-x relative z-[2] grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <span className="eyebrow eyebrow--light">End-to-end integration</span>
            <p className="stmnt mt-6">
              We don&rsquo;t hand over isolated pieces. <span className="text-[#9cc0ff]">We connect the whole system.</span>
            </p>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-white/70" style={{ fontSize: "1.1rem" }}>
              Software, AI, integrations, apps — whatever the problem needs gets engineered as one coherent system, not a pile of
              deliverables. One team, one handover, one result.
            </p>
            <div className="mt-10">
              <Magnetic strength={5}>
                <Button href="/contact" variant="light" size="lg" arrow>Let&rsquo;s talk about your problem</Button>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </section>

      <FaqSection />

      <CtaBand
        title="Which problem is costing you the most?"
        lede="Name it. We'll tell you honestly whether technology can fix it — and how."
      />
    </div>
  );
}