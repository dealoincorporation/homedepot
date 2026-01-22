import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Job Details | The Home Depot Canada',
  description: 'View job details and apply for positions at The Home Depot Canada',
};

export default function JobDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
