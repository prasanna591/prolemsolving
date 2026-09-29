import { renderOg, ogSize, ogContentType, ogAlt } from "@/lib/og";
import { allProducts } from "@/lib/products";

export const alt = ogAlt("PSM product", "Software products built around real problems");
export const size = ogSize;
export const contentType = ogContentType;

export async function generateImageMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = allProducts.find((p) => p.id === slug);
  if (!product) return [];

  return [product].map((p) => ({
    id: p.id,
    alt: ogAlt(`${p.name} — ${p.tagline}`, p.description),
    size,
    contentType,
    filename: `${p.id}.png`,
  }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = allProducts.find((p) => p.id === slug) ?? allProducts[0];

  return renderOg({
    eyebrow: product.category.split("·")[0]?.trim(),
    title: `${product.name} — ${product.tagline}`,
    subtitle: product.description,
  });
}
