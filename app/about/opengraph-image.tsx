import { renderOg, ogSize, ogContentType, ogAlt } from "@/lib/og";

export const alt = "About Problem Solving Mind — PSM";
export const size = ogSize;
export const contentType = ogContentType;

export default function OgImage() {
  return renderOg({ eyebrow: "About", title: "We Start With the Problem", subtitle: "A product-focused technology company in Pune, India — founded by Prasanna Venkatesan R. and Maniyarasan S." });
}
