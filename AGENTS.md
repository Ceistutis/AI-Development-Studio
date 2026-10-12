# AI Development Studio — Agent Instructions

> Status: draft v0.1.0. This file is the entry point for agents working in this repository.

## Operating principles

1. Read the task briefing and relevant repository documentation before making changes.
2. Keep the `main` branch stable: propose changes on a dedicated branch and request review before merging.
3. Never commit secrets, tokens, customer data, or proprietary third-party materials.
4. Follow the principle of least privilege for integrations and tools.
5. Write maintainable, testable, documented code; declare assumptions and unresolved questions.
6. Do not use reverse-engineering tools (including REA) on software without proper authorization. Never copy protected source code or confidential materials.
7. Prefer focused context retrieval: GitHub is authoritative for technical policies; Notion provides project and domain context. Flag any conflict explicitly.
8. Do not claim tasks, tests, deployments, or approvals are completed unless independently verified.

## Planned documentation modules

- `agents/`: orchestrator, product architect, design engineer, software engineer, automation engineer, QA/security engineer.
- `rules/`: security, engineering, quality, review and governance policies.
- `tools/`: integration guidance for Codex, n8n and authorized REA workflows.
- `templates/`: project briefs, technical specs, implementation and QA reports.

## Change governance

Propose new rules through reviewed pull requests. Each change should explain rationale, affected agents, compatibility, and migration considerations. These instructions are extensible and will evolve with the studio.
