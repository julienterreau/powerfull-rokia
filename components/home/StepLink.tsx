"use client";

import { openCall } from "@/lib/open-call";

export function StepLink({ href, children }: { href: string; children: string }) {
  if (href === "#appel") {
    return (
      <a
        href="#appel"
        onClick={(event) => {
          event.preventDefault();
          openCall();
        }}
      >
        {children}
      </a>
    );
  }
  return <a href={href}>{children}</a>;
}
