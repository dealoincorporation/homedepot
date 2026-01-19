import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Career Growth | Learn, Grow & Succeed At The Home Depot Canada',
  description: 'Learn. Grow. Succeed. Successful projects start with serious know-how and a warm smile. If you love learning and the satisfaction of helping others, you can build a rewarding career at The Home Depot.',
  keywords: 'career growth, training, learning, development, Home Depot Canada',
  openGraph: {
    title: 'Career Growth | Learn, Grow & Succeed At The Home Depot Canada',
    description: 'Learn. Grow. Succeed. Successful projects start with serious know-how and a warm smile.',
    url: 'https://careers.homedepot.ca/about/career-benefits',
    type: 'website',
    images: [
      {
        url: '/images/social_image.jpg',
        width: 1200,
        height: 630,
        alt: 'The Home Depot Canada Careers',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Career Growth | Learn, Grow & Succeed At The Home Depot Canada',
    description: 'Learn. Grow. Succeed. Successful projects start with serious know-how and a warm smile.',
    images: ['/images/social_image.jpg'],
  },
};

export default function CareerBenefitsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}