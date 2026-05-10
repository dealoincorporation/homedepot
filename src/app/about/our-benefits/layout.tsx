import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Benefits | The Home Depot Canada',
  description: 'Learn about the comprehensive benefits package offered to associates at The Home Depot Canada, including health benefits, retirement plans, tuition reimbursement, and more.',
  keywords: 'employee benefits, health benefits, retirement plans, tuition reimbursement, Home Depot Canada benefits',
  openGraph: {
    title: 'Our Benefits | The Home Depot Canada',
    description: 'Learn about the comprehensive benefits package offered to associates at The Home Depot Canada.',
    url: 'https://careers.homedepot.ca/about/our-benefits',
    type: 'website',
  },
};

export default function OurBenefitsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
