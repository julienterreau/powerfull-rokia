const hits = new Map<string, { count: number; start: number }>();

export function rateLimit(key: string, limit = 5, windowMs = 60_000) {
  const now = Date.now();
  const current = hits.get(key);
  if (!current || now - current.start > windowMs) {
    hits.set(key, { count: 1, start: now });
    return true;
  }
  if (current.count >= limit) return false;
  current.count += 1;
  return true;
}
