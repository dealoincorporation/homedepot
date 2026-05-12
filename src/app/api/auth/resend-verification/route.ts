import { NextResponse } from 'next/server';
import { z } from 'zod';
import { randomBytes } from 'crypto';

import { connectMongo } from '@/lib/mongoose';
import { UserModel } from '@/models/User';
import { sendTemplatedEmail, isSendSkipped, EMAIL_NOT_CONFIGURED } from '@/lib/email';
import { buildVerifyEmailUrl } from '@/lib/email-templates';

const BodySchema = z.object({
  email: z.string().email(),
});

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = BodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  const email = parsed.data.email.toLowerCase();

  try {
    await connectMongo();
  } catch {
    return NextResponse.json(
      { error: 'Service temporarily unavailable. Please try again later.' },
      { status: 503 },
    );
  }

  const user = await UserModel.findOne({ email });
  if (user && user.emailVerified === false) {
    const verifyToken = randomBytes(32).toString('hex');
    const emailVerificationExpires = new Date(Date.now() + 48 * 60 * 60 * 1000);
    const verifyUrl = buildVerifyEmailUrl(verifyToken);
    try {
      const sent = await sendTemplatedEmail({
        to: user.email,
        subject: 'Verify your email — The Home Depot Canada Careers',
        template: 'verification',
        data: { name: user.name ?? '', verifyUrl },
      });
      if (isSendSkipped(sent)) {
        return NextResponse.json({ error: EMAIL_NOT_CONFIGURED }, { status: 503 });
      }
    } catch (err) {
      console.error('[auth/resend-verification] send failed:', err);
      return NextResponse.json(
        { error: 'Could not send the verification email. Please try again later.' },
        { status: 503 },
      );
    }
    await UserModel.updateOne(
      { _id: user._id },
      {
        $set: {
          emailVerificationToken: verifyToken,
          emailVerificationExpires,
        },
      },
    );
  }

  return NextResponse.json({ ok: true });
}
