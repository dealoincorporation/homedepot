import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Corporate Career Opportunities | The Home Depot Canada',
  description: 'Join The Home Depot Canada corporate team. Discover corporate career opportunities in Toronto, Ontario. Support our stores and customers with innovation, strategy, and excellence.',
  keywords: 'corporate jobs, Home Depot Canada careers, corporate opportunities, Toronto jobs, office jobs',
  openGraph: {
    title: 'Corporate Career Opportunities | The Home Depot Canada',
    description: 'Join The Home Depot Canada corporate team. Discover corporate career opportunities in Toronto, Ontario.',
    url: 'https://careers.homedepot.ca/career-areas/corporate-opportunities',
    type: 'website',
  },
};

export default function CorporateOpportunitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
