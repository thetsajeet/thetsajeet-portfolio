export interface ContactSubmission {
  name: string;
  email: string;
  message: string;
  website: string;
}

export const MAX_CONTACT_BODY_BYTES = 10_000;

export function parseContactSubmission(
  value: unknown
): { success: true; data: ContactSubmission } | { success: false; error: string } {
  if (typeof value !== 'object' || value === null) {
    return { success: false, error: 'Please complete all fields and try again.' };
  }

  const fields = value as Record<string, unknown>;
  if (
    typeof fields.name !== 'string' ||
    typeof fields.email !== 'string' ||
    typeof fields.message !== 'string' ||
    (fields.website !== undefined && typeof fields.website !== 'string')
  ) {
    return { success: false, error: 'Please complete all fields and try again.' };
  }

  const name = fields.name.trim();
  const email = fields.email.trim();
  const message = fields.message.trim();
  const website = typeof fields.website === 'string' ? fields.website.trim() : '';

  if (!name || name.length > 100 || /[\u0000-\u001f\u007f]/.test(name)) {
    return { success: false, error: 'Please enter a valid name (up to 100 characters).' };
  }

  if (
    !email ||
    email.length > 254 ||
    /[\u0000-\u0020\u007f]/.test(email) ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return { success: false, error: 'Please enter a valid email address.' };
  }

  if (!message || message.length > 5_000) {
    return { success: false, error: 'Please enter a message up to 5,000 characters.' };
  }

  return { success: true, data: { name, email, message, website } };
}

export function getClientIp(headers: Headers): string | null {
  const realIp = headers.get('x-real-ip')?.trim();
  if (realIp) return realIp;

  const forwardedFor = headers.get('x-forwarded-for');
  if (!forwardedFor) return null;

  const addresses = forwardedFor.split(',').map((address) => address.trim()).filter(Boolean);
  return addresses.at(-1) ?? null;
}
