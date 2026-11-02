---
name: jev
description: >
  Make typed, probabilistic decisions with the `jev` tool (TypeSafe Jev, a
  System One model). Use for bounded classification, routing, severity scoring,
  and yes/no judgments where the set of possible answers is known up front.
  Jev returns structured answers (choice, score, or noul) with probabilities
  and confidence instead of generated text. Prefer it over a frontier LLM
  structured-output call when the decision is cheap, high-volume, or must be
  reliably machine-readable.
---

# Jev — typed classification via the `jev` tool

Jev is TypeSafe's "System One" model: it does **not** generate text. You send a
`state` plus a map of typed `questions`, and it returns structured answers your
code can branch on directly — no JSON parsing, no hallucinated types. Each answer
carries probabilities and (for choice/score) a calibrated `confidence`.

Use the `jev` tool whenever a decision has a bounded, known-in-advance answer
space. Do **not** use it for open-ended generation, explanation, or code writing.

## Prerequisites

- `TYPESAFE_API_KEY` must be set. Check with the `/jev` command (shows key, base
  URL, and model). Get a key at `https://console.typesafe.ai/settings/keys`.
- The tool is cheap (~$0.0004/case) and fast (70–500 ms) — no cost guard is
  needed, and there are no built-in acceptance thresholds.

## Tool arguments

```jsonc
{
  "state": "<string | object | array of the content to evaluate>",
  "questions": {
    "<question_id>": {
      "type": "choice" | "score" | "noul",
      "instructions": "<what to decide>",
      "criteria": "..." // shape depends on type, see below
    }
  }
}
```

- `state` — the content to evaluate. A plain string for text, or a JSON
  object/array for structured records (chat logs, tickets, app state). Keep it to
  **one coherent subject**: Jev answers from the state's overall meaning, so an
  array of several unrelated subjects collapses every answer toward a ~50/50 coin
  flip. To classify N independent items, make N calls (one subject each).
- `questions` — one or more named questions. Ask several in **one call**; they are
  evaluated in parallel and independently (batching is cheaper and barely slower).
- Question ids are for your own bookkeeping only (they are not sent to the model);
  answers come back under the same ids.

### Question types and `criteria`

| type | Purpose | `criteria` shape |
|------|---------|------------------|
| `choice` | Pick one option from a defined set (classification) | map of `option -> description \| null` |
| `score` | Rate along ordered levels (severity, quality) | ordered array of level descriptions (≥ 2) |
| `noul` | Yes/no judgment | optional `{ "true": "...", "false": "..." }` |

### Answer shapes

- `choice` → `{ type, choice, probabilities: {option: number}, confidence: number }`
- `score` → `{ type, score, legend: {index: level}, probabilities: {index: number}, confidence: number }`
- `noul` → `{ type, noul: number }` (0 = no, 1 = yes; no separate confidence field)

## Writing good questions

- **One narrow judgment per question.** Decompose compound judgments into atomic
  questions and combine the results yourself (in code or in your reasoning) —
  don't ask a single vague multi-factor question.
- **Give each option a rubric.** `criteria` descriptions decide quality. For
  choice, each option needs enough text to distinguish it; use `null` only when an
  option is self-evident.
- **Include a no-match outcome** when nothing may fit (e.g. an `other`/`none`
  option).
- **Put complete meaning in the question.** Since ids are not sent to the model,
  everything the model needs must be in `instructions` and `criteria`.
- **Pair every question with its subject in the state.** A question whose subject
  is absent from the state gets answered from the state's overall vibe instead —
  e.g. asking "is CPU scheduling simple or complex?" against a pangram-detection
  state returns "simple" at ~98% confidence. Keep one subject per call so the
  state actually contains what the question asks about.
- **Confidence is advisory, and only calibrated in-distribution.** There is no
  built-in threshold. Read `confidence` and `probabilities` and decide,
  case-by-case, whether to act or escalate. Higher confidence means higher
  accuracy *when state and question are coherently paired*; on mis-paired or
  heterogeneous input you can get a wrong answer at 95–100% confidence. Sanity
  check the answer before trusting a high-confidence result.

## Examples

### Classify an issue (choice)

```jsonc
{
  "state": "The CI pipeline fails on every Windows runner after the last merge.",
  "questions": {
    "category": {
      "type": "choice",
      "instructions": "Classify the reported issue.",
      "criteria": {
        "build": "compile or build failures",
        "test": "test failures or flakiness",
        "infra": "CI, runner, or environment problems",
        "other": null
      }
    }
  }
}
```

### Batch several judgments in one call (choice + score + noul)

```jsonc
{
  "state": "The CI pipeline fails on every Windows runner after the last merge.",
  "questions": {
    "category": {
      "type": "choice",
      "instructions": "Classify the issue.",
      "criteria": { "build": "build failures", "test": "test failures", "infra": "CI/environment", "other": null }
    },
    "severity": {
      "type": "score",
      "instructions": "How severe is this?",
      "criteria": ["Trivial", "Minor", "Blocking"]
    },
    "blocks_release": {
      "type": "noul",
      "instructions": "Does this block a release?"
    }
  }
}
```

### Binary gate with structured state (noul)

```jsonc
{
  "state": { "diff": "+ auth.setApiKey(userInput)", "files": ["src/auth.ts"] },
  "questions": {
    "touches_auth": {
      "type": "noul",
      "instructions": "Does this change touch authentication or credential handling?",
      "criteria": { "true": "modifies auth, tokens, or secrets", "false": "unrelated to auth" }
    }
  }
}
```

## Choosing the primitive

- **One of a defined set** → `choice` (categorical classification, routing).
- **Degree along a dimension** → `score` (severity, quality, urgency).
- **A condition holds or not** → `noul` (binary gate / yes-no).

## Reference

Live docs are the source of truth: `https://docs.typesafe.ai/llms.txt` for the
index, `https://docs.typesafe.ai/primitives` for the three primitives,
`https://docs.typesafe.ai/confidence` for how to read confidence. The tool wraps
`POST https://api.typesafe.ai/v1/systemone`.
