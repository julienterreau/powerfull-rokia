import type { Video } from "@/content/types";

export const YOUTUBE_CHANNEL_ID = "UCcIgdsC0beKK-DxYaMtjTRg";
export const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@POWERFULLROKIA";

const gradients = [
  "linear-gradient(150deg,#1E6650,#0C3229)",
  "linear-gradient(150deg,#C9A866,#8E6B2F)",
  "linear-gradient(150deg,#2B4A44,#16302B)",
  "linear-gradient(150deg,#D9C79F,#A8875A)",
];

function decode(value: string) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

function field(entry: string, tag: string) {
  const match = entry.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`));
  return match ? decode(match[1]) : "";
}

export async function fetchYoutubeVideos(): Promise<Video[]> {
  const response = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`, {
    next: { revalidate: 1800 },
  });
  if (!response.ok) return [];
  const xml = await response.text();
  const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g) ?? [];
  return entries.flatMap((entry, index) => {
    const id = field(entry, "yt:videoId");
    const title = field(entry, "title");
    if (!id || !title) return [];
    const thumb = entry.match(/<media:thumbnail[^>]*url="([^"]+)"/);
    return [
      {
        title,
        youtubeUrl: `https://www.youtube.com/watch?v=${id}`,
        duration: "",
        category: "Chaîne",
        gradient: gradients[index % gradients.length],
        thumbnailUrl: thumb?.[1] ?? `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
        featured: false,
        publishedAt: field(entry, "published") || new Date().toISOString(),
        description: field(entry, "media:description"),
      },
    ];
  });
}
