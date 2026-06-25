# Smart Learning Solutions

**Version:** v2.20.0
**Status:** In Progress
**Owner:** Smart Learning Solutions

## Summary
Static marketing site for Smart Learning Solutions — a STEM education company delivering hands-on, in-person robotics and physical science workshops for K–12 students.

## Problem It Solves
The previous site had three broken 404 pages (including the primary booking page), no real conversion path, a 2021 copyright, and no premium feel. This rebuild gives the business a clean, fast, credible site with a single primary action: requesting a workshop.

## Stack
- **HTML / CSS / JS** — no build tool, no framework, no CMS
- **ES Modules** — shared header/footer injected via `src/js/components.js`
- **Formspree** — third-party form handling (free tier)
- **Netlify or GitHub Pages** — deployment

## How to Run Locally
The site uses ES modules (`type="module"`) which require a local server — opening `index.html` directly in a browser will not work.

**Option 1 — VS Code Live Server**
Install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer), right-click `index.html`, and select **Open with Live Server**.

**Option 2 — Node `serve`**
```bash
npx serve .
```

**Option 3 — Python**
```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080` (or whichever port is shown).

## File Structure
```
/
├── index.html                        ← Homepage
├── workshops.html                    ← Workshops overview
├── resources.html                    ← Resources (replaces old Downloads)
├── about.html                        ← About page
├── book.html                         ← Workshop enquiry form
├── contact.html                      ← Contact page
├── programs/
│   ├── coding-with-robots.html       ← Edison program page
│   └── pstem.html                    ← Whybricks/PSTEM program page
├── src/
│   ├── css/
│   │   └── main.css                  ← Full design system
│   ├── js/
│   │   └── components.js             ← Shared header + footer
│   └── images/                       ← Site imagery
├── docs/
│   ├── strategy/
│   │   └── sls-project-context.md   ← Business context and audiences
│   └── workflow/
│       └── claude-code-workflow.md  ← Claude Code workflow rules
├── plans/
│   ├── PLAN_TEMPLATE.md
│   └── open-decisions.md
├── CLAUDE.md
├── CHANGELOG.md
├── ARCHITECTURE.md
├── ROADMAP.md
└── DECISIONS.md
```

## Before Deploying
1. Replace `REPLACE_ME` in `book.html` and `contact.html` with your Formspree form endpoint
2. Add final hero and program photography to `src/images/`
3. Confirm the production deployment target and connect the final domain configuration
4. Test both forms end-to-end on the production host

## Contact
- Phone: 1-877-365-SMRT (7678)
- Email: info@SmartLearningSolutions.org
