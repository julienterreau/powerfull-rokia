import type { Tip } from "@/content/types";
import { Reveal } from "../ui/Reveal";

export function Tips({ items }: { items: Tip[] }) {
  return (
    <div className="how">
      {items.map((tip, index) => (
        <Reveal key={tip.number} delay={index * 0.06}>
          <article className="hw lift">
            <div className="n">{tip.number}</div>
            <h3>{tip.title}</h3>
            <p>{tip.text}</p>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
