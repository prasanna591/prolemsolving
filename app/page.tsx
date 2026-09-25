import { HomeHero } from "@/components/home-hero";
import { WhatWeDo } from "@/components/what-we-do";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { organizationSchema, websiteSchema } from "@/lib/structured";
import { JsonLd } from "@/components/jsonld";

export const metadata = pageMetadata({
  description: site.supportLine,
  path: "/",
  keywords: [
    "PSM",
    "Problem Solving Mind",
    "product-first software company",
    "custom software development",
    "AI powered business software",
    "software products India",
    "digital product company",
  ],
});

export default function HomePage() {
  return (
    <div className="page-shell">
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [organizationSchema(), websiteSchema()] }} />
      <HomeHero />
      <WhatWeDo />
    </div>
  );
}