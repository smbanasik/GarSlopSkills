---
name: python-writing
description: "Use when writing or editing any Python code (scripts included). Typed, minimal, library-shaped Python: annotate everything, small siloed interfaces, stdlib before dependencies, validate at boundaries, almost no comments, no tests unless asked."
---

# Writing Python

Applies to every line of Python you write or edit, throwaway scripts included.

## Typing
- Annotate every parameter and return value.

## Shape
- Small functions, one job each, explicit parameters. No globals, no module-level mutable state.
- Build each feature as a self-contained library with a small explicit interface. Never reach into another module's internals.
- Extend the existing module instead of writing a near-duplicate file. Prefer deleting code to adding it — less code, fewer bugs. **Keep it stupidly simple**.

## Boundaries
- Validate inputs once at the boundary, then trust them. Raise a specific exception with context where the failure occurs; never swallow errors or use a bare `except` — let unexpected ones propagate.
- Push side effects (I/O, network, clock, env) to the edges; keep the core pure unless the feature is stateful.
- Never hardcode paths, URLs, or secrets — take them as parameters, env vars, or config.
- Always `open(..., encoding="utf-8")`; use timezone-aware datetimes; `Decimal` for money.

## Comments
- Write no comments by default. Names and structure do the talking.
- Add one only for a non-obvious *why* — never to narrate *what* the code does.

## Tests
- Do not write unit tests as part of writing code. The user asks for tests explicitly; write them only then.

