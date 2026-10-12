"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LinkItem } from "@/content/types";
import { isActive } from "@/lib/utils";

export function NavPill({ items }: { items: LinkItem[] }) {
  const pathname = usePathname();
  return (
    <nav className="pill" aria-label="Navigation principale">
      {items.map((item) => (
        <Link key={item.url} href={item.url} className={isActive(pathname, item.url) ? "on" : undefined} aria-current={isActive(pathname, item.url) ? "page" : undefined}>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
