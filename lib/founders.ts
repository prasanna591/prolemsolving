import type { StaticImageData } from "next/image";
import founderImage from "@/app/images/founder.webp";
import cofounderImage from "@/app/images/Co-founder(Maniyarasan).webp";

export interface Founder {
  slug: string;
  name: string;
  role: "Founder" | "Co-founder";
  initials: string;
  photo?: StaticImageData;
  summary: string;
  intro: string[];
  focus: string[];
  quote: string;
}

export const founders: Founder[] = [
  {
    slug: "prasanna-venkatesan",
    name: "Prasanna Venkatesan R.",
    role: "Founder",
    initials: "PVR",
    photo: founderImage,
    summary: "Product thinker and builder — the person behind PSM's product direction and long-term execution.",
    intro: [
      "Prasanna founded PSM on a simple conviction: technology is only worth building when it removes real pain. Watching businesses run on disconnected systems, manual re-entry and processes that only worked because someone remembered them, he kept coming back to the same question — why is this still being done by hand?",
      "PSM is his answer to that question: a company that starts with the problem, reasons from first principles, and builds products that keep working after the project ends.",
      "At PSM he focuses on product thinking, technology direction and long-term execution — turning observations about how businesses actually operate into products worth building.",
    ],
    focus: ["Product strategy", "Technology direction", "Problem framing", "Long-term execution"],
    quote: "We don't start with technology. We start with the problem.",
  },
  {
    slug: "maniyarasan",
    name: "Maniyarasan S.",
    role: "Co-founder",
    initials: "MS",
    photo: cofounderImage,
    summary: "Co-founder focused on turning ideas into practical products and solutions people actually use.",
    intro: [
      "Maniyarasan co-founded PSM to help build products and solutions that hold up in real use. His focus is practical: taking an insight and driving it toward something that works — software that people genuinely want to use every day.",
      "Working alongside the rest of the team, he bridges product and engineering, making sure ideas become systems that are simple, dependable and properly delivered.",
      "At PSM he works across product and engineering delivery — helping ideas become practical products and solutions for real-world problems.",
    ],
    focus: ["Product design", "Practical execution", "Engineering delivery", "Solutions"],
    quote: "An idea only matters when it becomes something people use.",
  },
];