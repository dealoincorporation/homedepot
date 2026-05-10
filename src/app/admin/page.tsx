import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import AdminDashboard from '@/components/admin/AdminDashboard';

export default async function AdminPage() {
  const session = await getSession();
  if (!session) redirect('/applicant-login');
  if (session.role !== 'admin') redirect('/dashboard');

  return (
    <main className="bg-white min-h-[calc(100vh-80px)]">
      <AdminDashboard />
    </main>
  );
}

