import type { Metadata } from "next";
import "./globals.css";
import ConditionalLayout from "@/components/ConditionalLayout";
import { Toaster } from "react-hot-toast";

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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Lato:wght@300;400;700;900&family=Roboto+Condensed:wght@300;400;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#4ade80',
                secondary: '#fff',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}