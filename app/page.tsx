import { HomeHero } from "@/components/home-hero";
import { Marquee } from "@/components/marquee";
import { WhatWeDo } from "@/components/what-we-do";
import { HomeProblems } from "@/components/home-problems";
import { HomeCapabilities } from "@/components/home-capabilities";
import { HomeProductsStrip } from "@/components/home-products-strip";
import { HomeProcess, HomeWhy, HomeVision, HomeLookingAhead } from "@/components/home-sections";
import { StickyStatement } from "@/components/sticky-statement";
import { StatsBand } from "@/components/stats-band";
import { FaqSection } from "@/components/faq";
import { CtaBand } from "@/components/cta-band";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { organizationSchema, websiteSchema, faqSchema, webPageSchema } from "@/lib/structured";
import { faqs } from "@/lib/content";
import { JsonLd } from "@/components/jsonld";

export const metadata = pageMetadata({
  description: site.positioning,
  path: "/",
});

/**
 * Homepage composition, and the light/dark rhythm it follows.
 *
 * Every band below is a full-bleed section, so the page reads as a sequence of
 * rooms rather than a stack of boxes. Dark bands carry the argument and the
 * proof (`.sticky-st`, `.stats-band`, `.home` vision band); light bands carry
 * the inventory. Removing a dark band is what made the page read as flat — the
 * light sections are all near-white with hairline borders, and four of them in
 * a row is a wall.
 *
 *   light  hero            (image, the promise)
 *   light  marquee         (one-line capability ticker)
 *   light  what we do      (three pillars)
 *   light  problems        (the pain, before the answer)
 *   light  capabilities    (the five, as cards)
 *   light  products        (five names, linked through to /products)
 *   DARK   statement       (the manifesto)
 *   light  process         (the six steps)
 *   light  why             (the buyer's objections)
 *   DARK   numbers         (the receipt for the manifesto)
 *   DARK   vision          (vision + mission)
 *   light  looking ahead   (optional; removable)
 *   light  faq             (objections)
 *   DARK   cta             (close, flows into the navy footer)
 *
 * The product band is a shallow strip (name + tagline + status), not the full
 * five-card deck that used to sit here. `/products` is its home; the deck
 * repeated `/products` two sections after the hero had already linked to it.
 * See components/home-products-strip.tsx.
 *
 * Note `sec--soft` and `sec--white` and `sec--plum` alternate between the light
 * inventory bands. They are near-identical in value, so the alternation is what
 * keeps five consecutive light sections from reading as one long wall.
 */
const MARQUEE_ITEMS = [
  "Product engineering",
  "AI automation",
  "ERP & CRM integration",
  "Web applications",
  "Mobile apps",
  "Digital transformation",
];

export default function HomePage() {
  return (
    <div className="page-shell">
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [organizationSchema(), websiteSchema()] }} />
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd
        data={webPageSchema({
          path: "/",
          name: "PSM — Software Development Company in Pondicherry",
          description: site.positioning,
          mainEntity: { "@id": "https://www.problemsolvingmind.com/#organization" },
        })}
      />
      <HomeHero />
      <Marquee items={MARQUEE_ITEMS} />
      <WhatWeDo />
      <HomeProblems />
      <HomeCapabilities />
      <HomeProductsStrip />
      <StickyStatement />
      <HomeProcess />
      <HomeWhy />
      <CtaBand
        title="Which problem is costing you the most?"
        lede="Tell us. We'll honestly say whether technology can fix it."
        ctaLabel="Start a Conversation"
      />
    </div>
  );
}
