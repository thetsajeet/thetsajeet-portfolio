# Contact form setup

The contact form sends submissions from a server-side Next.js route through [Resend](https://resend.com). Resend's free transactional-email tier currently includes 3,000 emails per month, with a limit of 100 per day; check its pricing page for current limits.

## Configure email delivery

Create a Resend account/key and verify the sender domain. Configure `CONTACT_EMAIL_FROM` as an address on that verified domain, and set `CONTACT_EMAIL_TO` to the inbox that receives inquiries. For example, use `Portfolio Contact <contact@example.com>` as the sender and `ajeet@example.com` as the recipient. The submitter's validated address is used as `Reply-To`.

Use development/test credentials and a test inbox when running locally. Resend's free tier currently includes 3,000 transactional emails per month, capped at 100 per day; check its pricing page for current limits.

## Configure rate limiting

Create an Upstash Redis database and set `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`. The endpoint atomically limits each IP to five valid submissions per ten-minute window, using a SHA-256 hash as the Redis key. The key expires automatically.

The route uses `x-real-ip`, then the rightmost address in `x-forwarded-for`. Deploy behind a trusted proxy that overwrites or appends these headers; do not allow clients to set trusted proxy headers directly. The form also uses a honeypot and server-side field and body-size validation.

## Local verification

Copy `.env.example` to `.env` and fill in the values for local development/testing. Never commit real credentials. Provider credentials are accessed only by the server route; no submission content is logged by the application.
