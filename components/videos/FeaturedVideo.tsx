import type { Video } from "@/content/types";
import { Button } from "../ui/Button";
import { LiveStream } from "./LiveStream";
import { VideoCard } from "./VideoCard";

export function ChannelLive({ kicker, watchLabel, channelUrl }: { kicker: string; watchLabel: string; channelUrl: string }) {
  return (
    <article className="vfeat">
      <div className="th">
        <LiveStream className="absolute inset-0 size-full border-0" />
      </div>
      <div style={{ paddingRight: 24 }}>
        <span className="tg">{kicker}</span>
        <h2>En direct</h2>
        <p>La séance en direct de la chaîne, quand Julien est en ligne.</p>
        <div style={{ marginTop: 24 }}>
          <Button label={watchLabel} url={channelUrl} variant="primary" />
        </div>
      </div>
    </article>
  );
}

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
