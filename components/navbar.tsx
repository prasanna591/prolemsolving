"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { nav, site, brandNav } from "@/lib/site";
import { Magnetic } from "@/components/magnetic";

/** Pointer Y at or above this hides the bar; below it, the bar is revealed. */
const REVEAL_BELOW = 96;

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLElement>(null);
  const pointerY = useRef(0);
  const frame = useRef(0);

  useEffect(() => {
    /** One rule for both the header band and the scrolled state, so the bar can
     *  never end up hidden *while the pointer is resting on it* — which is what
     *  happened when `pointermove` and `scroll` each set state independently. */
    const update = () => {
      const inHeader = pointerY.current > 0 && pointerY.current < REVEAL_BELOW;
      setHidden(!(inHeader || window.scrollY <= REVEAL_BELOW));
    };
    /** Coalesced to one read + one render per frame. `pointermove` fires well
     *  above frame rate, and the bar carries a `backdrop-filter`, so every
     *  redundant render was a redundant re-blend. */
    const schedule = () => {
      if (frame.current) return;
      frame.current = requestAnimationFrame(() => {
        frame.current = 0;
        setScrolled(window.scrollY > 16);
        update();
      });
    };
    const onMove = (e: PointerEvent) => {
      pointerY.current = e.clientY;
      schedule();
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame.current);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  /**
   * `inert` has to be set on the node directly. React 19 treats `offsetParent`
   * as a read-only property and silently drops the assignment, so `inert={...}`
   * never reached the DOM — the closed menu was only out of the tab order by
   * accident, via `visibility: hidden` in the CSS.
   */
  useEffect(() => {
    menuRef.current?.toggleAttribute("inert", !open);
  }, [open]);

  /**
   * The auto-hiding bar slides out with `transform`, which moves it off screen
   * but leaves it in the tab order — a keyboard user would tab through four nav
   * links, the CTA and the burger with the focus ring painted above the
   * viewport and no way to see it. `inert` removes the whole bar from the
   * accessibility tree and the tab order until it comes back.
   */
  useEffect(() => {
    barRef.current?.toggleAttribute("inert", hidden && !open);
  }, [hidden, open]);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      burgerRef.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    menuRef.current?.querySelector<HTMLElement>(".mm-link")?.focus();
    const onTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !menuRef.current) return;
      const focusables = Array.from(
        menuRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
      ).filter((el) => el.offsetParent !== null);
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || !menuRef.current.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onTab);
    return () => document.removeEventListener("keydown", onTab);
  }, [open]);

  /**
   * `trailingSlash: true` makes the exported HTML emit `/about/` and makes
   * `usePathname()` report `/about/`, so a bare `===` never matched and the
   * active link was dead on every nested route. A child route highlights its
   * nearest ancestor nav item, except for `/` which is only ever active exactly.
   */
  const isActive = (href: string) => {
    const trim = (p: string) => (p.length > 1 && p.endsWith("/") ? p.slice(0, -1) : p);
    const here = trim(pathname);
    const target = trim(href);
    if (here === target) return true;
    return target !== "/" && here.startsWith(`${target}/`);
  };

  return (
    <header
      ref={barRef}
      className={`nav-wrap ${scrolled || open ? "is-scrolled" : ""} ${hidden && !open ? "is-hidden" : ""}`}
    >
      <div className="container-x nav-inner">
        <Link href="/" className="nav-logo" aria-label={`${site.full} — home`}>
          {brandNav}
          <span className="nav-logo__lock">
            <span className="nav-logo__name">{site.full}</span>
          </span>
        </Link>

        <nav className="nav-links" aria-label="Primary">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className={isActive(item.href) ? "is-active" : ""}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="nav-cta">
          <Magnetic strength={3}>
            <Link href="/contact" className="btn btn--primary btn--sm">
              Let&rsquo;s Talk <ArrowRight className="arrow" size={16} strokeWidth={2.5} aria-hidden="true" />
            </Link>
          </Magnetic>
          <button
            ref={burgerRef}
            type="button"
            className={`nav-burger ${open ? "is-open" : ""}`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      <div ref={menuRef} id="mobile-menu" className={`mobile-menu ${open ? "is-open" : ""}`}>
        {nav.map((item) => (
          <Link key={item.href} href={item.href} className={`mm-link ${isActive(item.href) ? "is-active" : ""}`} onClick={() => setOpen(false)}>
            {item.label}
            <ArrowRight size={22} strokeWidth={2} aria-hidden="true" />
          </Link>
        ))}
<Link href="/contact" className="btn btn--primary mm-link mm-cta" onClick={() => setOpen(false)}>
          Let&rsquo;s Talk <ArrowRight size={18} strokeWidth={2.5} aria-hidden="true" />
        </Link>
      </div>
    </header>
  );
}
