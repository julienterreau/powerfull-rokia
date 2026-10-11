import type { Video } from "@/content/types";
import { VideoCard } from "./VideoCard";

export function VideoGrid({ videos }: { videos: Video[] }) {
  return (
    <div className="vids g6" style={{ marginTop: 64 }}>
      {videos.map((video) => (
        <VideoCard key={video.title} video={video} />
      ))}
    </div>
  );
}
