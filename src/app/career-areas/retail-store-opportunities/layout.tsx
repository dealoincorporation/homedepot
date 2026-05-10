import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Retail Store Career Opportunities | The Home Depot Canada',
  description: 'Discover retail store career opportunities at The Home Depot Canada. Join our in-store team and build a rewarding career.',
  keywords: 'retail store jobs, in-store careers, retail opportunities, Home Depot Canada store jobs',
  openGraph: {
    title: 'Retail Store Career Opportunities | The Home Depot Canada',
    description: 'Discover retail store career opportunities at The Home Depot Canada.',
    url: 'https://careers.homedepot.ca/career-areas/retail-store-opportunities',
    type: 'website',
  },
};

export default function RetailStoreOpportunitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
