import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Social Responsibility | The Home Depot Canada',
  description: 'Learn about The Home Depot Canada\'s commitment to social responsibility and community engagement.',
  keywords: 'social responsibility, community engagement, corporate responsibility, Home Depot Canada',
  openGraph: {
    title: 'Social Responsibility | The Home Depot Canada',
    description: 'Learn about The Home Depot Canada\'s commitment to social responsibility.',
    url: 'https://careers.homedepot.ca/about/social-responsibility',
    type: 'website',
  },
};

export default function SocialResponsibilityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
