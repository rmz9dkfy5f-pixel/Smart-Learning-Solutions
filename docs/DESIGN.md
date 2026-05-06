# Design

**Status:** Active
**What belongs here:** Visual design direction, design system rules, token references, layout rules, typography, animation, and interaction guidelines.
**What does not belong here:** Business strategy, copy rules, or implementation code.

---

## 1. Design Direction

The site uses a dark, high-contrast aesthetic designed to communicate premium quality and technical credibility. The motion system (GSAP) adds dynamism without distracting from the conversion goal.

**Desired impression:** Expert, trustworthy, modern STEM brand
**Avoid:** Generic educational templates, bright primary-colour palettes, clip-art, corporate blandness

## 2. Design Token System

All tokens are defined as CSS custom properties at `:root` in `src/css/main.css`. Components reference tokens only — no hardcoded values in component styles.

Key token categories:
- `--color-*` — colour palette
- `--shadow-sm`, `--shadow-md` — shadow scale
- Type scale, spacing, border radius — defined in `:root`

**Rule:** Never hardcode a colour, shadow, or spacing value in a component. Always use the token.

## 3. Typography

- **Display font:** Space Grotesk (Google Fonts CDN)
- **Body font:** Inter (Google Fonts CDN)
- No local font files — CDN only
- Type scale defined in `:root` — reference tokens for all size and weight values

## 4. Colour

- Dark background system — high contrast text and UI elements
- Orange → cyan gradient used on hero headline accent (`gradient-text` utility)
- Glow borders on cards
- Glass header with backdrop-filter

## 5. Spacing and Layout

- Spacing scale defined in `:root` — reference tokens, never arbitrary values
- Responsive layout: mobile-first, tested to desktop widths
- Max content width constrained with a wrapper class

## 6. Component Patterns

**Cards:** Glass-effect backgrounds with glow borders; hover lift (`translateY`) on `.diff-item` and `.process-step`
**Buttons:** Glow button style; CTA buttons use orange accent
**Header:** Glass, sticky, with nav link entrance stagger on page load
**Custom cursor:** Orange dot + trailing ring; expands on hover; disabled on touch devices
**Hero:** Background orbs (blurred radial gradients) with scroll parallax; dot-grid texture

## 7. Animation Rules

All animation is GSAP-driven via `src/js/animations.js`.

| Pattern | Rule |
|---|---|
| Page entrance | Word-split stagger on hero headline; nav link stagger on load |
| Scroll reveals | ScrollTrigger batch reveals on cards and sections |
| Hover | Lift (`translateY`) on cards; scale/rotate on icons |
| Cursor | Lerp cursor with expand-on-hover; disabled on touch |
| Parallax | Orb parallax on scroll (hero only) |
| CTA pulse | Subtle pulse on primary CTA button |

**Rule:** Do not add animation outside `animations.js` unless there is a clear reason in the plan. Keep all motion accessible — respect `prefers-reduced-motion`.

## 8. Iconography

SVG icons preferred. No icon font libraries. Icon micro-animations: scale/rotate on `.diff-icon`, scale on `.audience-icon`.

## 9. Responsive Behaviour

- Mobile-first CSS
- Test all pages at: 375px, 768px, 1024px, 1440px
- Mobile nav: hamburger toggle, active state highlighted on interior pages
- Custom cursor disabled on touch devices

## 10. Design References

Store wireframes, screenshots, and design references in:
- `design/wireframes/` — layout sketches
- `design/references/` — visual inspiration and brand references

## 11. Open Design Questions

| Question | Impact | Owner |
|---|---|---|
| Photography assets available? | Hero and program sections need real imagery | Business owner |
| Favicon final? | SVG favicon added; confirm it matches brand | Business owner |
| Open Graph image approved? | `og-image.svg` exists — confirm it is correct | Business owner |
