import type { EvidenceRef } from './evidence';

export type ActionLedgerItem = {
  id: string;
  visit_id: string;
  need: string;
  description_evidence_backed: string;
  commitment: string | null;
  responsible_person_only_if_explicit: string | null;
  deadline_only_if_unambiguous: string | null;
  status: 'pending_review' | 'approved' | 'rejected';
  confidence: number;
  missing_info: string[];
  follow_up: string;
  evidence_refs: EvidenceRef[];
  created_at: string;
};

const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;
const explicitCommitmentPattern = /\bI,\s*([A-Z][A-Za-z'-]+),\s*will\b/;

function makeId(): string {
  return `ledger_${crypto.randomUUID()}`;
}

export function proposeLedger(visit_id: string, extraction: any, evidenceRefs: EvidenceRef[]): ActionLedgerItem {
  const missingInfo: string[] = Array.isArray(extraction.missing_info)
    ? extraction.missing_info.filter((item: unknown): item is string => typeof item === 'string')
    : [];
  const sourceTranscript = typeof extraction.source_transcript === 'string'
    ? extraction.source_transcript
    : typeof extraction.transcript === 'string' ? extraction.transcript : '';

  let deadline: string | null = null;
  if (typeof extraction.deadline_only_if_unambiguous === 'string'
    && isoDatePattern.test(extraction.deadline_only_if_unambiguous)
    && (!sourceTranscript || sourceTranscript.includes(extraction.deadline_only_if_unambiguous))) {
    deadline = extraction.deadline_only_if_unambiguous;
  }

  let responsible: string | null = null;
  const explicitMatch = sourceTranscript.match(explicitCommitmentPattern);
  if (explicitMatch && typeof extraction.responsible_person_only_if_explicit === 'string'
    && extraction.responsible_person_only_if_explicit.toLocaleLowerCase() === explicitMatch[1].toLocaleLowerCase()) {
    responsible = explicitMatch[1];
  }

  const commitment = typeof extraction.commitment === 'string' && extraction.commitment.trim()
    ? extraction.commitment.trim()
    : null;
  if (!deadline && !missingInfo.includes('deadline')) missingInfo.push('deadline');
  if (!responsible && !missingInfo.includes('responsible_person')) missingInfo.push('responsible_person');
  if (!commitment && !missingInfo.includes('commitment')) missingInfo.push('commitment');

  return {
    id: makeId(),
    visit_id,
    need: typeof extraction.need === 'string' ? extraction.need : '',
    description_evidence_backed: typeof extraction.description_evidence_backed === 'string'
      ? extraction.description_evidence_backed
      : '',
    commitment,
    responsible_person_only_if_explicit: responsible,
    deadline_only_if_unambiguous: deadline,
    status: 'pending_review',
    confidence: typeof extraction.confidence === 'number' ? Math.max(0, Math.min(1, extraction.confidence)) : 0,
    missing_info: [...new Set(missingInfo)],
    follow_up: typeof extraction.follow_up === 'string' ? extraction.follow_up : '',
    evidence_refs: evidenceRefs,
    created_at: new Date().toISOString(),
  };
}
