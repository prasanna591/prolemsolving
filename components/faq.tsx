import { faqs, type Faq } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

interface FaqSectionProps {
  items?: Faq[];
  eyebrow?: string;
  title?: string;
  lede?: string;
}

/**
 * Native `<details>` keeps the answers in the DOM for crawlers and LLM
 * extractors without requiring JavaScript to expand them.
 */
export function FaqSection({
  items = faqs,
  eyebrow = "Questions",
  title = "Common questions about PSM",
  lede = "Straight answers about what PSM is, what it builds, and how to work with us.",
}: FaqSectionProps) {
  return (
    <section className="sec sec--soft" id="faq" style={{ scrollMarginTop: "4rem" }}>
      <div className="container-x">
        <SectionHeading eyebrow={eyebrow} eyebrowTone="g" title={title} lede={lede} align="center" />

        <div className="mx-auto mt-12 flex max-w-[820px] flex-col gap-3">
          {items.map((f, i) => (
            <Reveal key={f.q} delay={(i % 4) * 60}>
              <details className="faq-item" name="faq">
                <summary className="faq-q">
                  <span>{f.q}</span>
                  <span className="faq-mark" aria-hidden="true" />
                </summary>
                <div className="faq-a">
                  <p>{f.a}</p>
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
