import { NextResponse } from 'next/server';
import { z } from 'zod';

import { connectMongo } from '@/lib/mongoose';
import { MessageModel } from '@/models/Message';

// This is a simple “plug & play” inbound email webhook endpoint.
// Wire your provider (SendGrid/Mailgun/etc) to POST here and map fields accordingly.
const BodySchema = z.object({
  applicationId: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  subject: z.string().optional(),
  body: z.string().min(1),
});

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = BodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  await connectMongo();
  await MessageModel.create({
    applicationId: parsed.data.applicationId,
    direction: 'inbound',
    from: parsed.data.from,
    to: parsed.data.to,
    subject: parsed.data.subject,
    body: parsed.data.body,
  });

  return NextResponse.json({ ok: true });
}

