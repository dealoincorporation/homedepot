import { cookies } from 'next/headers';
import { SESSION_COOKIE_NAME, verifySession, type SessionPayload } from '@/lib/auth';

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    return verifySession(token);
  } catch {
    return null;
  }
}

export async function requireSession(): Promise<SessionPayload> {
  const session = await getSession();
  if (!session) throw new Error('UNAUTHORIZED');
  return session;
}

