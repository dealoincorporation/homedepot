import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { SESSION_COOKIE_NAME, verifySession } from '@/lib/auth';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return NextResponse.json({ user: null }, { status: 200 });

  try {
    const payload = verifySession(token);
    return NextResponse.json({ user: payload }, { status: 200 });
  } catch {
    return NextResponse.json({ user: null }, { status: 200 });
  }
}

