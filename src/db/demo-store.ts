import type { ActionLedgerItem } from '../core/ledger';
import type { EvidenceRef } from '../core/evidence';

export type FieldVisitRecord = {
  visit: { id: string; lang: 'bn' | 'en' | 'ar'; created_at: string; text: string };
  transcript: string;
  segments: { start_ms: number; end_ms: number; text: string }[];
  audio: { data: Buffer; mime: string } | null;
  photo_hash: string | null;
  image_observations: string[];
  extraction: Record<string, unknown>;
  ledger: ActionLedgerItem;
  evidence_refs: EvidenceRef[];
  draft: string;
  approvals: ReviewApproval[];
};

export type ReviewApproval = { id: string; ledger_id: string; reviewer: string; decision: 'approved' | 'rejected' | 'corrected'; correction?: Record<string, unknown>; created_at: string };

type StoreGlobal = typeof globalThis & { __aliveFieldVisitStore?: Map<string, FieldVisitRecord> };
const storeGlobal = globalThis as StoreGlobal;
export const fieldVisitStore = storeGlobal.__aliveFieldVisitStore ??= new Map<string, FieldVisitRecord>();

export function getFieldVisit(id: string): FieldVisitRecord | undefined {
  return fieldVisitStore.get(id);
}

export function listFieldVisits(): FieldVisitRecord[] {
  return [...fieldVisitStore.values()].sort((a, b) => b.visit.created_at.localeCompare(a.visit.created_at));
}
