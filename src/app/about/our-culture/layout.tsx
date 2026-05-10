import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Culture | The Home Depot Canada',
  description: 'Learn about The Home Depot Canada culture, our core values, and how we build strong teams and deliver exceptional service.',
  keywords: 'company culture, core values, workplace culture, Home Depot Canada culture, values',
  openGraph: {
    title: 'Our Culture | The Home Depot Canada',
    description: 'Learn about The Home Depot Canada culture and our core values.',
    url: 'https://careers.homedepot.ca/about/our-culture',
    type: 'website',
  },
};

export default function OurCultureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
