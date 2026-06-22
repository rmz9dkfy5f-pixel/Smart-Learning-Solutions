#!/usr/bin/env python3
"""Project Starter Kit V3.4 installer.

Non-destructive by default:
- installs missing files
- preserves existing files
- sends conflicting candidates to .v34_migration_review/
"""
from __future__ import annotations

import argparse
import hashlib
import json
import os
import shutil
from datetime import datetime
from pathlib import Path


def sha256(path: Path) -> str:
    h = hashlib.sha256()
    with path.open('rb') as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b''):
            h.update(chunk)
    return h.hexdigest()


def rel_posix(path: Path, base: Path) -> str:
    return path.relative_to(base).as_posix()


def copy_tree_non_destructive(source: Path, target: Path, review: Path, dry_run: bool) -> dict:
    report = {
        'installed': [],
        'skipped_identical': [],
        'conflicts': [],
        'errors': [],
    }

    for src in sorted(p for p in source.rglob('*') if p.is_file()):
        rel = rel_posix(src, source)
        dst = target / rel

        if dst.exists():
            try:
                if sha256(src) == sha256(dst):
                    report['skipped_identical'].append(rel)
                    continue
            except Exception as exc:
                report['errors'].append({'path': rel, 'error': str(exc)})
                continue

            candidate = review / (rel.replace('/', '__') + '.v34-candidate')
            report['conflicts'].append({'existing': rel, 'candidate': rel_posix(candidate, target)})
            if not dry_run:
                candidate.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(src, candidate)
            continue

        report['installed'].append(rel)
        if not dry_run:
            dst.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(src, dst)

    return report


def detect_project_state(target: Path) -> str:
    entries = [p.name for p in target.iterdir() if p.name not in {'.git', '.DS_Store'}]
    if not entries:
        return 'new'
    lightweight = {'.gitignore', 'README.md', 'readme.md', 'LICENSE', 'LICENSE.md'}
    if all(e in lightweight for e in entries):
        return 'new'
    return 'migrate'


def main() -> int:
    parser = argparse.ArgumentParser(description='Install Project Starter Kit V3.4 non-destructively.')
    parser.add_argument('--mode', choices=['new', 'migrate', 'auto'], default='auto')
    parser.add_argument('--target', default='.', help='Target repo/project root')
    parser.add_argument('--dry-run', action='store_true', help='Show what would happen without writing files')
    parser.add_argument('--yes', action='store_true', help='Apply changes')
    args = parser.parse_args()

    if not args.dry_run and not args.yes:
        print('Refusing to write without --yes. Use --dry-run first or pass --yes to apply.')
        return 2

    kit_root = Path(__file__).resolve().parents[1]
    target = Path(args.target).resolve()
    templates = kit_root / 'templates'
    base = templates / 'base'
    review = target / '.v34_migration_review'

    if not base.exists():
        print(f'ERROR: Missing template base: {base}')
        return 1

    mode = args.mode
    if mode == 'auto':
        mode = detect_project_state(target)

    print(f'Project Starter Kit V3.4 installer')
    print(f'Mode: {mode}')
    print(f'Target: {target}')
    print(f'Dry run: {args.dry_run}')

    final_report = {
        'version': '3.4.0',
        'timestamp': datetime.now().isoformat(timespec='seconds'),
        'mode': mode,
        'target': str(target),
        'dry_run': args.dry_run,
        'sections': {},
    }

    final_report['sections']['base'] = copy_tree_non_destructive(base, target, review, args.dry_run)

    overlay = templates / ('new-project' if mode == 'new' else 'migration')
    if overlay.exists():
        final_report['sections'][overlay.name] = copy_tree_non_destructive(overlay, target, review, args.dry_run)

    if not args.dry_run:
        report_path = target / 'V34_INSTALL_REPORT.json'
        report_path.write_text(json.dumps(final_report, indent=2), encoding='utf-8')
        print(f'Wrote report: {report_path}')
    else:
        print(json.dumps(final_report, indent=2))

    conflicts = sum(len(section.get('conflicts', [])) for section in final_report['sections'].values())
    if conflicts:
        print(f'Conflicts preserved for review: {conflicts}')
        print(f'Review folder: {review}')
    else:
        print('No conflicts detected.')

    return 0


if __name__ == '__main__':
    raise SystemExit(main())
