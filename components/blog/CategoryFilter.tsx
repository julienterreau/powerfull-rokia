"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Chip } from "../ui/Chip";

export function CategoryFilter({ filters }: { filters: string[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const current = params.get("categorie") || "Tous";

  return (
    <div className="chips" role="tablist" aria-label="Catégories">
      {filters.map((filter) => (
        <Chip
          key={filter}
          active={current === filter}
          onClick={() => {
            const query = filter === "Tous" ? "/blog" : `/blog?categorie=${encodeURIComponent(filter)}`;
            router.push(query);
          }}
        >
          {filter}
        </Chip>
      ))}
    </div>
  );
}
