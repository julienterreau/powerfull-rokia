import type { HeroSection } from "@/content/types";
import { Button } from "../ui/Button";
import { Cascade } from "../ui/Reveal";
import { Pattern } from "../ui/Pattern";

export function Hero({ data }: { data: HeroSection }) {
  return (
    <section className="hx flex h-[calc(100svh-16px)] min-h-0 flex-col pb-7 max-md:h-auto max-md:min-h-[calc(100svh-12px)] max-md:pb-10">
      <Pattern />
      <div className="glow" />
      <div className="c flex min-h-0 flex-1 flex-col">
        <div className="hin">
          <Cascade>
            <h1>
              {data.title} <em>{data.titleAccent}</em>
            </h1>
            <p className="l">{data.lead}</p>
          </Cascade>
          <Cascade delay={0.16}>
            <div className="hrow">
              <Button {...data.primary} />
              <Button {...data.secondary} />
            </div>
            <div className="gar">
              {data.guarantees.map((item) => (
                <span key={item}>✓ {item}</span>
              ))}
            </div>
          </Cascade>
        </div>
      </div>
    </section>
  );
}
