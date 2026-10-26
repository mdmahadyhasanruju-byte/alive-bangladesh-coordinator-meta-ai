# Live E2E Test Record

## Target and run

- Production URL: https://alive-bangladesh-coordinator-meta-a.vercel.app
- Vercel deployment: `dpl_m92Y7J9LK29bUAu8LGE2VxHDJFjD` (READY, production)
- Final test window: 2026-10-26 21:12:23–21:12:50 UTC (2026-10-27 03:12:23–03:12:50 Bangladesh time, UTC+6)
- Browser: one fresh in-app browser tab, kept open across all three language submissions and reviews.
- Inputs: only the synthetic public fixtures in `public/demo/`; text-only submissions, no audio or photo files uploaded. Consent controls were checked on each form.
- Reviewer label: `Synthetic Reviewer` (demo label, not a real identity).

## Final run results

| Language | Created (UTC) | Review page | Initial status | Evidence and deadline | Human approval and ledger |
|---|---|---|---|---|---|
| Bangla | 2026-10-26T21:12:23.376Z | PASS | `pending_review` | Transcript shown; text evidence references shown; source tags rendered; deadline unknown | Approved in UI; ledger row changed to `approved` |
| English | 2026-10-26T21:12:35.235Z | PASS | `pending_review` | Transcript shown; text evidence references shown; source tags rendered; deadline unknown | Approved in UI; ledger row changed to `approved` |
| Arabic | 2026-10-26T21:12:50.264Z | PASS | `pending_review` | Transcript shown; text evidence references shown; source tags rendered; deadline unknown | Approved in UI; ledger row changed to `approved` |

For each record the review page showed the no-external-message guard. The ledger displayed all three approved rows in the same browser tab session. No participant data or real names were used.

## First attempt and remediation

- At approximately 2026-10-26 21:00 UTC, each submitted form redirected to a review URL that returned 404. The in-memory server map was not shared across Vercel route workers; the ledger showed inconsistent records.
- The demo flow was changed to pass the processed record to the client and hold it in `sessionStorage` for the current browser tab. Review and approval update that same tab’s session record. Text-only evidence is labeled as text, with source tags tied to those references.
- The corrected deployment was rebuilt and retested. The final run above passed.

## Verification and limits

- `pnpm --ignore-workspace run test`: 11/11 deterministic synthetic tests passed (A–K).
- Core tests: 6/6 passed, including the text-only evidence and source-tag case.
- TypeScript check: `pnpm --ignore-workspace exec tsc --noEmit` passed.
- Live workflow: 3/3 text-only visits reached review, stayed pending until the reviewer clicked Approve, and then appeared as approved in the ledger.
- Data persistence is browser-tab-session only; closing the tab clears the demo records. Durable storage and reviewer authentication are not configured. Do not use real participant data.
- These text fixtures do not verify Meta audio transcription, optional image processing, real-world accuracy, or external outcomes. Approval changes only an internal demo status.
- Vercel build succeeded. Next.js 16.4.3 reported that the existing `eslint` option in `next.config.mjs` is no longer supported; this warning did not block deployment.
