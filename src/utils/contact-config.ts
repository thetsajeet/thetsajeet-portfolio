export type ContactEnvironment = 'development' | 'production';

export interface ContactEmailConfig {
  apiKey: string;
  from: string;
  to: string;
}

export interface ContactRateLimitConfig {
  restUrl: string;
  restToken: string;
}

export function getContactEnvironment(): ContactEnvironment {
  const environment = process.env.CONTACT_ENVIRONMENT ?? 'development';
  if (environment !== 'development' && environment !== 'production') {
    throw new Error('CONTACT_ENVIRONMENT must be "development" or "production".');
  }
  return environment;
}

export function getContactEmailConfig(): ContactEmailConfig {
  const prefix = getContactEnvironment() === 'development' ? 'CONTACT_DEV' : 'CONTACT_PROD';
  const apiKey = process.env[`${prefix}_RESEND_API_KEY`];
  const from = process.env[`${prefix}_EMAIL_FROM`];
  const to = process.env[`${prefix}_EMAIL_TO`];

  if (!apiKey || !from || !to) {
    throw new Error(`Contact email is not configured for ${prefix === 'CONTACT_DEV' ? 'development' : 'production'}.`);
  }
  return { apiKey, from, to };
}

export function getContactRateLimitConfig(): ContactRateLimitConfig {
  const prefix = getContactEnvironment() === 'development' ? 'CONTACT_DEV' : 'CONTACT_PROD';
  const restUrl = process.env[`${prefix}_UPSTASH_REDIS_REST_URL`];
  const restToken = process.env[`${prefix}_UPSTASH_REDIS_REST_TOKEN`];

  if (!restUrl || !restToken) {
    throw new Error(`Contact rate limiter is not configured for ${prefix === 'CONTACT_DEV' ? 'development' : 'production'}.`);
  }
  return { restUrl, restToken };
}
