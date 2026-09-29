import { renderOg, ogSize, ogContentType, ogAlt } from "@/lib/og";

export const alt = "Case studies in operations automation, AI and integration — PSM";
export const size = ogSize;
export const contentType = ogContentType;

export default function OgImage() {
  return renderOg({ eyebrow: "Work", title: "Real Builds. Honest Outcomes.", subtitle: "Operations automation, AI document intelligence and ERP/CRM integration — the problem, the thinking, the technology, what changed." });
}
