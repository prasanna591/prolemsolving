import Link from "next/link";
import { nav, site, brandLockup } from "@/lib/site";

export function Footer() {
  return (
    <footer className="foot">
      <div className="foot-word" aria-hidden="true">PSM</div>
      <div className="container-x">
        <div className="foot-grid">
          <div className="foot-brand">
            {brandLockup}
            <p>{site.full} — building products and turning real-world problems into practical technology.</p>
          </div>
          <div className="foot-col">
            <h4>Company</h4>
            <Link href="/about">About</Link>
            <Link href="/about/motives">Why PSM exists</Link>
            <Link href="/about/founders">Our people</Link>
            <Link href="/work">Work</Link>
            <Link href="/contact">Let&rsquo;s Talk</Link>
            <Link href="/privacy">Privacy</Link>
          </div>
          <div className="foot-col">
            <h4>Build</h4>
            <Link href="/products">Products</Link>
            <Link href="/solutions">Solutions</Link>
          </div>
          <div className="foot-col">
            <h4>Frame it right</h4>
            <p style={{ fontSize: "0.96rem", lineHeight: 1.7 }}>
              We don&rsquo;t start with technology.
              <br />
              We start with the problem.
            </p>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© {new Date().getFullYear()} {site.full}. All rights reserved.</span>
          <span className="foot-mark">
            Building Products. <span className="pm">Solving Problems.</span>
          </span>
        </div>
      </div>
    </footer>
  );
}