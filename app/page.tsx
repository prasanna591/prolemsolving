import { HomeHero } from "@/components/home-hero";
import { WhatWeDo } from "@/components/what-we-do";
import { FaqSection } from "@/components/faq";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { organizationSchema, websiteSchema, faqSchema, webPageSchema } from "@/lib/structured";
import { faqs } from "@/lib/content";
import { JsonLd } from "@/components/jsonld";

export const metadata = pageMetadata({
  description: site.positioning,
  path: "/",
});

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
      <WhatWeDo />
      <FaqSection />
    </div>
  );
}