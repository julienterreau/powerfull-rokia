import type { LatestVideosSection, Video } from "@/content/types";
import { formatRelative, youtubeSubscribeUrl } from "@/lib/utils";
import { LiveStream } from "../videos/LiveStream";
import { Button } from "../ui/Button";
import { PlayIcon } from "../ui/icons";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";

const textLink =
  "mt-[18px] inline-flex w-fit items-center gap-1.5 border-b border-current pb-0.5 text-[15px] font-semibold text-emerald transition-[color,gap] hover:gap-2.5 hover:text-gold motion-reduce:transition-none";

export function LatestVideos({ data, videos }: { data: LatestVideosSection; videos: Video[] }) {
  const items = videos.slice(0, Math.max(data.limit - 1, 1));

  return (
    <Section>
      <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-center md:gap-8">
        <SectionHeader className="min-w-0 flex-1" eyebrow={data.eyebrow} title={data.title} titleAccent={data.titleAccent} lead={data.lead} />
        <Button {...data.cta} url={youtubeSubscribeUrl(data.cta.url)} />
      </div>
      <div className="mt-10 grid items-stretch gap-7 md:grid-cols-[1.35fr_0.9fr] md:gap-10">
        <div>
          <div className="relative h-[220px] overflow-hidden rounded-[28px] md:h-[390px]">
            <LiveStream className="absolute inset-0 size-full border-0" />
            <span className="pointer-events-none absolute top-4 left-4 z-10 rounded-full bg-gold-light px-3 py-1.5 text-[13px] font-semibold text-emerald">En direct</span>
          </div>
          <h3 className="mt-[18px] font-sans text-[22px] font-semibold tracking-normal">Le direct de la chaîne</h3>
          <span className="meta mt-1.5 block">Quand Julien est en ligne</span>
        </div>
        <div className="flex min-h-full flex-col">
          {items.map((video) => (
            <a className="group grid grid-cols-[112px_1fr] items-center gap-4 px-2.5 py-3.5 transition-colors not-first:shadow-[inset_0_1px_0_var(--line)] hover:bg-white/55 md:grid-cols-[148px_1fr]" href={video.youtubeUrl} key={video.youtubeUrl} target="_blank" rel="noreferrer">
              <div className="relative h-[88px] overflow-hidden rounded-2xl" style={{ background: video.gradient }}>
                {video.thumbnailUrl ? <img alt="" className="absolute inset-0 size-full object-cover" src={video.thumbnailUrl} /> : null}
                <span className="absolute top-1/2 left-1/2 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 transition group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100" aria-hidden>
                  <PlayIcon color="#0F3D33" size={14} />
                </span>
              </div>
              <div>
                <h3 className="font-sans text-base leading-snug font-semibold tracking-normal transition-colors group-hover:text-emerald">{video.title}</h3>
                <span className="meta mt-1 block">{[video.duration, formatRelative(video.publishedAt)].filter(Boolean).join(" · ")}</span>
              </div>
            </a>
          ))}
          <a className={`${textLink} mt-auto self-start pt-[18px] md:self-end`} href="/videos">
            Voir toutes les vidéos →
          </a>
        </div>
      </div>
    </Section>
  );
}
