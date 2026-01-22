import nodemailer from 'nodemailer';

export type EmailInput = {
  to: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
};

function hasSmtpConfig() {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_PORT &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS,
  );
}

export async function sendEmail(input: EmailInput) {
  // “Plug & play”: if SMTP isn't configured yet, don't crash the app.
  if (!hasSmtpConfig()) {
    console.warn('[email] SMTP not configured; skipping send. Subject:', input.subject);
    return { skipped: true as const };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST!,
    port: Number(process.env.SMTP_PORT!),
    secure: Number(process.env.SMTP_PORT!) === 465,
    auth: {
      user: process.env.SMTP_USER!,
      pass: process.env.SMTP_PASS!,
    },
  });

  const from = process.env.EMAIL_FROM ?? 'no-reply@homedepot.local';

  await transporter.sendMail({
    from,
    to: input.to,
    subject: input.subject,
    text: input.text,
    html: input.html,
    replyTo: input.replyTo,
  });

  return { skipped: false as const };
}

