import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { JsonLd } from "@/components/jsonld";
import { founders } from "@/lib/founders";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, websiteSchema } from "@/lib/structured";

export const metadata = pageMetadata({
  title: "Our People",
  description:
    "Meet the people behind PSM — founder Prasanna Venkatesan R. and co-founder Maniyarasan S., who built the company around product thinking and practical problem-solving.",
  path: "/about/founders",
  keywords: [
    "PSM people",
    "Prasanna Venkatesan",
    "Maniyarasan",
    "PSM founders",
    "team behind PSM",
  ],
});

export default function FoundersPage() {
  return (
    <div className="page-shell">
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [websiteSchema()] }} />
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
                  <div className={`person-photo ${f.photo ? "person-photo--img" : ""}`} style={{ margin: 0 }}>
                    {f.photo ? (
                      <img src={f.photo} alt={`${f.name}, ${f.role.toLowerCase()} of PSM`} width={812} height={904} />
                    ) : (
                      <span className="person-mono">{f.initials}</span>
                    )}
                    <span className="person-caption">{f.role}</span>
                  </div>
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