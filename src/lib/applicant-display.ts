/** Display helpers for signed-in applicant (header, form prefill). */

export function applicantDisplayName(
  name: string | null | undefined,
  email: string | null | undefined,
): string {
  const n = name?.trim();
  if (n) return n;
  const e = email?.trim();
  if (e) {
    const local = e.split('@')[0];
    if (local) return local;
  }
  return 'Applicant';
}

export function applicantInitials(
  name: string | null | undefined,
  email: string | null | undefined,
): string {
  const n = name?.trim();
  if (n) {
    const parts = n.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      const a = parts[0][0];
      const b = parts[parts.length - 1][0];
      return `${a}${b}`.toUpperCase();
    }
    if (parts.length === 1 && parts[0].length >= 2) {
      return parts[0].slice(0, 2).toUpperCase();
    }
    if (parts.length === 1) return parts[0][0].toUpperCase();
  }
  const local = email?.split('@')[0]?.trim() ?? '';
  if (local.length >= 2) return local.slice(0, 2).toUpperCase();
  if (local.length === 1) return local.toUpperCase();
  return '?';
}

export function splitApplicantName(full: string | null | undefined): {
  firstName: string;
  lastName: string;
} {
  const t = full?.trim() ?? '';
  if (!t) return { firstName: '', lastName: '' };
  const parts = t.split(/\s+/).filter(Boolean);
  if (parts.length === 1) return { firstName: parts[0], lastName: '' };
  return { firstName: parts[0], lastName: parts.slice(1).join(' ') };
}
