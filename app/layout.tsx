import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';

const pjs = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Rent4uSolutions | UK Property Sourcing for Rent-to-Rent, Airbnb & Council Leasing',
  description: 'Rent4uSolutions sources compliant, cashflow-focused Rent-to-Rent, Serviced Accommodation and Council Leasing opportunities for UK property investors.',
  keywords: 'UK property sourcing, rent to rent sourcing, serviced accommodation sourcing, Airbnb property sourcing UK, council leasing property, Rent4uSolutions',
  openGraph: {
    title: 'Rent4uSolutions | Premium UK Property Sourcing',
    description: 'We source compliant, cashflow-focused Rent-to-Rent, Serviced Accommodation and Council Leasing opportunities.',
    type: 'website',
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={pjs.variable} suppressHydrationWarning>
      <body className="font-sans antialiased text-foreground bg-background" suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
