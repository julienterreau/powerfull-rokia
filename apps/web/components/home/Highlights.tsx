import type { TextHighlightSection } from "@/content/types";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";

const textLink =
  "mt-[18px] inline-flex w-fit items-center gap-1.5 border-b border-current pb-0.5 text-[15px] font-semibold text-emerald transition-[color,gap] hover:gap-2.5 hover:text-gold motion-reduce:transition-none";

export function Highlights({ items }: { items: TextHighlightSection[] }) {
  return (
    <Section>
      <div className="grid md:grid-cols-2">
        {items.map((data, index) => (
          <article className={index === 0 ? "md:pr-14" : "mt-8 border-t border-line pt-9 md:mt-0 md:border-t-0 md:border-l md:pt-0 md:pl-14"} key={data.ctaHref}>
            <SectionHeader className="max-w-none" eyebrow={data.eyebrow} title={data.title} titleAccent={data.titleAccent} lead={data.text} stackAccent />
            <a className={textLink} href={data.ctaHref}>
              {data.ctaLabel} →
            </a>
          </article>
        ))}
      </div>
    </Section>
  );
}
