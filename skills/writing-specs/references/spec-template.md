# Spec Template

Copy this structure when drafting a spec. Every section below appears in every spec. When a section genuinely has nothing to say, keep the heading and write `None: <why>` under it, so a reader can tell a considered empty section from a forgotten one. Keep the headings named exactly as written here, so reviewers and other documents can refer to them by name.

---

```markdown
# Spec: <Short, specific title>

| Field | Value |
|---|---|
| Status | DRAFT / IN REVIEW / APPROVED / SUPERSEDED |
| Version | 0.1 |
| Author | <who drafted it> |
| Approved by | <leave blank until a human approves> |
| Approved on | <leave blank until a human approves> |
| Last updated | <date> |
| Related | <links to other specs, issues, PRs, docs> |

## Summary
*Two or three sentences: what is being built or changed, and why. A reviewer should grasp the essence in 30 seconds.*

## Background and problem
*The current situation and the problem or opportunity that motivates this, including context a newcomer would need.*

## Goals and non-goals

### Goals
*What this work must achieve. Outcome-oriented.*
- G1:
- G2:

### Non-goals
*What this work deliberately does NOT do. Be explicit; this prevents scope creep.*
- NG1:
- NG2:

## Users and use cases
*Who uses this and what they need to do. Short scenarios work well.*
- U1: As a <role>, I want to <action> so that <outcome>.

## Requirements
*Each requirement is numbered, testable, and unambiguous. Use must / should / may deliberately. IDs are stable once approved: never renumber, and mark removed items WITHDRAWN rather than deleting.*

### Functional
- **R1** The system must ...
- **R2** When <condition>, the system must <behavior>.

### Non-functional
*Performance, security, privacy, reliability, accessibility, compatibility, observability, etc. Use measurable thresholds.*
- **R10** ...

## Design
*Enough detail for a reviewer to judge the approach, without dictating code-level choices the implementer can reasonably make.*
- Affected components and entry points (names only: modules, services, files, routes the change touches)
- Architecture / component overview (a diagram or short description)
- Data model and schema changes
- Interfaces: APIs, function signatures, file formats, events, and exact names where they matter (error codes, config keys, flags)
- Key flows (happy path)
- Dependencies and integration points
- Migration or rollout approach

## Decisions and alternatives considered
*For each significant choice: what was decided, what else was considered, and why this option won. Keep the decision and its rationale here; if the supporting detail is long, link a companion document and summarize the outcome.*

| ID | Decision | Alternatives considered | Rationale |
|---|---|---|---|
| D1 | | | |

## Edge cases, errors, and risks
*Invalid input, failure modes, concurrency, dependency outages, data loss, security abuse cases, backward compatibility. State the required behavior for each. List risks with mitigations.*

| Case / Risk | Required behavior or mitigation | Related req |
|---|---|---|
| | | |

## Acceptance criteria and test plan
*Map each requirement to at least one concrete, verifiable check.*

| Req | Acceptance criterion | How verified |
|---|---|---|
| R1 | Given ..., when ..., then ... | Unit test / manual / benchmark |

## Assumptions and open questions
*Assumptions are things taken as true without proof; the reviewer should confirm them. Open questions must be resolved before approval, or explicitly accepted as known risks.*

### Assumptions
- A1:

### Open questions
- Q1: <question> (owner: <who>, status: open / resolved: <answer>)

## Implementation plan
*Suggested order of work, milestones, dependencies, and anything that should be done behind a flag or in stages.*

## Changelog
*Every version after the first approval gets an entry: what changed, why, and what triggered it.*

| Version | Date | Change | Reason / trigger | Reviewed & approved by |
|---|---|---|---|---|
| 0.1 | | Initial draft | | |
```

---

## Notes on using the template

**Empty sections**
Most sections are occasionally empty. Write the reason, not nothing:

```
## Users and use cases
None: internal job with no human-facing surface.
```

A section that carries a table gets the line underneath the table. If a spec is accumulating several `None:` sections, check whether the change is big enough to warrant the document.

**Status values**
- `DRAFT`: being written or revised; not ready for approval
- `IN REVIEW`: presented to the human, awaiting feedback or approval
- `APPROVED`: a human explicitly approved this exact version; implementation may proceed
- `SUPERSEDED`: replaced by a later spec (link to it)

Any substantive edit to an `APPROVED` spec moves it back to `DRAFT`/`IN REVIEW` until it's approved again.

**Version numbers**
Use `0.x` while drafting and in review. On first approval, make it `1.0`. Increment the minor version for clarifications and small amendments (`1.1`) and the major version for changes to scope, goals, or core design (`2.0`).

**Writing good requirements**

| Weak | Strong |
|---|---|
| The page should load quickly. | **R4** The dashboard must render its initial view within 2 s at p95 on a 10 Mbps connection with 10k records. |
| Handle errors gracefully. | **R7** If the upstream API returns 5xx, the system must retry up to 3 times with exponential backoff, then return error `UPSTREAM_UNAVAILABLE` and log the failure. |
| Support large files. | **R9** The importer must accept CSV files up to 500 MB and must stream rather than load the file fully into memory. |
| Users can reset passwords. | **R12** A user must be able to request a password reset by email; reset links must expire after 30 minutes and be single-use. |
