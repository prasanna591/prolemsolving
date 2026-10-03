import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Magnetic } from "@/components/magnetic";
import { JsonLd } from "@/components/jsonld";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { careersSchema } from "@/lib/structured";
import { openRoles, hasOpenRoles, applyHref, careersEmail, disciplines, traits, benefits, process } from "@/lib/careers";
import heroImg from "@/app/images/optimized/employee_working.webp";
import workingPic from "@/app/images/optimized/working_pic.webp";

export const metadata = pageMetadata({
  title: "Careers",
  description:
    "Open roles and open applications at Problem Solving Mind — a 20+ person product studio in Pondicherry actively hiring across engineering, AI and automation, and product design. Building real products and business software for clients across India and worldwide.",
  path: "/careers",
});

export default function CareersPage() {
  const applyHrefOpen = applyHref();

  return (
    <div className="page-shell careers-page">
      <JsonLd data={careersSchema()} />

      {/* ============ HERO ============ */}
      <PageHeader
        eyebrow="Careers"
        eyebrowTone="g"
        image={heroImg}
        title={
          <>
            {site.teamSize}+ people, <em className="hh-grad">real problems.</em>
          </>
        }
        lede={
          <>
            We are a product studio in {site.locality} and we are actively hiring. We hire for how people think and
            how they reason about a problem, not for a list of technologies on a CV. There are{" "}
            {hasOpenRoles ? "openings" : "no formal openings"} on the board right now — but we read every good
            application, and we would rather find you than advertise a role and hope you apply.
          </>
        }
      />

      {/* ============ OPEN ROLES ============ */}
      <section className="sec sec--white">
        <div className="container-x">
          <SectionHeading
            eyebrow="Open roles"
            eyebrowTone="g"
            title={hasOpenRoles ? "Current openings" : "No openings on the board today"}
            lede={
              hasOpenRoles
                ? "Everything below is a live role. Apply directly — we read every one."
                : "We would rather say that plainly than leave an empty list here pretending otherwise."
            }
          />

          {hasOpenRoles ? (
            <ul className="rule-list mt-14">
              {openRoles.map((role, i) => (
                <Reveal as="li" key={role.slug} delay={i * 60}>
                  <span className="rl-ix" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="h3 mt-0">{role.title}</h3>
                    <p className="dek mt-2 max-w-[62ch]">{role.summary}</p>
                    <p className="mt-3 font-bold" style={{ color: "var(--color-navy)" }}>
                      {role.type} &middot; {role.location}
                    </p>

                    {role.responsibilities.length > 0 && (
                      <>
                        <h4 className="mt-7 text-[0.78rem] font-extrabold uppercase tracking-[0.12em] text-[var(--color-sub)]">
                          What you&rsquo;d do
                        </h4>
                        <ul className="mt-3 flex flex-col gap-2 pl-0 list-none">
                          {role.responsibilities.map((r) => (
                            <li key={r} className="dek">
                              {r}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}

                    {role.requirements.length > 0 && (
                      <>
                        <h4 className="mt-7 text-[0.78rem] font-extrabold uppercase tracking-[0.12em] text-[var(--color-sub)]">
                          What we&rsquo;re looking for
                        </h4>
                        <ul className="mt-3 flex flex-col gap-2 pl-0 list-none">
                          {role.requirements.map((r) => (
                            <li key={r} className="dek">
                              {r}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}

                    <a className="btn btn--primary mt-8" href={applyHref(role)}>
                      Apply for {role.title} <ArrowRight size={16} strokeWidth={2.5} aria-hidden="true" />
                    </a>
                  </div>
                </Reveal>
              ))}
            </ul>
          ) : (
            /* Flat ruled strip — the same honest "here is the state of it" device
               used for in-development products, rather than a decorative card. */
            <div className="strip mt-14">
              <div>
                <p className="strip-t">Open application &mdash; always on</p>
                <p className="strip-d">
                  Tell us what you want to build and what you have built so far. We reply to everything within two
                  working days, including when the answer is not yet.
                </p>
              </div>
              <a className="btn btn--primary" href={applyHrefOpen}>
                Send an introduction <ArrowRight size={16} strokeWidth={2.5} aria-hidden="true" />
              </a>
            </div>
          )}

          {hasOpenRoles && (
            <p className="dek mt-8">
              Nothing that fits above? The{" "}
              <a href={applyHrefOpen} className="link-line" style={{ fontWeight: 700 }}>
                open application
              </a>{" "}
              is still open &mdash; we have hired people who had no matching vacancy.
            </p>
          )}
        </div>
      </section>

      {/* ============ WHAT WE HIRE FOR ============ */}
      <section className="sec sec--soft">
        <div className="container-x">
          <SectionHeading
            eyebrow="What we hire for"
            eyebrowTone="p"
            title="The disciplines we need"
            lede="These are the areas we build in, and therefore the areas we hire for. They are not vacancies — they are where a good application from you would land."
          />
          <ul className="rule-list mt-14">
            {disciplines.map((d, i) => (
              <Reveal as="li" key={d.title} delay={i * 55}>
                <span className="rl-ix" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="mt-0 text-[1.15rem] font-extrabold" style={{ color: "var(--color-navy)" }}>
                    {d.title}
                  </h3>
                  <p className="dek mt-2 max-w-[62ch]">{d.detail}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ WHAT IT'S LIKE ============ */}
      <section className="sec sec--white">
        <div className="container-x">
          <SectionHeading
            eyebrow="What it is actually like"
            eyebrowTone="ink"
            title="The honest version"
            lede="Working here has real demands, and we would rather name them before you apply than after you start."
          />
          <div className="mt-14 grid gap-x-8 gap-y-10 md:grid-cols-2">
            {traits.map((t, i) => (
              <Reveal
                key={t.title}
                delay={i * 70}
                as="article"
                className="prin"
                style={{ "--ac": t.accent } as CSSProperties}
              >
                <h3 className="prin-title">{t.title}</h3>
                <p className="prin-desc" style={{ maxWidth: "44ch" }}>
                  {t.detail}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TEAM IMAGE ============ */}
      <section className="sec sec--white">
        <div className="container-x">
          <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: "16/9" }}>
            <Image
              src={workingPic}
              alt="PSM team collaborating"
              fill
              sizes="(max-width: 1024px) 100vw, 1200px"
              priority={false}
              quality={80}
              className="rounded-2xl object-cover"
            />
          </div>
        </div>
      </section>

      {/* ============ WHAT YOU GET ============ */}
      <section className="sec sec--plum">
        <div className="container-x">
          <SectionHeading
            eyebrow="What you get"
            eyebrowTone="g"
            title="In exchange"
            lede="The other side of the trade-offs. Small enough to be specific about."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 70} className="hwb-card">
                <span className="hwb-num">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="hwb-title">{b.title}</h3>
                <p className="hwb-desc" style={{ maxWidth: "46ch" }}>
                  {b.detail}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PROCESS ============ */}
      <section className="sec sec--white">
        <div className="container-x">
          <SectionHeading
            eyebrow="How we hire"
            eyebrowTone="p"
            title="Six steps, no mystery"
            lede="You will know where you are at every stage, and you will hear from us either way."
          />
          <ol className="tl mt-14">
            {process.map((p, i) => (
              <Reveal as="li" key={p.n} delay={i * 70} className="tl-item">
                <span className="tl-dot" aria-hidden="true" />
                <span className="tl-num">{p.n}</span>
                <h3 className="tl-title">{p.title}</h3>
                <p className="tl-desc">{p.detail}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ============ CLOSE ============ */}
      <section className="sec sec--white text-center final-sec">
        <div className="container-x">
          <Reveal>
            <span className="eyebrow eyebrow--g">Apply</span>
            <h2 className="stmnt stmnt--lg mt-5 mx-auto max-w-[18ch]">
              Tell us what you&rsquo;d like to <em className="grad-text">build.</em>
            </h2>
            <p className="dek mt-6 mx-auto max-w-[56ch]">
              A few honest paragraphs beat a polished cover letter. Links to anything you have built &mdash; a repository,
              a live product, a small tool someone else now uses &mdash; tell us more than any CV.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Magnetic strength={3}>
                <a className="btn btn--primary btn--lg" href={applyHrefOpen}>
                  Send an introduction <ArrowRight size={18} strokeWidth={2.5} aria-hidden="true" />
                </a>
              </Magnetic>
              <Link href="/about" className="btn btn--ghost btn--lg">
                First, meet the founders
              </Link>
            </div>
            <p className="dek mt-8">
              Prefer to write directly?{" "}
              <a href={`mailto:${careersEmail}`} className="link-line" style={{ fontWeight: 700 }}>
                {careersEmail}
              </a>
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}