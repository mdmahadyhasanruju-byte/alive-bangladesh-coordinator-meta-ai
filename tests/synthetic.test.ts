import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { calculateMetrics, type MetricResult } from '../scripts/metrics';
import type { FieldVisitRecord } from '../src/db/demo-store';

type TestCaseResult = MetricResult & { name: string; error?: string };
type PipelineSample = {
  transcript: string;
  segments: { start_ms: number; end_ms: number; text: string }[];
  extraction: Record<string, unknown>;
  ledger: import('../src/core/ledger').ActionLedgerItem;
  evidenceRefs: import('../src/core/evidence').EvidenceRef[];
  draft: string;
};

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function readDemo(name: string): string {
  return readFileSync(join(process.cwd(), 'public', 'demo', name), 'utf8').trim();
}

function countSentences(value: string): number {
  return value.match(/[^.!?।]+[.!?।]?/gu)?.filter((part) => part.trim()).length ?? 0;
}

function listTextFiles(directory: string, excluded: Set<string> = new Set(['.git', 'node_modules', '.next', 'build', '.tmp', '.pnpm-store'])): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && excluded.has(entry.name)) continue;
    const fullPath = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...listTextFiles(fullPath, excluded));
    else if (entry.isFile()) files.push(fullPath);
  }
  return files;
}

export async function runSyntheticTests(): Promise<{ results: TestCaseResult[]; metrics: ReturnType<typeof calculateMetrics> }> {
  const originalKey = process.env.META_API_KEY;
  process.env.META_API_KEY = '';
  const results: TestCaseResult[] = [];
  const samples = new Map<string, PipelineSample>();
  const root = process.cwd();

  const [{ transcribeAudio }, { extractStructured }, { analyzeImageOptional }, { linkEvidence }, { proposeLedger }, { generateImpactNote }] = await Promise.all([
    import('../src/adapters/transcribe'),
    import('../src/adapters/extract'),
    import('../src/adapters/image'),
    import('../src/core/evidence'),
    import('../src/core/ledger'),
    import('../src/core/draft'),
  ]);

  async function run(name: string, task: () => Promise<Partial<MetricResult> | void>): Promise<void> {
    const started = performance.now();
    try {
      const metrics = await task();
      const result: TestCaseResult = { name, passed: true, duration_ms: performance.now() - started, ...metrics };
      results.push(result);
      console.log(`PASS ${name}`);
    } catch (error) {
      const result: TestCaseResult = {
        name,
        passed: false,
        duration_ms: performance.now() - started,
        error: error instanceof Error ? error.message : 'Unexpected test failure',
      };
      results.push(result);
      console.log(`FAIL ${name}: ${result.error}`);
    }
  }

  async function makeSample(key: string, lang: 'bn' | 'en' | 'ar', transcript: string): Promise<PipelineSample> {
    const segments = [{ start_ms: 0, end_ms: 2400, text: transcript }];
    const extracted = await extractStructured(transcript, segments, lang);
    const extraction = { ...extracted, source_transcript: transcript };
    const evidenceRefs = linkEvidence(`synthetic-${key}`, transcript, segments, extraction, null, ['audio_segment']);
    const ledger = proposeLedger(`synthetic-${key}`, extraction, evidenceRefs);
    const draft = generateImpactNote({ id: `synthetic-${key}`, lang, created_at: '2026-10-27T00:00:00.000Z' }, extraction, ledger);
    return { transcript, segments, extraction, ledger, evidenceRefs, draft };
  }

  const languageCases = [
    { key: 'A', lang: 'bn' as const, file: 'bn_01_60s.txt', expected: 'টিউবওয়েল' },
    { key: 'B', lang: 'en' as const, file: 'en_01_60s.txt', expected: 'tube-well' },
    { key: 'C', lang: 'ar' as const, file: 'ar_01_60s.txt', expected: 'بئر' },
  ];
  for (const item of languageCases) {
    const transcript = readDemo(item.file);
    await run(`Test ${item.key} - ${item.lang} synthetic extraction`, async () => {
      const sample = await makeSample(item.key, item.lang, transcript);
      samples.set(item.key, sample);
      const checks = [
        sample.ledger.need.toLocaleLowerCase().includes(item.expected.toLocaleLowerCase()),
        sample.ledger.deadline_only_if_unambiguous === null,
        sample.ledger.missing_info.includes('deadline'),
        sample.evidenceRefs.length > 0,
        sample.ledger.status === 'pending_review',
      ];
      assert(checks.every(Boolean), `One or more ${item.lang} evidence checks failed`);
      const sentenceCount = countSentences(sample.extraction.description_evidence_backed as string) + 1;
      return {
        fields_correct: checks.filter(Boolean).length,
        fields_total: checks.length,
        evidence_refs: sample.evidenceRefs.length,
        sentences: sentenceCount,
        deadline_case: true,
        deadline_invented: sample.ledger.deadline_only_if_unambiguous !== null,
        missing_info_case: true,
        missing_info_detected: sample.ledger.missing_info.includes('deadline'),
      };
    });
  }

  await run('Test D - optional image behavior', async () => {
    const absent = await analyzeImageOptional();
    const image = readFileSync(join(root, 'public', 'demo', 'photo_01.jpg'));
    const present = await analyzeImageOptional(image, 'image/jpeg');
    assert(absent.hash === null && absent.distinguished_from_audio, 'Missing image behavior was incorrect');
    assert(Boolean(present.hash) && present.hash?.length === 64 && present.distinguished_from_audio, 'Image hash or modality separation was missing');
  });

  await run('Test E - “soon” remains an unknown deadline', async () => {
    const transcript = 'The repair should happen soon.';
    const extraction = await extractStructured(transcript, [{ start_ms: 0, end_ms: 900, text: transcript }], 'en');
    const ledger = proposeLedger('synthetic-soon', { ...extraction, source_transcript: transcript }, []);
    assert(ledger.deadline_only_if_unambiguous === null, 'An ambiguous deadline was created');
    assert(ledger.missing_info.includes('deadline'), 'Missing deadline was not recorded');
    return { deadline_case: true, deadline_invented: ledger.deadline_only_if_unambiguous !== null, missing_info_case: true, missing_info_detected: ledger.missing_info.includes('deadline') };
  });

  await run('Test F - contradictory model date is rejected', async () => {
    const transcript = 'The repair is needed, but no date was stated.';
    const ledger = proposeLedger('synthetic-conflict', {
      source_transcript: transcript,
      need: 'Repair is needed',
      deadline_only_if_unambiguous: '2026-12-31',
      missing_info: [],
    }, []);
    assert(ledger.deadline_only_if_unambiguous === null, 'A date absent from the source transcript was retained');
    assert(ledger.missing_info.includes('deadline'), 'Contradiction did not add missing deadline');
    return { deadline_case: true, deadline_invented: ledger.deadline_only_if_unambiguous !== null, missing_info_case: true, missing_info_detected: ledger.missing_info.includes('deadline') };
  });

  const reviewRoute = await import('../src/app/api/review/[id]/route');
  const demoStore = await import('../src/db/demo-store');
  const sampleForReview = samples.get('B');
  assert(sampleForReview, 'English sample is required for review tests');
  const makeRecord = (id: string): FieldVisitRecord => ({
    visit: { id, lang: 'en', created_at: new Date().toISOString(), text: '' },
    transcript: sampleForReview.transcript,
    segments: sampleForReview.segments,
    audio: null,
    photo_hash: null,
    image_observations: [],
    extraction: sampleForReview.extraction,
    ledger: { ...sampleForReview.ledger, id: `ledger-${id}`, visit_id: id, evidence_refs: sampleForReview.evidenceRefs, status: 'pending_review' },
    evidence_refs: sampleForReview.evidenceRefs,
    draft: sampleForReview.draft,
    approvals: [],
  });
  function reviewRequest(id: string, decision: string, correction?: Record<string, string>): Request {
    return new Request(`http://localhost/api/review/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ decision, reviewer: 'Synthetic reviewer', ...(correction ? { correction } : {}) }),
    });
  }

  await run('Test G - human correction is recorded and still awaits approval', async () => {
    const id = 'synthetic-correction';
    const record = makeRecord(id);
    demoStore.fieldVisitStore.set(id, record);
    const response = await reviewRoute.POST(reviewRequest(id, 'corrected', {
      need: 'corrected need', commitment: '', responsible_person: '', deadline: '', reason: 'Synthetic correction fixture',
    }), { params: Promise.resolve({ id }) });
    assert(response.status === 200, 'Correction API did not accept the human correction');
    assert(record.ledger.need === 'corrected need', 'Ledger need was not updated');
    assert(record.ledger.status === 'pending_review', 'Correction incorrectly approved the ledger');
    assert(record.approvals.length === 1 && record.approvals[0].decision === 'corrected', 'Correction history was not saved');
    assert(record.draft.includes('[human correction:'), 'Draft did not label the correction');
  });

  await run('Test H - draft sentences cite linked sources', async () => {
    const sample = samples.get('B');
    assert(sample, 'English sample is required');
    const sourcedLines = sample.draft.split('\n').filter((line) => line.trim());
    assert(sourcedLines.every((line) => /\[(?:source:|unverified|human correction|human approval)/i.test(line)), 'A draft line lacks an attribution marker');
    assert(sample.evidenceRefs.length >= 1, 'No evidence reference was linked');
  });

  await run('Test I - no auto-action; human POST required for approval', async () => {
    const id = 'synthetic-approval';
    const record = makeRecord(id);
    demoStore.fieldVisitStore.set(id, record);
    assert(record.ledger.status === 'pending_review', 'Ledger was approved before human POST');
    const coreFiles = listTextFiles(join(root, 'src', 'core'));
    assert(coreFiles.every((path) => !/\bfetch\s*\(/.test(readFileSync(path, 'utf8'))), 'External fetch was found in core logic');
    const response = await reviewRoute.POST(reviewRequest(id, 'approved'), { params: Promise.resolve({ id }) });
    assert(response.status === 200 && String(record.ledger.status) === 'approved', 'Human approval POST did not update status');
    assert(record.approvals.length === 1, 'Approval history was not recorded');
  });

  await run('Test J - invalid media error and empty transcript missing information', async () => {
    let invalidCode = '';
    try {
      await transcribeAudio(Buffer.from('synthetic'), 'application/octet-stream', 'en');
    } catch (error) {
      invalidCode = typeof error === 'object' && error && 'code' in error ? String(error.code) : '';
    }
    assert(invalidCode === 'INVALID_MEDIA', 'Invalid audio did not return INVALID_MEDIA');
    const empty = await extractStructured('', [], 'en');
    assert(empty.missing_info.includes('deadline'), 'Empty transcript did not return missing information');
  });

  await run('Test K - privacy checks for synthetic assets, secrets, and logs', async () => {
    const logLines: string[] = [];
    const originalConsole = { log: console.log, info: console.info, warn: console.warn, error: console.error, debug: console.debug };
    const capture = (...args: unknown[]) => logLines.push(args.map(String).join(' '));
    console.log = capture; console.info = capture; console.warn = capture; console.error = capture; console.debug = capture;
    const wav = Buffer.alloc(44);
    wav.write('RIFF', 0, 'ascii'); wav.write('WAVE', 8, 'ascii'); wav.write('data', 36, 'ascii');
    const encodedAudio = wav.toString('base64');
    try {
      await transcribeAudio(wav, 'audio/wav', 'en');
    } finally {
      console.log = originalConsole.log; console.info = originalConsole.info; console.warn = originalConsole.warn; console.error = originalConsole.error; console.debug = originalConsole.debug;
    }
    assert(!logLines.some((line) => line.includes(encodedAudio)), 'A log contained raw audio base64');

    const demoFiles = ['bn_01_60s.txt', 'en_01_60s.txt', 'ar_01_60s.txt', 'README.md'];
    const contactPattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}|\+?\d[\d\s().-]{7,}\d/i;
    assert(demoFiles.every((name) => !contactPattern.test(readDemo(name))), 'A demo text file contains an email or phone-like string');

    const secretFiles: string[] = [];
    const secretAssignment = /^[ \t]*META_API_KEY[ \t]*=[ \t]*([^ \t\r\n#]+)[ \t]*$/m;
    for (const file of listTextFiles(root)) {
      const content = readFileSync(file);
      if (content.includes(0)) continue;
      const text = content.toString('utf8');
      if (originalKey && text.includes(originalKey)) secretFiles.push(relative(root, file));
      if (secretAssignment.test(text)) secretFiles.push(relative(root, file));
    }
    assert(secretFiles.length === 0, 'A repository file appears to contain a populated META_API_KEY');
  });

  if (originalKey === undefined) delete process.env.META_API_KEY;
  else process.env.META_API_KEY = originalKey;
  const metrics = calculateMetrics(results);
  return { results, metrics };
}
