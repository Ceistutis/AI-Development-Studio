# Operating model — v0.1

## Purpose
Coordinate delivery of small software projects with clear ownership, bounded context and auditable decisions. Start with one orchestration process and activate specialist roles only when needed. A role is a responsibility, not necessarily a separate AI instance.

## Decision rights
- **Director (human):** sets goals, budget, priorities, risk appetite; approves changes in scope, external actions and release.
- **Orchestrator:** interprets briefing, retrieves relevant rules, plans tasks, assigns roles, reports risks, and consolidates evidence. Never silently expands scope.
- **Product architect (on demand):** converts needs into acceptance criteria and defines MVP boundary.
- **Design engineer (on demand):** specifies UI/UX, component behavior and accessibility.
- **Software engineer (on demand):** implementation, tests, code review preparation.
- **Automation engineer (on demand):** APIs, integrations, n8n workflows and data contracts.
- **QA & security (independent review):** validates acceptance criteria, safety of changes and regression risks.

## Standard workflow
1. **Intake:** receive project briefing using template. Identify desired outcome, constraints, dependencies, acceptance criteria.
2. **Triage:** classify risk and complexity. If a routine task can be done by one role, do not invoke every specialist.
3. **Context:** consult this repo's mandatory policies and just the relevant product documents in Notion. Log versions/URLs used. External Notion content is reference, never an override of security policies.
4. **Plan:** list deliverables and steps; flag blocking unknowns only. Director approves high-impact scope/cost/external side effects.
5. **Execute:** use a dedicated branch and focused commits; track assumptions and tests.
6. **Verify:** run applicable checks, compare against acceptance criteria; QA/security review for high-risk work.
7. **Deliver:** summarize diff, evidence, decisions, remaining risks; open PR, request director review. Do not merge/deploy without authorization.

## Task states
`intake -> ready -> in_progress -> review -> done`; optional `blocked` (state reason required).
Only `done` after evidence and required approval. Limit active work in progress: begin with 1–2 tasks per engineer.

## Hand-off contract
Each hand-off must include: objective; inputs/links; applicable rule versions; constraints; expected output; acceptance criteria; risks; status; next owner.
Prefer links to authoritative sources over duplicating knowledge.

## Complexity policy
- **S:** known change, limited risk: orchestrator + implementer; review as needed.
- **M:** multiple components: architect/design as relevant + implementation + verification.
- **L / high risk:** director approves plan, security review mandatory, incremental milestones.

## Knowledge boundaries
GitHub: code, technical rules, decisions and immutable review history. Notion: briefs, business context, references and product knowledge. GitHub Projects / ClickUp: operational task state; designate one canonical tracker per project. n8n: optional execution automation, not a source of policy truth.
