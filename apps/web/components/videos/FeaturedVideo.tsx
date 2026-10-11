import type { Video } from "@/content/types";
import { Button } from "../ui/Button";
import { VideoCard } from "./VideoCard";

export function FeaturedVideo({ video, kicker, watchLabel }: { video: Video; kicker: string; watchLabel: string }) {
  return (
    <article className="vfeat">
      <VideoCard video={video} large />
      <div style={{ paddingRight: 24 }}>
        <span className="tg">{kicker}</span>
        <h2>{video.title}</h2>
        <p>{video.description}</p>
        <div style={{ marginTop: 24 }}>
          <Button label={watchLabel} url={video.youtubeUrl} variant="primary" />
        </div>
      </div>
    </article>
  );
}
