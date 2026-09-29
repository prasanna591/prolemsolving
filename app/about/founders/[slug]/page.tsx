import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Quote } from "lucide-react";
import { founders } from "@/lib/founders";
import { site } from "@/lib/site";
import { FounderPhoto } from "@/components/founder-photo";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/button";
import { JsonLd } from "@/components/jsonld";
import { founderSchema, breadcrumbSchema } from "@/lib/structured";
import { pageMetadata } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

/** Only the slugs returned by generateStaticParams are built; unknown
 *  slugs 404 instead of rendering on demand, which keeps the crawlable URL
 *  surface finite. */
export const dynamicParams = false;

export function generateStaticParams() {
  return founders.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const founder = founders.find((f) => f.slug === slug);
  if (!founder) return {};
  return pageMetadata({
    title: founder.name,
    description: `${founder.name}, ${founder.role.toLowerCase()} of PSM — ${founder.summary}`,
    path: `/about/founders/${founder.slug}`,
    ogType: "profile",
  });
}

export default async function FounderPage({ params }: Props) {
  const { slug } = await params;
  const founder = founders.find((f) => f.slug === slug);
  if (!founder) notFound();

  const others = founders.filter((f) => f.slug !== founder.slug);

  return (
    <div className="page-shell">
      <JsonLd
        data={founderSchema({
          name: founder.name,
          slug: founder.slug,
          role: founder.role,
          summary: founder.summary,
          photo: founder.photo,
          sameAs: site.founderSameAs[founder.slug as keyof typeof site.founderSameAs],
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
          { name: "Our People", path: "/about/founders" },
          { name: founder.name, path: `/about/founders/${founder.slug}` },
        ])}
      />

      <section className="sec sec--white">
        <div className="container-x">
          <Reveal delay={40}>
            <Link href="/about/founders" className="link-line font-bold" style={{ color: "var(--color-brand)" }}>
              <ArrowLeft size={14} aria-hidden="true" style={{ display: "inline", verticalAlign: "middle", marginRight: "0.3rem" }} />
              Our people
            </Link>
          </Reveal>

          <div className="mt-10 grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <Reveal delay={80}>
              <FounderPhoto founder={founder} width="min(100%, 320px)" />
            </Reveal>

            <div>
              <Reveal delay={100}>
                <span className="eyebrow eyebrow--p">{founder.role}</span>
                <h1 className="display mt-4">{founder.name}</h1>
                <p className="dek lead mt-5" style={{ fontSize: "1.16rem", color: "var(--color-navy)" }}>{founder.summary}</p>
              </Reveal>

              {founder.intro.map((para, i) => (
                <Reveal key={i} delay={140 + i * 70}>
                  <p className="dek lead mt-5">{para}</p>
                </Reveal>
              ))}

              <Reveal delay={380}>
                <div className="mt-8">
                  <span className="h3" style={{ display: "block" }}>Focus areas</span>
                  <div className="pfolio-focus mt-4">
                    {founder.focus.map((f) => (
                      <span key={f}>{f}</span>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={440}>
                <blockquote
                  style={{ marginTop: "2.5rem", borderLeft: "3px solid var(--color-brand)", paddingLeft: "1.4rem" }}
                >
                  <Quote size={18} aria-hidden="true" style={{ color: "var(--color-brand)" }} />
                  <p className="stmnt mt-3" style={{ fontSize: "clamp(1.3rem, 2.6vw, 1.8rem)", lineHeight: 1.35 }}>
                    &ldquo;{founder.quote}&rdquo;
                  </p>
                </blockquote>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {others.length > 0 && (
        <section className="sec sec--warm">
          <div className="container-x">
            <Reveal>
              <span className="eyebrow eyebrow--g">Work alongside</span>
              <h2 className="h2 mt-5">Meet the {others.length === 1 ? "other" : "others"}</h2>
            </Reveal>
            <Reveal delay={100}>
              <div className="mt-8 flex flex-wrap gap-3">
                {others.map((f) => (
                  <Link
                    key={f.slug}
                    href={`/about/founders/${f.slug}`}
                    className="btn btn--ghost"
                    style={{ color: "var(--color-navy)" }}
                  >
                    {f.name} <ArrowUpRight size={15} aria-hidden="true" aria-label={`Read about ${f.name}`} />
                  </Link>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <section className="sec sec--soft">
        <div className="container-x text-center">
          <Reveal>
            <p className="stmnt mx-auto" style={{ maxWidth: "44rem" }}>
              Have a problem worth solving? <em className="grad-text">Let&rsquo;s talk.</em>
            </p>
            <div className="mt-8 flex justify-center">
              <Button href="/contact" variant="dark" size="lg" arrow>Start a conversation</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}