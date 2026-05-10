import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search Open Jobs | The Home Depot Canada',
  description: 'Search and apply for open positions at The Home Depot Canada. Find jobs by location, career area, and job type.',
  keywords: 'job search, careers, Home Depot Canada jobs, apply now, job openings',
  openGraph: {
    title: 'Search Open Jobs | The Home Depot Canada',
    description: 'Search and apply for open positions at The Home Depot Canada.',
    url: 'https://careers.homedepot.ca/job-search',
    type: 'website',
  },
};

export default function JobSearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
