import { NextResponse } from 'next/server';
import { analyzeImageOptional } from '@/adapters/image';
import { transcribeAudio } from '@/adapters/transcribe';
import { extractStructured } from '@/adapters/extract';
import { linkEvidence } from '@/core/evidence';
import { generateImpactNote } from '@/core/draft';
import { proposeLedger } from '@/core/ledger';
import { fieldVisitStore, listFieldVisits, type FieldVisitRecord } from '@/db/demo-store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const rows = listFieldVisits().map(({ visit, ledger, evidence_refs }) => ({
    visit_id: visit.id,
    need: ledger.need,
    responsible: ledger.responsible_person_only_if_explicit,
    deadline: ledger.deadline_only_if_unambiguous,
    status: ledger.status,
    evidence_count: evidence_refs.length,
    created_at: visit.created_at,
  }));
  return NextResponse.json(rows, { headers: { 'Cache-Control': 'no-store' } });
}

type VisitRequest = {
  lang?: unknown;
  text?: unknown;
  audio_base64?: unknown;
  audio_mime?: unknown;
  photo_base64?: unknown;
  photo_mime?: unknown;
  consent?: { text?: unknown; audio?: unknown; photo?: unknown };
};

function decodeBase64(value: unknown, label: string, maxBytes: number): Buffer | null {
  if (value === undefined || value === null || value === '') return null;
  if (typeof value !== 'string' || !/^[A-Za-z0-9+/]*={0,2}$/.test(value) || value.length % 4 !== 0) {
    throw new Error(`INVALID_${label.toUpperCase()}`);
  }
  const buffer = Buffer.from(value, 'base64');
  if (!buffer.length || buffer.length > maxBytes) throw new Error(`INVALID_${label.toUpperCase()}`);
  return buffer;
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (contentLength > 22 * 1024 * 1024) {
    return NextResponse.json({ error: 'Request is too large' }, { status: 413 });
  }

  let body: VisitRequest;
  try {
    body = await request.json() as VisitRequest;
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
  const langValue = body.lang;
  const text = typeof body.text === 'string' ? body.text.trim() : '';
  if (langValue !== 'bn' && langValue !== 'en' && langValue !== 'ar') {
    return NextResponse.json({ error: 'Unsupported language' }, { status: 400 });
  }
  const lang = langValue as 'bn' | 'en' | 'ar';
  if (text.length > 12_000) return NextResponse.json({ error: 'Text is too long' }, { status: 413 });

  let audio: Buffer | null;
  let photo: Buffer | null;
  try {
    audio = decodeBase64(body.audio_base64, 'audio', 10 * 1024 * 1024);
    photo = decodeBase64(body.photo_base64, 'photo', 8 * 1024 * 1024);
  } catch {
    return NextResponse.json({ error: 'Audio or photo data is invalid or too large' }, { status: 400 });
  }
  if (!text && !audio) return NextResponse.json({ error: 'Enter text or upload an audio recording' }, { status: 400 });
  if (photo && typeof body.photo_mime === 'string' && !['image/jpeg', 'image/png', 'image/webp'].includes(body.photo_mime)) {
    return NextResponse.json({ error: 'Photo format is not supported' }, { status: 400 });
  }

  const consent = body.consent;
  if (consent?.text !== true || (audio && consent.audio !== true) || (photo && consent.photo !== true)) {
    return NextResponse.json({ error: 'Required consent is missing' }, { status: 400 });
  }

  const audioMime = typeof body.audio_mime === 'string' ? body.audio_mime : 'audio/wav';
  const photoMime = typeof body.photo_mime === 'string' && ['image/jpeg', 'image/png', 'image/webp'].includes(body.photo_mime)
    ? body.photo_mime
    : 'image/jpeg';
  const visitId = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  let transcript = text;
  let segments: { start_ms: number; end_ms: number; text: string }[] = [];

  try {
    if (audio) {
      const result = await transcribeAudio(audio, audioMime, lang);
      transcript = [text, result.transcript].filter(Boolean).join('\n');
      segments = result.segments;
      if (text) segments = [{ start_ms: 0, end_ms: 0, text }, ...segments];
    } else {
      segments = [{ start_ms: 0, end_ms: text.length * 100, text }];
    }
    const extraction = await extractStructured(transcript, segments, lang);
    const image = await analyzeImageOptional(photo ?? undefined, photoMime);
    const enrichedExtraction = { ...extraction, source_transcript: transcript };
    const segmentTypes: Array<'audio_segment' | 'text'> = audio
      ? [
          ...(text ? ['text' as const] : []),
          ...segments.slice(text ? 1 : 0).map(() => 'audio_segment' as const),
        ]
      : segments.map(() => 'text' as const);
    const evidenceRefs = linkEvidence(visitId, transcript, segments, enrichedExtraction, image.hash, segmentTypes);
    if (!audio) {
      evidenceRefs.forEach((ref) => {
        if (ref.type !== 'audio_segment') return;
        const index = Number(ref.ref.split(':')[1]);
        const segment = segments[index];
        const start = segment ? transcript.indexOf(segment.text) : -1;
        ref.type = 'text';
        ref.ref = `text:${index}`;
        ref.start_char = start >= 0 ? start : 0;
        ref.end_char = start >= 0 && segment ? start + segment.text.length : 0;
        delete ref.start_ms;
        delete ref.end_ms;
      });
    }
    const ledger = proposeLedger(visitId, enrichedExtraction, evidenceRefs);
    const visit = { id: visitId, lang, created_at: createdAt, text };
    const draft = generateImpactNote(visit, enrichedExtraction, ledger);
    const record: FieldVisitRecord = {
      visit,
      transcript,
      segments,
      audio: audio ? { data: audio, mime: audioMime } : null,
      photo_hash: image.hash,
      image_observations: image.observations,
      extraction: enrichedExtraction,
      ledger,
      evidence_refs: evidenceRefs,
      draft,
      approvals: [],
    };
    fieldVisitStore.set(visitId, record);
    const clientRecord = {
      visit,
      transcript,
      segments,
      photo_hash: image.hash,
      image_observations: image.observations,
      extraction: enrichedExtraction,
      ledger,
      evidence_refs: evidenceRefs,
      draft,
      approvals: [],
    };
    return NextResponse.json({ visit_id: visitId, ledger_id: ledger.id, draft, record: clientRecord });
  } catch (error) {
    const code = typeof error === 'object' && error && 'code' in error ? String(error.code) : '';
    const message = code === 'INVALID_MEDIA'
      ? 'Audio format or duration is not supported'
      : code === 'TIMEOUT'
        ? 'Processing timed out; please try again'
        : 'Unable to process this field visit';
    const status = code === 'INVALID_MEDIA' ? 400 : code === 'TIMEOUT' ? 504 : 502;
    return NextResponse.json({ error: message }, { status });
  }
}
