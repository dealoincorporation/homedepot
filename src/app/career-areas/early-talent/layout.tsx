import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Early Talent Programs | The Home Depot Canada',
  description: 'Launch your career with The Home Depot Canada Early Talent Programs. Discover internship, co-op, and career launch opportunities designed to help you grow, learn, and thrive.',
  keywords: 'early talent, internships, co-op programs, career launch, Home Depot Canada careers, student jobs',
  openGraph: {
    title: 'Early Talent Programs | The Home Depot Canada',
    description: 'Launch your career with The Home Depot Canada Early Talent Programs. Discover internship, co-op, and career launch opportunities.',
    url: 'https://careers.homedepot.ca/career-areas/early-talent',
    type: 'website',
  },
};

export default function EarlyTalentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
