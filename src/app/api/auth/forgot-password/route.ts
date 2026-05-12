import { NextResponse } from 'next/server';
import { z } from 'zod';
import { randomBytes } from 'crypto';

import { connectMongo } from '@/lib/mongoose';
import { UserModel } from '@/models/User';
import { sendTemplatedEmail, isSendSkipped, EMAIL_NOT_CONFIGURED } from '@/lib/email';
import { buildResetPasswordUrl } from '@/lib/email-templates';

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
  // Same response whether user exists (avoid email enumeration)
  if (user) {
    console.info('[auth/forgot-password] user matched; generating reset token and sending mail');
    const token = randomBytes(32).toString('hex');
    const passwordResetExpires = new Date(Date.now() + 60 * 60 * 1000);
    await UserModel.updateOne(
      { _id: user._id },
      { $set: { passwordResetToken: token, passwordResetExpires } },
    );

    const resetUrl = buildResetPasswordUrl(token);
    try {
      const result = await sendTemplatedEmail({
        to: user.email,
        subject: 'Reset your password — The Home Depot Canada Careers',
        template: 'password-reset',
        data: { resetUrl },
      });
      console.info('[auth/forgot-password] send result:', JSON.stringify(result));
      if (isSendSkipped(result)) {
        console.error('[auth/forgot-password] email transport not configured (skipped)');
        return NextResponse.json({ error: EMAIL_NOT_CONFIGURED }, { status: 503 });
      }
    } catch (err) {
      console.error('[auth/forgot-password] send failed:', err);
      return NextResponse.json(
        {
          error:
            'We could not send a recovery email right now. Check spam, or try again in a few minutes. If it keeps failing, contact support.',
        },
        { status: 503 },
      );
    }
  } else {
    console.info(
      '[auth/forgot-password] no user for that email — no mail sent (by design); returning 200 ok',
    );
  }

  return NextResponse.json({ ok: true });
}
