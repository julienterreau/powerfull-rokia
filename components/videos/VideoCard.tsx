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
        {video.thumbnailUrl ? <img alt="" src={video.thumbnailUrl} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} /> : <Pattern />}
        <span className="play" aria-hidden>
          <PlayIcon color="#0F3D33" size={22} />
        </span>
        {video.duration ? <span className="du">{video.duration}</span> : null}
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
