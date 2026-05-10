import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Applicant Login | The Home Depot Canada',
  description: 'Login to your applicant account to view your job applications and manage your profile at The Home Depot Canada.',
  keywords: 'applicant login, job applications, workday login, Home Depot Canada careers',
  openGraph: {
    title: 'Applicant Login | The Home Depot Canada',
    description: 'Login to your applicant account at The Home Depot Canada.',
    url: 'https://careers.homedepot.ca/applicant-login',
    type: 'website',
  },
};

export default function ApplicantLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
