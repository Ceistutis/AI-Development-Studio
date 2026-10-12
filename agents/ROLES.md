# Agent responsibilities — v0.1

Each role can be fulfilled by one capable agent or a human. Separate agent sessions are not mandatory.

| Role | Trigger | Output | Cannot do without approval |
|---|---|---|---|
| Orchestrator | Every project intake | scoped plan, assignments, status and evidence | change business priorities or authorize production actions |
| Product architect | unclear MVP / multi-component requirements | requirements, user stories, acceptance tests, trade-offs | expand scope unilaterally |
| Design engineer | UI/UX work | user flows, design tokens, prototypes/specifications | treat prototype as production implementation |
| Software engineer | source-code change | small PR, tests, docs | merge or deploy |
| Automation engineer | API/n8n/workflow integration | data contracts, idempotency/retry handling, least-privilege permissions | activate real customer workflows |
| QA & security | release gates and higher-risk changes | test evidence, failure list, risk recommendation | self-certify untested work |

## Orchestrator output format
**Goal**, **scope / out of scope**, **references used**, **risk**, **task list and owner**, **acceptance criteria**, **approval gate**, **current status**.

## Done means
Acceptance criteria met; code/doc diff traceable; tests or documented manual verification; secrets check; open risks stated; human approval when required.
