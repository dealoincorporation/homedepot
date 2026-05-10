import { NextResponse } from 'next/server';
import { z } from 'zod';

import { connectMongo } from '@/lib/mongoose';
import { requireSession } from '@/lib/session';
import { ApplicationModel } from '@/models/Application';
import { MessageModel } from '@/models/Message';

const BodySchema = z.object({
  requiredDocuments: z.array(z.string().trim().min(1)).max(20),
});

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const session = await requireSession().catch(() => null);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (session.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { id } = await ctx.params;
  const json = await req.json().catch(() => null);
  const parsed = BodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  await connectMongo();

  const app = await ApplicationModel.findById(id);
  if (!app) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  app.requiredDocuments = parsed.data.requiredDocuments;
  await app.save();

  await MessageModel.create({
    applicationId: app._id,
    direction: 'system',
    body: `Required documents updated (${parsed.data.requiredDocuments.length})`,
  });

  return NextResponse.json({ ok: true });
}

