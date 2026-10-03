import Link from "next/link";
import type { ReactNode } from "react";
import { MessageSquare } from "lucide-react";
import { site, brandMark } from "@/lib/site";

/**
 * Brand marks, inlined because lucide-react 1.x dropped its brand icon set
 * (`Linkedin`, `Instagram` and `Github` are no longer exported), and a generic
 * `Link2` tells a visitor nothing about where the link goes.
 *
 * Kept as path data rather than an icon font or `<img>` so they inherit
 * `currentColor` and the footer's hover states with no extra request.
 */
const SOCIAL_ICONS: Record<string, ReactNode> = {
  LinkedIn: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.86-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13Zm1.78 13.02H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  ),
  Instagram: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.16c3.2 0 3.58.02 4.85.07 1.17.06 1.8.25 2.22.42.56.21.96.47 1.38.9.42.42.68.81.9 1.38.16.42.36 1.05.41 2.22.06 1.27.07 1.65.07 4.85s-.01 3.59-.07 4.85c-.06 1.17-.25 1.81-.42 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.59-.01-4.86-.07c-1.17-.06-1.81-.25-2.23-.42a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.17-.42-.36-1.06-.42-2.23-.06-1.27-.07-1.65-.07-4.84 0-3.2.01-3.59.07-4.86.06-1.17.25-1.81.42-2.23.21-.57.48-.96.9-1.38.42-.42.81-.69 1.38-.9.42-.17 1.05-.36 2.23-.42 1.27-.05 1.65-.07 4.85-.07M12 0C8.74 0 8.33.02 7.05.07c-1.28.06-2.15.26-2.91.56-.79.3-1.46.71-2.13 1.38S.94 3.35.63 4.14c-.3.77-.5 1.64-.56 2.91C.01 8.33 0 8.74 0 12s.02 3.67.07 4.95c.06 1.28.26 2.15.56 2.91.3.79.71 1.46 1.38 2.13s1.34 1.08 2.13 1.38c.76.3 1.63.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.02 4.95-.07c1.28-.06 2.15-.26 2.91-.56.79-.3 1.46-.71 2.13-1.38s1.08-1.34 1.38-2.13c.3-.76.5-1.63.56-2.91.05-1.28.07-1.69.07-4.95s-.02-3.67-.07-4.95c-.06-1.28-.26-2.15-.56-2.91-.3-.79-.71-1.46-1.38-2.13S20.65 1.04 19.86.74c-.76-.3-1.63-.5-2.91-.56C15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm7.85-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z" />
    </svg>
  ),
  WhatsApp: <MessageSquare size={18} aria-hidden="true" />,
};

export function Footer() {
  return (
    <footer className="foot">
      <div className="container-x">
        <div className="foot-grid">
          <div className="foot-brand">
            {brandMark}
            <p>{site.full} — building products and turning real-world problems into practical technology.</p>
          </div>
          <div className="foot-col">
            <h2>Company</h2>
            <Link href="/products">Products</Link>
            <Link href="/eyd">EYD — Explore Your Dreams</Link>
            <Link href="/about">About</Link>
            <Link href="/about/motives">Why PSM exists</Link>
            <Link href="/about/founders">Our people</Link>
            <Link href="/careers">Careers</Link>
            <Link href="/work">Work</Link>
            <Link href="/contact">Let&rsquo;s Talk</Link>
            <Link href="/privacy">Privacy</Link>
          </div>
          <div className="foot-col">
            <h2>Services</h2>
            <Link href="/solutions#business-software">Custom software development</Link>
            <Link href="/solutions#ai-automation">AI automation for business</Link>
            <Link href="/solutions#erp-crm">ERP &amp; CRM integration</Link>
            <Link href="/solutions#web-mobile">Web &amp; mobile app development</Link>
            <Link href="/solutions">All solutions</Link>
          </div>
          <div className="foot-col">
            <h2>Frame it right</h2>
            <p style={{ fontSize: "0.96rem", lineHeight: 1.7 }}>
              We don&rsquo;t start with technology.
              <br />
              We start with the problem.
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-2 mt-5">
              {site.socials.map((s) => {
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    className="link-line inline-flex items-center gap-1.5"
                    style={{ fontSize: "0.96rem", fontWeight: 700 }}
                    rel="me noopener noreferrer"
                    target="_blank"
                  >
                    {SOCIAL_ICONS[s.label]}
                    {s.label}
                    <span className="sr-only"> — {site.full}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        <div className="foot-bottom">
          <span>
            &copy; {new Date().getFullYear()} {site.full}, {site.locality}, {site.region}. All rights reserved.
          </span>

        </div>
      </div>
    </footer>
  );
}