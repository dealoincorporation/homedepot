import nodemailer from 'nodemailer';

import { htmlToPlainText, renderEmailTemplate } from '@/lib/email-render';

export type EmailInput = {
  to: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
};

export type SendEmailResult =
  | { skipped: true; reason: 'no_transport' }
  | { skipped: false; via: 'smtp' | 'resend' };

function smtpHost(): string {
  return (process.env.SMTP_HOST ?? '').trim();
}

function isGmailSmtpHost(): boolean {
  const h = smtpHost().toLowerCase();
  return h === 'smtp.gmail.com' || h === 'gmail';
}

function hasSmtpConfig() {
  const user = (process.env.SMTP_USER ?? '').trim();
  const pass = (process.env.SMTP_PASS ?? '').trim();
  if (!user || !pass) return false;
  // Gmail: nodemailer `service: 'gmail'` does not require SMTP_PORT.
  if (isGmailSmtpHost()) return Boolean(smtpHost());
  return Boolean(smtpHost() && (process.env.SMTP_PORT ?? '').trim());
}

function hasResendConfig() {
  return Boolean(process.env.RESEND_API_KEY?.trim());
}

function getFromAddress(): string {
  return (process.env.EMAIL_FROM ?? 'no-reply@homedepot.local').trim();
}

/** Safe-ish log line for support (not full PII). */
function maskRecipient(to: string): string {
  const t = to.trim().toLowerCase();
  const at = t.indexOf('@');
  if (at <= 0) return '***';
  const local = t.slice(0, at);
  const domain = t.slice(at + 1);
  const show = local.slice(0, 2);
  return `${show}***@${domain}`;
}

function logEmailEvent(
  level: 'info' | 'warn' | 'error',
  message: string,
  extra?: Record<string, unknown>,
) {
  const line = extra ? `${message} ${JSON.stringify(extra)}` : message;
  if (level === 'error') console.error('[email]', line);
  else if (level === 'warn') console.warn('[email]', line);
  else console.info('[email]', line);
}

function createSmtpTransporter() {
  const user = (process.env.SMTP_USER ?? '').trim();
  const pass = (process.env.SMTP_PASS ?? '').trim();

  if (isGmailSmtpHost()) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass },
    });
  }

  const port = Number((process.env.SMTP_PORT ?? '').trim());
  // Port 587 uses STARTTLS — `secure: true` breaks the handshake for most providers (including Gmail).
  const implicitSsl = port === 465;
  const secure =
    implicitSsl ||
    (port !== 587 &&
      port !== 25 &&
      (process.env.SMTP_SECURE === 'true' || process.env.SMTP_SECURE === '1'));

  return nodemailer.createTransport({
    host: smtpHost(),
    port,
    secure,
    requireTLS: port === 587 && !secure,
    auth: { user, pass },
    ...(process.env.SMTP_TLS_REJECT_UNAUTHORIZED === 'false'
      ? { tls: { rejectUnauthorized: false } }
      : {}),
  });
}

async function sendViaSmtp(input: EmailInput): Promise<void> {
  const transporter = createSmtpTransporter();
  const from = getFromAddress();
  logEmailEvent('info', 'smtp_send_start', {
    transport: isGmailSmtpHost() ? 'nodemailer:gmail' : 'nodemailer:custom',
    host: isGmailSmtpHost() ? 'smtp.gmail.com' : smtpHost(),
    port: isGmailSmtpHost() ? '465(default)' : (process.env.SMTP_PORT ?? '').trim(),
    from,
    to: maskRecipient(input.to),
    subject: input.subject,
  });
  const info = await transporter.sendMail({
    from,
    to: input.to,
    subject: input.subject,
    text: input.text,
    html: input.html,
    replyTo: input.replyTo,
  });
  logEmailEvent('info', 'smtp_send_ok', {
    messageId: (info as { messageId?: string }).messageId,
    response: (info as { response?: string }).response,
    to: maskRecipient(input.to),
  });
}

async function sendViaResend(input: EmailInput): Promise<void> {
  const { Resend } = await import('resend');
  const resend = new Resend(process.env.RESEND_API_KEY!);
  const from = getFromAddress();
  const payload = {
    from,
    to: input.to,
    subject: input.subject,
    text: input.text,
    ...(input.html ? { html: input.html } : {}),
    ...(input.replyTo ? { replyTo: input.replyTo } : {}),
  };
  logEmailEvent('info', 'resend_send_start', {
    from,
    to: maskRecipient(input.to),
    subject: input.subject,
    hasHtml: Boolean(input.html),
  });
  const { data, error } = await resend.emails.send(payload);
  if (error) {
    logEmailEvent('error', 'resend_send_failed', { message: error.message, name: error.name });
    throw new Error(error.message ?? 'Resend send failed');
  }
  logEmailEvent('info', 'resend_send_ok', {
    id: data?.id,
    to: maskRecipient(input.to),
  });
}

export function isEmailConfigured(): boolean {
  return hasSmtpConfig() || hasResendConfig();
}

/**
 * Sends email: tries SMTP first when configured; on failure (or if SMTP missing),
 * falls back to Resend when RESEND_API_KEY is set.
 */
export async function sendEmail(input: EmailInput): Promise<SendEmailResult> {
  const text =
    input.text?.trim() ||
    (input.html ? htmlToPlainText(input.html) : '(no body)');

  const payload: EmailInput = { ...input, text };

  logEmailEvent('info', 'send_email_start', {
    subject: input.subject,
    to: maskRecipient(input.to),
    smtpConfigured: hasSmtpConfig(),
    resendConfigured: hasResendConfig(),
    from: getFromAddress(),
    hasHtml: Boolean(input.html),
  });

  if (hasSmtpConfig()) {
    try {
      await sendViaSmtp(payload);
      logEmailEvent('info', 'send_email_done', { via: 'smtp', subject: input.subject });
      return { skipped: false, via: 'smtp' };
    } catch (err) {
      logEmailEvent('error', 'smtp_send_failed', {
        message: err instanceof Error ? err.message : String(err),
        willTryResend: hasResendConfig(),
      });
      if (!hasResendConfig()) {
        throw err;
      }
      logEmailEvent('warn', 'smtp_fallback_to_resend');
    }
  }

  if (hasResendConfig()) {
    try {
      await sendViaResend(payload);
      logEmailEvent('info', 'send_email_done', { via: 'resend', subject: input.subject });
      return { skipped: false, via: 'resend' };
    } catch (err) {
      logEmailEvent('error', 'resend_send_failed_fatal', {
        message: err instanceof Error ? err.message : String(err),
      });
      throw err;
    }
  }

  if (!hasSmtpConfig()) {
    logEmailEvent('warn', 'send_email_skipped_no_transport', {
      subject: input.subject,
      to: maskRecipient(input.to),
      hint: 'Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS and/or RESEND_API_KEY + EMAIL_FROM',
    });
    return { skipped: true, reason: 'no_transport' };
  }

  throw new Error('Email delivery failed (SMTP error and no Resend fallback succeeded)');
}

export type TemplatedEmailInput = {
  to: string;
  subject: string;
  /** EJS filename without path, e.g. `welcome-verify` → `src/emails/welcome-verify.ejs` */
  template: string;
  data: Record<string, unknown>;
  replyTo?: string;
};

export async function sendTemplatedEmail(input: TemplatedEmailInput): Promise<SendEmailResult> {
  logEmailEvent('info', 'templated_render_start', {
    template: input.template,
    subject: input.subject,
    to: maskRecipient(input.to),
  });
  let html: string;
  try {
    html = await renderEmailTemplate(input.template, input.data);
  } catch (err) {
    logEmailEvent('error', 'templated_render_failed', {
      template: input.template,
      message: err instanceof Error ? err.message : String(err),
    });
    throw err;
  }
  logEmailEvent('info', 'templated_render_ok', {
    template: input.template,
    htmlBytes: html.length,
  });
  const text = htmlToPlainText(html);
  return sendEmail({
    to: input.to,
    subject: input.subject,
    text,
    html,
    replyTo: input.replyTo,
  });
}
