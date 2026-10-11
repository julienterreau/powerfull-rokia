import type { WhySection } from "@/content/types";
import { Button } from "../ui/Button";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";

export function WhyUs({ data }: { data: WhySection }) {
  return (
    <Section className="bg-sand-2">
      <div className="grid items-start gap-10 md:grid-cols-[0.82fr_1.18fr] md:gap-[72px]">
        <div>
          <SectionHeader eyebrow={data.eyebrow} title={data.title} titleAccent={data.titleAccent} lead={data.lead} stackAccent />
          {data.cta ? (
            <div className="mt-7">
              <Button {...data.cta} />
            </div>
          ) : null}
        </div>
        <ol className="m-0 list-none p-0">
          {data.features.map((feature, index) => (
            <li className="group grid grid-cols-[72px_1fr] gap-x-3 border-t border-line py-6 first:border-t-0 first:pt-0" key={feature.title}>
              <span className="font-serif text-[34px] leading-none font-normal text-gold italic">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="mt-1 font-serif text-2xl font-medium transition-colors group-hover:text-emerald md:text-[28px]">{feature.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-text-2">{feature.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
