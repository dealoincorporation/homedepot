import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import UserDashboard from '@/components/user/UserDashboard';

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect('/applicant-login');
  if (session.role === 'admin') {
    // Admins can still access user dashboard, but default them to admin view.
    redirect('/admin');
  }

  return (
    <main className="bg-white min-h-[calc(100vh-80px)]">
      <UserDashboard />
    </main>
  );
}

