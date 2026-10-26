import { before, describe, it } from 'node:test';
import assert from 'node:assert/strict';

describe('Meta adapters synthetic mode', () => {
  before(() => {
    process.env.META_API_KEY = '';
  });

  it('returns a synthetic transcript with timed segments', async () => {
    const { transcribeAudio } = await import('../src/adapters/transcribe');
    const wav = Buffer.alloc(44);
    wav.write('RIFF', 0, 'ascii');
    wav.write('WAVE', 8, 'ascii');
    wav.write('data', 36, 'ascii');
    const result = await transcribeAudio(wav, 'audio/wav', 'en');
    assert.equal(result.language_detected, 'en');
    assert.ok(result.segments.length > 0);
  });

  it('keeps the deadline null when no source date exists', async () => {
    const { extractStructured } = await import('../src/adapters/extract');
    const result = await extractStructured('Synthetic request with no date.', [], 'en');
    assert.equal(result.deadline_only_if_unambiguous, null);
  });

  it('hashes an optional image and returns synthetic observations', async () => {
    const { analyzeImageOptional } = await import('../src/adapters/image');
    const result = await analyzeImageOptional(Buffer.from('synthetic image fixture'));
    assert.equal(result.hash?.length, 64);
    assert.equal(result.distinguished_from_audio, true);
  });
});
