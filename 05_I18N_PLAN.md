# Internationalization Plan

## Initial languages

Begin interface planning for Bengali (`bn`), English (`en`), and Arabic (`ar`). Treat these as target languages; translated interface quality and model capability are not verified by this plan. Arabic requires right-to-left layout support. Bengali typography, input methods, and line breaking need native-speaker review.

## Application approach

Use `next-intl` if the chosen Next.js application and its installed version support the required routing model; verify compatibility before implementation. Keep user-visible copy in locale catalogs, avoid embedding language-specific strings in business logic, and provide a documented fallback when a translation is missing. Do not infer identity or community from the browser locale.

Language detection may suggest a starting locale, but the user must be able to choose and change it. Store only the preference needed for the experience, and avoid silently switching mid-task.

## Transcription and extraction

Pass an explicit `language` parameter to transcription when known and selected by the user or coordinator. Support an `auto` option only if the verified provider contract allows it and the user experience communicates uncertainty. Preserve original text alongside reviewed translations when translation is added, with provenance and reviewer attribution. Evaluate code-switching, dialects, names, numerals, and low-resource language performance with consented, representative data before making quality claims.

## Global design target

Design for future locale packs, local terminology, plural and date/number formats, RTL scripts, accessibility, and community review. A long-term goal of more than 100 languages is an aspiration requiring separate feasibility, quality, safety, and maintenance evidence; it is not a delivery commitment.