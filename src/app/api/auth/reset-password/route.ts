import { NextResponse } from 'next/server';
import { z } from 'zod';

import { connectMongo } from '@/lib/mongoose';
import { UserModel } from '@/models/User';
import { hashPassword } from '@/lib/auth';

const BodySchema = z.object({
  token: z.string().min(1),
  password: z.string().min(8),
});

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = BodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const { token, password } = parsed.data;

  try {
    await connectMongo();
  } catch {
    return NextResponse.json(
      { error: 'Service temporarily unavailable. Please try again later.' },
      { status: 503 },
    );
  }

  const user = await UserModel.findOne({
    passwordResetToken: token.trim(),
    passwordResetExpires: { $gt: new Date() },
  });

  if (!user) {
    return NextResponse.json({ error: 'Invalid or expired reset link' }, { status: 400 });
  }

  const passwordHash = await hashPassword(password);
  await UserModel.updateOne(
    { _id: user._id },
    {
      $set: { passwordHash },
      $unset: { passwordResetToken: '', passwordResetExpires: '' },
    },
  );

  return NextResponse.json({ ok: true });
}
