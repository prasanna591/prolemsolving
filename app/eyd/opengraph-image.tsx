import { renderOg, ogSize, ogContentType, ogAlt } from "@/lib/og";

const TITLE = "Your Dream Home. One Connected Journey.";
const SUBTITLE =
  "EYD — Explore Your Dreams. A digital ecosystem connecting home seekers with the people, products and services behind building a home.";

export const alt = ogAlt(TITLE, SUBTITLE);
export const size = ogSize;
export const contentType = ogContentType;
export const dynamic = "force-static";

export default function Image() {
  return renderOg({
    eyebrow: "EYD — Explore Your Dreams",
    title: TITLE,
    subtitle: SUBTITLE,
  });
}
