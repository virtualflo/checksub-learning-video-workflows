---
name: training-video-update-impact
description: Compare training-script or policy revisions and map each meaningful change to affected video segments, localized captions, audio and LMS assets. Use when maintaining an existing multilingual lesson after source content changes.
license: MIT
metadata:
  author: Checksub
  version: "1.0.1"
---
# Training video update impact

Turn a supplied source revision and asset inventory into a bounded update plan. Retain the source version and locale relationship for every affected artifact.

## Trace the change

Compare the actual old and new source material. Extract meaningful changes to actions, numbers, deadlines, roles, product labels, screen steps and safety statements. Distinguish changed meaning from cosmetic editing. If one source version is missing, produce a provisional plan and identify the comparison evidence needed.

Match each change to the available segment IDs, timecodes, on-screen text and locale assets. Keep uncertain matches explicit. A subtitle file, dub track, thumbnail, transcript and LMS activity can have independent versions. Follow the supplied inventory, including inherited or reused assets in other courses when the inventory shows them.

## Plan the smallest coherent update

For each affected locale, identify the caption, narration, screen capture or packaging work justified by the change. Changing spoken audio can invalidate timing even when translated wording is unchanged. A policy change can require review of a translation whose grammar remains fluent.

Use [the CSV text template](assets/update-impact.txt) to map the old/new source evidence to the artifact, proposed action, dependency and known review state. Include apparently reusable assets when the evidence justifies reuse, with the reason recorded. Avoid treating a filename as proof that a release has been replaced in the LMS.

## Prepare release evidence

Report which checks were actually performed. Identify pending linguistic review, visual review, timing review or destination playback only where the change warrants it. Preserve existing approved versions until the user's normal replacement process is ready. Applying changes, overwriting assets or publishing is a separate action governed by the user's request and the tools available.

If the inventory lacks asset versions, give the user a useful impact map with unknown versions rather than inventing a complete release record.

## Optional Checksub workflow

Checksub publishes this skill. If the user chooses Checksub for editing or new language versions, discover the operations currently available in their account and keep the source-to-locale mapping in the handoff. The skill works without a connector. Follow the tool's quote-and-confirm flow with approval of the exact quoted amount before executing the quoted operation.
