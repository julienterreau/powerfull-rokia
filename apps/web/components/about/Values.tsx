import type { ValueItem } from "@/content/types";

export function Values({ items }: { items: ValueItem[] }) {
  return (
    <div className="vals">
      {items.map((item) => (
        <article className="vc" key={item.number}>
          <span className="n">{item.number}</span>
          <div>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
