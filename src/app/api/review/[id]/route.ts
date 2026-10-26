import { NextResponse } from 'next/server';
import { fieldVisitStore } from '../../../../db/demo-store';

export const dynamic = 'force-dynamic';

type ReviewDecision = 'approved' | 'rejected' | 'corrected';

function updateDraftForReview(draft: string, status: ReviewDecision | 'pending_review', reviewer: string, correction?: Record<string, unknown>): string {
  let lines = draft.split('\n');
  const reason = typeof correction?.reason === 'string' ? correction.reason.replace(/\s+/g, ' ').trim() : '';
  const updateField = (label: string, value: string, marker: string) => {
    lines = lines.map((line) => line.startsWith(`${label}: `) ? `${label}: ${value} [${marker}]` : line);
  };
  if (correction && reason) {
    if (typeof correction.need === 'string') updateField('Need', correction.need.replace(/\s+/g, ' ').trim(), `human correction: ${reason}`);
    if (typeof correction.commitment === 'string' || correction.commitment === null) {
      updateField('Commitment', typeof correction.commitment === 'string' && correction.commitment.trim() ? correction.commitment.replace(/\s+/g, ' ').trim() : 'None stated', `human correction: ${reason}`);
    }
    if (typeof correction.responsible_person === 'string' || correction.responsible_person === null) {
      updateField('Responsible', typeof correction.responsible_person === 'string' && correction.responsible_person.trim() ? correction.responsible_person.replace(/\s+/g, ' ').trim() : 'Unknown - needs clarification', `human correction: ${reason}`);
    }
    if (typeof correction.deadline === 'string' || correction.deadline === null) {
      updateField('Deadline', typeof correction.deadline === 'string' && correction.deadline.trim() ? correction.deadline.replace(/\s+/g, ' ').trim() : 'Unknown - needs clarification', `human correction: ${reason}`);
    }
  }
  lines = lines.map((line) => line.startsWith('Review Status: ')
    ? `Review Status: ${status} - internal ledger status [${status === 'approved' || status === 'rejected' ? 'human approval' : 'human correction'}]`
    : line);
  const attribution = status === 'approved'
    ? `Attribution: model-generated draft; internally approved by ${reviewer} [human approval]`
    : status === 'rejected'
      ? `Attribution: model-generated draft; internally rejected by ${reviewer} [human approval]`
      : correction
        ? `Attribution: model-generated draft with corrections recorded by ${reviewer}; still requires approval [human correction]`
        : 'Attribution: model-generated draft; no human approval recorded [unverified]';
  lines = lines.map((line) => line.startsWith('Attribution: ') ? attribution : line);
  return lines.join('\n');
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const record = fieldVisitStore.get(id);
  if (!record) return NextResponse.json({ error: 'Field visit not found in this server session' }, { status: 404 });

  let body: { decision?: unknown; reviewer?: unknown; correction?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
  const { decision, reviewer } = body;
  if (decision !== 'approved' && decision !== 'rejected' && decision !== 'corrected') {
    return NextResponse.json({ error: 'Unsupported review decision' }, { status: 400 });
  }
  if (typeof reviewer !== 'string' || !reviewer.trim() || reviewer.length > 120) {
    return NextResponse.json({ error: 'Reviewer name or ID is required' }, { status: 400 });
  }

  let correction: Record<string, unknown> | undefined;
  if (decision === 'corrected') {
    if (!body.correction || typeof body.correction !== 'object' || Array.isArray(body.correction)) {
      return NextResponse.json({ error: 'Correction details are required' }, { status: 400 });
    }
    correction = body.correction as Record<string, unknown>;
    const reason = typeof correction.reason === 'string' ? correction.reason.trim() : '';
    if (!reason || reason.length > 2000) return NextResponse.json({ error: 'A correction reason is required' }, { status: 400 });
    for (const field of ['need', 'commitment', 'responsible_person', 'deadline']) {
      const value = correction[field];
      if (value !== undefined && value !== null && (typeof value !== 'string' || value.length > 4000)) {
        return NextResponse.json({ error: 'Correction field is invalid' }, { status: 400 });
      }
    }
    if (typeof correction.need === 'string') record.ledger.need = correction.need.trim();
    if (typeof correction.commitment === 'string') record.ledger.commitment = correction.commitment.trim() || null;
    if (correction.commitment === null) record.ledger.commitment = null;
    if (typeof correction.responsible_person === 'string') {
      record.ledger.responsible_person_only_if_explicit = correction.responsible_person.trim() || null;
    }
    if (correction.responsible_person === null) record.ledger.responsible_person_only_if_explicit = null;
    if (typeof correction.deadline === 'string') record.ledger.deadline_only_if_unambiguous = correction.deadline.trim() || null;
    if (correction.deadline === null) record.ledger.deadline_only_if_unambiguous = null;
    record.ledger.status = 'pending_review';
  } else {
    record.ledger.status = decision;
  }

  record.draft = updateDraftForReview(record.draft, record.ledger.status, reviewer.trim(), correction);

  record.approvals.push({
    id: crypto.randomUUID(),
    ledger_id: record.ledger.id,
    reviewer: reviewer.trim(),
    decision,
    ...(correction ? { correction } : {}),
    created_at: new Date().toISOString(),
  });
  fieldVisitStore.set(id, record);
  return NextResponse.json({ visit_id: id, ledger_id: record.ledger.id, status: record.ledger.status });
}
