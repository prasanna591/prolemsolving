import { renderOg, ogSize, ogContentType } from "@/lib/og";

export const alt = "The people behind Problem Solving Mind";
export const size = ogSize;
export const contentType = ogContentType;
export const dynamic = "force-static";

/**
 * Shared by both founder profile pages — see the note in
 * `app/products/[slug]/opengraph-image.tsx` for why per-person cards cannot be
 * prerendered under `output: "export"`.
 */
export function generateStaticParams() {
  return ["prasanna-venkatesan", "maniyarasan"].map((slug) => ({ slug }));
}

export default function Image() {
  return renderOg({
    eyebrow: "Our people",
    title: "Built by People Who Like Solving Problems",
    subtitle: "Founder & Managing Director Prasanna Venkatesan R. and co-founder Maniyarasan S.",
  });
}
