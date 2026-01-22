import { NextResponse } from 'next/server';
import { z } from 'zod';
import { cookies } from 'next/headers';

import { connectMongo } from '@/lib/mongoose';
import { UserModel } from '@/models/User';
import { hashPassword, parseAdminEmails, setSessionCookie, signSession } from '@/lib/auth';

const BodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1).max(100).optional(),
});

export async function POST(req: Request) {
  try {
    const json = await req.json().catch(() => null);
    const parsed = BodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const { email, password, name } = parsed.data;

    try {
      await connectMongo();
    } catch (mongoError: any) {
      console.error('MongoDB connection error:', mongoError);
      return NextResponse.json({ 
        error: 'Database connection failed. Please try again later or contact support if the problem persists.' 
      }, { status: 500 });
    }

    const existing = await UserModel.findOne({ email: email.toLowerCase() }).lean();
    if (existing) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 409 });
    }

    const admins = parseAdminEmails();
    const role = admins.has(email.toLowerCase()) ? 'admin' : 'user';

    const passwordHash = await hashPassword(password);
    const user = await UserModel.create({ email, name, passwordHash, role });

    const token = signSession({ sub: user._id.toString(), email: user.email, role });
    const cookieStore = await cookies();
    setSessionCookie(cookieStore, token);

    return NextResponse.json({
      ok: true,
      user: { id: user._id.toString(), email: user.email, name: user.name, role },
    });
  } catch (error: any) {
    console.error('Register error:', error);
    return NextResponse.json({ 
      error: error?.message ?? 'An unexpected error occurred. Please try again later.' 
    }, { status: 500 });
  }
}

