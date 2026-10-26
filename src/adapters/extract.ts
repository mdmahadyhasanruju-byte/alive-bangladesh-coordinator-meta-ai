import { AdapterError, assertServerEnv, logRequestId, META_CONFIG, opaqueRequestId } from './config';

export type StructuredExtraction = {
  need: string;
  description_evidence_backed: string;
  commitment: string | null;
  responsible_person_only_if_explicit: string | null;
  deadline_only_if_unambiguous: string | null;
  missing_info: string[];
  follow_up: string;
  confidence: number;
  evidence_refs: unknown;
};

const systemPrompt = `You are evidence-linked extractor. Extract only explicit facts from transcript. NEVER invent responsible person, deadline, location, commitment. If not explicitly stated, return null. Return JSON only matching schema: need, description_evidence_backed, commitment, responsible_person_only_if_explicit, deadline_only_if_unambiguous, missing_info[], follow_up, confidence 0-1, evidence_refs. Every description sentence must be traceable to transcript segments. Missing deadline must stay null, not invented.`;
const datePattern = /\b(?:\d{4}[-/]\d{1,2}[-/]\d{1,2}|\d{1,2}[-/]\d{1,2}[-/]\d{2,4}|\d{1,2}\s+(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+\d{2,4})\b/i;
const responsibilityCue = /\b(?:responsible|will handle|will provide|will deliver|committed to|in charge)\b|দায়িত্ব|দায়িত্ব|سيتولى|مسؤول/i;

function sanitizeExtraction(value: unknown, transcript: string, segments: unknown[]): StructuredExtraction {
  if (!value || typeof value !== 'object') throw new AdapterError('INVALID_RESPONSE', 'Extraction response was invalid');
  const data = value as Record<string, unknown>;
  const explicitPerson = typeof data.responsible_person_only_if_explicit === 'string'
    && transcript.toLocaleLowerCase().includes(data.responsible_person_only_if_explicit.toLocaleLowerCase())
    && responsibilityCue.test(transcript)
    ? data.responsible_person_only_if_explicit
    : null;
  const proposedDeadline = typeof data.deadline_only_if_unambiguous === 'string'
    ? data.deadline_only_if_unambiguous
    : null;
  const explicitDeadline = proposedDeadline && datePattern.test(transcript) && transcript.includes(proposedDeadline)
    ? proposedDeadline
    : null;
  return {
    need: typeof data.need === 'string' ? data.need : '',
    description_evidence_backed: typeof data.description_evidence_backed === 'string' ? data.description_evidence_backed : '',
    commitment: typeof data.commitment === 'string' ? data.commitment : null,
    responsible_person_only_if_explicit: explicitPerson,
    deadline_only_if_unambiguous: explicitDeadline,
    missing_info: Array.isArray(data.missing_info) ? data.missing_info.filter((item): item is string => typeof item === 'string') : [],
    follow_up: typeof data.follow_up === 'string' ? data.follow_up : '',
    confidence: typeof data.confidence === 'number' ? Math.max(0, Math.min(1, data.confidence)) : 0,
    evidence_refs: data.evidence_refs ?? { audio_segments: segments },
  };
}

export async function extractStructured(
  transcript: string,
  segments: any[],
  lang: string,
): Promise<StructuredExtraction> {
  assertServerEnv();
  if (!META_CONFIG.apiKey) {
    const syntheticNeed = lang === 'bn'
      ? 'টিউবওয়েল নষ্ট'
      : lang === 'ar'
        ? 'إصلاح بئر المياه'
        : 'tube-well repair';
    return {
      need: syntheticNeed,
      description_evidence_backed: transcript || 'Synthetic demo evidence only.',
      commitment: null,
      responsible_person_only_if_explicit: null,
      deadline_only_if_unambiguous: null,
      missing_info: ['deadline'],
      follow_up: 'Confirm details with the participant.',
      confidence: 0.5,
      evidence_refs: segments[0] ? { audio_segment: segments[0] } : {},
    };
  }

  const requestId = opaqueRequestId();
  logRequestId(requestId);
  let response: Response;
  try {
    response = await fetch(`${META_CONFIG.apiUrl}/chat/completions`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${META_CONFIG.apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: META_CONFIG.models.extract,
        store: false,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `${transcript}\nLang:${lang}\nSegments:${JSON.stringify(segments)}` },
        ],
        response_format: { type: 'json_object' },
      }),
      signal: AbortSignal.timeout(20_000),
    });
  } catch (error) {
    if (error instanceof Error && (error.name === 'TimeoutError' || error.name === 'AbortError')) {
      throw new AdapterError('TIMEOUT', 'Extraction request timed out');
    }
    throw new AdapterError('UPSTREAM_ERROR', 'Extraction service unavailable');
  }
  if (!response.ok) throw new AdapterError('UPSTREAM_ERROR', `Extraction service returned ${response.status}`);
  const payload = await response.json() as { choices?: Array<{ message?: { content?: string | null } }> };
  const content = payload.choices?.[0]?.message?.content;
  if (typeof content !== 'string') throw new AdapterError('INVALID_RESPONSE', 'Extraction response was invalid');
  try {
    return sanitizeExtraction(JSON.parse(content), transcript, segments);
  } catch (error) {
    if (error instanceof AdapterError) throw error;
    throw new AdapterError('INVALID_RESPONSE', 'Extraction response was invalid');
  }
}
