# Accessibility

**Status:** Active
**What belongs here:** Accessibility expectations, semantic HTML rules, keyboard navigation, focus management, ARIA usage, colour contrast, and form error handling.
**What does not belong here:** Design direction, content rules, or implementation code.

---

## 1. Target Standard

WCAG 2.1 Level AA minimum. No formal audit has been completed — this document defines expected behaviour and rules for future work.

## 2. Semantic HTML Rules

- Use the correct element for the job: `<nav>`, `<main>`, `<article>`, `<section>`, `<header>`, `<footer>`, `<button>`, `<a>`
- Never use a `<div>` or `<span>` for interactive elements
- Every page must have exactly one `<main>` landmark
- Headings must be hierarchical: one `<h1>` per page, then `<h2>`, `<h3>` in order — no skipping levels
- Images must have descriptive `alt` text; decorative images use `alt=""`
- Form inputs must have associated `<label>` elements — never label via `placeholder` alone

## 3. Keyboard Navigation

- All interactive elements (links, buttons, form controls) must be focusable and operable by keyboard
- Tab order must follow visual/logical reading order
- No keyboard traps
- Skip-to-content link is recommended for long pages

## 4. Focus Management

- Focus ring must be visible — do not use `outline: none` without a visible replacement
- On mobile nav open/close, move focus to the first nav item (open) or back to the trigger (close)
- After form submission, move focus to the success or error message

## 5. Colour Contrast

- Text on background: minimum 4.5:1 contrast ratio (AA)
- Large text (18px+ bold or 24px+): minimum 3:1
- UI component borders and interactive indicators: minimum 3:1
- Do not rely on colour alone to convey meaning

## 6. Motion and Animation

- Respect `prefers-reduced-motion` media query in `src/js/animations.js` and `src/css/main.css`
- GSAP animations must not play when the user has reduced-motion enabled — provide static fallback states
- No auto-playing video or flashing content

## 7. ARIA Usage

- Only use ARIA where native semantics are insufficient
- `aria-label` on icon-only buttons (e.g. mobile nav toggle)
- `aria-expanded` on the mobile nav toggle button
- `aria-current="page"` on the active nav link
- Do not use ARIA roles that duplicate native element semantics

## 8. Forms

- All inputs have visible `<label>` elements
- Required fields indicated visually and via `required` attribute
- Error messages are descriptive and associated with the field via `aria-describedby`
- Success and error messages are announced to screen readers (use `role="alert"` or `aria-live`)
- Do not clear the form on submission failure

## 9. Custom Cursor

- The custom cursor (orange dot + ring) is a visual enhancement only
- Must not interfere with keyboard or screen reader navigation
- Automatically disabled on touch devices

## 10. Known Gaps / Open Questions

| Item | Status |
|---|---|
| Formal WCAG audit | Not completed — flagged for future work |
| Skip-to-content link | Not yet implemented |
| `prefers-reduced-motion` coverage | Partial — needs audit across all pages |
| Screen reader testing | Not completed |
