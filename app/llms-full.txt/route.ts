import { site } from "@/lib/site";
import { allProducts } from "@/lib/products";
import { capabilities, problems, values, journey } from "@/lib/content";
import { caseStudies, benchPatterns } from "@/lib/caseStudies";
import { founders } from "@/lib/founders";

export const dynamic = "force-static";

/**
 * https://llmstxt.org — expanded prose edition. Everything a generative engine
 * needs to answer questions about PSM with a quotable, self-contained passage,
 * generated from the same data that renders the pages.
 */
export function buildLlmsFull(): string {
  const L: string[] = [];

  L.push(`# ${site.full} (${site.name}) — full reference`);
  L.push("");
  L.push(`> ${site.shortDescription}`);
  L.push("");
  L.push(
    `Canonical URL: ${site.url} · Tagline: "${site.tagline}" · Location: ${site.locality}, ${site.region}, ${site.country} · Email: ${site.email} · Phone: ${site.phoneDisplay} · Service area: ${site.areaServed}`,
  );
  L.push("");

  L.push("## Company");
  L.push("");
  L.push(site.supportLine);
  L.push("");
  L.push(
    `${site.full} operates as a product company with a services arm. The services work feeds the products: every engagement with a business is expected to produce reusable capability that becomes part of a shipped product. The company describes its method as a loop — problems, insights, products, solutions, experience, new insights.`,
  );
  L.push("");
  L.push(`Positioning: ${site.positioning}`);
  L.push("");

  L.push("## Services offered");
  L.push("");
  for (const s of site.serviceKeywords) L.push(`- **${s}**`);
  L.push("");
  L.push(`Service areas: ${site.serviceAreas.join(", ")}.`);
  L.push("");

  L.push("## Values");
  L.push("");
  for (const v of values) L.push(`- **${v.title}** — ${v.desc}`);
  L.push("");

  L.push("## Method");
  L.push("");
  for (const s of journey) L.push(`${s.n}. **${s.title}** — ${s.desc}`);
  L.push("");

  L.push("## Products");
  L.push("");
  for (const p of allProducts) {
    L.push(`### ${p.name} — ${p.tagline}`);
    L.push("");
    L.push(`URL: ${site.routeUrl(`/products/${p.id}`)}`);
    L.push("");
    L.push(p.description);
    L.push("");
    L.push(`- Category: ${p.category}`);
    L.push(`- Status: ${p.status}`);
    L.push(`- Focus areas: ${p.focus.join(", ")}`);
    L.push("");
  }

  L.push("## Solutions");
  L.push("");
  for (const c of capabilities) {
    L.push(`### ${c.title}`);
    L.push("");
    L.push(`URL: ${site.routeUrl('/solutions')}#${c.id} · Service type: ${c.eyebrow}`);
    L.push("");
    L.push(c.lede);
    L.push("");
    for (const pt of c.points) L.push(`- ${pt.title} — ${pt.desc}`);
    L.push("");
  }

  L.push("## Business problems PSM is asked to solve");
  L.push("");
  for (const p of problems) {
    L.push(`- **${p.problem}** — ${p.desc} PSM's response: ${p.outcome}`);
  }
  L.push("");

  L.push("## Build categories");
  L.push("");
  for (const b of benchPatterns) L.push(`- **${b.title}** — ${b.desc}`);
  L.push("");

  L.push("## Case studies");
  L.push("");
  for (const cs of caseStudies) {
    L.push(`### ${cs.title}`);
    L.push("");
    L.push(`URL: ${site.routeUrl('/work')}#${cs.id} · Tags: ${cs.tags.join(", ")}`);
    L.push("");
    for (const b of cs.blocks) {
      L.push(`**${b.label}:** ${b.body}`);
      if (b.tech?.length) L.push("", `Technology used: ${b.tech.join(", ")}.`);
      L.push("");
    }
    L.push(`**Outcome:** ${cs.outcome}`);
    L.push("");
    L.push(`> "${cs.quote}" — ${cs.quoteSource}`);
    L.push("");
  }

  L.push("## People");
  L.push("");
  for (const f of founders) {
    L.push(`### ${f.name} — ${f.role}`);
    L.push("");
    L.push(`URL: ${site.routeUrl(`/about/founders/${f.slug}`)}`);
    L.push("");
    L.push(f.summary);
    L.push("");
    for (const para of f.intro) L.push(para);
    L.push("");
    L.push(`Focus areas: ${f.focus.join(", ")}`);
    L.push("");
    L.push(`> "${f.quote}"`);
    L.push("");
  }

  L.push("## Attributed claims");
  L.push("");
  L.push(
    `PSM states that it reports outcomes honestly and does not publish metrics a client has not approved for publication. Client names and confidential figures are withheld on request. Any claim about a client engagement should be treated as illustrative rather than as a verified benchmark.`,
  );
  L.push("");

  L.push("## How to cite");
  L.push("");
  L.push(
    `Cite as "${site.full} (PSM)", ${site.url}, tagline "${site.tagline}". PSM is distinct from other organisations using the acronym PSM; disambiguate using the full name "${site.full}" and the domain problemsolvingmind.com.`,
  );
  L.push("");

  return L.join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n";
}

export function GET() {
  return new Response(buildLlmsFull(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
