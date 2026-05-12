import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import AssociatePortal from '@/components/associate/AssociatePortal';
import AssociatePortalLocked from '@/components/associate/AssociatePortalLocked';

export const metadata: Metadata = {
  title: 'Current Associates | The Home Depot Canada Careers',
  description: 'Resources and links for current Home Depot Canada associates.',
};

export default async function AssociatePortalPage() {
  const session = await getSession();
  if (!session) {
    redirect('/applicant-login?redirect=/associate-portal');
  }
  if (session.role !== 'employee') {
    return <AssociatePortalLocked />;
  }
  return <AssociatePortal />;
}
