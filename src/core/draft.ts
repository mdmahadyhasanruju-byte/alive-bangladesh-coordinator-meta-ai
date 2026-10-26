import type { ActionLedgerItem } from './ledger';
import type { EvidenceRef } from './evidence';

type Visit = { id?: string; lang?: string; created_at?: string };
type Extraction = { need?: string; description_evidence_backed?: string };

function sourceFor(refs: EvidenceRef[], predicate: (ref: EvidenceRef) => boolean): string {
  const ref = refs.find(predicate);
  if (!ref) return '[unverified]';
  if (ref.type === 'audio_segment') return `[source: ${ref.ref} ${ref.start_ms ?? 0}-${ref.end_ms ?? 0}ms]`;
  if (ref.type === 'photo') return `[source: photo hash ${ref.hash ?? 'unknown'}]`;
  return `[source: ${ref.ref}]`;
}

export function generateImpactNote(visit: Visit, extraction: Extraction, ledger: ActionLedgerItem): string {
  const refs = ledger.evidence_refs;
  const audioSource = sourceFor(refs, (ref) => ref.type === 'audio_segment');
  const needSource = sourceFor(refs, (ref) => ref.type === 'audio_segment' || ref.type === 'text');
  const descriptionSentences = (extraction.description_evidence_backed ?? ledger.description_evidence_backed)
    .split(/(?<=[.!?।])\s+/u).filter(Boolean);
  const description = descriptionSentences.length
    ? descriptionSentences.map((sentence) => `${sentence} ${audioSource === '[unverified]' ? audioSource : `[source: linked ${audioSource.slice(8, -1)}]`}`).join(' ')
    : `Not provided ${audioSource}`;
  const commitment = ledger.commitment
    ? `${ledger.commitment} ${audioSource}`
    : `None stated [unverified]`;
  const responsible = ledger.responsible_person_only_if_explicit
    ? `${ledger.responsible_person_only_if_explicit} [source: explicit participant wording]`
    : 'Unknown - needs clarification [unverified]';
  const deadline = ledger.deadline_only_if_unambiguous
    ? `${ledger.deadline_only_if_unambiguous} ${audioSource}`
    : 'Unknown - needs clarification [unverified]';
  const evidenceCount = refs.filter((ref) => ref.type === 'audio_segment').length;

  return [
    `Field Visit: ${visit.id ?? ledger.visit_id} | Lang: ${visit.lang ?? 'unknown'} | Date: ${visit.created_at ?? ledger.created_at} [source: visit record]`,
    `Need: ${extraction.need ?? ledger.need} ${needSource}`,
    `Description: ${description}`,
    `Commitment: ${commitment}`,
    `Responsible: ${responsible}`,
    `Deadline: ${deadline}`,
    `Missing Info: ${ledger.missing_info.join(', ') || 'None recorded'} [source: draft ledger]`,
    `Follow-up: ${ledger.follow_up || 'None recorded'} [source: draft ledger]`,
    `Evidence Refs: ${evidenceCount} segments linked [source: evidence linker]`,
    `Review Status: ${ledger.status} - requires human approval [source: draft ledger]`,
    `Confidence: ${ledger.confidence} (model estimate, not truth) [unverified]`,
    'Attribution: model-generated draft; participant statements are evidence-linked; no human approval recorded [unverified]',
  ].join('\n');
}
