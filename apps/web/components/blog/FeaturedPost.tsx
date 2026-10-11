import type { Article } from "@/content/types";
import { articleText, readingTime } from "@/lib/utils";
import { Button } from "../ui/Button";
import { Pattern } from "../ui/Pattern";

export function FeaturedPost({ article, kicker, readLabel }: { article: Article; kicker: string; readLabel: string }) {
  const minutes = readingTime(articleText(article.blocks));
  return (
    <article className="feat">
      <div className="im">
        <Pattern />
      </div>
      <div className="bd">
        <span className="tg">
          {kicker} · {article.category}
        </span>
        <h2>{article.title}</h2>
        <p>{article.excerpt}</p>
        <span className="meta">{minutes} min de lecture</span>
        <div style={{ marginTop: 26 }}>
          <Button label={readLabel} url={`/blog/${article.slug}`} variant="primary" />
        </div>
      </div>
    </article>
  );
}
