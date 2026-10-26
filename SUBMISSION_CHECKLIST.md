# Hackathon Submission Checklist

## Schedule and track

- Build activity documented for Oct 27-Nov 4, 2026. The official event page lists the event window as Oct 26 at 12:00 PM through Nov 4 at 9:00 PM EST; project submissions are due Nov 4 at 9:00 PM ET. That deadline converts to Nov 5, 02:00 UTC / 8:00 AM Bangladesh time (UTC+6). [Official event page](https://events.cerebralvalley.ai/e/meta-ai-developer-hackathon)
- Requested track: Startup. Eligibility and participant acceptance status: NOT VERIFIED.
- Theme: Build for Your World.

## New-work provenance

- Existing verified acting-folder commits: `26c7287` — PEN + SCAFFOLD, 2026-10-27; `e8eb60a` — FIX BUILD, 2026-10-27.
- Additional coordinator implementation and submission-prep files are being recorded in the current dated local commit. Verify the final Git log before sharing.

## Product and evidence

- Current routes in successful local build: `/bn`, `/en`, `/ar`, `/bn/new`, `/en/new`, `/ar/new`, `/bn/ledger`, `/en/ledger`, `/ar/ledger`, dynamic review and API routes.
- Tests A-K: 11/11 PASS in deterministic synthetic mode. Test evidence reports 100% evidence traceability and 0% deadline hallucination rate for these fixtures only; this is not a real-world model-quality evaluation.
- Configured model IDs: `muse-voice-transcribe-1.0`, `muse-spark-1.3`, `muse-wonder-1.0`, `muse-image-1.0`, `sam-3.1`.
- Active calls: Voice Transcribe and Spark. Wonder fallback is not wired; Muse Image and SAM are not called. Do not claim those models were used in the demo.
- Public fixtures are synthetic; no real PII or real locations. No actor voice recordings are included.

## Release status

- Deploy URL: TODO. NOT DEPLOYED. `wrangler.toml` contains only Worker name and compatibility date; `wrangler deploy --dry-run` fails with “Missing entry-point to Worker script or to assets directory.” Wrangler 4.153.0 is installed locally, but `wrangler whoami` reports the stored token expired and unable to refresh because the auth server could not be reached. Cloudflare's current Next.js guide recommends vinext and describes it as beta; no migration or deployment has been performed. [Cloudflare Next.js guide](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/)
- Public GitHub URL: TODO. No Git remote is configured. `gh auth status` reports the saved GitHub token is invalid, so the public repo was not created and nothing was pushed. No repository license has been selected or added.
- Demo video URL: TODO. Script prepared at [docs/DEMO_SCRIPT_3MIN.md](docs/DEMO_SCRIPT_3MIN.md); no video has been recorded.
- Submission portal: [provided submission URL](https://cerebralvalley.ai/e/meta-ai-developer-hackathon/hackathon/submit) resolves to the event information page in this check; an authenticated submission form was not verified. [Official event page](https://events.cerebralvalley.ai/e/meta-ai-developer-hackathon)
- Submission status: NOT SUBMITTED.

## Before submission

- [ ] Authenticate GitHub and create/push a public repo after reviewing included files and license.
- [ ] Select a project license before publishing a public repository.
- [ ] Select a supported hosting path; deploy and verify `/bn`, `/en`, `/ar`, form, review, and ledger routes.
- [ ] Add server-side reviewer authentication and durable storage before exposing review actions publicly.
- [ ] Record a three-minute synthetic-only demo and publish its URL.
- [ ] Confirm the current submission form and submit before the official deadline.
