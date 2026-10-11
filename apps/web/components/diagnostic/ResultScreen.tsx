import type { ResultBand, Video } from "@/content/types";

export function ResultScreen({ band, score, videos }: { band: ResultBand; score: number; videos: Video[] }) {
  return (
    <div className="result">
      <div className="qtop">
        <span>Votre orientation</span>
        <span>
          {score} oui / 20
        </span>
      </div>
      <h3>{band.title}</h3>
      <p>{band.text}</p>
      {videos.length > 0 ? (
        <ul>
          {videos.map((video) => (
            <li key={video.title}>
              <a href={video.youtubeUrl} target="_blank" rel="noreferrer">
                {video.title}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
