import { renderOg, ogSize, ogContentType, ogAlt } from "@/lib/og";
import { founders } from "@/lib/founders";

export const alt = ogAlt("The people behind PSM", "Founder and co-founder profiles");
export const size = ogSize;
export const contentType = ogContentType;

export async function generateImageMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const founder = founders.find((f) => f.slug === slug);
  if (!founder) return [];

  return [founder].map((f) => ({
    id: f.slug,
    alt: ogAlt(`${f.name} — ${f.role}`, f.summary),
    size,
    contentType,
    filename: `${f.slug}.png`,
  }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const founder = founders.find((f) => f.slug === slug) ?? founders[0];

  return renderOg({
    eyebrow: founder.role,
    title: founder.name,
    subtitle: founder.summary,
  });
}
