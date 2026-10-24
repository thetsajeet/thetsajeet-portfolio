import test from 'node:test';
import assert from 'node:assert/strict';
import { POST } from '../app/api/contact/route';
import { parseContactSubmission } from './contact';
import { getContactEmailConfig, getContactEnvironment } from './contact-config';

const validSubmission = {
  name: 'Alex Miller',
  email: 'alex@example.com',
  message: 'I would like to discuss an engineering opportunity.',
  website: '',
};

function request(body: unknown) {
  return new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-real-ip': '203.0.113.10',
    },
    body: JSON.stringify(body),
  });
}

test('contact validation trims fields and rejects invalid or oversized values', () => {
  const parsed = parseContactSubmission({
    ...validSubmission,
    name: '  Alex Miller  ',
    email: ' alex@example.com ',
    message: '  Hello  ',
  });
  assert.equal(parsed.success, true);
  if (parsed.success) {
    assert.equal(parsed.data.name, 'Alex Miller');
    assert.equal(parsed.data.email, 'alex@example.com');
    assert.equal(parsed.data.message, 'Hello');
  }

  assert.equal(parseContactSubmission({ ...validSubmission, email: 'invalid' }).success, false);
  assert.equal(parseContactSubmission({ ...validSubmission, name: 'a'.repeat(101) }).success, false);
  assert.equal(parseContactSubmission({ ...validSubmission, message: 'a'.repeat(5001) }).success, false);
});

test('contact environment defaults to development and selects isolated configuration sets', () => {
  const names = [
    'CONTACT_ENVIRONMENT',
    'CONTACT_DEV_RESEND_API_KEY',
    'CONTACT_DEV_EMAIL_FROM',
    'CONTACT_DEV_EMAIL_TO',
    'CONTACT_PROD_RESEND_API_KEY',
    'CONTACT_PROD_EMAIL_FROM',
    'CONTACT_PROD_EMAIL_TO',
  ];
  const originalEnvironment = Object.fromEntries(names.map((name) => [name, process.env[name]]));

  try {
    delete process.env.CONTACT_ENVIRONMENT;
    process.env.CONTACT_DEV_RESEND_API_KEY = 'dev-key';
    process.env.CONTACT_DEV_EMAIL_FROM = 'Portfolio Dev <dev@example.com>';
    process.env.CONTACT_DEV_EMAIL_TO = 'dev-inbox@example.com';
    process.env.CONTACT_PROD_RESEND_API_KEY = 'prod-key';
    process.env.CONTACT_PROD_EMAIL_FROM = 'Portfolio <example.com>';
    process.env.CONTACT_PROD_EMAIL_TO = 'owner@example.com';
    assert.equal(getContactEnvironment(), 'development');
    assert.equal(getContactEmailConfig().apiKey, 'dev-key');

    process.env.CONTACT_ENVIRONMENT = 'production';
    assert.equal(getContactEmailConfig().apiKey, 'prod-key');
  } finally {
    for (const name of names) {
      const value = originalEnvironment[name];
      if (value === undefined) delete process.env[name];
      else process.env[name] = value;
    }
  }
});

test('contact route treats honeypot submissions as accepted without sending email', async () => {
  const originalFetch = globalThis.fetch;
  let fetchCalled = false;
  globalThis.fetch = (async () => {
    fetchCalled = true;
    return Response.json({ result: 1 });
  }) as typeof fetch;

  try {
    const response = await POST(request({ ...validSubmission, website: 'https://spam.example' }));
    assert.equal(response.status, 200);
    assert.equal(fetchCalled, false);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('contact route rejects unsupported content types and oversized bodies', async () => {
  const unsupportedRequest = new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'content-type': 'text/plain' },
    body: 'name=Alex',
  });
  assert.equal((await POST(unsupportedRequest)).status, 415);

  const oversizedRequest = new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ ...validSubmission, message: 'a'.repeat(10_000) }),
  });
  assert.equal((await POST(oversizedRequest)).status, 413);
});

test('contact route sends valid submissions and rate-limits repeated requests', async () => {
  const originalFetch = globalThis.fetch;
  const environmentNames = [
    'CONTACT_ENVIRONMENT',
    'CONTACT_DEV_RESEND_API_KEY',
    'CONTACT_DEV_EMAIL_FROM',
    'CONTACT_DEV_EMAIL_TO',
    'CONTACT_DEV_UPSTASH_REDIS_REST_URL',
    'CONTACT_DEV_UPSTASH_REDIS_REST_TOKEN',
  ];
  const originalEnvironment = Object.fromEntries(
    environmentNames.map((name) => [name, process.env[name]])
  );
  let emailSent = false;
  let rateLimitCalls = 0;
  process.env.CONTACT_ENVIRONMENT = 'development';
  process.env.CONTACT_DEV_RESEND_API_KEY = 'test-key';
  process.env.CONTACT_DEV_EMAIL_FROM = 'Portfolio <contact@example.com>';
  process.env.CONTACT_DEV_EMAIL_TO = 'owner@example.com';
  process.env.CONTACT_DEV_UPSTASH_REDIS_REST_URL = 'https://redis.example.com';
  process.env.CONTACT_DEV_UPSTASH_REDIS_REST_TOKEN = 'test-token';
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    if (String(input).includes('/eval/')) {
      rateLimitCalls += 1;
      return Response.json({ result: rateLimitCalls === 2 ? 6 : 1 });
    }

    emailSent = true;
    assert.equal(init?.method, 'POST');
    const payload = JSON.parse(String(init?.body));
    assert.deepEqual(payload.to, ['owner@example.com']);
    assert.equal(payload.reply_to, validSubmission.email);
    return new Response(null, { status: 200 });
  }) as typeof fetch;

  try {
    const sentResponse = await POST(request(validSubmission));
    assert.equal(sentResponse.status, 200);
    assert.equal(emailSent, true);

    emailSent = false;
    const limitedResponse = await POST(request(validSubmission));
    assert.equal(limitedResponse.status, 429);
    assert.equal(limitedResponse.headers.get('Retry-After'), '600');
    assert.equal(emailSent, false);
  } finally {
    globalThis.fetch = originalFetch;
    for (const name of environmentNames) {
      const value = originalEnvironment[name];
      if (value === undefined) delete process.env[name];
      else process.env[name] = value;
    }
  }
});
