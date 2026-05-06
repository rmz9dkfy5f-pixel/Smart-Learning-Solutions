# Testing

**Status:** Active
**What belongs here:** Manual QA checklist, validation steps, and testing expectations.
**What does not belong here:** Design rules, content rules, or implementation code.

---

## 1. Testing Approach

This is a static HTML site with no build process and no automated test suite. All testing is manual. The goal is to catch regressions in navigation, forms, animation, and rendering before considering a change done.

## 2. Pre-Commit Checklist

Before committing any change to an HTML page, CSS file, or `components.js`:

- [ ] Page loads without console errors (check browser DevTools → Console)
- [ ] Navigation links all resolve (no 404s)
- [ ] Active nav link is highlighted on the correct page
- [ ] Header and footer render correctly
- [ ] Page is readable and functional on mobile (375px)
- [ ] CTA buttons are present and link to `book.html` or the correct target
- [ ] No virtual workshop language introduced
- [ ] No pricing introduced

## 3. Component-Specific Checks

**Header / Footer (`components.js`):**
- [ ] Header renders on all pages after any `components.js` change
- [ ] Footer renders on all pages after any `components.js` change
- [ ] Mobile nav toggle works (open/close)
- [ ] Active page is correctly highlighted in nav

**Animations (`animations.js`):**
- [ ] No JS errors thrown on page load
- [ ] GSAP animations play on first visit
- [ ] Custom cursor renders and tracks mouse (desktop only)
- [ ] ScrollTrigger reveals work on scroll
- [ ] Touch devices: custom cursor not shown

**Forms (`book.html`, `contact.html`):**
- [ ] Form fields render correctly
- [ ] Form does not submit to `REPLACE_ME` endpoint in production
- [ ] Submit button shows a loading/sent state
- [ ] Error message shown if submission fails
- [ ] Success message shown on successful submission

**SEO / Metadata:**
- [ ] `<title>` is unique and accurate per page
- [ ] `<meta name="description">` is present and unique
- [ ] Open Graph tags present (`og:title`, `og:description`, `og:image`)
- [ ] `<link rel="canonical">` present
- [ ] `sitemap.xml` and `robots.txt` accessible at root

## 4. Cross-Browser / Responsive

Test at:
- 375px (iPhone SE)
- 768px (iPad)
- 1024px (laptop)
- 1440px (desktop)

Browsers: Chrome and Safari minimum; Firefox secondary.

## 5. Accessibility Spot Check

- [ ] All images have `alt` text
- [ ] Focus ring visible when tabbing through the page
- [ ] Form labels associated with their inputs
- [ ] Heading hierarchy is sequential (h1 → h2 → h3)

## 6. Local Server Requirement

ES modules require a local server. Open `file://` will silently fail on `components.js`.

```bash
npx serve .
```

Or use VS Code Live Server extension.

## 7. When to Add Automated Testing

Add automated testing if:
- A JavaScript framework is introduced
- The animation or component system becomes too complex to test manually
- The form handling logic is extended beyond a single Formspree POST
