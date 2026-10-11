"use client";

import { useState } from "react";
import type { Article } from "@/content/types";
import { PostCard } from "./PostCard";

export function PostGrid({ articles, loadMore, empty }: { articles: Article[]; loadMore: string; empty: string }) {
  const [count, setCount] = useState(6);
  const visible = articles.slice(0, count);
  if (articles.length === 0) return <p className="disc">{empty}</p>;
  return (
    <>
      <div className="learn g6">
        {visible.map((article) => (
          <PostCard key={article.slug} article={article} />
        ))}
      </div>
      {count < articles.length ? (
        <div style={{ textAlign: "center", marginTop: 44 }}>
          <button className="btn bo" type="button" onClick={() => setCount((value) => value + 6)}>
            {loadMore}
          </button>
        </div>
      ) : null}
    </>
  );
}
