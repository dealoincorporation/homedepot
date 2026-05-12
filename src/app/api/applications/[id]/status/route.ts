import { NextResponse } from 'next/server';
import { z } from 'zod';

import { connectMongo } from '@/lib/mongoose';
import { requireSession } from '@/lib/session';
import { ApplicationModel, type ApplicationStatus } from '@/models/Application';
import { UserModel } from '@/models/User';
import { MessageModel } from '@/models/Message';
import { sendEmail, isSendSkipped } from '@/lib/email';

const BodySchema = z.object({
  status: z.enum(['Applied', 'Under Review', 'Interview', 'Offer', 'Rejected', 'Hired']),
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

  const newStatus = parsed.data.status as ApplicationStatus;
  const app = await ApplicationModel.findById(id);
  if (!app) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  app.status = newStatus;
  app.statusHistory.push({ status: newStatus, at: new Date() });
  await app.save();

  await MessageModel.create({
    applicationId: app._id,
    direction: 'system',
    body: `Status updated to "${newStatus}"`,
  });

  const user = await UserModel.findById(app.userId);
  if (newStatus === 'Hired' && user?.role === 'user') {
    user.role = 'employee';
    await user.save();
  }

  let emailSent = false;
  if (user?.email) {
    let body = `Your application status was updated.\n\nJob: ${app.jobTitle}\nNew status: ${newStatus}\n`;
    if (newStatus === 'Hired') {
      body += `\nCongratulations — welcome to the team. You can use the same email and password to sign in to the Current Associates portal (link: "Current Associates" in the site header after you log in).\n`;
    }
    try {
      const result = await sendEmail({
        to: user.email,
        subject: `Application update: ${app.jobTitle}`,
        text: body,
      });
      emailSent = !isSendSkipped(result);
      if (isSendSkipped(result)) {
        console.error('[applications/status] applicant email skipped (no transport)');
      }
    } catch (err) {
      console.error('[applications/status] applicant email failed:', err);
    }
  }

  return NextResponse.json({ ok: true, emailSent });
}

