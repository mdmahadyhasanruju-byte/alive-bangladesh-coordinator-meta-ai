import { createHash } from 'node:crypto';
import { AdapterError, assertServerEnv, logRequestId, META_CONFIG, opaqueRequestId } from './config';

export type ImageAnalysis = {
  observations: string[];
  distinguished_from_audio: boolean;
  does_not_prove: string[];
  hash: string | null;
};

export async function analyzeImageOptional(imageBuffer?: Buffer, mimeType = 'image/jpeg'): Promise<ImageAnalysis> {
  assertServerEnv();
  if (!imageBuffer) {
    return { observations: [], distinguished_from_audio: true, does_not_prove: [], hash: null };
  }
  if (imageBuffer.length > 10 * 1024 * 1024) throw new AdapterError('INVALID_MEDIA', 'Image format not supported');
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(mimeType)) {
    throw new AdapterError('INVALID_MEDIA', 'Image format not supported');
  }
  const hash = createHash('sha256').update(imageBuffer).digest('hex');
  const doesNotProve = ['Does not prove need by itself', 'Does not prove a commitment, responsible person, or deadline'];
  if (!META_CONFIG.apiKey) {
    return {
      observations: ['Synthetic image observation'],
      distinguished_from_audio: true,
      does_not_prove: doesNotProve,
      hash,
    };
  }

  const requestId = opaqueRequestId();
  logRequestId(requestId);
  const dataUrl = `data:${mimeType};base64,${imageBuffer.toString('base64')}`;
  let response: Response;
  try {
    response = await fetch(`${META_CONFIG.apiUrl}/chat/completions`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${META_CONFIG.apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: META_CONFIG.models.extract,
        store: false,
        messages: [{
          role: 'user',
          content: [
            { type: 'text', text: 'Describe only visible observations. The image is context only and cannot prove a need, commitment, responsible person, or deadline. Return JSON only: {"observations": string[]}.' },
            { type: 'image_url', image_url: { url: dataUrl } },
          ],
        }],
        response_format: { type: 'json_object' },
      }),
      signal: AbortSignal.timeout(20_000),
    });
  } catch (error) {
    if (error instanceof Error && (error.name === 'TimeoutError' || error.name === 'AbortError')) {
      throw new AdapterError('TIMEOUT', 'Image analysis request timed out');
    }
    throw new AdapterError('UPSTREAM_ERROR', 'Image analysis service unavailable');
  }
  if (!response.ok) throw new AdapterError('UPSTREAM_ERROR', `Image analysis service returned ${response.status}`);
  const payload = await response.json() as { choices?: Array<{ message?: { content?: string | null } }> };
  const content = payload.choices?.[0]?.message?.content;
  if (typeof content !== 'string') throw new AdapterError('INVALID_RESPONSE', 'Image analysis response was invalid');
  try {
    const parsed = JSON.parse(content) as { observations?: unknown };
    return {
      observations: Array.isArray(parsed.observations) ? parsed.observations.filter((item): item is string => typeof item === 'string') : [],
      distinguished_from_audio: true,
      does_not_prove: doesNotProve,
      hash,
    };
  } catch {
    throw new AdapterError('INVALID_RESPONSE', 'Image analysis response was invalid');
  }
}
