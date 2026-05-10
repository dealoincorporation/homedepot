import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin | The Home Depot Canada Careers',
  description: 'Admin dashboard for managing applications.',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

