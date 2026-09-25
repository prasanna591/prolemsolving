"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { nav, site, brandMark } from "@/lib/site";
import { Magnetic } from "@/components/magnetic";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [open, setOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    const onMove = (e: PointerEvent) => {
      setHidden(e.clientY >= 96);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        burgerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
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

  return (
    <header className={`nav-wrap ${scrolled || open ? "is-scrolled" : ""} ${hidden && !open ? "is-hidden" : ""}`}>
      <div className="container-x nav-inner">
        <Link href="/" className="nav-logo" aria-label={`${site.full} — home`}>
          {brandMark}
          <span className="nav-logo__lock">
            <span className="nav-logo__name">{site.full}</span>
            <span className="nav-logo__tag">{site.tagline}</span>
          </span>
        </Link>

        <nav className="nav-links" aria-label="Primary">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className={pathname === item.href ? "is-active" : ""}>
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

      <div ref={menuRef} id="mobile-menu" className={`mobile-menu ${open ? "is-open" : ""}`} inert={!open}>
        {nav.map((item) => (
          <Link key={item.href} href={item.href} className={`mm-link ${pathname === item.href ? "is-active" : ""}`} onClick={() => setOpen(false)}>
            {item.label}
            <ArrowRight size={22} strokeWidth={2} aria-hidden="true" />
          </Link>
        ))}
        <Link href="/contact" className="btn btn--primary mm-link mm-cta" onClick={() => setOpen(false)}>
          Let&rsquo;s Talk <ArrowRight size={18} strokeWidth={2.5} aria-hidden="true" />
        </Link>
        <div className="mm-foot">Building Products. Solving Problems.</div>
      </div>
    </header>
  );
}