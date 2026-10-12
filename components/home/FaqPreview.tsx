import type { FaqItem, FaqPreviewSection } from "@/content/types";
import { Button } from "../ui/Button";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";
import { FaqList } from "../contact/Faq";

export function FaqPreview({ data, items }: { data: FaqPreviewSection; items: FaqItem[] }) {
  return (
    <Section className="py-[88px] md:py-[120px]">
      <div className="fq">
        <div>
          <SectionHeader eyebrow={data.eyebrow} title={data.title} titleAccent={data.titleAccent} lead={data.lead} />
          <div style={{ marginTop: 26 }}>
            <Button {...data.cta} />
          </div>
        </div>
        <FaqList items={items.filter((item) => item.showOnHome).slice(0, data.limit)} />
      </div>
    </Section>
  );
}
