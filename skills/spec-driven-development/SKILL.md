---
name: spec-driven-development
description: "Use when driving work from a written spec end to end: gather context, write the spec, review it in a fresh context, implement, and amend as code reveals problems. Configures the specs directory and companion skills per phase; delegates writing rules to writing-specs."
---

# Spec-driven development

Drive the whole loop: **context → spec → fresh-context review → implement → amend**. This skill is the driver; the writing rules live in `writing-specs`, which you load in Phase 2 and use (its template and review checklist) throughout. Do not restate its rules here.

Load any companion skills the config lists at the phase where they apply, before doing that phase's work.

## Configuration

Read config first, first match wins:

1. `<repo>/.agents/spec-driven.json`
2. `~/.pi/agent/spec-driven.json`
3. the defaults below

`<repo>` is `git rev-parse --show-toplevel`; use the cwd when it is not a git repo.

If neither file exists, ask the user once whether to create the project config. If they agree, run this skill's script instead of writing the JSON by hand:

```bash
node scripts/init-config.mjs
```

It writes `<repo>/.agents/spec-driven.json` with the defaults below, creates `.agents/` as needed, and refuses to overwrite an existing file. Then edit the file only if the user asked for non-default values.

```json
{
  "specs_dir": "./agent-docs/specs",
  "skills": {
    "all": ["output-guidelines"],
    "context": ["codebase-discipline"],
    "write": [],
    "review": [],
    "implement": ["codebase-discipline"],
    "amend": []
  },
  "review_agent": "reviewer",
  "require_approval": true
}
```

| Key | Default | Meaning |
|---|---|---|
| `specs_dir` | `./agent-docs/specs` | Where specs live, resolved against the repo root and created on first write. |
| `skills` | `{}` | Skills to load per phase. A flat array is shorthand for `{"all": [...]}`. Phase keys: `all`, `context`, `write`, `review`, `implement`, `amend`. |
| `review_agent` | `reviewer` | Subagent for the fresh-context review; fall back to `general-purpose` when unavailable. |
| `require_approval` | `true` | Block Phase 4 until a human approves the spec. |

A missing or malformed config is not an error: use the defaults and say which config (or defaults) you used.

## Phase 1: Get context

Goal: know enough to write a spec you can defend in review. Produce notes, not code.

- Ask the human for intent, constraints, and non-goals before searching. Their answer sets the scope; the repo does not.
- Survey the code you will touch: existing interfaces, data shapes, tests, conventions, and prior specs in `specs_dir`. Delegate broad recon (many directories, unclear entry points) to a subagent and keep compressed findings.
- Stop at "could another engineer build this from what I know?", not at "I have read everything".
- Raise consequential ambiguity with the human now. Do not resolve it silently, and do not write code to find out.

Do not edit source files in this phase. Throwaway probes are fine; a change that lands is a phase skip.

## Phase 2: Write the spec

- Load `writing-specs`. Follow its rules, and use its `references/spec-template.md` headings as-is.
- Write to `<specs_dir>/<slug>.md`, slug = short kebab-case feature name. Feature-level only: if it outgrows one review sitting, split it into linked sub-specs plus an overview spec.
- `Status: DRAFT`, `Version: 0.1`, author and date filled; leave approval fields blank.
- Run its self-check before showing it, then present the path and the open questions to the human.

## Phase 3: Review in a fresh context

The author cannot review their own draft: the context that produced a gap also rationalizes it. Review must run with no memory of drafting.

- Delegate to `review_agent` with only the spec path, the repo path, the `writing-specs/references/review-checklist.md` path, and the instruction to judge the spec alone. Do not pass your design rationale, and tell the reviewer not to ask you for it.
- Ask for findings as a list: location, problem, why it matters, suggested fix. Missing sections and untestable requirements count.
- Apply the findings you accept; record rejected ones as accepted risks or open questions. Never dismiss a finding silently.
- Set `Status: IN REVIEW` and present the updated spec to the human.
- With `require_approval: true`, stop until the human explicitly approves this exact version. Only that approval fills `Approved by`/`Approved on` and moves the version to `1.0`, `Status: APPROVED`.

## Phase 4: Implement

- Work from requirement IDs. Every shipped requirement has code and at least one check from the acceptance criteria; cite `R<n>` in commit messages and test names.
- Implement only what the spec says. New scope, a changed interface, or a behavior nobody specified is a spec problem: return to Phase 2 or 5 before writing that code.
- When code proves the spec wrong, amend the spec (Phase 5) in the same turn. Never deviate silently, and never rewrite the spec afterwards to match what you built.
- If an open question blocks progress, stop and take it to the human. Do not answer it yourself in code.

## Phase 5: Amend the spec

Amend whenever implementation, review, or a new fact invalidates part of an approved spec.

- Patch the affected sections only; keep the rest of the document intact.
- Bump the version: `1.1` for clarifications, `2.0` for changes to scope, goals, or core design.
- Add a changelog row: what changed, why, what triggered it, and which requirements or code are affected.
- Never renumber requirements. Mark removed ones `WITHDRAWN` and add new IDs.
- A substantive edit moves `APPROVED` back to `DRAFT`/`IN REVIEW` until the human approves again, and code is matched to the amended spec in the same turn.

## Guardrails

- Never implement against a spec with open questions the human has not accepted as risks.
- Never let code and spec diverge for more than one turn. Drift is the failure this skill exists to prevent.
- Commit specs with the code: they are the artifact, not working notes.
- Do not write a spec for work that does not need one. Apply `writing-specs`' "when a spec is required" test and skip this skill when it fails.

