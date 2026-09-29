import { renderOg, ogSize, ogContentType } from "@/lib/og";

export const dynamic = "force-static";

export const alt = "Our People — Problem Solving Mind (PSM)";
export const size = ogSize;
export const contentType = ogContentType;

export default function OgImage() {
  return renderOg({
    eyebrow: "Our people",
    title: "Built by People Who Like Solving Problems",
    subtitle: "Founder Prasanna Venkatesan R. and co-founder Maniyarasan S. — the team behind PSM, a software company in Pondicherry, Tamil Nadu.",
  });
}
