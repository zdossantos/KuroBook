import '@/app/globals.css';

import { Analytics } from '@vercel/analytics/react';
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
 
export const metadata = {
  title: 'Next.js App Router + BetterAuth + Tailwind CSS',
  description:
    'A user admin dashboard configured with Next.js, Postgres, BetterAuth, Tailwind CSS, TypeScript, and Prettier.'
};


export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
 
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
      <Analytics />
    </html>
  );
}
