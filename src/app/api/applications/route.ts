import { NextResponse } from 'next/server';
import { z } from 'zod';

import { connectMongo } from '@/lib/mongoose';
import { requireSession } from '@/lib/session';
import { ApplicationModel } from '@/models/Application';
import { UserModel } from '@/models/User';
import { MessageModel } from '@/models/Message';
import { parseAdminEmails } from '@/lib/auth';
import { sendEmail } from '@/lib/email';

const WorkExperienceSchema = z.object({
  company: z.string().min(1),
  position: z.string().min(1),
  startDate: z.string().min(1),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  description: z.string().optional(),
});

const EducationSchema = z.object({
  institution: z.string().min(1),
  degree: z.string().min(1),
  fieldOfStudy: z.string().optional(),
  startDate: z.string().min(1),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
});

const CreateSchema = z.object({
  jobTitle: z.string().min(1),
  jobAddress: z.string().optional(),
  reqId: z.string().optional(),
  // Personal Information
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  province: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
  // Experience
  workExperience: z.array(WorkExperienceSchema).optional(),
  education: z.array(EducationSchema).optional(),
  skills: z.array(z.string()).optional(),
  // Application Questions
  applicationQuestions: z.any().optional(),
  // Voluntary Disclosures
  voluntaryDisclosures: z.any().optional(),
  // Resume
  resumeUrl: z.string().optional(),
  resumeFileName: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const session = await requireSession().catch(() => null);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const json = await req.json().catch(() => null);
    const parsed = CreateSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    await connectMongo();

  const app = await ApplicationModel.create({
    userId: session.sub,
    jobTitle: parsed.data.jobTitle,
    jobAddress: parsed.data.jobAddress,
    reqId: parsed.data.reqId,
    status: 'Applied',
    statusHistory: [{ status: 'Applied', at: new Date() }],
    // Personal Information
    firstName: parsed.data.firstName,
    lastName: parsed.data.lastName,
    phone: parsed.data.phone,
    address: parsed.data.address,
    city: parsed.data.city,
    province: parsed.data.province,
    postalCode: parsed.data.postalCode,
    country: parsed.data.country,
    // Experience
    workExperience: parsed.data.workExperience,
    education: parsed.data.education,
    skills: parsed.data.skills,
    // Application Questions
    applicationQuestions: parsed.data.applicationQuestions,
    // Voluntary Disclosures
    voluntaryDisclosures: parsed.data.voluntaryDisclosures,
    // Resume
    resumeUrl: parsed.data.resumeUrl,
    resumeFileName: parsed.data.resumeFileName,
  });

  await MessageModel.create({
    applicationId: app._id,
    direction: 'system',
    body: `Application created for "${app.jobTitle}"`,
  });

  // Email notifications (optional)
  const admins = Array.from(parseAdminEmails());
  const user = await UserModel.findById(session.sub).lean();
  const userEmail = user?.email ?? session.email;

  if (admins.length > 0) {
    const applicantName = app.firstName && app.lastName 
      ? `${app.firstName} ${app.lastName}` 
      : userEmail;
    await sendEmail({
      to: admins.join(','),
      subject: `New application: ${app.jobTitle}`,
      text: `A new application has been submitted.\n\nApplicant: ${applicantName} (${userEmail})\nJob: ${app.jobTitle}\nLocation: ${app.jobAddress ?? 'N/A'}\nReqId: ${app.reqId ?? '-'}\nPhone: ${app.phone ?? 'N/A'}\n\nView details in the admin dashboard.`,
    });
  }

    await sendEmail({
      to: userEmail,
      subject: `We received your application: ${app.jobTitle}`,
      text: `Thanks for applying to The Home Depot Canada.\n\nJob: ${app.jobTitle}\nStatus: Applied\n\nYou can track your application in your dashboard.`,
    });

    return NextResponse.json({ ok: true, applicationId: app._id.toString() }, { status: 201 });
  } catch (err: any) {
    console.error('POST /api/applications error:', err);
    return NextResponse.json(
      { error: err?.message ?? 'Database connection failed. Please check your MongoDB connection.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await requireSession().catch(() => null);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectMongo();

    if (session.role === 'admin') {
      const apps = await ApplicationModel.find()
        .sort({ createdAt: -1 })
        .populate('userId', 'email name role')
        .lean();
      return NextResponse.json({ ok: true, applications: apps });
    }

    const apps = await ApplicationModel.find({ userId: session.sub }).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ ok: true, applications: apps });
  } catch (err: any) {
    console.error('GET /api/applications error:', err);
    return NextResponse.json(
      { error: err?.message ?? 'Database connection failed. Please check your MongoDB connection.' },
      { status: 500 }
    );
  }
}

