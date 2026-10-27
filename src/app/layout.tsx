import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { MeyooLauncher } from '@/components/meyoo-launcher';
import './[locale]/globals.css';

export const metadata: Metadata = {
  title: 'aLive Bangladesh Coordinator',
  description: 'Evidence-linked community coordination drafts for human review.'
};

export default async function RootLayout({
  children,
  params
}: Readonly<{ children: React.ReactNode; params: Promise<{ locale?: string }> }>) {
  const { locale: requestedLocale } = await params;
  const locale = requestedLocale ?? routing.defaultLocale;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) notFound();

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} className="h-full antialiased">
      <body className="min-h-full">{children}<MeyooLauncher /></body>
    </html>
  );
}
