import { faqs, type Faq } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

interface FaqSectionProps {
  items?: Faq[];
  eyebrow?: string;
  title?: string;
  lede?: string;
  /**
   * Render only this many, with the rest behind a native show-more control.
   * The homepage passes 5; every item still reaches the DOM either way, so
   * FAQPage structured data and crawler visibility are unaffected.
   */
  initialCount?: number;
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
  initialCount,
}: FaqSectionProps) {
  const shown = initialCount ? items.slice(0, initialCount) : items;
  const hidden = initialCount ? items.slice(initialCount) : [];

  return (
    <section className="sec sec--lilac sec--edge" id="faq" style={{ scrollMarginTop: "4rem" }}>
      <div className="container-x">
        <SectionHeading eyebrow={eyebrow} eyebrowTone="g" title={title} lede={lede} align="center" />

        <div className="mx-auto mt-12 flex max-w-[820px] flex-col gap-3">
          {shown.map((f, i) => (
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

        {/* The overflow sits in a native <details> rather than behind a
            client-side toggle, so the remaining answers are in the source HTML
            and readable with JS disabled — same reasoning as the items above. */}
        {hidden.length > 0 && (
          <details className="faq-more mx-auto mt-8 max-w-[820px]" name="faq-more">
            <summary className="faq-more__summary">
              Show {hidden.length} more questions
              <span className="faq-mark" aria-hidden="true" />
            </summary>
            <div className="mt-3 flex flex-col gap-3">
              {hidden.map((f) => (
                <details key={f.q} className="faq-item" name="faq">
                  <summary className="faq-q">
                    <span>{f.q}</span>
                    <span className="faq-mark" aria-hidden="true" />
                  </summary>
                  <div className="faq-a">
                    <p>{f.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </details>
        )}
      </div>
    </section>
  );
}
