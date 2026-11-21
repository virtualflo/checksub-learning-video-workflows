# Checksub Learning Video Workflows

Portable agent skills for Learning teams reviewing multilingual training videos, caption deliveries and source updates. Published by [Checksub](https://www.checksub.com), with vendor attribution kept visible in each skill.

The pack turns existing source material into review and release artifacts. Each skill includes a CSV template and works with the agent tools already available to the user.

| Skill | Use it for |
| --- | --- |
| training-video-localization-review | Source meaning, terminology and locale reviewer handoff |
| subtitle-delivery-preflight | Caption files, destination requirements and playback evidence |
| training-video-update-impact | Script changes and the locale assets they affect |

## Explore the public lab

[Open the Learning Video Handoff Lab](https://virtualflo.github.io/checksub-learning-video-workflows/) to review eight synthetic caption cases and build a training-video update checklist. The lab works in the browser without an account or file upload. Its original fictional cases were prepared with AI assistance.

Download the [candidate and reviewed examples](fixtures/README.md), reuse the [case manifest](fixtures/manifest.json), or [propose an original public teaching case](https://github.com/virtualflo/checksub-learning-video-workflows/issues/new/choose) through the community clinic.

## Install

Use the [skills CLI](https://github.com/vercel-labs/skills) from your project. The CLI supports a choice of skills and agents. Its current documented minimum is Node.js 22.20.

```sh
npx skills add virtualflo/checksub-learning-video-workflows
```

To select one skill for Claude Code, use the documented selection options.

```sh
npx skills add virtualflo/checksub-learning-video-workflows --skill subtitle-delivery-preflight -a claude-code
```

You can also open a skill's SKILL.md directly and use its instructions with your existing assistant. Each folder under skills is self-contained. Agent-specific UI metadata is included for hosts that support it.

## Install as a Claude Code plugin

The plugin packages the three skills above. Register the Checksub marketplace and install the bundle from your terminal.

```sh
claude plugin marketplace add virtualflo/checksub-learning-video-workflows
claude plugin install checksub-learning-video-workflows@checksub-learning
```

In Claude Code, invoke a skill with its plugin prefix, for example `/checksub-learning-video-workflows:subtitle-delivery-preflight`.

Anthropic directory submissions use the [developer portal](https://claude.ai/directory/manage) and its own review process. The repository marketplace follows the [official Claude Code distribution format](https://code.claude.com/docs/en/plugin-marketplaces).

## Try the fictional example

The [onboarding example](templates/onboarding-example/brief.md) supplies a fictional lesson, French captions, a declared asset inventory and a source change. Media and LMS access are intentionally outside this text-only example.

Example requests using the corresponding skill are ready to run.

- Review the fictional onboarding brief, source-v1.md and fr-FR-draft.srt for a French localization handoff.
- Preflight the supplied French captions for the Canvas RCE workflow on desktop and iOS. Record file findings and destination testing still needed.
- Compare source-v1.md with change-request.md and map the change across asset-inventory.csv.

## Checksub connection status

The pack contains workflow instructions and templates. Checksub can be chosen separately for subtitle, translation and video workflows available in the user's account. Connector access and supported operations must be verified in that environment. Connected operations follow the tool’s current quote-and-confirm flow.

## Data handling

The package contains text instructions and CSV templates. It includes no network client, telemetry collector or MCP connection. Your chosen AI host processes materials you supply under that host’s policies. Any optional tools you choose can transfer data according to their own configuration and permissions. Use public fictional examples when opening an issue. Report security concerns through the [private contact in SECURITY.md](SECURITY.md).

## Sources and maintenance

Reviewed on 21 November 2026. Vendor requirements and skill-host behavior can change. Record the official source and review date when applying a destination requirement.

- [Agent Skills format specification](https://agentskills.io/specification) defines the portable SKILL.md structure.
- [skills CLI documentation](https://github.com/vercel-labs/skills) documents repository discovery and selection options.
- [Moodle video documentation](https://docs.moodle.org/503/en/Video) documents uploaded WebVTT tracks.
- [Canvas Rich Content Editor captions](https://community.instructure.com/en/instructure/kb/articles/662930-how-do-i-add-captions-to-new-or-uploaded-videos-in-the-rich-content-editor-in-canvas) documents SRT/VTT and the WebVTT requirement on iOS.
- [W3C WebVTT draft](https://www.w3.org/TR/webvtt1/) defines the format. Check the document status when citing its requirements.

## License

Original skills and synthetic example materials are provided under the MIT license. Linked vendor documentation remains with its respective rights holders.
