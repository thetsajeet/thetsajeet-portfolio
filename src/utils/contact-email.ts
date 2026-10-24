import type { ContactSubmission } from './contact';

export async function sendContactEmail(submission: ContactSubmission): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_EMAIL_FROM;
  const to = process.env.CONTACT_EMAIL_TO;
  if (!apiKey || !from || !to) {
    throw new Error('Contact email is not configured.');
  }

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
