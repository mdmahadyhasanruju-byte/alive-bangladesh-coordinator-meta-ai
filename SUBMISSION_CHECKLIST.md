# Hackathon Submission Checklist

## Schedule and track

- Build activity documented for Oct 27-Nov 4, 2026. The official event page lists the event window as Oct 26 at 12:00 PM through Nov 4 at 9:00 PM EST; project submissions are due Nov 4 at 9:00 PM ET. That deadline converts to Nov 5, 02:00 UTC / 8:00 AM Bangladesh time (UTC+6). [Official event page](https://events.cerebralvalley.ai/e/meta-ai-developer-hackathon)
- Requested track: Startup. Eligibility and participant acceptance status: NOT VERIFIED.
- Theme: Build for Your World.

## New-work provenance

- Verified acting-folder commits: `26c7287` — PEN + SCAFFOLD, 2026-10-27; `e8eb60a` — FIX BUILD, 2026-10-27; `c2e2cf0` — HACKATHON BUILD / evidence-linked MVP and release docs, 2026-10-27; `de836e3` — V2 professional packing: `/pitch` page, 74 MB film, poster, five reference JPEGs, 34 pages, 2026-10-28.

## Product and evidence

- Phase 8 + pitch build: 34 generated pages/routes, including `/pitch`, `/welcome`, `/home`, `/services`, `/dashboard`, `/dashboard/assessment`, `/dashboard/ecosystem`, `/pillars/alive`, and `/21raWHox`.
- Current routes in successful local build: `/bn`, `/en`, `/ar`, `/bn/new`, `/en/new`, `/ar/new`, `/bn/ledger`, `/en/ledger`, `/ar/ledger`, dynamic review and API routes.
- Tests A-K: 11/11 PASS in deterministic synthetic mode. Test evidence reports 100% evidence traceability and 0% deadline hallucination rate for these fixtures only; this is not a real-world model-quality evaluation.
- Configured model IDs: `muse-voice-transcribe-1.0`, `muse-spark-1.3`, `muse-wonder-1.0`, `muse-image-1.0`, `sam-3.1`.
- Active calls: Voice Transcribe and Spark. Wonder fallback is not wired; Muse Image and SAM are not called. Do not claim those models were used in the demo.
- Public fixtures are synthetic; no real PII or real locations. No actor voice recordings are included.
- Live E2E on 2026-10-27 Dhaka time: 3/3 text-only synthetic visits (bn/en/ar) reached review as `pending_review`, were approved by the demo reviewer, and appeared in the ledger. Details and limitations: [docs/LIVE_E2E_TEST.md](docs/LIVE_E2E_TEST.md).

## Release status

- Current deployment: READY on 2026-10-28. Vercel deployment `dpl_51Z5utC5VxDph7BQGDoDRqnPHabE` (`alive-bangladesh-coordinator-meta-ref1o6xal.vercel.app`) holds the production alias and includes the YouTube embed and the four V2 artworks.
- Previous deployments: `dpl_2d2E1pcJtpqvC7V9hZsdroDdca68` built `de836e3` (pitch page + 74 MB film + poster + reference JPEGs), READY 2026-10-28 07:31 +06; `dpl_6aQcCxhcNkJMkuzJVYUse6x2dYLg` built `0918d84`, READY 2026-10-27.
- Production HTTP checks on 2026-10-28 from `https://alive-bangladesh-coordinator-meta-a.vercel.app`: `/welcome`, `/home`, `/services`, `/dashboard`, `/dashboard/assessment`, `/pillars/alive`, `/bn`, `/bn/new`, `/bn/ledger`, `/21raWHox`, and `/pitch` all returned HTTP 200.
- Premium packing page `/pitch`: HTTP 200, verified live; renders the YouTube iframe, the local MP4 fallback, and the four artworks.
- Video asset `/videos/aLive_Bangladesh.mp4`: HTTP 206 for a range request (200 otherwise), 77,941,309 bytes; source 3:21, 1920×1080, H.264/AAC.
- YouTube Unlisted URL: https://youtu.be/BvJYe5-Hevo — verified through YouTube oEmbed and the watch page (HTTP 200).
- Four professional artworks are stored in `public/images/v2/` (river sunrise, community hands, Bangladesh network, tube well) and shown on `/pitch` labelled illustrative / AI-generated; they are not photographs and not evidence. Five supplied screenshot-style JPEGs remain in `public/images/packing/` for reference only; their embedded mock statistics and testimonials are unverified.
- Submission video: the supplied documentary film is uploaded (Unlisted) and integrated. A screen-recording walkthrough of the synthetic flow was not made.
- Production URL: https://alive-bangladesh-coordinator-meta-a.vercel.app (deployment READY; V2 route checks above returned HTTP 200). Build used Next.js 16.4.3 and completed on Vercel.
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
- [ ] Record a three-minute synthetic-only **walkthrough** of the product flow and publish its URL; use a clean capture window that does not show private desktop content. The submission film (https://youtu.be/BvJYe5-Hevo) is uploaded, but it is the supplied documentary, not a product walkthrough.
- [ ] Confirm the current submission form and submit before the official deadline.
- [ ] Create [docs/POST_SUBMISSION_CUSTOM_DOMAIN.md](docs/POST_SUBMISSION_CUSTOM_DOMAIN.md) after submission, as requested; it has not been created because submission is not confirmed.
