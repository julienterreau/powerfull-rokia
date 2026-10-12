"use client";

import { useState } from "react";
import type { FaqItem } from "@/content/types";

export function FaqList({ items, labelledBy }: { items: FaqItem[]; labelledBy?: string }) {
  const [open, setOpen] = useState(0);
  return (
    <div id={labelledBy ? undefined : "faq"} aria-labelledby={labelledBy}>
      {items.map((item, index) => {
        const expanded = open === index;
        return (
          <div className="qi group" key={item.question}>
            <h3>
              <button className="qh transition-colors hover:text-emerald" type="button" aria-expanded={expanded} onClick={() => setOpen(expanded ? -1 : index)}>
                {item.question}
                <i className="mark transition group-hover:border-emerald group-hover:bg-emerald group-hover:text-gold-light" aria-hidden>
                  {expanded ? (
                    <svg width="14" height="14" viewBox="0 0 14 14">
                      <path d="M2.5 7h9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 14 14">
                      <path d="M7 2.5v9M2.5 7h9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  )}
                </i>
              </button>
            </h3>
            {expanded ? <p className="a">{item.answer}</p> : null}
          </div>
        );
      })}
    </div>
  );
}

export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div id="faq">
      <FaqList items={items} />
    </div>
  );
}
