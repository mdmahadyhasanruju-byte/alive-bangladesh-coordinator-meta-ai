# Hackathon Submission Checklist

## Schedule and track

- Build activity documented for Oct 27-Nov 4, 2026. The official event page lists the event window as Oct 26 at 12:00 PM through Nov 4 at 9:00 PM EST; project submissions are due Nov 4 at 9:00 PM ET. That deadline converts to Nov 5, 02:00 UTC / 8:00 AM Bangladesh time (UTC+6). [Official event page](https://events.cerebralvalley.ai/e/meta-ai-developer-hackathon)
- Requested track: Startup. Eligibility and participant acceptance status: NOT VERIFIED.
- Theme: Build for Your World.

## New-work provenance

- Verified acting-folder commits: `26c7287` — PEN + SCAFFOLD, 2026-10-27; `e8eb60a` — FIX BUILD, 2026-10-27; `c2e2cf0` — HACKATHON BUILD / evidence-linked MVP and release docs, 2026-10-27.

## Product and evidence

- Phase 8 local build: 33 generated pages/routes, including `/welcome`, `/home`, `/services`, `/dashboard`, `/dashboard/assessment`, `/dashboard/ecosystem`, `/pillars/alive`, and `/21raWHox`. These V2 routes are NOT YET VERIFIED in production.
- Current routes in successful local build: `/bn`, `/en`, `/ar`, `/bn/new`, `/en/new`, `/ar/new`, `/bn/ledger`, `/en/ledger`, `/ar/ledger`, dynamic review and API routes.
- Tests A-K: 11/11 PASS in deterministic synthetic mode. Test evidence reports 100% evidence traceability and 0% deadline hallucination rate for these fixtures only; this is not a real-world model-quality evaluation.
- Configured model IDs: `muse-voice-transcribe-1.0`, `muse-spark-1.3`, `muse-wonder-1.0`, `muse-image-1.0`, `sam-3.1`.
- Active calls: Voice Transcribe and Spark. Wonder fallback is not wired; Muse Image and SAM are not called. Do not claim those models were used in the demo.
- Public fixtures are synthetic; no real PII or real locations. No actor voice recordings are included.
- Live E2E on 2026-10-27 Dhaka time: 3/3 text-only synthetic visits (bn/en/ar) reached review as `pending_review`, were approved by the demo reviewer, and appeared in the ledger. Details and limitations: [docs/LIVE_E2E_TEST.md](docs/LIVE_E2E_TEST.md).

## Release status

- V2 deployment: PENDING. After Vercel deploy, verify `/welcome`, `/home`, `/services`, `/dashboard`, `/dashboard/assessment`, `/pillars/alive`, `/21raWHox`, `/bn`, `/bn/new`, and `/bn/ledger` before marking these routes live.
- Demo video: TODO — manual human recording. No automatic recording or upload was made.
- Production URL: https://alive-bangladesh-coordinator-meta-a.vercel.app (deployment READY; production alias returned HTTP 200). Build used Next.js 16.4.3 and completed on Vercel. The build emitted a warning that the `eslint` option in `next.config.mjs` is no longer supported by Next 16; it did not block deployment.
- Vercel project `alive-bangladesh-coordinator-meta-ai` is connected to the public GitHub repository. Public curl checks returned HTTP 200 for `/bn`, `/en`, `/ar`, `/bn/new`, and `/bn/ledger`.
- Public GitHub URL: https://github.com/mdmahadyhasanruju-byte/alive-bangladesh-coordinator-meta-ai (PUBLIC; `master` pushed). No repository license has been selected or added.
- Demo video URL: NOT AVAILABLE. OBS did not remain open, and the available desktop capture included unrelated private application content, so no recording or upload was made. Script: [docs/DEMO_SCRIPT_3MIN.md](docs/DEMO_SCRIPT_3MIN.md).
- Submission portal: NOT VERIFIED. The requested event URL opened the public event information page, which showed “Sign In” and no “Submit Project” control. No authenticated submission form was reached. [Official event page](https://events.cerebralvalley.ai/e/meta-ai-developer-hackathon)
- Submission status: NOT SUBMITTED.

## Before submission

- [x] Authenticate GitHub and create/push a public repo. Review/select a license before submission.
- [ ] Select a project license before publishing a public repository.
- [x] Deploy to Vercel and verify `/bn`, `/en`, `/ar`, `/bn/new`, and `/bn/ledger` return HTTP 200. Review route/API behavior with durable storage and server-side reviewer authentication before real participant use.
- [x] Record the live synthetic text-only E2E run and its limits in [docs/LIVE_E2E_TEST.md](docs/LIVE_E2E_TEST.md).
- [ ] Add server-side reviewer authentication and durable storage before exposing review actions publicly.
- [ ] Record a three-minute synthetic-only demo and publish its URL; use a clean capture window that does not show private desktop content.
- [ ] Confirm the current submission form and submit before the official deadline.
- [ ] Create [docs/POST_SUBMISSION_CUSTOM_DOMAIN.md](docs/POST_SUBMISSION_CUSTOM_DOMAIN.md) after submission, as requested; it has not been created because submission is not confirmed.
