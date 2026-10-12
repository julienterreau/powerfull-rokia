import type { Article } from "@/content/types";
import { articleText, readingTime } from "@/lib/utils";
import { Pattern } from "../ui/Pattern";

export function PostCard({ article }: { article: Article }) {
  const minutes = readingTime(articleText(article.blocks));
  return (
    <a className="lc lift" href={`/blog/${article.slug}`}>
      <div className="im pat" style={{ backgroundColor: article.coverColor }}>
        {article.coverUrl ? null : <Pattern />}
      </div>
      <div className="bd">
        <span className="tg">{article.category}</span>
        <h3>{article.title}</h3>
        <p>{article.excerpt}</p>
        <div className="meta">{minutes} min de lecture</div>
      </div>
    </a>
  );
}
