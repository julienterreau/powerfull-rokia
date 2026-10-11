"use client";

import { useState } from "react";
import type { Video } from "@/content/types";
import { formatRelative, youtubeId } from "@/lib/utils";
import { Pattern } from "../ui/Pattern";
import { PlayIcon } from "../ui/icons";
import { VideoModal } from "./VideoModal";

export function VideoCard({ video, large = false }: { video: Video; large?: boolean }) {
  const [open, setOpen] = useState(false);
  const id = youtubeId(video.youtubeUrl);
  return (
    <article className="vd">
      <button className="th" type="button" style={{ background: video.gradient }} onClick={() => (id ? setOpen(true) : window.open(video.youtubeUrl, "_blank", "noopener"))}>
        {video.thumbnailUrl ? null : <Pattern />}
        <span className="play" aria-hidden>
          <PlayIcon color="#0F3D33" size={22} />
        </span>
        <span className="du">{video.duration}</span>
      </button>
      {!large ? (
        <>
          <h3>{video.title}</h3>
          <span className="meta">{video.description === "Titre et durée à remplacer" ? video.description : formatRelative(video.publishedAt)}</span>
        </>
      ) : null}
      {open && id ? <VideoModal id={id} title={video.title} onClose={() => setOpen(false)} /> : null}
    </article>
  );
}
