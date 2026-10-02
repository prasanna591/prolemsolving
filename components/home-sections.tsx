import { Compass, Eye, Layers, ShieldCheck, Target, Workflow } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { journey, vision, mission, whyPsm, lookingAhead } from "@/lib/content";

/**
 * The six-step process as a horizontal rail. Unlike the manifesto band above
 * it, nothing here animates on scroll — the steps are a list, and a reader
 * should be able to see all six at once rather than discovering them one at a
 * time. The icons are decorative; the numbers carry the sequence.
 */
const STEP_ICONS = [Eye, Compass, Layers, Workflow, Target, ShieldCheck];

/**
 * Reuses `journey` from lib/content, which is the same six-step sequence the
 * About page renders in depth. `short` here is a compressed restatement for the
 * rail — the full descriptions are long enough to wrap to five lines at this
 * column width and would unbalance the row.
 */
export function HomeProcess() {
  return (
    <section className="sec sec--white">
      <div className="container-x">
        <SectionHeading
          eyebrow="How we work"
          title="From problem to solution"
          lede="We don't start with technology. We start with the problem."
        />

        <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {journey.map((s, i) => {
            const Icon = STEP_ICONS[i] ?? Target;
            return (
              <Reveal key={s.n} delay={(i % 3) * 80} as="li" className="h-full">
                <div className="flex h-full gap-4">
                  <span className="card-icon" style={{ flex: "none", marginBottom: 0 }}>
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <div>
                    <span
                      className="font-mono"
                      style={{ fontSize: "0.76rem", fontWeight: 700, letterSpacing: "0.12em", color: "var(--color-brand)" }}
                    >
                      {s.n}
                    </span>
                    <h3 className="mt-1 mb-2" style={{ fontSize: "1.14rem", fontWeight: 800, letterSpacing: "-0.018em" }}>
                      {s.title}
                    </h3>
                    <p className="dek" style={{ fontSize: "0.95rem" }}>{s.desc}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/** Buyer's-eye reasons to choose PSM. Distinct from `values` on /about. */
export function HomeWhy() {
  return (
    <section className="sec sec--soft">
      <div className="container-x">
        <SectionHeading
          eyebrow="Why PSM"
          title="Why businesses choose us"
          lede="Four reasons that show up in how we scope, build and hand over."
        />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2">
          {whyPsm.map((w, i) => (
            <Reveal key={w.title} delay={(i % 2) * 80} className="h-full">
              <li className="card card--raised flex h-full flex-col">
                <span
                  className="font-mono"
                  style={{ fontSize: "0.74rem", fontWeight: 700, letterSpacing: "0.12em", color: "var(--color-brand)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 mb-2" style={{ fontSize: "1.18rem", fontWeight: 800, letterSpacing: "-0.02em" }}>
                  {w.title}
                </h3>
                <p className="dek flex-1" style={{ fontSize: "0.97rem" }}>{w.desc}</p>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/**
 * Vision and mission as one dark band. Sits after the light inventory sections
 * and before the FAQ, so it lands as the page's argument before the objections.
 * Paired rather than split: vision without mission reads as a slogan, and
 * mission without vision reads as a job description.
 */
export function HomeVision() {
  return (
    <section className="sec relative overflow-hidden bg-navy text-white noise">
      <div className="dotfield" aria-hidden="true" />
      <div className="container-x relative z-[2]">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <span className="eyebrow eyebrow--light">Our vision</span>
            <p className="mt-5" style={{ fontSize: "clamp(1.3rem, 2.2vw, 1.7rem)", lineHeight: 1.32, fontWeight: 700, letterSpacing: "-0.02em" }}>
              {vision}
            </p>
          </Reveal>
          <Reveal delay={120}>
            <span className="eyebrow eyebrow--light">Our mission</span>
            <p className="mt-5 text-white/70" style={{ fontSize: "1.08rem", lineHeight: 1.7 }}>
              {mission}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/**
 * Forward-looking band. Optional in the source brief — removing this component
 * from app/page.tsx is the only change needed to take hardware off the site.
 */
export function HomeLookingAhead() {
  return (
    <section className="sec sec--tight sec--plum">
      <div className="container-x">
        <Reveal className="mx-auto text-center" >
          <span className="eyebrow">Looking ahead</span>
          <h2 className="h2 mt-5 mb-4">{lookingAhead.title}</h2>
          <p className="dek mx-auto max-w-[620px]">{lookingAhead.desc}</p>
        </Reveal>
      </div>
    </section>
  );
}
