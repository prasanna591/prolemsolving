import type { ReactNode } from "react";

/**
 * Remounts on every route change — gives each page a soft entrance.
 *
 * The entrance is a pure-CSS animation (`[data-in]` in globals.css) rather
 * than a Framer `initial`, because Framer serialises `initial` into the SSR
 * HTML — which would render every route at `opacity:0` for crawlers and LLM
 * retrievers that do not execute JavaScript. The CSS rule is already gated
 * on `prefers-reduced-motion: no-preference`, so no JS check is needed here.
 */
export default function Template({ children }: { children: ReactNode }) {
  return <div data-in>{children}</div>;
}
