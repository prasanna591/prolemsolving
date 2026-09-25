import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";

interface SectionHeadingProps {
  eyebrow: string;
  eyebrowTone?: "default" | "p" | "g" | "ink";
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  className?: string;
  as?: keyof HTMLElementTagNameMap;
}

const eyebrowToneClass = { default: "", p: "eyebrow--p", g: "eyebrow--g", ink: "eyebrow--ink" } as const;

export function SectionHeading({ eyebrow, eyebrowTone = "default", title, lede, align = "left", className = "", as = "h2" }: SectionHeadingProps) {
  const Tag = as as any;
  return (
    <Reveal className={`max-w-[760px] ${align === "center" ? "mx-auto text-center" : ""} ${className}`}>
      <span className={`eyebrow ${eyebrowToneClass[eyebrowTone]}`}>{eyebrow}</span>
      <Tag className={`h2 mt-5 mb-4 ${align === "center" ? "mx-auto" : ""}`}>{title}</Tag>
      {lede && <p className="dek max-w-[600px]">{lede}</p>}
    </Reveal>
  );
}