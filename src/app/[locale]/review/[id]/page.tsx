import { notFound } from 'next/navigation';
import { getFieldVisit } from '@/db/demo-store';
import { routing } from '@/i18n/routing';
import ReviewActions from './review-actions';
import bn from '@/i18n/bn.json';
import en from '@/i18n/en.json';
import ar from '@/i18n/ar.json';

export const dynamic = 'force-dynamic';
const messages = { bn, en, ar };

export default async function ReviewPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) notFound();
  const record = getFieldVisit(id);
  if (!record) notFound();
  const copy = messages[locale as keyof typeof messages];

  return (
    <main className="mx-auto max-w-5xl space-y-6 px-5 py-10 text-slate-900">
      <header>
        <a className="text-sm font-semibold text-blue-800 underline" href={`/${locale}`}>{copy.app_title}</a>
        <h1 className="mt-3 text-3xl font-bold">{copy.review}: {record.visit.id}</h1>
        <p className="mt-2 rounded-lg bg-amber-50 p-3 text-sm text-amber-900">{copy.review_guard}</p>
      </header>
      <section className="grid gap-6 md:grid-cols-2">
        <article className="rounded-xl border border-slate-200 p-5">
          <h2 className="mb-3 text-xl font-bold">{copy.transcript}</h2>
          {record.audio && <audio className="mb-4 w-full" controls src={`/api/field-visit/${record.visit.id}/audio`} />}
          <p className="whitespace-pre-wrap">{record.transcript}</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            {record.segments.map((segment, index) => <li key={`${segment.start_ms}-${index}`} className="rounded bg-slate-50 p-2">{segment.start_ms}-{segment.end_ms}ms · {segment.text}</li>)}
          </ul>
        </article>
        <article className="rounded-xl border border-slate-200 p-5">
          <h2 className="mb-3 text-xl font-bold">{copy.evidence}</h2>
          <ul className="space-y-2 text-sm">
            {record.evidence_refs.map((ref) => <li className="break-words rounded bg-slate-50 p-2" key={ref.id}>{ref.type}: {ref.ref}{ref.start_ms !== undefined ? ` (${ref.start_ms}-${ref.end_ms}ms)` : ''}</li>)}
          </ul>
          {record.image_observations.length > 0 && <p className="mt-3 text-sm">Image context only: {record.image_observations.join('; ')}</p>}
        </article>
      </section>
      <section className="grid gap-6 md:grid-cols-2">
        <article className="rounded-xl border border-slate-200 p-5">
          <h2 className="mb-3 text-xl font-bold">{copy.action_ledger}</h2>
          <dl className="space-y-3 text-sm">
            <div><dt className="font-semibold">Need</dt><dd>{record.ledger.need || '—'}</dd></div>
            <div><dt className="font-semibold">Description</dt><dd>{record.ledger.description_evidence_backed || '—'}</dd></div>
            <div><dt className="font-semibold">Commitment</dt><dd>{record.ledger.commitment || 'None stated'}</dd></div>
            <div><dt className="font-semibold">Responsible</dt><dd>{record.ledger.responsible_person_only_if_explicit || copy.responsible_unknown}</dd></div>
            <div><dt className="font-semibold">Deadline</dt><dd>{record.ledger.deadline_only_if_unambiguous || copy.deadline_unknown}</dd></div>
            <div><dt className="font-semibold">{copy.missing_info}</dt><dd>{record.ledger.missing_info.join(', ') || '—'}</dd></div>
            <div><dt className="font-semibold">{copy.follow_up}</dt><dd>{record.ledger.follow_up}</dd></div>
            <div><dt className="font-semibold">Confidence</dt><dd>{record.ledger.confidence} · model estimate, not truth</dd></div>
            <div><dt className="font-semibold">{copy.status}</dt><dd>{record.ledger.status}</dd></div>
          </dl>
        </article>
        <article className="rounded-xl border border-slate-200 p-5">
          <h2 className="mb-3 text-xl font-bold">{copy.draft_note}</h2>
          <pre className="whitespace-pre-wrap break-words rounded bg-slate-50 p-4 text-sm">{record.draft}</pre>
        </article>
      </section>
      <ReviewActions locale={locale as 'bn' | 'en' | 'ar'} visitId={id} ledger={record.ledger} approvals={record.approvals} />
    </main>
  );
}
