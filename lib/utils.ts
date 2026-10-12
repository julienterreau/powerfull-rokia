export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function readingTime(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function articleText(blocks: { type: string; text?: string; translation?: string; title?: string }[]) {
  return blocks
    .map((block) => block.text || block.translation || block.title || "")
    .join(" ");
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" }).format(new Date(iso));
}

export function formatRelative(iso: string, now = Date.now()) {
  const days = Math.round((now - new Date(iso).getTime()) / 86_400_000);
  if (days <= 0) return "Aujourd'hui";
  if (days === 1) return "Il y a 1 jour";
  if (days < 7) return `Il y a ${days} jours`;
  if (days < 14) return "Il y a 1 semaine";
  if (days < 30) return `Il y a ${Math.round(days / 7)} semaines`;
  return formatDate(iso);
}

export function youtubeId(url: string) {
  const match = url.match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/);
  return match?.[1] ?? null;
}

export function youtubeSubscribeUrl(url: string) {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");
    if (host !== "youtube.com" && host !== "youtu.be") return url;
    parsed.searchParams.set("sub_confirmation", "1");
    return parsed.toString();
  } catch {
    return url;
  }
}

export function initial(handle: string) {
  const clean = handle.replace(/^@/, "");
  return (clean[0] || "?").toUpperCase();
}

export function isActive(pathname: string, url: string) {
  if (url === "/") return pathname === "/";
  return pathname === url || pathname.startsWith(`${url}/`);
}
