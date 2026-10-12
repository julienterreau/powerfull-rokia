"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { LinkItem } from "@/content/types";
import { isActive } from "@/lib/utils";
import { MenuIcon } from "../ui/icons";
import { Logo } from "../ui/Logo";
import { useUiStore } from "@/lib/stores/ui";

export function MobileMenu({ items, siteName, cta }: { items: LinkItem[]; siteName: string; cta: string }) {
  const pathname = usePathname();
  const open = useUiStore((state) => state.menuOpen);
  const openMenu = useUiStore((state) => state.openMenu);
  const closeMenu = useUiStore((state) => state.closeMenu);
  const panel = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const node = panel.current;
    const focusable = () =>
      Array.from(node?.querySelectorAll<HTMLElement>("a, button") ?? []).filter((el) => !el.hasAttribute("disabled"));
    focusable()[0]?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") closeMenu();
      if (event.key !== "Tab" || !node) return;
      const items = focusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previous?.focus();
    };
  }, [open, closeMenu]);

  return (
    <>
      <button className="burger" type="button" aria-label="Ouvrir le menu" aria-expanded={open} onClick={openMenu}>
        <MenuIcon />
      </button>
      {typeof document !== "undefined"
        ? createPortal(
            <AnimatePresence>
              {open ? (
                <motion.div
                  ref={panel}
                  className="menu-overlay"
                  role="dialog"
                  aria-modal="true"
                  aria-label="Menu"
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: 16 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <div className="pat" aria-hidden />
                  <div className="menu-top">
                    <Logo name={siteName} light />
                    <button className="burger" type="button" aria-label="Fermer le menu" onClick={closeMenu}>
                      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
                        <path d="M6 6l12 12M18 6L6 18" stroke="#0F3D33" strokeWidth="2.2" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>
                  <nav className="menu-links" aria-label="Navigation mobile">
                    {items.map((item, index) => (
                      <Link key={item.url} href={item.url} className={isActive(pathname, item.url) ? "on" : undefined}>
                        <em>{String(index + 1).padStart(2, "0")}</em>
                        {item.label}
                      </Link>
                    ))}
                  </nav>
                  <Link className="btn bg" href="/diagnostic" onClick={closeMenu}>
                    {cta}
                  </Link>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </>
  );
}
