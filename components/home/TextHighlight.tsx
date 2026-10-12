import type { TextHighlightSection } from "@/content/types";
import { Button } from "../ui/Button";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";

export function TextHighlight({ data, tone }: { data: TextHighlightSection; tone: "sand2" | "sand" }) {
  return (
    <Section className={tone === "sand" ? "hl sand" : "hl"}>
      <SectionHeader eyebrow={data.eyebrow} title={data.title} titleAccent={data.titleAccent} lead={data.text} />
      <div style={{ marginTop: 28 }}>
        <Button label={data.ctaLabel} url={data.ctaHref} variant="primary" />
      </div>
    </Section>
  );
}
