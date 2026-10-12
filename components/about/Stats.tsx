import type { Stat } from "@/content/types";

export function Stats({ items }: { items: Stat[] }) {
  return (
    <div className="stats">
      {items.map((item) => (
        <article className="stc" key={item.label}>
          <b>{item.value}</b>
          <span>{item.label}</span>
        </article>
      ))}
    </div>
  );
}
