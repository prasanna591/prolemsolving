import { renderOg, ogSize, ogContentType, ogAlt } from "@/lib/og";

export const dynamic = "force-static";

export const alt = "Contact PSM — hello@problemsolvingmind.com";
export const size = ogSize;
export const contentType = ogContentType;

export default function OgImage() {
  return renderOg({ eyebrow: "Contact", title: "Let's Talk About Your Problem", subtitle: "Tell us what you're trying to solve. We read every message and reply honestly within two working days." });
}
