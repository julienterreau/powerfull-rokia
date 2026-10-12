"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Chip } from "../ui/Chip";

export function VideoFilter({ filters }: { filters: string[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const current = params.get("categorie") || filters[0] || "Toutes";
  return (
    <div className="chips" role="tablist" aria-label="Filtres vidéos">
      {filters.map((filter) => (
        <Chip key={filter} active={current === filter} onClick={() => router.push(filter === filters[0] ? "/videos" : `/videos?categorie=${encodeURIComponent(filter)}`)}>
          {filter}
        </Chip>
      ))}
    </div>
  );
}
