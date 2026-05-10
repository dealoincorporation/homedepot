import path from 'node:path';

export const EMAILS_ROOT = path.join(process.cwd(), 'src', 'emails');

export async function renderEmailTemplate(
  template: string,
  data: Record<string, unknown>,
): Promise<string> {
  const ejsMod = await import('ejs');
  const ejs = ejsMod.default ?? ejsMod;
  const safeName = template.replace(/[^a-z0-9-]/gi, '');
  const filePath = path.join(EMAILS_ROOT, `${safeName}.ejs`);
  return new Promise((resolve, reject) => {
    ejs.renderFile(filePath, data, { root: EMAILS_ROOT, views: [EMAILS_ROOT] }, (err, str) => {
      if (err) reject(err);
      else resolve(str ?? '');
    });
  });
}

/** Minimal HTML → plain text for multipart/alternative. */
export function htmlToPlainText(html: string): string {
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<\/p>\s*<p[^>]*>/gi, '\n\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(h1|h2|div|tr)>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}
