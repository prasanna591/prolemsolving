import { ArrowDownRight, ArrowUpRight, Quote } from "lucide-react";
import type { CaseStudy } from "@/lib/caseStudies";
import { Reveal } from "@/components/reveal";

const toneChip = {
  brand: "badge--brand",
  accp: "badge--accp",
  accg: "badge--accg",
  navy: "badge--navy",
} as const;

export function CaseStudyEditorial({ study }: { study: CaseStudy }) {
  return (
    <Reveal className="story">
      <header className="story-head">
        <div className="mb-3 flex flex-wrap gap-2">
          <span className={`badge ${toneChip[study.tone]}`}>{study.eyebrow}</span>
          {study.tags.map((t) => (
            <span key={t} className="badge badge--neutral">{t}</span>
          ))}
        </div>
        <h3 className="mb-2" style={{ fontSize: "clamp(1.5rem, 3.2vw, 2.2rem)" }}>{study.title}</h3>
        <p className="dek max-w-[720px]">{study.subtitle}</p>
      </header>

      <div className="story-cols">
        {study.blocks.map((block, i) => (
          <div key={block.label} className="story-blk">
            <div className="story-label">
              <ArrowDownRight size={15} aria-hidden="true" />
              {block.label}
            </div>
            <p>{block.body}</p>
            {block.tech && (
              <ul className="story-tech mt-4">
                {block.tech.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <div className="story-out">
        <div className="story-label">
          <ArrowUpRight size={15} aria-hidden="true" />
          Outcome
        </div>
        <p>{study.outcome}</p>
        {study.quote && (
          <blockquote className="mt-5 flex items-start gap-3" style={{ color: "var(--color-navy)" }}>
            <Quote size={26} className="mt-1 shrink-0" style={{ color: "var(--color-accg)", opacity: 0.8 }} aria-hidden="true" />
            <div>
              <p style={{ fontWeight: 700, fontSize: "1.05rem" }}>{study.quote}</p>
              <footer style={{ fontSize: "0.85rem", opacity: 0.7, marginTop: "0.3rem" }}>— {study.quoteSource}</footer>
            </div>
          </blockquote>
        )}
      </div>
    </Reveal>
  );
}