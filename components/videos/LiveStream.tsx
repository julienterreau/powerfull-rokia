import { YOUTUBE_CHANNEL_ID } from "@/lib/youtube";

export function LiveStream({ className }: { className?: string }) {
  return (
    <iframe
      className={className}
      title="Direct Powerfull Rokia"
      src={`https://www.youtube-nocookie.com/embed/live_stream?channel=${YOUTUBE_CHANNEL_ID}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
}
