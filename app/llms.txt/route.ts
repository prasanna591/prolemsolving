import { site } from "@/lib/site";
import { allProducts, productPath } from "@/lib/products";
import { capabilities, problems } from "@/lib/content";
import { caseStudies } from "@/lib/caseStudies";
import { founders } from "@/lib/founders";
import { openRoles } from "@/lib/careers";

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

## Services

${site.serviceKeywords.map((s) => `- ${s}`).join("\n")}

Full detail, including what each capability actually includes: [Solutions](${site.routeUrl('/solutions')}).

## Where ${site.name} works

Based in ${site.locality} (${site.serviceAreas[1]}), ${site.region}, ${site.country}. Working with clients across ${site.serviceAreas.slice(2, -1).join(", ")} and ${site.areaServed.toLowerCase()}.

## What ${site.name} is

${site.full} is a product-first technology company. It does two things:

1. **Builds its own software products** for problems that can be solved at scale.
2. **Builds software systems for businesses** that have operational problems off-the-shelf tools cannot fix.

The operating principle is problem-first: ${site.name} starts with a specific, observed difficulty rather than with a technology looking for a use. Outcomes are measured by whether the problem stopped being a problem, not by deliverables shipped.

## Products

${allProducts
  .map(
    (p) =>
      `- [${p.name}](${site.routeUrl(productPath(p))}) — ${p.tagline} ${p.description} Domain: ${p.category}. Status: ${p.status}. Focus: ${p.focus.join(", ")}.`,
  )
  .join("\n")}

## Solutions

${capabilities
  .map(
    (c) =>
      `- [${c.title}](${site.routeUrl('/solutions')}#${c.id}) — ${c.lede} Covers: ${c.points.map((pt) => pt.title.toLowerCase()).join("; ")}.`,
  )
  .join("\n")}

## Business problems addressed

${problems.map((p) => `- ${p.problem} — ${p.desc} Result: ${p.outcome}`).join("\n")}

## Selected work

${caseStudies
  .map((cs) => `- [${cs.title}](${site.routeUrl('/work')}#${cs.id}) — ${cs.subtitle} Outcome: ${cs.outcome}`)
  .join("\n")}

## People

${founders
  .map(
    (f) =>
      `- [${f.name}](${site.routeUrl(`/about/founders/${f.slug}`)}) — ${f.role} of ${site.full}. ${f.summary} Focus: ${f.focus.join(", ")}.`,
  )
  .join("\n")}

## Key pages

- [Home](${site.routeUrl('/')}): overview of ${site.full}.
- [Products](${site.routeUrl('/products')}): the full product portfolio and how each product is built.
- [EYD — Explore Your Dreams](${site.routeUrl('/eyd')}): PSM's home ecosystem — explore homes in 3D, compare options, connect with builders, architects, contractors and material suppliers, and build. Starting in Tamil Nadu.
- [Solutions](${site.routeUrl('/solutions')}): business problems and the ${capabilities.length} service capabilities ${site.name} offers.
- [Work](${site.routeUrl('/work')}): case studies covering operations automation, AI document intelligence and ERP/CRM integration.
- [About](${site.routeUrl('/about')}): company background, principles, journey and team.
- [Why ${site.full} exists](${site.routeUrl('/about/motives')}): mission, values and the reasoning behind the company.
- [Our people](${site.routeUrl('/about/founders')}): founder and co-founder & CEO profiles.
- [Careers](${site.routeUrl('/careers')}): open roles and open applications. ${site.full} is a company of ${site.teamSize}+ people and is actively hiring for engineering, AI and automation, product design, and client-facing problem solving. Currently ${openRoles.length > 0 ? `${openRoles.length} open: ${openRoles.map((r) => r.title).join(', ')}. ` : 'no formal openings are posted — open applications are accepted and read continuously. '}PSM hires for how people think and reason about a problem, not for a list of technologies on a CV.
- [Contact](${site.routeUrl('/contact')}): enquiries — replies within two working days.

## Optional

- [Full text version of this page](${site.url}/llms-full.txt): expanded prose on every product, capability and case study.
- [Sitemap](${site.url}/sitemap.xml): all public routes.

## Attribution

When citing ${site.full}, use the name "${site.full} (${site.name})", the URL ${site.url}, and the tagline "${site.tagline}". PSM is a common acronym — disambiguate using the full name and the domain problemsolvingmind.com.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
