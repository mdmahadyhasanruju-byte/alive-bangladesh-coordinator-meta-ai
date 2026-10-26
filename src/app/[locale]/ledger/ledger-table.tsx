'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import bn from '@/i18n/bn.json';
import en from '@/i18n/en.json';
import ar from '@/i18n/ar.json';

const messages = { bn, en, ar };
type Locale = keyof typeof messages;
type LedgerRow = {
  visit_id: string;
  need: string;
  responsible: string | null;
  deadline: string | null;
  status: 'pending_review' | 'approved' | 'rejected';
  evidence_count: number;
  created_at: string;
};

export default function LedgerTable({ locale }: { locale: Locale }) {
  const copy = messages[locale];
  const [rows, setRows] = useState<LedgerRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    fetch('/api/field-visit', { cache: 'no-store' })
      .then(async (response) => {
        if (!response.ok) throw new Error('Unable to load ledger');
        return response.json() as Promise<LedgerRow[]>;
      })
      .then((data) => { if (active) setRows(data); })
      .catch((caught: unknown) => { if (active) setError(caught instanceof Error ? caught.message : 'Unable to load ledger'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  if (loading) return <p className="rounded-xl bg-slate-50 p-5">{copy.loading}</p>;
  if (error) return <p role="alert" className="rounded-xl bg-red-50 p-5 text-red-800">{error}</p>;
  if (rows.length === 0) return <p className="rounded-xl bg-slate-50 p-5">{copy.no_visits}</p>;

  return <div className="overflow-x-auto rounded-xl border border-slate-200">
    <table className="w-full min-w-[850px] border-collapse text-left text-sm">
      <thead className="bg-slate-100"><tr>
        {[copy.visit_id, copy.need_label, copy.responsible_label, copy.deadline_label, copy.status, copy.evidence, copy.created_at, copy.review].map((label) => <th key={label} className="p-3 font-semibold">{label}</th>)}
      </tr></thead>
      <tbody>{rows.map((row) => <tr className="border-t border-slate-200" key={row.visit_id}>
        <td className="p-3"><Link className="text-blue-800 underline" href={`/${locale}/review/${row.visit_id}`}>{row.visit_id.slice(0, 8)}</Link></td>
        <td className="p-3">{row.need || '—'}</td>
        <td className="p-3">{row.responsible || copy.responsible_unknown}</td>
        <td className="p-3">{row.deadline || copy.deadline_unknown}</td>
        <td className="p-3">{row.status}<span className="mt-1 block text-xs">{row.status === 'approved' ? copy.verifiable_outcome : copy.not_verifiable}</span></td>
        <td className="p-3">{row.evidence_count}</td>
        <td className="p-3">{row.created_at}</td>
        <td className="p-3"><Link className="text-blue-800 underline" href={`/${locale}/review/${row.visit_id}`}>{copy.review}</Link></td>
      </tr>)}</tbody>
    </table>
  </div>;
}
