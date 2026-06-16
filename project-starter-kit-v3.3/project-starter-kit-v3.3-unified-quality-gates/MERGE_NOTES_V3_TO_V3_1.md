# Merge Notes — v3 to v3.1

## Added

- `ai/templates/api_design_template.md`
- API/service design guidance in `START_HERE.md`
- API design references in `README.md`
- API design reference in `templates/TEMPLATE_INDEX.md`
- API design guidance in `templates/project-root/ai/README.md`
- `STARTER_KIT_EVALUATION_V3_1.md`

## Why

The additional document stack added a stronger design layer for services and APIs:

- system overview
- core responsibilities
- tech stack decisions
- data model
- API surface
- security design
- failure scenarios
- scaling strategy
- observability
- future enhancements

This deserves a dedicated template rather than being folded into the generic design template.

## Preserved

- v2 phase gates
- approval before changes
- vertical slices
- check/fix/verify/commit/push
- GitHub tracking files
- v3 AI session/checkpoint/prompt/pattern system

## Not Added Yet

- mandatory VS Code task automation
- mandatory snippets
- mandatory local LLM orchestration

Those are useful later, but they should not be required in the beginning workflow.
