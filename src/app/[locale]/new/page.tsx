import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import FieldVisitForm from './field-visit-form';

export default async function NewVisitPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) notFound();
  return <FieldVisitForm locale={locale as 'bn' | 'en' | 'ar'} />;
}
