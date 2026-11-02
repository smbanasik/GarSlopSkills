---
name: writing-specs
description: Writes clear, precise, and reviewable specifications that serve as a source of truth for what should be built. Covers how to structure specifications, define requirements and acceptance criteria, document decisions, assumptions, non-goals, edge cases, and risks, and keep specifications concise and appropriately scoped. Use this skill whenever the user asks to write, draft, revise, or improve a specification, design document, PRD, requirements document, or similar planning artifact, or when substantial work would benefit from a written specification.
---

# Writing Specs

The spec is the primary source of truth: when there is a question about what to build, how it should behave, or why a choice was made, the answer lives in the spec.

## When a spec is required

Write a spec before code when any of these hold:

- The work adds a capability that did not exist before.
- It changes a public interface, data model, on-disk format, or stored state.
- It spans more than one file, or more than one session.
- A decision in it will later prompt "why was this done?"

Skip the spec for a contained fix inside one file that changes no interface; the commit message carries the reasoning. Do not skip it because the work looks small: hidden interface changes are where drift starts.

## The core rules

These are immutable rules that must be followed for best practices.

1. **The specification must be precise enough to build from and review against.** Requirements, behavior, constraints, and acceptance criteria must be stated clearly enough that the intended result can be determined without relying on unstated assumptions.

2. **The specification is the source of truth for its intended behavior.** Requirements must be consistent with one another. Decisions, assumptions, non-goals, and constraints that affect the intended result must be recorded in the specification rather than left implicit.

3. **The specification must reflect known problems and uncertainty.** Ambiguities, contradictions, open questions, edge cases, risks, and important assumptions must be identified rather than silently resolved or omitted.

---
## How to write a spec

A good spec is **precise enough to build from and review against, and short enough that a human will actually read it carefully.** Complex tasks should be broken into smaller specs.
### Principles

- **Clarify Intent.** Rubber duck with the human to get their intent. Ask them for clarifications, constraints, or any other nonobvious info. 
- **Describe what and why before how.** Include implementation design only as far as needed to make decisions reviewable (architecture, data models, interfaces, key algorithms). Don't dictate code-level detail that the implementer can reasonably choose.
- **Number the requirements.** Give each a stable ID (R1, R2, …) so tests, code, and later amendments can refer to them. Don't renumber after approval; add new IDs and mark removed ones as withdrawn.
- **Use precise language.** "Must" means required, "should" means strongly preferred, "may" means optional. Avoid weasel words.
- **State non-goals explicitly.** What you are deliberately not doing is as important as what you are doing. This is the best defense against scope creep.
- **Record decisions with their reasons.** For each significant choice, note the alternatives considered and why this one won. Future readers will otherwise relitigate it or break it by accident. If a decision is complex, keep it in the spec and move the supporting detail to a linked companion document.
- **Surface assumptions and open questions.** Unknowns written down get resolved in review. Unknowns left implicit become bugs. Give them their own section in the spec, and raise them with the human directly.
- **Cover the unhappy paths.** Specify errors, edge cases, invalid input, failure modes, and what happens when dependencies are unavailable. Most real bugs live here.
- **Define done.** Acceptance criteria should let someone verify, without asking you, whether the work is complete.
### Structure

Use references/spec-template.md as the starting point.
### Calibrating size

When a spec grows past what a reviewer can hold in their head, split it. Specs should be feature level actionable items. If necessary, have an overview spec that references the smaller, sub-specs.
### Reviewing your own draft before presenting it

Before handing the spec to the human, check it yourself:

- Could another engineer, or a fresh agent with no context, build the right thing from this alone?
- Is every requirement testable, and does every requirement have an acceptance criterion?
- Are non-goals stated? Are error paths covered?
- Are assumptions and open questions listed in their own section?
- Is there anything in the design that is really just my preference and not required? Trim or label it.
- Does it contradict itself?

See references/review-checklist.md for a fuller version you can also offer to the human as a reviewer aid.