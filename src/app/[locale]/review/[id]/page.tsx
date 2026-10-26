import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import ReviewView from './review-view';

export const dynamic = 'force-dynamic';

export default async function ReviewPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) notFound();
  return <ReviewView locale={locale as 'bn' | 'en' | 'ar'} visitId={id} />;
}
