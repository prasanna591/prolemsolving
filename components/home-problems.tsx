import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { problems } from "@/lib/content";

/**
 * Homepage framing of the problem set. `/solutions` opens with the same six
 * cards in depth; here they are the argument for why contact even exists, so
 * the closing line does the work the deeper section leaves to its own CTA.
 */
export function HomeProblems() {
  return (
    <section className="sec sec--soft">
      <div className="container-x">
        <SectionHeading
          eyebrow="Problems we solve"
          title="The pain we keep walking into"
          lede="Every solution starts as an actual problem. If your business has one of these, there's a strong chance we can help."
        />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((p, i) => (
            <Reveal key={p.problem} delay={(i % 3) * 70} className="h-full">
              <li className="card card--raised flex h-full flex-col">
                <h3 className="h3 mb-2">{p.problem}</h3>
                <p className="dek flex-1" style={{ fontSize: "0.96rem" }}>{p.desc}</p>
                <span className="badge badge--accg badge--wrap mt-5 self-start">
                  <ArrowUpRight size={14} aria-hidden="true" /> {p.outcome}
                </span>
              </li>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={120}>
          <p className="dek mt-12 text-center" style={{ fontSize: "1.16rem" }}>
            If this sounds like your business,{" "}
            <Link href="/contact" className="link-line font-bold" style={{ color: "var(--color-brand)", display: "inline-block" }}>
              we can help
            </Link>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
