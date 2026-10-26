import Link from 'next/link';
import { routing } from '@/i18n/routing';
import LedgerTable from './ledger-table';

export default async function LedgerPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) return null;
  return (
    <main className="mx-auto max-w-6xl space-y-6 px-5 py-10 text-slate-900">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div><Link className="text-sm font-semibold text-blue-800 underline" href={`/${locale}`}>aLive Bangladesh Coordinator</Link><h1 className="mt-3 text-3xl font-bold">Action Ledger</h1></div>
        <Link className="rounded-lg bg-blue-800 px-4 py-2 font-semibold text-white" href={`/${locale}/new`}>New Field Visit</Link>
      </header>
      <LedgerTable locale={locale as 'bn' | 'en' | 'ar'} />
    </main>
  );
}
