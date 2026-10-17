"use client";

import { useEffect, useRef, useState } from "react";
import type { Testimonial, TestimonialsSection } from "@/content/types";
import { initial } from "@/lib/utils";
import { Pattern } from "../ui/Pattern";
import { SectionHeader } from "../ui/SectionHeader";

const tones = ["#C4A15A", "#1E6650", "#8E6B2F"];

export function Testimonials({ data, items }: { data: TestimonialsSection; items: Testimonial[] }) {
  const list = items.filter((item) => item.visible);
  const [index, setIndex] = useState(0);
  const names = useRef<HTMLDivElement>(null);
  const current = list[index];

  useEffect(() => {
    const row = names.current;
    const name = row?.children[index] as HTMLElement | undefined;
    if (!row || !name || window.matchMedia("(min-width: 768px)").matches) return;
    row.scrollTo({ left: name.offsetLeft - (row.clientWidth - name.offsetWidth) / 2, behavior: "smooth" });
  }, [index]);

  if (!current) return null;

  function go(delta: number) {
    setIndex((value) => (value + delta + list.length) % list.length);
  }

  return (
    <section className="px-2 pt-2 pb-6">
      <div className="relative overflow-hidden rounded-3xl bg-emerald px-0 py-14 text-center text-white md:rounded-[40px] md:py-[88px] md:pb-14">
        <Pattern className="absolute inset-0 opacity-45" />
        <div className="c relative">
          <SectionHeader eyebrow={data.eyebrow} title={data.title} titleAccent={data.titleAccent} align="center" onDark stackAccent />
          <p className="mt-9 font-serif text-[84px] leading-none text-gold" aria-hidden>
            “
          </p>
          <p className="mx-auto mt-4 max-w-[680px] font-serif text-[22px] leading-snug font-normal text-gold-light italic md:text-[28px] md:leading-relaxed">{current.text}</p>
          <div ref={names} className="mt-8 flex snap-x snap-mandatory gap-2.5 overflow-x-auto scroll-smooth px-4 [-ms-overflow-style:none] [scrollbar-width:none] md:flex-wrap md:justify-center md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
            {list.map((item, itemIndex) => (
              <button
                className={`inline-flex shrink-0 snap-center items-center gap-2 rounded-full border border-white/20 py-1.5 pr-3.5 pl-1.5 text-sm font-semibold transition hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${itemIndex === index ? "bg-white text-emerald hover:bg-white" : "bg-white/10 text-white hover:bg-white/15"}`}
                key={item.handle}
                type="button"
                onClick={() => setIndex(itemIndex)}
              >
                <i className="grid size-7 place-items-center rounded-full text-[13px] text-white not-italic" style={{ background: tones[itemIndex % tones.length] }}>
                  {initial(item.handle)}
                </i>
                {item.handle}
              </button>
            ))}
          </div>
          <div className="mt-[22px] flex items-center justify-center gap-3.5">
            <button className="grid size-9 place-items-center rounded-full border border-white/30 bg-transparent text-white transition hover:-translate-y-0.5 hover:bg-white/10 motion-reduce:transition-none motion-reduce:hover:translate-y-0" type="button" aria-label="Témoignage précédent" onClick={() => go(-1)}>
              ←
            </button>
            <div className="flex items-center gap-1.5">
              {list.map((item, itemIndex) => (
                <button className={`h-2 rounded-full border-0 p-0 ${itemIndex === index ? "w-[22px] bg-gold" : "w-2 bg-white/35"}`} key={item.handle} type="button" aria-label={item.handle} onClick={() => setIndex(itemIndex)} />
              ))}
            </div>
            <button className="grid size-9 place-items-center rounded-full border border-white/30 bg-transparent text-white transition hover:-translate-y-0.5 hover:bg-white/10 motion-reduce:transition-none motion-reduce:hover:translate-y-0" type="button" aria-label="Témoignage suivant" onClick={() => go(1)}>
              →
            </button>
          </div>
          <p className="mt-6 text-[13px] text-[#9fb4ac]">{data.note}</p>
        </div>
      </div>
    </section>
  );
}
