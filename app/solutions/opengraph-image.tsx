import { renderOg, ogSize, ogContentType, ogAlt } from "@/lib/og";

export const dynamic = "force-static";

export const alt = "Business software, AI automation and integration — PSM";
export const size = ogSize;
export const contentType = ogContentType;

export default function OgImage() {
  return renderOg({ eyebrow: "Solutions", title: "Business Problems, Solved With Technology", subtitle: "Custom business software, AI and workflow automation, ERP/CRM integration, web and mobile apps, digital transformation." });
}
