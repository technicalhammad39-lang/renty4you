import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';

const pjs = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://rent4usolutions.com'),
  title: 'Rent4uSolutions | UK Property Sourcing & Investment Opportunities',
  description: 'Discover compliant UK property sourcing opportunities including rent-to-rent, serviced accommodation and council leasing deals for premium investors.',
  keywords: 'property sourcing UK, rent to rent deals UK, serviced accommodation deals, council leasing opportunities, property investment opportunities UK, buy to let investment deals, high cashflow property deals',
  authors: [{ name: 'Rent4uSolutions' }],
  creator: 'Rent4uSolutions',
  publisher: 'Rent4uSolutions',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    title: 'Rent4uSolutions | UK Property Sourcing & Investment',
    description: 'Discover compliant UK property sourcing opportunities including rent-to-rent, serviced accommodation and council leasing deals.',
    url: 'https://rent4usolutions.com',
    siteName: 'Rent4uSolutions',
    images: [
      {
        url: '/og-image.jpg', // Placeholder for OG image
        width: 1200,
        height: 630,
        alt: 'Rent4uSolutions Premium Property Sourcing UK',
      }
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rent4uSolutions | UK Property Sourcing',
    description: 'We source compliant, cashflow-focused Rent-to-Rent, Airbnb and Council Sourcing opportunities across the UK.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://rent4usolutions.com',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Rent4uSolutions",
  "url": "https://rent4usolutions.com",
  "logo": "https://rent4usolutions.com/Rent4you-light-mode.png",
  "description": "UK Property Sourcing & Investment Opportunities",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "UK"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "email": "info@rent4usolutions.com"
  },
  "sameAs": [
    "https://linkedin.com/company/rent4usolutions",
    "https://twitter.com/rent4usolutions"
  ]
};

import { SearchProvider } from '@/components/search-context';
import { PresenceTracker } from '@/components/presence-tracker';
import Script from 'next/script';
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={pjs.variable} suppressHydrationWarning>
      <head>
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased text-foreground bg-background" suppressHydrationWarning>
        <Providers>
          <SearchProvider>
            <PresenceTracker />
            {children}
          </SearchProvider>
        </Providers>
      </body>
    </html>
  );
}
