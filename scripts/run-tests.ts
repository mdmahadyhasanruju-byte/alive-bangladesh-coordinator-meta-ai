import { writeFileSync } from 'node:fs';
import { runSyntheticTests } from '../tests/synthetic.test';

async function main(): Promise<void> {
  const { results, metrics } = await runSyntheticTests();
  console.log('\nSynthetic test metrics');
  console.log(`fieldPrecision: ${metrics.fieldPrecision.toFixed(2)}%`);
  console.log(`evidenceTraceabilityPct: ${metrics.evidenceTraceabilityPct.toFixed(2)}%`);
  console.log(`deadlineHallucinationRate: ${metrics.deadlineHallucinationRate.toFixed(2)}%`);
  console.log(`missingInfoDetectionRate: ${metrics.missingInfoDetectionRate.toFixed(2)}%`);
  console.log(`e2eSuccessRate: ${metrics.e2eSuccessRate.toFixed(2)}%`);
  console.log(`medianProcessingMs: ${metrics.medianProcessingMs.toFixed(2)}`);

  const failures = results.filter((result) => !result.passed).length;
  const report = [
    '# Synthetic Test Evidence',
    '',
    `- Run date: ${new Date().toISOString()}`,
    `- Node version: ${process.version}`,
    '- Model versions configured: `muse-voice-transcribe-1.0`, `muse-spark-1.3`',
    '- Data disclaimer: synthetic scripted dialogue and placeholder image only; no real participant data or real locations.',
    '- Sample size: 3 language transcripts (Bangla, English, Arabic).',
    '- Mode: deterministic synthetic adapter mode; no Meta API request was made by this test run.',
    '',
    '## Tests A-K',
    '',
    ...results.map((result) => `- ${result.passed ? 'PASS' : 'FAIL'} — ${result.name}${result.error ? ` (${result.error})` : ''}`),
    '',
    '## Metrics',
    '',
    `- Field precision: ${metrics.fieldPrecision.toFixed(2)}%`,
    `- Evidence traceability: ${metrics.evidenceTraceabilityPct.toFixed(2)}%`,
    `- Deadline hallucination rate: ${metrics.deadlineHallucinationRate.toFixed(2)}%`,
    `- Missing information detection rate: ${metrics.missingInfoDetectionRate.toFixed(2)}%`,
    `- End-to-end test success rate: ${metrics.e2eSuccessRate.toFixed(2)}%`,
    `- Median processing time: ${metrics.medianProcessingMs.toFixed(2)} ms`,
    '',
    '## Limitations',
    '',
    '- These checks validate deterministic synthetic behavior, not recognition or extraction quality on real recordings.',
    '- The three language samples are short scripted text fixtures; no actor audio recordings are included.',
    '- The demo store is in-memory and resets when its server process restarts; review API authentication is not implemented.',
    '- “Approved” means an internal ledger status set by a review POST; it does not verify an external outcome or send a message.',
    '',
    `Overall result: ${failures === 0 ? 'PASS' : `FAIL (${failures} test${failures === 1 ? '' : 's'})`}.`,
    '',
  ].join('\n');
  writeFileSync('docs/TEST_EVIDENCE.md', report, { encoding: 'utf8' });
  console.log(`\nWrote docs/TEST_EVIDENCE.md; ${results.length - failures}/${results.length} tests passed.`);
  if (failures > 0) process.exitCode = 1;
}

void main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : 'Test runner failed');
  process.exitCode = 1;
});
