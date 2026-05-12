import { NextResponse } from 'next/server';
import { z } from 'zod';
import { cookies } from 'next/headers';
import { randomBytes } from 'crypto';

import { connectMongo } from '@/lib/mongoose';
import { UserModel } from '@/models/User';
import { hashPassword, parseAdminEmails, setSessionCookie, signSession } from '@/lib/auth';
import { sendTemplatedEmail, isSendSkipped, EMAIL_NOT_CONFIGURED } from '@/lib/email';
import { buildVerifyEmailUrl } from '@/lib/email-templates';

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
    const verifyToken = randomBytes(32).toString('hex');
    const emailVerificationExpires = new Date(Date.now() + 48 * 60 * 60 * 1000);

    const user = await UserModel.create({
      email: email.toLowerCase(),
      name,
      passwordHash,
      role,
      emailVerified: role === 'admin' ? true : false,
      ...(role === 'admin'
        ? {}
        : {
            emailVerificationToken: verifyToken,
            emailVerificationExpires,
          }),
    });

    const verifyUrl = buildVerifyEmailUrl(verifyToken);
    try {
      if (role !== 'admin') {
        const sent = await sendTemplatedEmail({
          to: user.email,
          subject: 'Welcome — verify your email | The Home Depot Canada Careers',
          template: 'welcome-verify',
          data: { name: name ?? '', verifyUrl },
        });
        if (isSendSkipped(sent)) {
          await UserModel.deleteOne({ _id: user._id });
          return NextResponse.json({ error: EMAIL_NOT_CONFIGURED }, { status: 503 });
        }
      } else {
        const sent = await sendTemplatedEmail({
          to: user.email,
          subject: 'Welcome | The Home Depot Canada Careers',
          template: 'welcome',
          data: { name: name ?? '', preheader: 'Your administrator account is ready.' },
        });
        if (isSendSkipped(sent)) {
          console.warn('[auth/register] welcome email skipped (no transport); admin account still created');
        }
      }
    } catch (mailErr) {
      if (role !== 'admin') {
        await UserModel.deleteOne({ _id: user._id });
        console.error('[auth/register] verification email failed:', mailErr);
        return NextResponse.json(
          { error: 'Could not send the verification email. Please try again in a few minutes.' },
          { status: 503 },
        );
      }
      console.error('[auth/register] admin welcome email failed:', mailErr);
    }

    const cookieStore = await cookies();
    if (role === 'admin' || user.emailVerified === true) {
      const token = signSession({ sub: user._id.toString(), email: user.email, role });
      setSessionCookie(cookieStore, token);
    }

    return NextResponse.json({
      ok: true,
      user: { id: user._id.toString(), email: user.email, name: user.name, role },
      needsEmailVerification: role !== 'admin',
    });
  } catch (error: any) {
    console.error('Register error:', error);
    return NextResponse.json({ 
      error: error?.message ?? 'An unexpected error occurred. Please try again later.' 
    }, { status: 500 });
  }
}

