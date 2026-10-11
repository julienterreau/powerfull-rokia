import type { ThemesSection } from "@/content/types";

export function ThemesStrip({ data }: { data: ThemesSection }) {
  const loop = [...data.items, ...data.items];
  return (
    <div className="strip">
      <div className="c">
        {loop.map((item, index) => (
          <span key={`${item}-${index}`} style={{ display: "contents" }}>
            {index > 0 ? <span className="s">✦</span> : null}
            <span>{item}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
