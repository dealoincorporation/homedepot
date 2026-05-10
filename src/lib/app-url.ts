/**
 * Base URL for absolute links in emails (verification, password reset).
 * Set NEXT_PUBLIC_APP_URL in .env (e.g. http://localhost:3000 or https://yourdomain.com).
 */
export function getAppBaseUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, '');

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/$/, '')}`;

  return 'http://localhost:3000';
}
