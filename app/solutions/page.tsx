import { ArrowUpRight } from "lucide-react";
import { HeroScene } from "@/components/hero-scene";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/button";
import { CtaBand } from "@/components/cta-band";
import { FaqSection } from "@/components/faq";
import { CapImage } from "@/components/cap-image";
import { capabilities } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { servicesSchema, breadcrumbSchema, webPageSchema } from "@/lib/structured";
import { JsonLd } from "@/components/jsonld";
import solutionHeroBg from "@/app/images/optimized/solution_hero.webp";

export const metadata = pageMetadata({
  title: "AI Automation, Custom Software & ERP/CRM Integration",
  description:
    "PSM builds custom software, AI automation and workflow systems for businesses — ERP and CRM integration, web and mobile apps, dashboards. Pondicherry.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <div className="page-shell solutions-page">
      <JsonLd data={servicesSchema(capabilities)} />
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

      {/* capabilities — editorial rows */}
      <section className="sec sec--white" id="capabilities" style={{ scrollMarginTop: "4rem" }}>
        <div className="container-x">
          {capabilities.map((cap, idx) => (
            /* `id` + `scrollMarginTop` are load-bearing: the footer, /about and
               llms.txt all deep-link to `#${cap.id}`, and without them every one
               of those links landed at the top of the page with no indication
               of failure. */
            <div
              key={cap.id}
              id={cap.id}
              style={{ scrollMarginTop: "var(--nav-h-scrolled)" }}
              className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${idx ? "mt-20 lg:mt-28" : ""}`}
            >
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
                <CapImage visual={cap.visual} label={cap.eyebrow} />
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      <FaqSection page="solutions" />

      <CtaBand
        title="Which problem is costing you the most?"
        lede="Name it. We'll tell you honestly whether technology can fix it — and how."
      />
    </div>
  );
}