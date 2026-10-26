'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import bn from '@/i18n/bn.json';
import en from '@/i18n/en.json';
import ar from '@/i18n/ar.json';

const messages = { bn, en, ar };
type Locale = keyof typeof messages;

async function toBase64(file: File): Promise<string> {
  const bytes = new Uint8Array(await file.arrayBuffer());
  let binary = '';
  const chunkSize = 0x8000;
  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + chunkSize));
  }
  return btoa(binary);
}

export default function FieldVisitForm({ locale }: { locale: Locale }) {
  const copy = messages[locale];
  const router = useRouter();
  const [lang, setLang] = useState<Locale>(locale);
  const [text, setText] = useState('');
  const [audio, setAudio] = useState<File | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const [consent, setConsent] = useState({ text: false, audio: false, photo: false });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await fetch('/api/field-visit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lang,
          text,
          audio_base64: audio ? await toBase64(audio) : undefined,
          audio_mime: audio?.type || undefined,
          photo_base64: photo ? await toBase64(photo) : undefined,
          photo_mime: photo?.type || undefined,
          consent,
        }),
      });
      const result = await response.json() as { visit_id?: string; error?: string };
      if (!response.ok || !result.visit_id) throw new Error(result.error || 'Unable to create the visit draft');
      router.push(`/${locale}/review/${result.visit_id}`);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Unable to create the visit draft');
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-5 py-10 text-slate-900">
      <div className="mb-8 flex items-center justify-between gap-4">
        <Link className="text-sm font-semibold text-blue-800 underline" href={`/${locale}`}>{copy.app_title}</Link>
        <Link className="text-sm font-semibold text-blue-800 underline" href={`/${locale}/ledger`}>{copy.action_ledger}</Link>
      </div>
      <h1 className="mb-2 text-3xl font-bold">{copy.new_visit}</h1>
      <p className="mb-6 text-sm text-slate-600">{copy.review_guard}</p>
      <form className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" onSubmit={submit}>
        <label className="block text-sm font-semibold">Language
          <select className="mt-2 block w-full rounded-lg border border-slate-300 p-3" value={lang} onChange={(event) => setLang(event.target.value as Locale)}>
            <option value="bn">বাংলা</option><option value="en">English</option><option value="ar">العربية</option>
          </select>
        </label>
        <label className="block text-sm font-semibold">{copy.visit_text}
          <textarea className="mt-2 block min-h-32 w-full rounded-lg border border-slate-300 p-3 font-normal" maxLength={12000} value={text} onChange={(event) => setText(event.target.value)} />
        </label>
        <label className="block text-sm font-semibold">{copy.upload_audio}
          <input className="mt-2 block w-full rounded-lg border border-slate-300 p-3 font-normal" type="file" accept="audio/*" onChange={(event) => setAudio(event.target.files?.[0] ?? null)} />
        </label>
        <p className="-mt-4 text-xs text-slate-600">{copy.audio_only_wav_note}</p>
        <label className="block text-sm font-semibold">{copy.upload_photo}
          <input className="mt-2 block w-full rounded-lg border border-slate-300 p-3 font-normal" type="file" accept="image/*" onChange={(event) => setPhoto(event.target.files?.[0] ?? null)} />
        </label>
        <fieldset className="space-y-3 rounded-lg bg-slate-50 p-4">
          <legend className="font-semibold">Consent</legend>
          <label className="flex items-start gap-3 text-sm"><input required type="checkbox" checked={consent.text} onChange={(event) => setConsent({ ...consent, text: event.target.checked })} />{copy.consent_text}</label>
          <label className="flex items-start gap-3 text-sm"><input required={!!audio} type="checkbox" checked={consent.audio} onChange={(event) => setConsent({ ...consent, audio: event.target.checked })} />{copy.consent_audio}</label>
          <label className="flex items-start gap-3 text-sm"><input required={!!photo} type="checkbox" checked={consent.photo} onChange={(event) => setConsent({ ...consent, photo: event.target.checked })} />{copy.consent_photo}</label>
        </fieldset>
        {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-800">{error}</p>}
        <button className="rounded-lg bg-blue-800 px-5 py-3 font-semibold text-white disabled:opacity-60" disabled={loading} type="submit">
          {loading ? copy.loading : copy.submit_visit}
        </button>
      </form>
    </main>
  );
}
