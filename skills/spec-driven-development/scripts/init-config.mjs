#!/usr/bin/env node
// Create .agents/spec-driven.json (defaults) in the current git repo. Never overwrites.
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const CONFIG = {
  specs_dir: "./agent-docs/specs",
  skills: { all: ["output-guidelines"], context: ["codebase-discipline"], write: [], review: [], implement: ["codebase-discipline"], amend: [] },
  review_agent: "reviewer",
  require_approval: true,
};

function gitRoot() {
  try {
    return execFileSync("git", ["rev-parse", "--show-toplevel"], { encoding: "utf8" }).trim();
  } catch {
    return process.cwd();
  }
}

const target = path.join(gitRoot(), ".agents", "spec-driven.json");
if (existsSync(target)) {
  console.log(`exists: ${target}`);
  process.exit(0);
}
mkdirSync(path.dirname(target), { recursive: true });
writeFileSync(target, `${JSON.stringify(CONFIG, null, 2)}\n`);
console.log(`created: ${target}`);
