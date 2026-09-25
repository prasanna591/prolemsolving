import { Reveal } from "@/components/reveal";
import { Magnetic } from "@/components/magnetic";
import { Button } from "@/components/button";

interface CtaBandProps {
  title?: string;
  lede?: string;
  ctaLabel?: string;
  href?: string;
  note?: string;
}

export function CtaBand({
  title = "Have a Problem Worth Solving?",
  lede = "Tell us what you're trying to solve. We'll explore what technology can do about it.",
  ctaLabel = "Start a Conversation",
  href = "/contact",
  note,
}: CtaBandProps) {
  return (
    <section className="sec relative overflow-hidden bg-navy text-white">
      <div className="container-x relative z-[2] text-center noise">
        <Reveal className="mx-auto max-w-[720px]">
          <span className="eyebrow eyebrow--light" style={{ marginBottom: "1.25rem" }}>PSM</span>
          <h2 className="display display--md">{title}</h2>
          <p className="mt-6 text-white/70" style={{ fontSize: "1.12rem" }}>{lede}</p>
          <div className="mt-9 flex justify-center">
            <Magnetic strength={6}>
              <Button href={href} variant="primary" size="lg" arrow>
                {ctaLabel}
              </Button>
            </Magnetic>
          </div>
          {note && <p className="mt-6 text-white/60" style={{ fontSize: "0.9rem" }}>{note}</p>}
        </Reveal>
      </div>
    </section>
  );
}