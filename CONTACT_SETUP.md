# Contact form setup

The contact form sends submissions from a server-side Next.js route through [Resend](https://resend.com). Resend's free transactional-email tier currently includes 3,000 emails per month, with a limit of 100 per day; check its pricing page for current limits.

## Choose the contact environment

The route selects one isolated set of email and rate-limit credentials using `CONTACT_ENVIRONMENT`. It defaults to `development`, including when running a production build locally, so production email cannot be selected accidentally.

- Set `CONTACT_ENVIRONMENT=development` in local `.env.local` and configure only `CONTACT_DEV_*` values.
- Set `CONTACT_ENVIRONMENT=production` in the final deployment environment and configure its `CONTACT_PROD_*` values there.
- To test production credentials locally intentionally, set `CONTACT_ENVIRONMENT=production` in `.env.local`; this selects the production email and Redis settings together.

Both modes require their own Resend API key, sender, recipient, and Upstash Redis REST URL/token. Missing values fail closed; the code never falls back from one environment's credentials to the other.

## Configure email delivery

For each mode, create a Resend account/key and verify the sender domain. Configure `CONTACT_<MODE>_EMAIL_FROM` as an address on that verified domain, and set `CONTACT_<MODE>_EMAIL_TO` to the inbox that receives inquiries. For example, development could use `Portfolio Dev <contact-dev@example.com>` and `ajeet-test@example.com`, while production uses `Portfolio Contact <contact@example.com>` and `ajeet@example.com`. The submitter's validated address is used as `Reply-To`.

Use a separate development inbox (and preferably a separate Resend key/domain) so tests cannot email real recipients. Resend's free tier currently includes 3,000 transactional emails per month, capped at 100 per day; check its pricing page for current limits.

## Configure rate limiting

Create separate Upstash Redis databases for development and production. Set each mode's `CONTACT_<MODE>_UPSTASH_REDIS_REST_URL` and `CONTACT_<MODE>_UPSTASH_REDIS_REST_TOKEN`. The endpoint atomically limits each IP to five valid submissions per ten-minute window, using a SHA-256 hash as the Redis key. The key expires automatically.

The route uses `x-real-ip`, then the rightmost address in `x-forwarded-for`. Deploy behind a trusted proxy that overwrites or appends these headers; do not allow clients to set trusted proxy headers directly. The form also uses a honeypot and server-side field and body-size validation.

## Local verification

Copy `.env.example` to `.env.local`, set `CONTACT_ENVIRONMENT=development`, and configure the development values before running `bun run dev`. Never commit real credentials. Provider credentials are accessed only by the server route; no submission content is logged by the application.
