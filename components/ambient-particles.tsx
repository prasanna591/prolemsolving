import type { CSSProperties } from "react";

type Variant = "rise" | "twinkle";
type Tone = "brand" | "ink" | "light";

type Props = {
  variant?: Variant;
  tone?: Tone;
  count?: number;
  seed?: number;
  className?: string;
};

function makeRng(seed: number) {
  let s = seed >>> 0 || 1;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

export function AmbientParticles({ variant = "twinkle", tone = "brand", count = 10, seed = 7, className = "" }: Props) {
  const rnd = makeRng(seed);
  const items = Array.from({ length: count }, (_, i) => {
    const size = variant === "rise" ? 2 + rnd() * 3.4 : 2 + rnd() * 4;
    const style: CSSProperties = {
      width: size,
      height: size,
      left: `${2 + rnd() * 96}%`,
      animationDuration: variant === "rise" ? `${16 + rnd() * 20}s` : `${6 + rnd() * 8}s`,
      animationDelay: `${-(rnd() * (variant === "rise" ? 26 : 10))}s`,
      ["--p-drift" as string]: `${rnd() * 44 - 22}px`,
    };
    if (variant === "twinkle") {
      style.top = `${6 + rnd() * 86}%`;
      (style as Record<string, string>)["--p-move"] = `${-(6 + rnd() * 14)}px`;
    }
    return <span key={i} className={`ambit ambit--${variant} ambit--${tone}`} style={style} />;
  });

  return (
    <div className={`ambient ${className}`} aria-hidden="true">
      {items}
    </div>
  );
}