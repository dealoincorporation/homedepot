import type { Metadata, Viewport } from "next";
import "./globals.css";
import ConditionalLayout from "@/components/ConditionalLayout";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/ThemeProvider";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#111111" },
  ],
};

export const metadata: Metadata = {
  title: "Careers at The Home Depot Canada | Apply Now",
  description: "Join The Home Depot Canada team! Discover a range of in-store, corporate, and distribution job opportunities near you.",
  keywords: "",
  authors: [{ name: "The Home Depot Canada" }],
  applicationName: "THD Canada Careers",
  appleWebApp: {
    capable: true,
    title: "THD Careers",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: [{ url: "/logo.avif", type: "image/avif" }],
    apple: "/logo.avif",
  },
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
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className="antialiased bg-primary text-text-primary transition-colors duration-300">
        <ServiceWorkerRegister />
        <Toaster 
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            className: "!bg-secondary/60 !backdrop-blur-xl !border !border-border-primary !text-text-primary !shadow-2xl !rounded-2xl !px-6 !py-4 !font-bold",
            style: {
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-color)',
            },
            success: {
              iconTheme: {
                primary: '#EE7125',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}