'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import bn from '@/i18n/bn.json';
import en from '@/i18n/en.json';
import ar from '@/i18n/ar.json';
import type { ActionLedgerItem } from '@/core/ledger';
import type { ReviewApproval } from '@/db/demo-store';

const messages = { bn, en, ar };

export default function ReviewActions({ locale, visitId, ledger, approvals }: { locale: 'bn' | 'en' | 'ar'; visitId: string; ledger: ActionLedgerItem; approvals: ReviewApproval[] }) {
  const copy = messages[locale];
  const router = useRouter();
  const [reviewer, setReviewer] = useState('');
  const [correcting, setCorrecting] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [need, setNeed] = useState(ledger.need);
  const [commitment, setCommitment] = useState(ledger.commitment ?? '');
  const [responsible, setResponsible] = useState(ledger.responsible_person_only_if_explicit ?? '');
  const [deadline, setDeadline] = useState(ledger.deadline_only_if_unambiguous ?? '');
  const [reason, setReason] = useState('');

  async function send(decision: 'approved' | 'rejected' | 'corrected', correction?: Record<string, string>) {
    setBusy(true);
    setError('');
    try {
      const response = await fetch(`/api/review/${encodeURIComponent(visitId)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ decision, reviewer, correction }),
      });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error || 'Review update failed');
      router.refresh();
      setCorrecting(false);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Review update failed');
    } finally {
      setBusy(false);
    }
  }

  function submitCorrection(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void send('corrected', { need, commitment, responsible_person: responsible, deadline, reason });
  }

  return (
    <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-5">
      <label className="block max-w-md text-sm font-semibold">{copy.reviewer}
        <input className="mt-2 block w-full rounded-lg border border-slate-300 p-3 font-normal" required maxLength={120} value={reviewer} onChange={(event) => setReviewer(event.target.value)} />
      </label>
      <p className="text-sm text-slate-600">{copy.review_guard}</p>
      <div className="flex flex-wrap gap-3">
        <button disabled={busy || !reviewer.trim()} className="rounded-lg bg-green-800 px-4 py-2 font-semibold text-white disabled:opacity-50" onClick={() => void send('approved')} type="button">{copy.approve}</button>
        <button disabled={busy || !reviewer.trim()} className="rounded-lg bg-red-800 px-4 py-2 font-semibold text-white disabled:opacity-50" onClick={() => void send('rejected')} type="button">{copy.reject}</button>
        <button disabled={busy || !reviewer.trim()} className="rounded-lg border border-slate-400 px-4 py-2 font-semibold disabled:opacity-50" onClick={() => setCorrecting(!correcting)} type="button">{copy.correct}</button>
      </div>
      {correcting && <form className="grid gap-4 border-t border-slate-200 pt-4 md:grid-cols-2" onSubmit={submitCorrection}>
        <label className="text-sm font-semibold">Need<input className="mt-1 block w-full rounded border p-2 font-normal" value={need} onChange={(event) => setNeed(event.target.value)} /></label>
        <label className="text-sm font-semibold">Commitment<input className="mt-1 block w-full rounded border p-2 font-normal" value={commitment} onChange={(event) => setCommitment(event.target.value)} /></label>
        <label className="text-sm font-semibold">Responsible person<input className="mt-1 block w-full rounded border p-2 font-normal" value={responsible} onChange={(event) => setResponsible(event.target.value)} /></label>
        <label className="text-sm font-semibold">Deadline<input className="mt-1 block w-full rounded border p-2 font-normal" value={deadline} onChange={(event) => setDeadline(event.target.value)} /></label>
        <label className="text-sm font-semibold md:col-span-2">{copy.reason}<textarea className="mt-1 block w-full rounded border p-2 font-normal" required value={reason} onChange={(event) => setReason(event.target.value)} /></label>
        <button className="rounded-lg bg-slate-800 px-4 py-2 font-semibold text-white disabled:opacity-50" disabled={busy} type="submit">{copy.correct}</button>
      </form>}
      {error && <p role="alert" className="text-sm text-red-800">{error}</p>}
      {approvals.length > 0 && <div className="border-t pt-4 text-sm"><h3 className="font-bold">Review history</h3><ul className="mt-2 space-y-2">{approvals.map((approval) => <li key={approval.id}>{approval.decision} · {approval.reviewer} · {approval.created_at}{approval.correction?.reason ? ` · ${String(approval.correction.reason)}` : ''}</li>)}</ul></div>}
    </section>
  );
}
