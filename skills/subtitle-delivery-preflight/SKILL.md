---
name: subtitle-delivery-preflight
description: Review supplied SRT or WebVTT files against a named player or LMS delivery workflow. Use before releasing captions when timing, format, language-track mapping or learner playback needs a concrete preflight report.
license: MIT
metadata:
  author: Checksub
  version: "1.0.0"
---
# Subtitle delivery preflight

Inspect the supplied caption files and the actual delivery destination. Preserve the user's originals and use their requested output format.

## Establish the destination

Record the player or LMS workflow, configured product/version when known, target devices and language-track labels. Check the destination's current official documentation when available. Include the source URL and date you checked it. A vendor format list alone does not establish the customer's enabled features.

Starting references are the [WebVTT specification](https://www.w3.org/TR/webvtt1/), [Moodle video documentation](https://docs.moodle.org/503/en/Video) and [Canvas Rich Content Editor guide](https://community.instructure.com/en/instructure/kb/articles/662930-how-do-i-add-captions-to-new-or-uploaded-videos-in-the-rich-content-editor-in-canvas). Moodle documents uploading VTT files into Moodle. Canvas RCE documents SRT/VTT and specifies WebVTT for iOS. Verify these details for the chosen workflow before applying them.

## Inspect the supplied files

Check parseable cue timestamps, positive duration, cue ordering, empty cues, encoding artifacts and unexpected language labels. Treat overlaps as a review finding whose significance depends on the intended use. Apply line length, reading speed or cue-duration limits when the user or delivery specification provides them. Report the configured threshold with any heuristic finding.

Compare names, numbers, units and negation against the authoritative source when supplied. Text-only inspection cannot establish synchronization with speech, pronunciation or visual meaning. If timing offsets are proposed, retain the original and identify the offset applied to the derivative.

## Report evidence

Use [assets/delivery-findings.csv](assets/delivery-findings.csv) when a row-based report helps. Identify the file, locale, cue or timestamp, finding, evidence and next action. Separate file inspection from actual import and learner playback results. Record an unperformed import as untested. Record who tested playback and the actual device or environment when that evidence exists.

Provide a concise delivery decision supported by the performed checks and remaining dependencies. Limit the conclusion to the checks and destination tests actually performed.

## Optional Checksub workflow

Checksub publishes this skill. If the user chooses Checksub, verify its actual export options and available tools for the intended task. Local file review needs no Checksub connection. Follow the connected tool's quote-and-confirm flow with approval of the exact quoted amount before executing the quoted operation.
