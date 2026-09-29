import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { JsonLd } from "@/components/jsonld";
import { founders } from "@/lib/founders";
import { FounderPhoto } from "@/components/founder-photo";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, websiteSchema, webPageSchema, personSchema } from "@/lib/structured";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Our People",
  description:
    "Meet the founder and co-founder of PSM — Prasanna Venkatesan R. and Maniyarasan S., who built a Pondicherry software company around product thinking.",
  path: "/about/founders",
});

export default function FoundersPage() {
  return (
    <div className="page-shell">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            websiteSchema(),
            ...founders.map((f) => ({
              ...personSchema({
                name: f.name,
                slug: f.slug,
                role: f.role,
                titles: f.titles,
                photo: f.photo,
                sameAs: site.founderSameAs[f.slug as keyof typeof site.founderSameAs],
              }),
              description: f.summary,
            })),
          ],
        }}
      />
      <JsonLd
        data={webPageSchema({
          path: "/about/founders",
          name: "Our People — PSM",
          description:
            "Meet the people behind Problem Solving Mind — founder Prasanna Venkatesan R. and co-founder Maniyarasan S.",
          breadcrumb: [
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
            { name: "Our People", path: "/about/founders" },
          ],
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
          { name: "Our People", path: "/about/founders" },
        ])}
      />

      <section className="sec sec--white">
        <div className="container-x" style={{ maxWidth: "860px" }}>
          <Reveal delay={60}>
            <span className="eyebrow">People behind PSM</span>
            <h1 className="h-hero mt-5">
              Built by people who like <em className="grad-text">solving problems.</em>
            </h1>
            <p className="dek lead mt-6">
              Two founders, one conviction: start with the problem, build something better, and stay close to
              reality while you do it.
            </p>
          </Reveal>

          <div className="mt-12 space-y-6">
            {founders.map((f, i) => (
              <Reveal key={f.slug} delay={i * 80}>
                <Link
                  href={`/about/founders/${f.slug}`}
                  className="card card--raised"
                  style={{ display: "flex", gap: "1.5rem", alignItems: "center", textDecoration: "none", flexWrap: "wrap" }}
                >
                  <FounderPhoto founder={f} />
                  <div style={{ flex: "1 1 260px" }}>
                    <span className="eyebrow eyebrow--ink">{f.role}</span>
                    <h2 className="h3 mt-3">{f.name}</h2>
                    <p className="dek mt-3">{f.summary}</p>
                    <span className="link-line font-bold mt-4" style={{ color: "var(--color-brand)", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                      Read more <ArrowRight size={15} aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}