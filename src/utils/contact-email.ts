import type { ContactSubmission } from './contact';
import { getContactEmailConfig } from './contact-config';

export async function sendContactEmail(submission: ContactSubmission): Promise<void> {
  const { apiKey, from, to } = getContactEmailConfig();

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: submission.email,
      subject: 'New portfolio inquiry',
      text: [
        `Name: ${submission.name}`,
        `Email: ${submission.email}`,
        '',
        submission.message,
      ].join('\n'),
    }),
    cache: 'no-store',
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error(`Email provider returned HTTP ${response.status}.`);
  }
}
