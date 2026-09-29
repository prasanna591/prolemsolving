import { renderOg, ogSize, ogContentType } from "@/lib/og";

export const dynamic = "force-static";

export const alt = "Why Problem Solving Mind exists";
export const size = ogSize;
export const contentType = ogContentType;

export default function OgImage() {
  return renderOg({
    eyebrow: "Why PSM exists",
    title: "Technology Should Solve Problems, Not Create Complexity",
    subtitle: "The values and reasoning behind our custom software, practical AI and workflow automation work.",
  });
}
