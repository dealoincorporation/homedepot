import { NextResponse } from 'next/server';
import { z } from 'zod';

import { connectMongo } from '@/lib/mongoose';
import { requireSession } from '@/lib/session';
import { ApplicationModel } from '@/models/Application';
import { UserModel } from '@/models/User';
import { MessageModel } from '@/models/Message';
import { sendEmail, isSendSkipped, EMAIL_NOT_CONFIGURED, type SendEmailResult } from '@/lib/email';

const BodySchema = z.object({
  applicationId: z.string().min(1),
  subject: z.string().min(1),
  body: z.string().min(1),
});

export async function POST(req: Request) {
  const session = await requireSession().catch(() => null);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (session.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const json = await req.json().catch(() => null);
  const parsed = BodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  await connectMongo();
  const app = await ApplicationModel.findById(parsed.data.applicationId);
  if (!app) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const user = await UserModel.findById(app.userId).lean();
  if (!user?.email) return NextResponse.json({ error: 'Applicant email missing' }, { status: 400 });

  let sent: SendEmailResult;
  try {
    sent = await sendEmail({
      to: user.email,
      subject: parsed.data.subject,
      text: parsed.data.body,
      replyTo: process.env.EMAIL_REPLY_TO,
    });
  } catch (err) {
    console.error('[messages/send] email failed:', err);
    return NextResponse.json(
      { error: 'Could not send the message by email. Check server email settings and try again.' },
      { status: 503 },
    );
  }
  if (isSendSkipped(sent)) {
    return NextResponse.json({ error: EMAIL_NOT_CONFIGURED }, { status: 503 });
  }

  await MessageModel.create({
    applicationId: app._id,
    direction: 'outbound',
    from: process.env.EMAIL_FROM,
    to: user.email,
    subject: parsed.data.subject,
    body: parsed.data.body,
  });

  return NextResponse.json({ ok: true });
}

