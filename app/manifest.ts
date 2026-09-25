import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PSM — Problem Solving Mind",
    short_name: "PSM",
    description:
      "We turn real-world problems into practical technology — building products, AI-powered systems and intelligent platforms that make businesses actually work better.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#07162B",
    icons: [
      { src: "/icon.png", sizes: "256x256", type: "image/png" },
    ],
  };
}