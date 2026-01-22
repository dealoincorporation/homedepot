import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Applications | The Home Depot Canada Careers',
  description: 'Track your job applications and status updates.',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

