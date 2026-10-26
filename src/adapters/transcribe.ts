import { AdapterError, assertServerEnv, logRequestId, META_CONFIG, opaqueRequestId } from './config';

const ALLOWED_MIME_TYPES = new Set([
  'audio/webm',
  'audio/wav',
  'audio/mp3',
  'audio/mpeg',
  'audio/ogg',
]);

type Language = 'bn' | 'en' | 'ar';
type Segment = { start_ms: number; end_ms: number; text: string };
export type TranscriptionResult = {
  transcript: string;
  segments: Segment[];
  confidence: number;
  language_detected: string;
};

function estimateDurationMs(buffer: Buffer, mimeType: string): number {
  if (mimeType === 'audio/wav' && buffer.length >= 44 && buffer.toString('ascii', 0, 4) === 'RIFF') {
    const byteRate = buffer.readUInt32LE(28);
    const dataOffset = buffer.indexOf('data');
    if (byteRate > 0 && dataOffset >= 0 && dataOffset + 8 <= buffer.length) {
      const dataBytes = Math.min(buffer.readUInt32LE(dataOffset + 4), buffer.length - dataOffset - 8);
      return (dataBytes / byteRate) * 1000;
    }
  }
  // For compressed formats this is only an approximate size-based guard.
  const assumedBitsPerSecond = mimeType === 'audio/webm' ? 64000 : 128000;
  return (buffer.length * 8 * 1000) / assumedBitsPerSecond;
}

function validateAudio(buffer: Buffer, mimeType: string): void {
  if (!ALLOWED_MIME_TYPES.has(mimeType) || buffer.length >= 10 * 1024 * 1024 || estimateDurationMs(buffer, mimeType) >= 60_000) {
    throw new AdapterError('INVALID_MEDIA', 'Audio format not supported');
  }
}

export async function transcribeAudio(
  audioBuffer: Buffer,
  mimeType: string,
  lang: Language,
): Promise<TranscriptionResult> {
  assertServerEnv();
  // Consent must already have been checked by the caller before this function is invoked.
  validateAudio(audioBuffer, mimeType);

  if (!META_CONFIG.apiKey) {
    return {
      transcript: `Synthetic demo transcript in ${lang}`,
      segments: [{ start_ms: 0, end_ms: 2400, text: 'Synthetic demo' }],
      confidence: 0.85,
      language_detected: lang,
    };
  }

  // Meta's file endpoint currently accepts mono 16-bit PCM WAV recordings.
  if (mimeType !== 'audio/wav') {
    throw new AdapterError('INVALID_MEDIA', 'Audio format not supported');
  }

  const requestId = opaqueRequestId();
  logRequestId(requestId);
  const form = new FormData();
  form.set('request', new Blob([JSON.stringify({
    model: META_CONFIG.models.transcribe,
    audioEncoding: 'WAV',
    mode: 'PUSH_TO_TALK',
    languageBias: [{ bn: 'Bengali', en: 'English', ar: 'Arabic' }[lang]],
  })], { type: 'application/json' }));
  form.set('audio', new Blob([new Uint8Array(audioBuffer)], { type: 'audio/wav' }), 'recording.wav');

  let response: Response;
  try {
    response = await fetch(`${META_CONFIG.apiUrl}/asr/transcribe?sessionId=${encodeURIComponent(requestId)}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${META_CONFIG.apiKey}`, Accept: 'application/json' },
      body: form,
      signal: AbortSignal.timeout(20_000),
    });
  } catch (error) {
    if (error instanceof Error && (error.name === 'TimeoutError' || error.name === 'AbortError')) {
      throw new AdapterError('TIMEOUT', 'Transcription request timed out');
    }
    throw new AdapterError('UPSTREAM_ERROR', 'Transcription service unavailable');
  }
  if (!response.ok) throw new AdapterError('UPSTREAM_ERROR', `Transcription service returned ${response.status}`);

  const payload = await response.json() as {
    transcript?: string;
    turns?: Array<{ startMs?: number; endMs?: number; transcript?: string }>;
  };
  if (typeof payload.transcript !== 'string') throw new AdapterError('INVALID_RESPONSE', 'Transcription response was invalid');
  return {
    transcript: payload.transcript,
    segments: (payload.turns ?? []).map((turn) => ({
      start_ms: turn.startMs ?? 0,
      end_ms: turn.endMs ?? 0,
      text: turn.transcript ?? '',
    })),
    // The provider does not return confidence scores; zero means unavailable, not low confidence.
    confidence: 0,
    // The requested language is a hint; this endpoint does not report a detected-language field.
    language_detected: lang,
  };
}
