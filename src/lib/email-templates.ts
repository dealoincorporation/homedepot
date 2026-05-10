import { getAppBaseUrl } from '@/lib/app-url';

export function buildVerifyEmailUrl(token: string) {
  return `${getAppBaseUrl()}/api/auth/verify-email?token=${encodeURIComponent(token)}`;
}

export function buildResetPasswordUrl(token: string) {
  return `${getAppBaseUrl()}/reset-password?token=${encodeURIComponent(token)}`;
}
