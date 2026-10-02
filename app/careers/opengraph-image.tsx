import { renderOg, ogSize, ogContentType, ogAlt } from "@/lib/og";
import { site } from "@/lib/site";
import { hasOpenRoles, openRoles } from "@/lib/careers";

export const dynamic = "force-static";

export const alt = `Careers at ${site.full} — ${site.teamSize}+ people, real problems. Actively hiring.`;

export const size = ogSize;
export const contentType = ogContentType;

export default function OgImage() {
  return renderOg({
    eyebrow: "Careers",
    title: hasOpenRoles
      ? `${openRoles.length} Open Role${openRoles.length > 1 ? "s" : ""}`
      : "Open Application",
    subtitle: hasOpenRoles
      ? `Real products, real problems, a ${site.teamSize}+ team in Pondicherry. Apply directly.`
      : `Actively hiring — no formal openings today, but we read every good application.`
  });
}