What To Change
Use this implementation pattern.
1. Prepare the repo once
Create these files before asking either tool to code:
AGENTS.md for Codex
CLAUDE.md for Claude Code
docs/brief.md
docs/requirements.md
docs/guardrails.md
docs/implementation-plan.md
For Codex, AGENTS.md should include:
repo structure
how to run the project
build, test, lint commands
engineering conventions
do-not rules
definition of done
exact verify steps
That is the documented recommended content.
For Claude Code, CLAUDE.md should include the same kind of persistent instructions, while sensitive-file restrictions and tool permissions belong in .claude/settings.json. Anthropic also notes CLAUDE.md works best when concise and specific.
2. Start in the repo root
For Codex:
IDE extension: install it in VS Code/Cursor/Windsurf, open the repo, sign in, and start from the Codex panel.
CLI: install and run it from the project directory.
Codex official setup:
npm i -g @openai/codex
cd /path/to/your/project
codex
Codex can also be installed with Homebrew, and the IDE extension can be used by signing in with your ChatGPT account or an API key. Codex starts in Agent mode by default in the IDE flow.
For Claude Code:
curl -fsSL https://claude.ai/install.sh | bash
cd /path/to/your/project
claude
Anthropic’s quickstart says Claude Code can also be installed via Homebrew or WinGet, and you log in after launching claude. It works from the project directory and reads project files as needed.
3. Force planning before edits
For Codex, use Plan mode with /plan. OpenAI says Plan mode is the easiest and most effective way to let Codex gather context, ask follow-up questions, and build a stronger plan before implementation. OpenAI also says native plan mode is available in the app, CLI, and IDE extension.
For Claude Code, use Plan Mode first as well. Anthropic says it performs read-only analysis, asks clarifying questions, and is meant for exploring codebases, planning complex changes, and reviewing safely before edits.
Your first real prompt should look like this:
Read AGENTS.md / CLAUDE.md and docs/implementation-plan.md first.
Do not write code yet.
Audit the repo, identify the exact files that need to change, list risks, list assumptions, and produce a step-by-step implementation plan with verification commands.
Wait for approval before editing.
That prompt matches the documented strengths of both systems: read repo context, plan first, then implement.
4. Implement in bounded slices, not giant prompts
Bad prompt:
Build the whole website.
Good prompt:
Implement only phase 1 from docs/implementation-plan.md.
Touch the minimum number of files.
After changes, run lint and tests.
Show me what changed, what passed, and any open issues.
Do not commit.
This is the part most people get wrong. They ask for an outcome instead of a bounded change set with verification. Codex’s best-practices docs explicitly recommend strong task context, scoping, and verification guidance; Claude Code’s quickstart shows it can locate code, implement changes, and run tests when available.
5. Keep approvals tight
Claude Code uses strict read-only permissions by default and asks for permission before edits, tests, or bash commands. Users can approve once or allow automatically.
Codex can modify your codebase, so OpenAI recommends Git checkpoints before and after each task.
Your operational rule should be:
first run: approve per step
after trust is established: widen permissions only for that repo
always keep Git checkpoints before larger edits
6. Verify, then commit
Do not ask either tool to “just commit everything” before it proves the work.
Ask for:
Run the verify sequence from the repo instructions.
Summarize failing checks first.
If all checks pass, propose a commit message and wait.
That fits the documented repo-guidance pattern for Codex and Claude Code: put verification rules in AGENTS.md or CLAUDE.md, then make the tool follow them every session.
Priority Action Plan
Best setup for you right now
Use ChatGPT Project/custom GPT for planning and Codex or Claude Code for implementation, but bridge them through repo files.
If you choose Codex
Use Codex if you want the cleanest integration with your OpenAI workflow. Good starting path:
install Codex in IDE or CLI,
run /init to scaffold AGENTS.md,
edit AGENTS.md to match your actual workflow,
add .codex/config.toml only if you need repo-specific defaults,
use /plan,
implement one slice at a time.
OpenAI documents /init, AGENTS.md, shared config layers, and gpt-5.4 as the default recommended local model.
If you choose Claude Code
Use Claude Code if you want a strong terminal-first coding workflow with explicit permission controls and project memory via CLAUDE.md.
install Claude Code,
create CLAUDE.md,
optionally configure .claude/settings.json for permissions and sensitive file denial,
start in the repo root,
use Plan Mode first,
approve edits in slices.
Anthropic documents all of those surfaces directly.
My blunt recommendation
For your workflow:
Use ChatGPT Project/custom GPT to think
Use Codex or Claude Code to build
Use repo files to preserve continuity
Not chat memory. Not vibes. Not “remember what we discussed last time.”
The implementation handoff should always be:
approved plan → repo instruction files → plan mode → bounded implementation → verification → commit
That is the durable system. The rest is friction and confusion.
I can draft a production-ready AGENTS.md + CLAUDE.md + implementation-plan.md starter pack for your website workflow next.