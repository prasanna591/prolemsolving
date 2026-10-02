import Link from "next/link";
import { site, brandMark } from "@/lib/site";

export function Footer() {
  return (
    <footer className="foot">
      <div className="foot-word" aria-hidden="true">PSM</div>
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
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="link-line"
                  style={{ fontSize: "0.96rem", fontWeight: 700 }}
                  rel="me noopener noreferrer"
                  target="_blank"
                >
                  {s.label}
                  <span className="sr-only"> — {site.full}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="foot-bottom">
          <span>
            &copy; {new Date().getFullYear()} {site.full}, {site.locality}, {site.region}. All rights reserved.
          </span>
          <span className="foot-mark">
            Building Products. <span className="pm">Solving Problems.</span>
          </span>
        </div>
      </div>
    </footer>
  );
}