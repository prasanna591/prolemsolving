import { renderOg, ogSize, ogContentType, ogAlt } from "@/lib/og";

export const dynamic = "force-static";

export const alt = "Software products built around real problems — PSM";
export const size = ogSize;
export const contentType = ogContentType;

export default function OgImage() {
  return renderOg({ eyebrow: "Products", title: "The PSM Product Portfolio", subtitle: "EYD, LECOM, BOOWA, Aura and Founder OS — five software products, each started as a real observed problem." });
}
