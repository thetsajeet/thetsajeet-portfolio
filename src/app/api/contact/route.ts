import { NextResponse } from 'next/server';
import {
  getClientIp,
  MAX_CONTACT_BODY_BYTES,
  parseContactSubmission,
} from '../../../utils/contact';
import { sendContactEmail } from '../../../utils/contact-email';
import { isContactRateLimited } from '../../../utils/contact-rate-limit';

export const runtime = 'nodejs';

async function readBoundedBody(request: Request): Promise<string | null> {
  const reader = request.body?.getReader();
  if (!reader) return '';

  const chunks: Uint8Array[] = [];
  let byteLength = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    byteLength += value.byteLength;
    if (byteLength > MAX_CONTACT_BODY_BYTES) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }

  const body = new Uint8Array(byteLength);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder('utf-8', { fatal: true }).decode(body);
}

export async function POST(request: Request) {
  if (request.headers.get('content-type')?.split(';', 1)[0].trim().toLowerCase() !== 'application/json') {
    return NextResponse.json({ error: 'Please submit the form using the provided fields.' }, { status: 415 });
  }

  const contentLength = Number(request.headers.get('content-length'));
  if (Number.isFinite(contentLength) && contentLength > MAX_CONTACT_BODY_BYTES) {
    return NextResponse.json({ error: 'Your message is too large. Please shorten it and try again.' }, { status: 413 });
  }

  let body: unknown;
  try {
    const text = await readBoundedBody(request);
    if (text === null) {
      return NextResponse.json({ error: 'Your message is too large. Please shorten it and try again.' }, { status: 413 });
    }
    body = JSON.parse(text);
  } catch {
    return NextResponse.json({ error: 'The form submission could not be read. Please try again.' }, { status: 400 });
  }

  if (
    typeof body === 'object' &&
    body !== null &&
    'website' in body &&
    typeof body.website === 'string' &&
    body.website.trim()
  ) {
    return NextResponse.json({ ok: true });
  }

  const parsed = parseContactSubmission(body);
  if (parsed.success === false) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const clientIp = getClientIp(request.headers);
  if (!clientIp) {
    console.error('Contact submission rejected because the client IP is unavailable.');
    return NextResponse.json({ error: 'We could not process your message right now. Please try again later.' }, { status: 503 });
  }

  try {
    if (await isContactRateLimited(clientIp)) {
      return NextResponse.json(
        { error: 'Too many messages were sent. Please wait a few minutes and try again.' },
        { status: 429, headers: { 'Retry-After': '600' } }
      );
    }
  } catch (error) {
    console.error('Contact rate limiting is unavailable.', error);
    return NextResponse.json({ error: 'We could not process your message right now. Please try again later.' }, { status: 503 });
  }

  try {
    await sendContactEmail(parsed.data);
  } catch (error) {
    console.error('Contact email delivery failed.', error);
    return NextResponse.json({ error: 'Your message could not be sent. Please try again shortly.' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
