# Hackathon Submission Checklist

## Schedule and track

- Build activity documented for Oct 27-Nov 4, 2026. The official event page lists the event window as Oct 26 at 12:00 PM through Nov 4 at 9:00 PM EST; project submissions are due Nov 4 at 9:00 PM ET. That deadline converts to Nov 5, 02:00 UTC / 8:00 AM Bangladesh time (UTC+6). [Official event page](https://events.cerebralvalley.ai/e/meta-ai-developer-hackathon)
- Requested track: Startup. Eligibility and participant acceptance status: NOT VERIFIED.
- Theme: Build for Your World.

## New-work provenance

- Verified acting-folder commits: `26c7287` — PEN + SCAFFOLD, 2026-10-27; `e8eb60a` — FIX BUILD, 2026-10-27; `c2e2cf0` — HACKATHON BUILD / evidence-linked MVP and release docs, 2026-10-27.

## Product and evidence

- Current routes in successful local build: `/bn`, `/en`, `/ar`, `/bn/new`, `/en/new`, `/ar/new`, `/bn/ledger`, `/en/ledger`, `/ar/ledger`, dynamic review and API routes.
- Tests A-K: 11/11 PASS in deterministic synthetic mode. Test evidence reports 100% evidence traceability and 0% deadline hallucination rate for these fixtures only; this is not a real-world model-quality evaluation.
- Configured model IDs: `muse-voice-transcribe-1.0`, `muse-spark-1.3`, `muse-wonder-1.0`, `muse-image-1.0`, `sam-3.1`.
- Active calls: Voice Transcribe and Spark. Wonder fallback is not wired; Muse Image and SAM are not called. Do not claim those models were used in the demo.
- Public fixtures are synthetic; no real PII or real locations. No actor voice recordings are included.

## Release status

- Production URL: https://alive-bangladesh-coordinator-meta-a.vercel.app (deployment READY; production alias returned HTTP 200). Build used Next.js 16.4.3 and completed on Vercel. The build emitted a warning that the `eslint` option in `next.config.mjs` is no longer supported by Next 16; it did not block deployment.
- Vercel project `alive-bangladesh-coordinator-meta-ai` is connected to the public GitHub repository. Public curl checks returned HTTP 200 for `/bn`, `/en`, `/ar`, `/bn/new`, and `/bn/ledger`.
- Public GitHub URL: https://github.com/mdmahadyhasanruju-byte/alive-bangladesh-coordinator-meta-ai (PUBLIC; `master` pushed). No repository license has been selected or added.
- Demo video URL: TODO. Script prepared at [docs/DEMO_SCRIPT_3MIN.md](docs/DEMO_SCRIPT_3MIN.md); no video has been recorded.
- Submission portal: [provided submission URL](https://cerebralvalley.ai/e/meta-ai-developer-hackathon/hackathon/submit) resolves to the event information page in this check; an authenticated submission form was not verified. [Official event page](https://events.cerebralvalley.ai/e/meta-ai-developer-hackathon)
- Submission status: NOT SUBMITTED.

## Before submission

- [x] Authenticate GitHub and create/push a public repo. Review/select a license before submission.
- [ ] Select a project license before publishing a public repository.
- [x] Deploy to Vercel and verify `/bn`, `/en`, `/ar`, `/bn/new`, and `/bn/ledger` return HTTP 200. Review route/API behavior with durable storage and server-side reviewer authentication before real participant use.
- [ ] Add server-side reviewer authentication and durable storage before exposing review actions publicly.
- [ ] Record a three-minute synthetic-only demo and publish its URL.
- [ ] Confirm the current submission form and submit before the official deadline.
