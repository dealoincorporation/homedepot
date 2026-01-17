import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Careers at The Home Depot Canada | Apply Now",
  description: "Join The Home Depot Canada team! Discover a range of in-store, corporate, and distribution job opportunities near you.",
  keywords: "",
  authors: [{ name: "The Home Depot Canada" }],
  openGraph: {
    title: "Careers at The Home Depot Canada | Apply Now",
    description: "Join The Home Depot Canada team! Discover a range of in-store, corporate, and distribution job opportunities near you.",
    url: "https://careers.homedepot.ca/",
    type: "website",
    images: [
      {
        url: "https://careers.homedepot.ca/images/social_image.jpg",
        width: 1200,
        height: 630,
        alt: "The Home Depot Canada Careers",
      },
    ],
    siteName: "The Home Depot Canada",
  },
  twitter: {
    card: "summary_large_image",
    site: "@HomeDepotCanada",
    title: "Careers at The Home Depot Canada | Apply Now",
    description: "Join The Home Depot Canada team! Discover a range of in-store, corporate, and distribution job opportunities near you.",
    images: ["https://careers.homedepot.ca/images/social_image.jpg"],
  },
  alternates: {
    canonical: "https://careers.homedepot.ca/",
    languages: {
      'en': 'https://careers.homedepot.ca/',
      'fr': 'https://careers.homedepot.ca/fr',
    },
  },
  other: {
    "Content-Language": "en",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className={`${inter.variable} font-sans`}>
        <Header />
        {children}
      </body>
    </html>
  );
}