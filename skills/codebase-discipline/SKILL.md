---
name: codebase-discipline
description: "Use when creating, restructuring, or cleaning up a codebase or repo — layout, layers, file scope, naming, and repo hygiene. A few general patterns: directories mirror scope, silos with one-way root-qualified imports, one concept per file, delete instead of parking."
---

# Managing a codebase

Guidelines for maintaining your code bases. Take ownership, keep it clean, and always apply these. Approach the codebase holistically when adding or changing code.

## Layout mirrors scope
- A directory exists only to group two or more things sharing a nameable purpose; otherwise it is a file. Stay flat until nesting earns its place.
- If you cannot state a directory's purpose in one line, merge or delete it.
- Name directories by domain so the purpose is readable from the path itself.
- Name directories in a pattern consistent with the rest of the codebase.

## Silos with one-way edges
- Each area is a small library with its own interface. Keep internals private, expose the interface for other items to interact with.
- Dependencies flow one way (core → features → entrypoints), no cycles, no sideways coupling.
- Entry points and glue stay thin: they wire and delegate. The thinking lives inside the libraries.

## One concept per file
- A file holds one concept and is named after it; split when it serves more than one concept or its name no longer covers what's inside.
- If you cannot say "*file* is the *noun* that …", the scope is undefined.
- Prefer shorter files. A long file is not automatically wrong, but it is where the seam is likely hiding. Split when it holds two concepts; if the split has to wait, record it as debt instead of leaving it unspoken.
- Names carry their domain: a short prefix or interface marker. Makes files grep-able and self-filtering. No filler names (`utils`, `misc`, `helpers`), ever.

## Keep the Repo Clean
- Dead code, unused files, and superseded versions are deleted — git is the archive. Never comment code out or park it in `old/`.
- Unsure what a file is for? Ask "if deleted, what breaks?" Nothing → delete it.
- Notice a preexisting issue? Mark it for fixing and do so after your task is done.
