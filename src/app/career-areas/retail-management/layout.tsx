import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Retail Management Career Opportunities | The Home Depot Canada',
  description: 'Discover retail management career opportunities at The Home Depot Canada. Lead teams, drive sales, and grow your career in retail management.',
  keywords: 'retail management jobs, store management careers, retail leadership, Home Depot Canada management',
  openGraph: {
    title: 'Retail Management Career Opportunities | The Home Depot Canada',
    description: 'Discover retail management career opportunities at The Home Depot Canada.',
    url: 'https://careers.homedepot.ca/career-areas/retail-management',
    type: 'website',
  },
};

export default function RetailManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
