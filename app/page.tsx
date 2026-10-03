import { HomeHero } from "@/components/home-hero";
import { Marquee } from "@/components/marquee";
import { capabilities } from "@/lib/content";
import { WhatWeDo } from "@/components/what-we-do";
import { HomeProblems } from "@/components/home-problems";
import { HomeCapabilities } from "@/components/home-capabilities";
import { HomeProductsStrip } from "@/components/home-products-strip";
import { HomeProcess, HomeWhy, HomeVision, HomeLookingAhead } from "@/components/home-sections";
import { StatsBand } from "@/components/stats-band";
import { FaqSection } from "@/components/faq";
import { CtaBand } from "@/components/cta-band";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { webPageSchema } from "@/lib/structured";
import { JsonLd } from "@/components/jsonld";

// Bound to the real capability list so the strip cannot advertise something the
// solutions page doesn't already carry.
const marqueeItems = capabilities.map((c) => c.eyebrow);

export const metadata = pageMetadata({
  description: site.positioning,
  path: "/",
});

/**
 * Homepage composition, and the light/dark rhythm it follows.
 *
 * Every band below is a full-bleed section, so the page reads as a sequence of
 * rooms rather than a stack of boxes. Dark bands carry the argument and the
 * proof (`.stats-band`, `.home` vision band); light bands carry
 * the inventory.
 *
 *   light  hero            (image, the promise)
 *   light  what we do      (three pillars)
 *   light  problems        (the pain, before the answer)
 *   light  capabilities    (the five, as cards)
 *   light  products        (five names, linked through to /products)
 *   DARK   numbers         (the receipt for the manifesto)
 *   DARK   vision          (vision + mission)
 *   light  looking ahead   (optional; removable)
 *   light  faq             (objections)
 *   DARK   cta             (close, flows into the navy footer)
 */

export default function HomePage() {
  return (
    <div className="page-shell">
      <JsonLd
        data={webPageSchema({
          path: "/",
          name: "PSM — Software Development Company in Pondicherry",
          description: site.positioning,
          mainEntity: { "@id": "https://www.problemsolvingmind.com/#organization" },
        })}
      />
      <HomeHero />
      <Marquee items={marqueeItems} />
      <WhatWeDo />
      <HomeProblems />
      <HomeCapabilities />
      <HomeProductsStrip />
      <HomeProcess />
      <HomeWhy />
      <FaqSection page="home" />
      <CtaBand
        title="Which problem is costing you the most?"
        ctaLabel="Start a Conversation"
      />
    </div>
  );
}
