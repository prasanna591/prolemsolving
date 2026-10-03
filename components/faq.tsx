import { pageFaqs, type PageFaqs } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { JsonLd } from "@/components/jsonld";

type PageKey = keyof PageFaqs;

interface FaqSectionProps {
  page: PageKey;
  eyebrow?: string;
  title?: string;
  lede?: string;
  initialCount?: number;
}

const defaultHeadings: Record<PageKey, { eyebrow: string; title: string; lede: string }> = {
  home: {
    eyebrow: "Questions",
    title: "Common questions about PSM",
    lede: "Straight answers about what PSM is, what it builds, and how to work with us.",
  },
  solutions: {
    eyebrow: "Questions",
    title: "Questions about our solutions",
    lede: "What businesses ask before starting a project with us.",
  },
  work: {
    eyebrow: "Questions",
    title: "Questions about our work",
    lede: "How we approach client projects and what you can expect.",
  },
  products: {
    eyebrow: "Product questions",
    title: "Questions about the PSM product portfolio",
    lede: "What the products are, how they are built, and what stage each one is at.",
  },
  contact: {
    eyebrow: "Questions",
    title: "Before you reach out",
    lede: "What to expect when you contact us.",
  },
  about: {
    eyebrow: "Questions",
    title: "About Problem Solving Mind",
    lede: "Who we are, what we're building, and how to join us.",
  },
};

/**
 * Native `<details>` keeps the answers in the DOM for crawlers and LLM
 * extractors without requiring JavaScript to expand them.
 * FAQPage schema is rendered from the same data so text and markup never drift.
 */
export function FaqSection({
  page,
  eyebrow,
  title,
  lede,
  initialCount,
}: FaqSectionProps) {
  const items = pageFaqs[page];
  const shown = initialCount ? items.slice(0, initialCount) : items;
  const hidden = initialCount ? items.slice(initialCount) : [];
  const headings = defaultHeadings[page];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return (
    <section className="sec sec--lilac sec--edge" id="faq" style={{ scrollMarginTop: "4rem" }}>
      <JsonLd data={faqSchema} />
      <div className="container-x">
        <SectionHeading
          eyebrow={eyebrow ?? headings.eyebrow}
          eyebrowTone="g"
          title={title ?? headings.title}
          lede={lede ?? headings.lede}
          align="center"
        />

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