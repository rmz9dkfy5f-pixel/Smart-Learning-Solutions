#!/usr/bin/env python3
"""Validate a Project Starter Kit V3.4 installation."""
from __future__ import annotations

import argparse
from pathlib import Path
import sys

REQUIRED = [
    'AGENTS.md',
    'CLAUDE.md',
    'docs/governance/DONE_CRITERIA.md',
    'docs/governance/PHASE_GATES.md',
    'docs/governance/CHANGE_CONTROL.md',
    'docs/governance/ROLLBACK_PLAN.md',
    'docs/governance/PROJECT_RISK_REGISTER.md',
    'docs/governance/REPO_HEALTH_CHECK.md',
    'docs/governance/TEST_STRATEGY.md',
    'docs/governance/SECURITY_BASELINE.md',
    'docs/governance/COMPATIBILITY_MATRIX.md',
    'docs/governance/EVALS_AND_FAILURE_LOG.md',
    'docs/governance/CONTEXT_ENGINEERING.md',
    'docs/governance/RELEASE_GATE.md',
    'docs/governance/AGENT_RUN_LOG.md',
    'docs/project/PROJECT_BRIEF.md',
    'docs/project/ARCHITECTURE.md',
    'docs/project/STATUS.md',
    'ai/agents/AGENT_REVIEW_GATES.md',
    'ai/agents/SUBAGENT_ROLES.md',
    '.claude/skills/v34-execution-loop/SKILL.md',
    '.agents/skills/v34-execution-loop/SKILL.md',
]

SKILLS = [
    '.claude/skills/v34-execution-loop/SKILL.md',
    '.claude/skills/v34-migration-loop/SKILL.md',
    '.claude/skills/v34-production-readiness/SKILL.md',
    '.claude/skills/v34-context-eval-loop/SKILL.md',
    '.agents/skills/v34-execution-loop/SKILL.md',
    '.agents/skills/v34-migration-loop/SKILL.md',
    '.agents/skills/v34-production-readiness/SKILL.md',
    '.agents/skills/v34-context-eval-loop/SKILL.md',
]


def validate_skill(path: Path) -> list[str]:
    errors = []
    text = path.read_text(encoding='utf-8')
    if not text.startswith('---'):
        errors.append(f'{path}: missing YAML frontmatter')
    if 'name:' not in text.split('---', 2)[1]:
        errors.append(f'{path}: missing name field')
    if 'description:' not in text.split('---', 2)[1]:
        errors.append(f'{path}: missing description field')
    return errors


def main() -> int:
    parser = argparse.ArgumentParser(description='Validate Project Starter Kit V3.4 installation')
    parser.add_argument('--target', default='.')
    args = parser.parse_args()

    target = Path(args.target).resolve()
    missing = [rel for rel in REQUIRED if not (target / rel).exists()]
    errors = []

    for rel in SKILLS:
        p = target / rel
        if p.exists():
            errors.extend(validate_skill(p))

    print('# V3.4 Validation Result')
    print(f'Target: {target}')

    if missing:
        print('\n## Missing Required Files')
        for rel in missing:
            print(f'- {rel}')
    else:
        print('\n## Missing Required Files')
        print('None')

    if errors:
        print('\n## Skill Errors')
        for err in errors:
            print(f'- {err}')
    else:
        print('\n## Skill Errors')
        print('None')

    if missing or errors:
        print('\nStatus: FAIL')
        return 1

    print('\nStatus: PASS')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
