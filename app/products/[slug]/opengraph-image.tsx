import { renderOg, ogSize, ogContentType } from "@/lib/og";

export const alt = "PSM software product — built around a real problem";
export const size = ogSize;
export const contentType = ogContentType;
export const dynamic = "force-static";

/**
 * This card is shared by every product page. A per-product card needs
 * `generateImageMetadata`, which Next cannot prerender under
 * `output: "export"` (the metadata route gains an internal
 * `[__metadata_id__]` segment that stays empty). The product name and
 * tagline are already in each page's own `og:title`/`og:description`, so the
 * link preview still identifies the product.
 */
export function generateStaticParams() {
  return ["eyd", "lecom", "boowa", "aura", "founder-os"].map((slug) => ({ slug }));
}

export default function Image() {
  return renderOg({
    eyebrow: "PSM products",
    title: "Software Built Around a Real Problem",
    subtitle: "EYD, LECOM, Boowa, Aura and Founder OS — five products in development.",
  });
}
