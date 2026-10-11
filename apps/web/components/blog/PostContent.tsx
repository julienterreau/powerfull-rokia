import type { Block } from "@/content/types";
import { youtubeId } from "@/lib/utils";

export function PostContent({ blocks }: { blocks: Block[] }) {
  return (
    <div className="body">
      {blocks.map((block, index) => {
        if (block.type === "paragraph") return <p key={index}>{block.text}</p>;
        if (block.type === "heading") return <h2 key={index}>{block.text}</h2>;
        if (block.type === "quote") return <blockquote className="pull" key={index}>{block.text}</blockquote>;
        if (block.type === "note") return <aside className="note" key={index}>{block.text}</aside>;
        if (block.type === "verse") {
          return (
            <figure className="verse" key={index} style={{ padding: "36px 0" }}>
              <div className="ar" dir="rtl" lang="ar">{block.arabic}</div>
              <blockquote>« {block.translation} »</blockquote>
              <cite>{block.reference}</cite>
            </figure>
          );
        }
        const id = youtubeId(block.url);
        return id ? (
          <div key={index} className="frame" style={{ marginTop: 24, borderRadius: 18, overflow: "hidden", aspectRatio: "16/9" }}>
            <iframe title={block.title} src={`https://www.youtube-nocookie.com/embed/${id}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{ width: "100%", height: "100%", border: 0 }} />
          </div>
        ) : null;
      })}
    </div>
  );
}
