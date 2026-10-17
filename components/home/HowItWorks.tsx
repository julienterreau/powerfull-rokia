import type { HowSection } from "@/content/types";
import { Card } from "../ui/Card";
import { Reveal } from "../ui/Reveal";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";
import { StepLink } from "./StepLink";

export function HowItWorks({ data }: { data: HowSection }) {
  return (
    <Section>
      <SectionHeader eyebrow={data.eyebrow} title={data.title} titleAccent={data.titleAccent} lead={data.lead} align="center" />
      <div className="steps">
        {data.steps.map((step, index) => (
          <Reveal key={step.number} delay={index * 0.06}>
            <Card className="st">
              <div className="n">{step.number}</div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
              <StepLink href={step.url}>{step.linkLabel}</StepLink>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
