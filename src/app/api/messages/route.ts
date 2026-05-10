import { NextResponse } from 'next/server';

import { connectMongo } from '@/lib/mongoose';
import { requireSession } from '@/lib/session';
import { MessageModel } from '@/models/Message';
import { ApplicationModel } from '@/models/Application';

export async function GET(req: Request) {
  const session = await requireSession().catch(() => null);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const url = new URL(req.url);
  const applicationId = url.searchParams.get('applicationId');

  await connectMongo();

  if (applicationId) {
    const app = await ApplicationModel.findById(applicationId).lean();
    if (!app) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    if (session.role !== 'admin' && app.userId.toString() !== session.sub) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const messages = await MessageModel.find({ applicationId }).sort({ createdAt: 1 }).lean();
    return NextResponse.json({ ok: true, messages });
  }

  // Default: admin can view recent messages
  if (session.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const messages = await MessageModel.find().sort({ createdAt: -1 }).limit(100).lean();
  return NextResponse.json({ ok: true, messages });
}

