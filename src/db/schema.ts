export type FieldVisit = {
  id: string;
  coordinator_id: string;
  audio_url?: string;
  photo_url?: string;
  text?: string;
  lang: 'bn' | 'en' | 'ar';
  created_at: string;
  status: 'pending_transcription' | 'pending_extraction' | 'pending_review' | 'approved' | 'rejected';
};

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

export type ActionLedger = {
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

export type Approval = {
  id: string;
  ledger_id: string;
  reviewer: string;
  decision: 'approved' | 'rejected' | 'corrected';
  correction?: any;
  created_at: string;
};
