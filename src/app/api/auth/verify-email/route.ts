import { NextResponse } from 'next/server';

import { connectMongo } from '@/lib/mongoose';
import { UserModel } from '@/models/User';
import { getAppBaseUrl } from '@/lib/app-url';

export async function GET(req: Request) {
  const base = getAppBaseUrl();
  const url = new URL(req.url);
  const token = url.searchParams.get('token');
  if (!token?.trim()) {
    return NextResponse.redirect(new URL('/applicant-login?verify=missing', base));
  }

  try {
    await connectMongo();
  } catch {
    return NextResponse.redirect(new URL('/applicant-login?verify=error', base));
  }

  const user = await UserModel.findOne({
    emailVerificationToken: token.trim(),
    emailVerificationExpires: { $gt: new Date() },
  });

  if (!user) {
    return NextResponse.redirect(new URL('/applicant-login?verify=invalid', base));
  }

  await UserModel.updateOne(
    { _id: user._id },
    {
      $set: { emailVerified: true },
      $unset: { emailVerificationToken: '', emailVerificationExpires: '' },
    },
  );

  return NextResponse.redirect(new URL('/applicant-login?verify=success', base));
}
