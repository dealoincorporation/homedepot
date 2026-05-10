import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Field Job Opportunities | The Home Depot Canada',
  description: 'Join The Home Depot Canada field team. Discover field job opportunities in distribution centers, warehouses, and contact centers across Canada.',
  keywords: 'field jobs, warehouse jobs, distribution jobs, contact center jobs, Home Depot Canada careers, field opportunities',
  openGraph: {
    title: 'Field Job Opportunities | The Home Depot Canada',
    description: 'Join The Home Depot Canada field team. Discover field job opportunities in distribution centers, warehouses, and contact centers across Canada.',
    url: 'https://careers.homedepot.ca/career-areas/field',
    type: 'website',
  },
};

export default function FieldLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
