"use client";

import { useEffect, useState } from "react";
import type { GlobalContent } from "@/content/types";
import { cn } from "@/lib/utils";
import { Logo } from "../ui/Logo";
import { MobileMenu } from "./MobileMenu";
import { NavPill } from "./NavPill";

export function Header({ global }: { global: GlobalContent }) {
  const [hidden, setHidden] = useState(false);
  const [compact, setCompact] = useState(false);
  const topMenu = global.menu.filter((item) => item.url !== "/diagnostic");
  const compactMenu = topMenu.filter((item) => item.url !== "/");

  useEffect(() => {
    let last = window.scrollY;
    function onScroll() {
      const y = window.scrollY;
      const delta = y - last;
      if (y < 40) {
        setHidden(false);
        setCompact(false);
      } else {
        if (delta > 8) setHidden(true);
        else if (delta < -8) setHidden(false);
        if (y > 80) setCompact(true);
      }
      last = y;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={cn("nav2", hidden && "nav-hide", compact && "nav-compact")}>
      <div className={cn("nav-row", !compact && "c")}>
        <Logo name={global.siteName} light={!compact} />
        <NavPill items={compact ? compactMenu : topMenu} />
        <a className={cn("btn nav-cta", compact ? "bp" : "bw")} href="/diagnostic">
          Faire le diagnostic
        </a>
        <MobileMenu items={global.menu} siteName={global.siteName} cta="Faire le diagnostic" />
      </div>
    </header>
  );
}
