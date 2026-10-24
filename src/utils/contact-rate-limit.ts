import { createHash } from 'node:crypto';

const RATE_LIMIT = 5;
const WINDOW_SECONDS = 10 * 60;
const RATE_LIMIT_SCRIPT =
  'local count = redis.call("INCR", KEYS[1]); if count == 1 then redis.call("EXPIRE", KEYS[1], ARGV[1]); end; return count';

export async function isContactRateLimited(clientIp: string): Promise<boolean> {
  const restUrl = process.env.UPSTASH_REDIS_REST_URL;
  const restToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!restUrl || !restToken) {
    throw new Error('Contact rate limiter is not configured.');
  }

  const endpoint = new URL(restUrl);
  if (endpoint.protocol !== 'https:') {
    throw new Error('Contact rate limiter URL must use HTTPS.');
  }

  const ipHash = createHash('sha256').update(clientIp).digest('hex');
  const key = `contact-rate-limit:${ipHash}`;
  const response = await fetch(
    `${endpoint.toString().replace(/\/$/, '')}/eval/${encodeURIComponent(RATE_LIMIT_SCRIPT)}/1/${encodeURIComponent(key)}/${WINDOW_SECONDS}`,
    {
      headers: { Authorization: `Bearer ${restToken}` },
      cache: 'no-store',
      signal: AbortSignal.timeout(5_000),
    }
  );

  if (!response.ok) {
    throw new Error(`Contact rate limiter returned HTTP ${response.status}.`);
  }

  const result: unknown = await response.json();
  if (
    typeof result !== 'object' ||
    result === null ||
    !('result' in result) ||
    typeof result.result !== 'number'
  ) {
    throw new Error('Contact rate limiter returned an invalid response.');
  }

  return result.result > RATE_LIMIT;
}
