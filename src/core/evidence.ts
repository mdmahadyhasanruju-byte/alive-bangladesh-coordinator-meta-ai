export type EvidenceRef = {
  id: string;
  visit_id: string;
  type: 'audio_segment' | 'photo' | 'text';
  ref: string;
  start_ms?: number;
  end_ms?: number;
  start_char?: number;
  end_char?: number;
  hash?: string;
};

type Segment = { start_ms: number; end_ms: number; text: string };
type EvidenceExtraction = { need: string; description_evidence_backed: string };

const stopWords = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'in', 'is', 'it',
  'of', 'on', 'or', 'that', 'the', 'to', 'was', 'with', 'এবং', 'এর', 'একটি', 'হয়', 'জন্য',
]);

function tokens(value: string): Set<string> {
  return new Set(value.toLocaleLowerCase().match(/[\p{L}\p{N}]+/gu)?.filter((token) => !stopWords.has(token)) ?? []);
}

function similarity(left: string, right: string): number {
  const a = tokens(left);
  const b = tokens(right);
  if (a.size === 0 || b.size === 0) return 0;
  let shared = 0;
  for (const token of a) if (b.has(token)) shared += 1;
  return shared / new Set([...a, ...b]).size;
}

function sentences(value: string): string[] {
  return value.match(/[^.!?।]+[.!?।]?/gu)?.map((sentence) => sentence.trim()).filter(Boolean) ?? [];
}

function makeId(): string {
  return `ev_${crypto.randomUUID()}`;
}

export function linkEvidence(
  visit_id: string,
  transcript: string,
  segments: Segment[],
  extraction: EvidenceExtraction,
  photoHash: string | null,
  segmentTypes: Array<'audio_segment' | 'text'> = [],
): EvidenceRef[] {
  const refs: EvidenceRef[] = [];
  const statements = [extraction.need, ...sentences(extraction.description_evidence_backed)].filter((item) => item.trim());

  for (const statement of statements) {
    let bestIndex = -1;
    let bestScore = 0;
    segments.forEach((segment, index) => {
      const score = similarity(statement, segment.text);
      if (score > bestScore) {
        bestScore = score;
        bestIndex = index;
      }
    });

    if (bestIndex >= 0 && bestScore >= 0.12) {
      const segment = segments[bestIndex];
      if (segmentTypes[bestIndex] === 'text') {
        const startChar = transcript.indexOf(segment.text);
        refs.push({
          id: makeId(),
          visit_id,
          type: 'text',
          ref: `text:${bestIndex}`,
          start_char: startChar >= 0 ? startChar : 0,
          end_char: startChar >= 0 ? startChar + segment.text.length : 0,
        });
      } else {
        refs.push({
          id: makeId(),
          visit_id,
          type: 'audio_segment',
          ref: `segment:${bestIndex}`,
          start_ms: segment.start_ms,
          end_ms: segment.end_ms,
        });
      }
    } else {
      // A zero-length text ref makes the unsupported statement explicit and low confidence.
      refs.push({
        id: makeId(),
        visit_id,
        type: 'text',
        ref: `low_confidence_unmatched_statement:${statement}`,
        start_char: 0,
        end_char: 0,
      });
    }
  }

  if (photoHash) {
    refs.push({ id: makeId(), visit_id, type: 'photo', ref: `photo:${photoHash}`, hash: photoHash });
  }

  return refs;
}
