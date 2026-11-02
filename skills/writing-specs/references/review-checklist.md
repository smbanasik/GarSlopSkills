# Spec Review Checklist

Use this in two ways:

1. **Self-check** before presenting a draft to the human.
2. **Reviewer aid**: offer it to the human, or pull the relevant questions into your review request so they know where to focus.

A spec doesn't need every box checked to be approved. Unchecked items should be conscious decisions, ideally recorded as assumptions or accepted risks.

## Clarity and completeness

- [ ] The summary explains what and why in a few sentences
- [ ] The problem is described well enough that someone new could understand why this work exists
- [ ] Goals are stated and non-goals are explicit
- [ ] Terms are defined or used consistently (no two names for one thing)
- [ ] No weasel words left: "etc.", "and so on", "appropriately", "as needed", "user-friendly", "fast"

## Requirements

- [ ] Every requirement has a unique, stable ID
- [ ] Every requirement is testable: a person could say pass or fail
- [ ] Must / should / may are used deliberately
- [ ] Non-functional requirements (performance, security, privacy, reliability, accessibility) are stated where relevant, with numbers
- [ ] Requirements don't contradict each other or existing specs
- [ ] Nothing in requirements is really a design preference in disguise

## Design

- [ ] The approach is understandable and reviewable without reading code
- [ ] Interfaces, data shapes, and boundaries between components are defined
- [ ] Significant decisions list alternatives considered and the reasoning
- [ ] The design actually satisfies every requirement (trace each one)
- [ ] Dependencies, integrations, and migration or rollout steps are covered

## Robustness

- [ ] Error handling and failure modes are specified
- [ ] Edge cases and invalid input are covered
- [ ] Security and privacy implications are considered
- [ ] Backward compatibility and data migration are addressed
- [ ] Risks are listed with mitigations

## Verifiability

- [ ] Every requirement maps to at least one acceptance criterion
- [ ] The test plan says how each criterion will be verified
- [ ] "Done" is unambiguous

## Honesty about unknowns

- [ ] Assumptions are listed and easy to find
- [ ] Open questions are listed, each with an owner
- [ ] Open questions are resolved or explicitly accepted before approval
- [ ] Anything uncertain is flagged rather than written as if it were certain

## Scope and size

- [ ] Scope is achievable and bounded
- [ ] Spec length matches the size and risk of the work
- [ ] If it's too big to review in one sitting, it's split into linked sub-specs

## Process hygiene

- [ ] Status, version, and changelog are accurate
- [ ] Approval fields are filled in only by reflecting an explicit human approval of this exact version
- [ ] For amendments: the changelog says what changed, why, and what triggered it, and any already-written code affected is noted

---

## Questions a reviewer might ask

Handy prompts to include when asking a human for a review:

- "Is there anything here you expected to see that's missing?"
- "Is there anything here you didn't ask for that you'd want removed?"
- "Do the non-goals match your intent?"
- "Are the assumptions and open questions correct?"
- "Which decision in the decisions section are you least comfortable with?"
- "If this were built exactly as written, would you be happy with the result?"
