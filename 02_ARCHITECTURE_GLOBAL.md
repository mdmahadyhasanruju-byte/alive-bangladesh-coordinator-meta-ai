# Architecture: Narrow MVP to Global Direction

## Evidence-linked workflow

```mermaid
flowchart LR
  A[Field Input<br/>consented text / audio / optional image] --> B[Validation<br/>consent, format, size, safe location]
  B --> C[Transcribe<br/>voice-transcribe-1.0]
  C --> D[Extract<br/>spark-1.3 / wonder-1.0]
  D --> E[Evidence Linker<br/>source spans and hashes]
  E --> F[Draft Generator<br/>structured proposal]
  F --> G[Human Review<br/>edit, reject, approve]
  G --> H[Approved Ledger<br/>only human-approved records]
```

Image input is optional. An image may be attached as an evidence reference using a content hash; image interpretation is out of scope until separately specified and approved. The pipeline must retain provenance so reviewers can trace each extracted statement to source material. If evidence is missing or ambiguous, the system records missing information and asks a follow-up instead of filling gaps.

## MVP boundary

The MVP should prove one narrow, supervised workflow with synthetic public-demo data: submit consented sample input, transcribe when audio is used, extract a small set of fields, link claims to evidence, produce a draft, and let a human approve or reject it. It should not autonomously publish, allocate resources, contact participants, or treat model confidence as truth. Location should be generalized or withheld unless a safe precision is explicitly selected.

## Global direction

The architecture should permit additional languages, local terminology, policy settings, retention rules, and human review roles without assuming that a Bangladesh workflow applies everywhere. The aspiration of 100+ languages is a design target, not an MVP promise or verified model capability. Language coverage, transcription quality, extraction quality, and accessibility require evaluation per language and community before being claimed.

## Failure behavior

Reject malformed or oversized inputs; preserve a safe error state; identify low-confidence or unlinked claims for review; never turn a failed transcription into an invented transcript; and keep model/service failures visible to the coordinator. No record reaches the approved ledger until an authorized human approves it.