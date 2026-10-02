import Image from "next/image";
import type { StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";

interface PageHeaderProps {
  eyebrow: string;
  eyebrowTone?: "default" | "p" | "g" | "ink";
  title: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
  image?: StaticImageData;
}

export function PageHeader({ eyebrow, eyebrowTone = "default", title, lede, children, image }: PageHeaderProps) {
  const tone = { default: "", p: "eyebrow--p", g: "eyebrow--g", ink: "eyebrow--ink" }[eyebrowTone];
  const isHero = Boolean(image);
  const heroImage = image ?? null;
  return (
    <header className={isHero ? "hero-scene" : "sec sec--plum"}>
      {isHero ? (
        <>
          <div className="hero-scene__bg" aria-hidden="true">
            {heroImage ? (
              <Image src={heroImage} alt="" fill sizes="100vw" priority quality={72} />
            ) : null}
          </div>
          <div className="hero-scene__glow" aria-hidden="true" />
          <div className="hero-scene__scrim" aria-hidden="true" />
        </>
      ) : (
        <div className="hero-grid" aria-hidden="true" />
      )}
      <div className={`container-x ${isHero ? "hero-scene__content" : "relative z-[2] max-w-[820px]"}`}>
        <div className={isHero ? "hero-scene__inner page-header__inner" : ""}>
          <Reveal>
            <span className={`eyebrow ${tone}`}>{eyebrow}</span>
          </Reveal>
          <Reveal delay={60}>
            <h1 className={`${isHero ? "hero-scene__h1" : "h-hero"} ${isHero ? "" : "mt-6 mb-5"}`}>{title}</h1>
          </Reveal>
          <Reveal delay={110}>
            {lede && (
              <p className={`${isHero ? "hero-scene__lede" : "dek max-w-[680px]"}`} style={isHero ? undefined : { fontSize: "1.18rem" }}>
                {lede}
              </p>
            )}
            {children}
          </Reveal>
        </div>
      </div>
    </header>
  );
}