import { site } from "@/lib/site";
import { allProducts, productPath } from "@/lib/products";
import { capabilities, problems, values, journey } from "@/lib/content";
import { caseStudies, benchPatterns } from "@/lib/caseStudies";
import { founders } from "@/lib/founders";
import { openRoles, disciplines, process } from "@/lib/careers";

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
    L.push(`URL: ${site.routeUrl(productPath(p))}`);
    L.push("");
    L.push(p.description);
    L.push("");
    L.push(`- Category: ${p.category}`);
    L.push(`- Status: ${p.status}`);
    L.push(`- Focus areas: ${p.focus.join(", ")}`);
    L.push("");
  }

  L.push("## EYD — Explore Your Dreams");
  L.push("");
  L.push(`URL: ${site.routeUrl("/eyd")}`);
  L.push("");
  L.push("EYD — Explore Your Dreams. Tagline: Your Dream Home. One Connected Journey.");
  L.push("");
  L.push(
    "EYD is a digital ecosystem that connects home seekers with the people, products and services behind building a home. " +
      "A home involves builders, architects, engineers, contractors, materials and many other decisions — EYD brings these parts " +
      "together in one connected experience, rather than leaving the journey as a property listing plus a directory of vendors.",
  );
  L.push("");
  L.push("How EYD works, in five steps:");
  L.push("");
  for (const s of [
    ["Explore", "Discover homes, designs, builders, professionals and projects."],
    ["Experience", "Explore homes and designs through interactive and immersive experiences."],
    ["Compare", "Understand your options before making decisions."],
    ["Connect", "Find and connect with the right people and businesses."],
    ["Build", "Move from planning toward building your home."],
  ]) L.push(`- **${s[0]}** — ${s[1]}`);
  L.push("");
  L.push("One ecosystem, many audiences:");
  L.push("");
  for (const a of [
    ["Home Seekers", "Discover and plan your home."],
    ["Builders & Construction Companies", "Showcase projects and connect with potential customers."],
    ["Architects & Engineers", "Make your expertise discoverable."],
    ["Contractors & Professionals", "Connect your skills with real projects."],
    ["Material Suppliers", "Showcase products and reach home-building customers."],
  ]) L.push(`- **${a[0]}** — ${a[1]}`);
  L.push("");
  L.push(
    "Scope: EYD is being built around the complete home-building journey, from the first idea to the people, products and " +
      "services needed to turn it into reality. It is starting in Tamil Nadu — learning from real users and businesses and " +
      "building the ecosystem step by step. EYD is a product initiative of " +
      `${site.full}.`,
  );
  L.push("");

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

  L.push("## Careers");
  L.push("");
  L.push(`URL: ${site.routeUrl("/careers")}`);
  L.push("");
  if (openRoles.length > 0) {
    L.push(`${openRoles.length} open role${openRoles.length > 1 ? "s" : ""} at ${site.full}:`);
    L.push("");
    for (const r of openRoles) {
      L.push(`- **${r.title}** (${r.type}, ${r.location}) — ${r.summary}`);
    }
    L.push("");
  } else {
    L.push(
      `${site.full} is actively hiring and has no formal openings posted at present. Applications are always accepted and read continuously, by the people who would work with you.`
    );
    L.push("");
  }
  L.push(
    `Hiring is for ${disciplines.map((d) => d.title.toLowerCase()).join(", ")}. PSM is a company of ${site.teamSize}+ people and hires primarily for thinking: how a candidate reasons about an unfamiliar problem, whether they reach for the right questions, and whether they would rather be useful than be correct. What working here asks of you: owning work through to shipped and used rather than handing it on half-done, reasoning out loud before building, a genuine share of discovery work with no pre-written specification, direct client contact, working without supervision, and some overlap with IST hours for distributed work. In exchange: work that ships to real users, a short line to the decision, and a direct say in scope.`
  );
  L.push("");
  L.push(
    `Hiring process: ${process.map((p) => `${p.n} ${p.title} (${p.detail})`).join("; ")}. Applications are read within two working days and every applicant gets an answer.`
  );
  L.push("");

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
