export const META_CONFIG = {
  apiUrl: process.env.META_API_URL || 'https://api.meta.ai/v1',
  apiKey: process.env.META_API_KEY,
  models: {
    transcribe: 'muse-voice-transcribe-1.0',
    extract: 'muse-spark-1.3',
    extractFallback: 'muse-wonder-1.0',
    image: 'muse-image-1.0',
    sam: 'sam-3.1',
  },
};

export function assertServerEnv(): void {
  if (typeof window !== 'undefined') {
    throw new Error('META_API_KEY must stay server-side');
  }
}

// Fail immediately if an adapter module is ever pulled into a browser module graph.
assertServerEnv();

export class AdapterError extends Error {
  constructor(
    public readonly code: 'INVALID_MEDIA' | 'TIMEOUT' | 'UPSTREAM_ERROR' | 'INVALID_RESPONSE',
    message: string,
  ) {
    super(message);
    this.name = 'AdapterError';
  }
}

export function opaqueRequestId(): string {
  return `req_${crypto.randomUUID()}`;
}

export function logRequestId(requestId: string): void {
  // Deliberately log only an opaque correlation ID; never log user content or credentials.
  console.info(JSON.stringify({ request_id: requestId }));
}
