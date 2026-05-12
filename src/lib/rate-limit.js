/** @typedef {{ count: number, resetAt: number }} Bucket */

const buckets = new Map();

/** Fixed-window counter; suitable for coarse abuse damping on serverless (per-instance). */
export function checkRateLimit(key, { max, windowMs }) {
  const now = Date.now();
  const entry = buckets.get(key);
  if (!entry || now > entry.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    pruneStaleBuckets(now);
    return { ok: true };
  }
  if (entry.count >= max) {
    pruneStaleBuckets(now);
    return {
      ok: false,
      retryAfter: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)),
    };
  }
  entry.count++;
  pruneStaleBuckets(now);
  return { ok: true };
}

function pruneStaleBuckets(now) {
  if (buckets.size < 2500) return;
  for (const [key, bucket] of buckets) {
    if (now > bucket.resetAt + 60_000) buckets.delete(key);
  }
}
