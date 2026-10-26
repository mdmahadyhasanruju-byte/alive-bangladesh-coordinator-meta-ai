import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { linkEvidence } from '../src/core/evidence';
import { proposeLedger } from '../src/core/ledger';
import { generateImpactNote } from '../src/core/draft';

describe('evidence-linked core', () => {
  const transcript = 'We need clean water for the village. I will ask for help soon.';
  const segments = [
    { start_ms: 0, end_ms: 1600, text: 'We need clean water for the village.' },
    { start_ms: 1601, end_ms: 3000, text: 'I will ask for help soon.' },
  ];

  it('does not turn an ambiguous soon deadline into a date', () => {
    const ledger = proposeLedger('visit-1', {
      source_transcript: transcript,
      need: 'Clean water',
      deadline_only_if_unambiguous: 'soon',
    }, []);
    assert.equal(ledger.deadline_only_if_unambiguous, null);
  });

  it('keeps the responsible person null without explicit naming', () => {
    const ledger = proposeLedger('visit-1', {
      source_transcript: transcript,
      responsible_person_only_if_explicit: 'Karim',
    }, []);
    assert.equal(ledger.responsible_person_only_if_explicit, null);
  });

  it('links evidence for each description sentence', () => {
    const refs = linkEvidence('visit-1', transcript, segments, {
      need: 'clean water',
      description_evidence_backed: 'The village needs clean water. The speaker will ask for help soon.',
    }, null);
    assert.equal(refs.length, 3);
    assert.ok(refs.every((ref) => ref.type === 'audio_segment' || ref.type === 'text'));
  });

  it('always proposes the ledger for human review', () => {
    const ledger = proposeLedger('visit-1', { need: 'Clean water' }, []);
    assert.equal(ledger.status, 'pending_review');
  });

  it('adds source tags throughout the generated draft', () => {
    const refs = linkEvidence('visit-1', transcript, segments, {
      need: 'clean water',
      description_evidence_backed: 'The village needs clean water.',
    }, null);
    const ledger = proposeLedger('visit-1', { need: 'Clean water' }, refs);
    const note = generateImpactNote({ id: 'visit-1', lang: 'en', created_at: '2026-10-27' }, {}, ledger);
    assert.ok(note.split('\n').every((line) => /\[(?:source:|unverified|human correction)/i.test(line)));
  });

  it('uses text references for text-only visits', () => {
    const refs = linkEvidence('visit-text', transcript, [{ start_ms: 0, end_ms: transcript.length * 100, text: transcript }], {
      need: 'clean water',
      description_evidence_backed: 'We need clean water for the village.',
    }, null, ['text']);
    const ledger = proposeLedger('visit-text', { need: 'Clean water' }, refs);
    const note = generateImpactNote({ id: 'visit-text', lang: 'en', created_at: '2026-10-27' }, { description_evidence_backed: 'We need clean water for the village.' }, ledger);
    assert.ok(refs.every((ref) => ref.type === 'text'));
    assert.match(note, /Description: .*\[source: linked text:0\]/);
    assert.match(note, /Evidence Refs: 2 evidence references linked/);
  });
});
