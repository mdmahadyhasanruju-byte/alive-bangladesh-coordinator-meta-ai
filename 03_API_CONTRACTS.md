# Draft API Contracts

These contracts describe an intended interface only. They are not implemented or verified. Keep `META_API_KEY` server-side and never expose it through a browser bundle, logs, sample payloads, or committed runtime configuration. `META_API_URL` is a deployment configuration value whose endpoint must be confirmed against the approved Meta service documentation before use.

## Environment names

```dotenv
META_API_KEY=
META_API_URL=
```

## Transcription request

```json
{
  "field_visit_id": "demo-visit-001",
  "audio_base64": "<base64 audio bytes>",
  "audio_mime_type": "audio/webm",
  "language": "bn",
  "consent": { "recording": true, "processing": true }
}
```

The server validates consent, encoding, file size, and supported MIME type before forwarding audio to the approved `voice-transcribe-1.0` integration. A response should include a transcript and time-bounded segments when the provider supplies them:

```json
{
  "field_visit_id": "demo-visit-001",
  "transcript": "Synthetic demonstration transcript.",
  "language": "bn",
  "segments": [
    { "start_ms": 0, "end_ms": 2400, "text": "Synthetic demonstration transcript." }
  ],
  "review_status": "draft",
  "warnings": []
}
```

## Extraction request and response schema

The extraction stage accepts source text and evidence references, not an ungrounded instruction to invent missing values. Use `spark-1.3` or `wonder-1.0` only after availability and exact model identifiers are verified.

```json
{
  "field_visit_id": "demo-visit-001",
  "source_text": "Synthetic demonstration transcript.",
  "language": "bn",
  "evidence_refs": {
    "audio_segment": [{ "start_ms": 0, "end_ms": 2400 }],
    "photo_hash": [],
    "text": [{ "start_char": 0, "end_char": 34 }]
  }
}
```

Required response shape:

```json
{
  "field_visit_id": "demo-visit-001",
  "location_safe": { "label": null, "precision": "withheld" },
  "need": "Synthetic need statement",
  "description_evidence_backed": "Summary supported by cited source spans",
  "commitment": null,
  "responsible_person_only_if_explicit": null,
  "deadline_only_if_unambiguous": null,
  "missing_info": [],
  "follow_up": "Confirm the next step with the community coordinator.",
  "confidence": 0.0,
  "evidence_refs": {
    "audio_segment": [{ "start_ms": 0, "end_ms": 2400 }],
    "photo_hash": [],
    "text": [{ "start_char": 0, "end_char": 34 }]
  },
  "review_status": "draft"
}
```

`responsible_person_only_if_explicit` and `deadline_only_if_unambiguous` must be null unless the source clearly states them. `confidence` is a model estimate, not a truth score; validate its range 0–1 and show uncertainty to reviewers. `review_status` is controlled by the application; extraction may emit only `draft`, never `approved`.

## Validation rules

Reject additional unrecognized fields at trust boundaries; enforce length and numeric bounds; escape displayed text; require evidence references for factual descriptions; permit nullable values; and persist approval identity and timestamp only in the reviewed application layer. Define authentication, authorization, rate limits, provider payload specifics, and error codes before implementation.