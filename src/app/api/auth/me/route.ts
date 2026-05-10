import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { SESSION_COOKIE_NAME, verifySession } from '@/lib/auth';
import { connectMongo } from '@/lib/mongoose';
import { UserModel } from '@/models/User';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return NextResponse.json({ user: null }, { status: 200 });

  try {
    const payload = verifySession(token);

    try {
      await connectMongo();
      const doc = await UserModel.findById(payload.sub).select('email name role').lean();
      if (doc) {
        return NextResponse.json({
          user: {
            id: doc._id.toString(),
            email: doc.email,
            name: doc.name ?? null,
            role: doc.role,
          },
        });
      }
    } catch (dbErr) {
      console.error('[auth/me] database error:', dbErr);
    }

    return NextResponse.json({
      user: {
        id: payload.sub,
        email: payload.email,
        name: null,
        role: payload.role,
      },
    });
  } catch {
    return NextResponse.json({ user: null }, { status: 200 });
  }
}

