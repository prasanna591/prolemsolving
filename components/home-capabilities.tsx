import Link from "next/link";
import { ArrowUpRight, Blocks, BrainCircuit, Network, RefreshCw, Smartphone } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/button";
import { capabilities } from "@/lib/content";

/**
 * Icon per capability, keyed by `capabilities[].id`. A lookup rather than an
 * index or a field on the data because the icon is presentation — keeping it
 * here means `lib/content.ts` stays free of component imports, and a new
 * capability that forgets to add an entry falls back instead of rendering
 * `undefined`.
 */
const ICONS = {
  "business-software": Blocks,
  "ai-automation": BrainCircuit,
  "erp-crm": Network,
  "web-mobile": Smartphone,
  transformation: RefreshCw,
} as const;

/**
 * The five capabilities as cards, each linking to its own section on
 * `/solutions`. That page carries the full editorial treatment for each one;
 * this grid is the homepage's inventory view of the same set, so the ids below
 * are load-bearing — they deep-link to `#${cap.id}` anchors that already exist.
 */
export function HomeCapabilities() {
  return (
    <section className="sec sec--white">
      <div className="container-x">
        <SectionHeading
          eyebrow="Solutions for industries"
          title="Technology built around how your business runs"
          lede="Five core capabilities, each scoped from the process first and the technology second."
        />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((cap, i) => {
            const Icon = ICONS[cap.id as keyof typeof ICONS] ?? Blocks;
            return (
              <Reveal key={cap.id} delay={(i % 3) * 70} className="h-full">
                <li className="card card--raised group flex h-full flex-col">
                  <span className="card-icon">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <h3 className="h3 mb-2">{cap.title}</h3>
                  <p className="dek flex-1" style={{ fontSize: "0.96rem" }}>{cap.short}</p>
                  <Link
                    href={`/solutions#${cap.id}`}
                    className="link-line mt-5 inline-flex items-center gap-1.5 self-start font-bold"
                    style={{ color: "var(--color-brand)", fontSize: "0.94rem" }}
                  >
                    Learn more
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </Link>
                </li>
              </Reveal>
            );
          })}
        </ul>

        <Reveal delay={120}>
          <div className="mt-12 flex justify-center">
            <Button href="/solutions" variant="ghost" size="lg" arrow>
              View all solutions
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
