# Synthetic Test Evidence

- Run date: 2026-10-26T21:20:17.743Z
- Node version: v24.18.0
- Model versions configured: `muse-voice-transcribe-1.0`, `muse-spark-1.3`
- Data disclaimer: synthetic scripted dialogue and placeholder image only; no real participant data or real locations.
- Sample size: 3 language transcripts (Bangla, English, Arabic).
- Mode: deterministic synthetic adapter mode; no Meta API request was made by this test run.

## Tests A-K

- PASS — Test A - bn synthetic extraction
- PASS — Test B - en synthetic extraction
- PASS — Test C - ar synthetic extraction
- PASS — Test D - optional image behavior
- PASS — Test E - “soon” remains an unknown deadline
- PASS — Test F - contradictory model date is rejected
- PASS — Test G - human correction is recorded and still awaits approval
- PASS — Test H - draft sentences cite linked sources
- PASS — Test I - no auto-action; human POST required for approval
- PASS — Test J - invalid media error and empty transcript missing information
- PASS — Test K - privacy checks for synthetic assets, secrets, and logs

## Metrics

- Field precision: 100.00%
- Evidence traceability: 100.00%
- Deadline hallucination rate: 0.00%
- Missing information detection rate: 100.00%
- End-to-end test success rate: 100.00%
- Median processing time: 0.25 ms

## Limitations

- These checks validate deterministic synthetic behavior, not recognition or extraction quality on real recordings.
- The three language samples are short scripted text fixtures; no actor audio recordings are included.
- The demo store is in-memory and resets when its server process restarts; review API authentication is not implemented.
- “Approved” means an internal ledger status set by a review POST; it does not verify an external outcome or send a message.

Overall result: PASS.
