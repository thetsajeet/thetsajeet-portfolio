# Contact form setup

The contact form sends submissions from a server-side Next.js route through [Resend](https://resend.com). Resend's free transactional-email tier currently includes 3,000 emails per month, with a limit of 100 per day; check its pricing page for current limits.

## Configure email delivery

1. Create a Resend account and verify a domain you control.
2. Add the DNS records Resend provides (including SPF and DKIM) and wait until the domain is verified.
3. Create a Resend API key.
4. Set `RESEND_API_KEY`, `CONTACT_EMAIL_FROM`, and `CONTACT_EMAIL_TO` in the deployment environment. Use a sender on the verified domain, such as `Portfolio Contact <contact@yourdomain.com>`. `CONTACT_EMAIL_TO` is the inbox that receives inquiries.
5. For local development, copy the values into `.env.local`. Never commit the API key.

The email uses the verified sender address and sets the submitter's validated address as `Reply-To`, so replies go directly to the visitor.

## Configure rate limiting

Create an Upstash Redis database and set `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` in the deployment environment. The endpoint atomically limits each client to five valid submissions per ten-minute window, using a SHA-256 hash of the client IP as the Redis key. The key expires automatically. The form also includes a honeypot field and server-side field, email, and body-size validation.

The route uses `x-real-ip`, then the rightmost address in `x-forwarded-for`. Deploy behind a trusted proxy that overwrites or appends these headers; do not allow clients to set trusted proxy headers directly. The form fails closed with a temporary error if the rate-limit service is unavailable or missing its credentials.

## Local verification

With all five environment variables configured, run `bun run dev` and submit the form. Provider credentials are accessed only by the server route; no submission content is logged by the application.
