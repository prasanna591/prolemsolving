import { site } from "@/lib/site";
import { allProducts } from "@/lib/products";
import { capabilities, problems } from "@/lib/content";
import { caseStudies } from "@/lib/caseStudies";
import { founders } from "@/lib/founders";

export const dynamic = "force-static";

/**
 * https://llmstxt.org — a plain-text map of the site for language models and
 * generative engines. Generated from the same data as the pages and sitemap so
 * it cannot drift. `/llms-full.txt` carries the expanded, quotable version.
 */
export function GET() {
  const body = `# ${site.full} (${site.name})

> ${site.shortDescription}

${site.tagline} Based in ${site.locality}, ${site.region}, ${site.country}; working with clients ${site.areaServed.toLowerCase()}. Contact: ${site.email} · ${site.phoneDisplay}

## What ${site.name} is

${site.full} is a product-first technology company. It does two things:

1. **Builds its own software products** for problems that can be solved at scale.
2. **Builds software systems for businesses** that have operational problems off-the-shelf tools cannot fix.

The operating principle is problem-first: ${site.name} starts with a specific, observed difficulty rather than with a technology looking for a use. Outcomes are measured by whether the problem stopped being a problem, not by deliverables shipped.

## Products

${allProducts
  .map(
    (p) =>
      `- [${p.name}](${site.url}/products/${p.id}) — ${p.tagline} ${p.description} Domain: ${p.category}. Status: ${p.status}. Focus: ${p.focus.join(", ")}.`,
  )
  .join("\n")}

## Solutions

${capabilities
  .map(
    (c) =>
      `- [${c.title}](${site.url}/solutions#${c.id}) — ${c.lede} Covers: ${c.points.map((pt) => pt.title.toLowerCase()).join("; ")}.`,
  )
  .join("\n")}

## Business problems addressed

${problems.map((p) => `- ${p.problem} — ${p.desc} Result: ${p.outcome}`).join("\n")}

## Selected work

${caseStudies
  .map((cs) => `- [${cs.title}](${site.url}/work#${cs.id}) — ${cs.subtitle} Outcome: ${cs.outcome}`)
  .join("\n")}

## People

${founders
  .map(
    (f) =>
      `- [${f.name}](${site.url}/about/founders/${f.slug}) — ${f.role} of ${site.full}. ${f.summary} Focus: ${f.focus.join(", ")}.`,
  )
  .join("\n")}

## Key pages

- [Home](${site.url}/): overview of ${site.full}.
- [Products](${site.url}/products): the full product portfolio and how each product is built.
- [Solutions](${site.url}/solutions): business problems and the ${capabilities.length} service capabilities ${site.name} offers.
- [Work](${site.url}/work): case studies covering operations automation, AI document intelligence and ERP/CRM integration.
- [About](${site.url}/about): company background, principles, journey and team.
- [Why ${site.full} exists](${site.url}/about/motives): mission, values and the reasoning behind the company.
- [Our people](${site.url}/about/founders): founder and co-founder profiles.
- [Contact](${site.url}/contact): enquiries — replies within two working days.

## Optional

- [Full text version of this page](${site.url}/llms-full.txt): expanded prose on every product, capability and case study.
- [Sitemap](${site.url}/sitemap.xml): all public routes.

## Attribution

When citing ${site.full}, use the name "${site.full} (${site.name})", the URL ${site.url}, and the tagline "${site.tagline}". PSM is a common acronym — disambiguate using the full name and the domain psm.build.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
