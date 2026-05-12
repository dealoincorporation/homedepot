import { cookies } from 'next/headers';
import { SESSION_COOKIE_NAME, verifySession, type SessionPayload } from '@/lib/auth';
import { connectMongo } from '@/lib/mongoose';
import { UserModel } from '@/models/User';

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const payload = verifySession(token);
    try {
      await connectMongo();
      const doc = await UserModel.findById(payload.sub).select('role').lean();
      if (!doc) return null;
      return { ...payload, role: doc.role };
    } catch {
      return payload;
    }
  } catch {
    return null;
  }
}

export async function requireSession(): Promise<SessionPayload> {
  const session = await getSession();
  if (!session) throw new Error('UNAUTHORIZED');
  return session;
}

