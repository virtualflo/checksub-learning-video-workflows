# Checksub Learning Video Workflows

Three portable skills for reviewing multilingual training-video handoffs, subtitle delivery and source updates. Published by [Checksub](https://www.checksub.com).

| Skill | Use it for |
| --- | --- |
| training-video-localization-review | Source meaning, terminology and locale reviewer handoff |
| subtitle-delivery-preflight | Caption files, destination requirements and playback evidence |
| training-video-update-impact | Source changes and affected locale assets |

Each skill contains its instructions, a CSV output template and agent UI metadata. Open its SKILL.md and supply the relevant lesson, captions or change request. In Claude Code the plugin prefix is `/checksub-learning-video-workflows:`, followed by the skill name.

## Repository installation

```sh
claude plugin marketplace add virtualflo/checksub-learning-video-workflows
claude plugin install checksub-learning-video-workflows@checksub-learning
```

This directory also provides a self-contained source for the Anthropic directory submission process. [Explore the public lab and fictional teaching cases](https://virtualflo.github.io/checksub-learning-video-workflows/).

## Data handling

The package contains text instructions and CSV templates. It includes no network client, telemetry collector or MCP connection. Your chosen AI host processes materials you supply under that host’s policies. Optional tools you choose can transfer data according to their configuration and permissions.

## Support and security

Use [repository issues](https://github.com/virtualflo/checksub-learning-video-workflows/issues) for functional questions with public fictional material. Report security concerns privately to team@checksub.com as described in [SECURITY.md](SECURITY.md).

## License

Original skill materials are provided under the bundled MIT license. The Checksub name and logo remain brand assets of CHECK COMPANY. The supplied icon is the existing Checksub website favicon, preserved unchanged. Linked vendor documentation retains its own rights.
