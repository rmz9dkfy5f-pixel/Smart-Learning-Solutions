# Site Audit — Smart Learning Solutions
**Date:** 2026-05-15
**Scope:** Full static site — source code review only (pre-deployment)
**Auditor:** Claude Code (Sonnet 4.6)

---

## 1. Review Scope

### Inputs Available
- Full source code for all 10 HTML pages (root + programs/)
- `src/js/components.js`, `src/js/animations.js`, `src/css/main.css`
- `sitemap.xml`, `robots.txt`, `.gitignore`, `CLAUDE.md`
- `src/images/` directory listing (14 files, all present)
- Git log and tag history
- Project documentation (DEPLOYMENT.md, TESTING.md, PROGRESS_NOTE.md)

### What Was Missing
- **No live URL** — site is not yet deployed to production; all review is against source code only
- **No browser/server logs** — no console output, no network traces, no runtime error logs
- **No screenshots** — no visual rendering evidence
- **No test results** — no results from the TESTING.md checklist
- **No Formspree account** — third-party submission behavior unverifiable
- **No deployment host configured** — server behavior (directory indexes, security headers, redirects) unverifiable

### What Could Be Verified
- All HTML structure, meta tags, link targets, form fields, and image references (by reading source)
- Whether all referenced image files exist in `src/images/`
- JavaScript logic, event handling, XSS risk, and CDN loading patterns
- CSS cursor gating correctness and z-index integrity
- Navigation completeness, sitemap accuracy, robots.txt safety

### What Could NOT Be Verified
- Actual browser rendering and responsive behavior
- GSAP animation timing and visual quality in a browser
- Form submission flow (Formspree endpoint not configured)
- Server response headers (no server configured)
- Page load performance metrics (no tooling available)
- Real 404 behavior for `/programs/` directory routing
- Social share preview rendering (OG image format concern noted)

---

## 2. Executive Summary

**Overall Site Health: Good structure, two launch-blocking defects, three meaningful bugs, several deployment risks.**

The site is a well-structured static marketing site that is close to production-ready. The HTML is semantically clean, canonical/OG/Twitter meta tags are consistently present across all pages, all image references resolve, and navigation links are internally correct. No credentials, API keys, or sensitive data are exposed in source.

**Most Serious Issues:**
1. **Both booking and contact forms have a non-functional Formspree endpoint.** `REPLACE_ME` is still in the action URL. This is a launch blocker — the site's primary conversion mechanism cannot work.
2. **`.btn { cursor: none }` in main.css is not gated by the `.custom-cursor-enabled` class.** If GSAP fails to load (CDN failure, network error), the custom cursor never activates, but all buttons still hide the native cursor. Users see no cursor when hovering buttons — a complete UX failure.

**Program Page Assessment:**
The `programs/index.html` file itself is structurally clean. The page is well-formed, compliant with CLAUDE.md decisions, and all images resolve. The most likely source of reported errors is **the `/programs/` directory routing problem** — the nav links to `/programs/` (a directory), not `/programs/index.html`. Whether this resolves depends entirely on the server being configured to serve `index.html` as the directory default. In many local testing environments and on some hosts this will silently 404. This is the most probable root cause of the "errors on the Program page."

**Program page issues vs site-wide issues:** The directory routing problem is Programs-specific. The cursor bug, CDN/SRI risks, and form failure are site-wide. The title inconsistency and missing image dimensions are page-specific.

---

## 3. Findings by Severity

---

### CRITICAL

---

**C-1: Both Forms Non-Functional — Formspree Endpoint Unconfigured**
- **Severity:** Critical
- **Affected:** `book.html`, `contact.html`
- **What is happening:** Both forms have `action="https://formspree.io/f/REPLACE_ME"`. No actual Formspree endpoint has been created or substituted.
- **Evidence:** Directly confirmed in HTML source. Comments at book.html line 107 and contact.html line 120 also confirm this is a known placeholder. JavaScript validation alerts the user to email directly if it detects `REPLACE_ME` in the action URL.
- **Likely cause:** Formspree account and endpoint not yet created. This is documented as a known launch blocker in PROGRESS_NOTE.md.
- **User impact:** No workshop enquiry or contact message can be submitted. The site's primary conversion mechanism is completely broken.
- **Business impact:** Zero leads can be captured until resolved. Any visitor who tries the form encounters either a silent failure or an alert redirecting them to email.
- **Confidence:** Confirmed (source code directly observed)
- **Recommended next step:** Create a Formspree account, create an endpoint, and replace `REPLACE_ME` in both files with the real endpoint ID.

---

**C-2: `.btn { cursor: none }` Ungated — Buttons Show No Cursor on CDN Failure**
- **Severity:** Critical
- **Affected:** `src/css/main.css` line 330, all pages, all button elements
- **What is happening:** `.btn { cursor: none; }` is declared unconditionally in main.css. The intent is to hide the native cursor when the custom cursor is active. However, the custom cursor logic in `animations.js` only activates and adds `body.custom-cursor-enabled` after GSAP loads. If GSAP fails to load (CDN outage, network timeout, ad blocker), `custom-cursor-enabled` is never added to body, but `.btn { cursor: none; }` remains active. Result: all buttons show no cursor at all — the native cursor is hidden by CSS, the custom cursor never appeared, and hovering a button appears to make the cursor vanish.
- **Evidence:** CSS rule confirmed at main.css line 330. Confirmed from `animations.js` line 15-16 that `custom-cursor-enabled` class is only added after successful GSAP initialization. Confirmed from animations.js line 5-6 that the function silently exits if GSAP is unavailable.
- **Likely cause:** Cursor refactor added gating for the cursor elements and most cursor-related rules, but `.btn { cursor: none; }` was not updated to match.
- **User impact:** On desktop, if GSAP CDN is unreachable, users see no cursor when hovering any button or CTA — they cannot tell whether interactive elements are clickable.
- **Business impact:** CTA buttons — "Request a Workshop" chief among them — become visually ambiguous. Direct impact on conversion.
- **Confidence:** Confirmed (direct CSS analysis)
- **Recommended next step:** Move `.btn { cursor: none; }` inside the `body.custom-cursor-enabled` selector block or prefix it with `body.custom-cursor-enabled`.

---

### HIGH

---

**H-1: `/programs/` Directory Routing — Server Dependency Not Guaranteed**
- **Severity:** High
- **Affected:** `programs/index.html`, site navigation across all pages
- **What is happening:** The nav links to `/programs/` (a trailing-slash directory URL). This relies on the web server automatically serving `programs/index.html` when the directory is requested. The HTML file exists at `programs/index.html` but the server's DirectoryIndex behavior is not yet configured.
- **Evidence:** NAV_LINKS in `components.js` line 7 shows `href: '/programs/'`. The file exists at `programs/index.html`. DEPLOYMENT.md documents "Directory index file requirement for /programs/ routing" as a known item, confirming this is a known dependency.
- **Likely cause:** This is an architectural choice (clean URL `/programs/` vs `/programs/index.html`) that requires server configuration support. Nginx needs `index index.html;` in the location block; GitHub Pages handles this automatically; other hosts vary.
- **User impact:** Clicking "Programs" in the nav could return a 404 if the host does not serve directory index files. This is the most probable cause of "errors on the Program page" reported by the user, particularly if testing locally without a properly configured server.
- **Business impact:** The Programs section — a key navigation destination — could be completely unreachable for some deployment configurations.
- **Confidence:** Confirmed risk (source code and deployment docs confirm the dependency; actual behavior unverifiable without a server)
- **Recommended next step:** Test `/programs/` routing in the target deployment environment before launch. If server directory index is not guaranteed, update the nav href to `/programs/index.html` and canonical URL to match, or confirm directory index is configured.

---

**H-2: No Subresource Integrity (SRI) on Any CDN-Loaded Script**
- **Severity:** High
- **Affected:** All 10 pages
- **What is happening:** GSAP 3.12.5 (`gsap.min.js` and `ScrollTrigger.min.js`) are loaded from `cdnjs.cloudflare.com` without `integrity` attributes. Plausible analytics is loaded from `plausible.io/js/script.js` without `integrity`. Google Fonts are loaded without SRI. None carry `integrity="sha256-..."` attributes.
- **Evidence:** Confirmed from HTML source of all pages. No integrity attributes observed on any external resource.
- **Likely cause:** SRI was not added when external scripts were integrated. Standard for many static sites but not best practice.
- **Security risk:** If the CDN is compromised or serves a tampered file (supply chain attack), the browser has no mechanism to detect it and will execute malicious JavaScript with full page access.
- **User impact:** Low probability but high severity if it occurs. User data (form inputs) could be exfiltrated.
- **Business impact:** Liability and trust damage if any CDN is compromised.
- **Confidence:** Confirmed (direct source review)
- **Recommended next step:** Generate SRI hashes for the pinned GSAP versions and add `integrity` + `crossorigin="anonymous"` attributes. Plausible's script.js is version-mutable and cannot be SRI-protected without hosting it locally.

---

**H-3: Plausible Analytics Script Has No Version Lock and No Error Handling**
- **Severity:** High
- **Affected:** All pages (via `components.js` injection)
- **What is happening:** Plausible is loaded as `https://plausible.io/js/script.js` — an unversioned URL. This URL can change its content at any time. There is no `integrity` check, no error event listener, and no fallback if the script fails to load.
- **Evidence:** `components.js` lines 20-28 confirm the loading method. No error handler on the script element.
- **Likely cause:** Plausible's official documentation recommends this URL. The lack of error handling is standard for analytics snippets.
- **Security risk:** Mutable CDN URL means a compromised Plausible endpoint could inject code across all pages.
- **User impact:** If Plausible script errors, page navigation and forms still function (analytics failure is isolated). Silently undetected analytics gap is the main risk.
- **Business impact:** Inaccurate analytics data if script fails silently.
- **Confidence:** Confirmed
- **Recommended next step:** Consider self-hosting the Plausible script to eliminate the mutable CDN dependency and enable SRI.

---

**H-4: Page Transition Overlay Has No Timeout Fallback**
- **Severity:** High
- **Affected:** All pages (via `components.js` page transition logic)
- **What is happening:** When a nav link is clicked, `body.is-navigating` is immediately added, bringing a full-screen dark overlay to opacity 1. The overlay is removed by the `pageshow` event on the new page. If navigation fails (network error, same-page click quirk, browser history issue), `pageshow` may not fire and the overlay remains permanently, blocking all page interaction.
- **Evidence:** `components.js` lines 189-214. No `setTimeout` safety valve or `onerror` handler that would remove `is-navigating` class if navigation doesn't complete.
- **Likely cause:** Architectural assumption that navigation always succeeds.
- **User impact:** Page could become completely unresponsive — user sees only a black overlay with no way to interact. Refresh is the only escape.
- **Business impact:** Hard navigation failure. Worst-case scenario on primary conversion path.
- **Confidence:** Likely (logic confirmed in code; whether navigation can fail in this way in the target browser environment is partially environmental)
- **Recommended next step:** Add a `setTimeout` fallback (e.g., 2000ms) that removes `is-navigating` if the navigation hasn't completed.

---

### MEDIUM

---

**M-1: `og:image` Uses SVG Format — Likely Broken on Social Shares**
- **Severity:** Medium
- **Affected:** All 10 pages
- **What is happening:** All pages set `og:image` to `https://www.smartlearningsolutions.org/src/images/og-image.svg`. Major social platforms (Facebook, Twitter/X, LinkedIn, WhatsApp, Slack) require OG images to be JPEG or PNG. SVG is not reliably supported. The image will likely not display when any page is shared on social media.
- **Evidence:** `og-image.svg` confirmed in `src/images/`. All OG meta tags reference this file directly.
- **Likely cause:** SVG was used for simplicity and scalability, but OG image format requirements were not checked.
- **User impact:** Any shared link will show no preview image, reducing click-through rate.
- **Business impact:** Direct impact on social media discoverability and appearance.
- **Confidence:** Confirmed risk (SVG OG image format is well-documented as unsupported on major platforms)
- **Recommended next step:** Convert `og-image.svg` to a 1200×630px PNG or JPEG and update all OG image meta tag references.

---

**M-2: `programs/index.html` Title Uses Regular Hyphen, All Other Pages Use Em-Dash**
- **Severity:** Medium
- **Affected:** `programs/index.html` `<title>` tag
- **What is happening:** The programs page title is `Programs - Smart Learning Solutions` (regular hyphen). All other pages use an em-dash: `Workshops — Smart Learning Solutions`, `About — Smart Learning Solutions`, etc.
- **Evidence:** Direct source comparison across all pages.
- **Likely cause:** Inconsistency introduced when the programs/index.html page was created.
- **User impact:** Minor — incorrect title appears in browser tab and in search engine results, breaking brand consistency.
- **Business impact:** SEO and brand presentation inconsistency.
- **Confidence:** Confirmed
- **Recommended next step:** Change title to `Programs — Smart Learning Solutions` (em-dash).

---

**M-3: PSTEM Program Card Missing `width`/`height` Attributes on Product Image**
- **Severity:** Medium
- **Affected:** `programs/index.html`, `program-pstem-whybricks.avif` img tag
- **What is happening:** The PSTEM product image tag has no `width` or `height` attributes. The Coding with Robots image on the same page does have `width="510" height="510"`. Without explicit dimensions, the browser cannot reserve space for the image during layout, causing Cumulative Layout Shift (CLS) as the image loads.
- **Evidence:** Direct source comparison of two `<img>` tags in programs/index.html.
- **Likely cause:** Oversight when adding the PSTEM card.
- **User impact:** Visible page jump/reflow when the AVIF image loads in.
- **Business impact:** Poor CLS score affects Core Web Vitals and Google Search ranking.
- **Confidence:** Confirmed
- **Recommended next step:** Add `width` and `height` attributes to the PSTEM product image tag.

---

**M-4: Inline `<style>` Blocks Scattered Across Multiple Pages**
- **Severity:** Medium
- **Affected:** `workshops.html`, `about.html`, `programs/coding-with-robots.html`, `programs/pstem.html`, `404.html`
- **What is happening:** Page-specific layout styles are defined in `<style>` blocks within `<head>` rather than in `main.css`. Examples: `.levels-grid`, `.level-card`, `.investigation-card`, `.not-found` layout, about-intro layout.
- **Evidence:** Inline `<style>` blocks confirmed in five pages.
- **Likely cause:** Incremental page development where page-specific styles were not migrated to main.css.
- **User impact:** No direct user impact at runtime, but creates maintenance fragility — style conflicts could emerge, and styles cannot be cached separately from HTML.
- **Business impact:** Low immediate impact. Higher technical debt risk over time.
- **Confidence:** Confirmed
- **Recommended next step:** Migrate page-specific styles to main.css under clear section comments.

---

**M-5: CSS Version Query Strings Are Stale**
- **Severity:** Medium
- **Affected:** All pages (`?v=visual-20260428-navfix` on all stylesheet links)
- **What is happening:** The CSS cache-busting query string is dated 2026-04-28 but CSS changes were made on 2026-05-07 and 2026-05-15. If any visitor has cached the old CSS from a previous deployment, they will not receive the updated styles.
- **Evidence:** CSS version query string confirmed from HTML source review. Git log confirms CSS changes on later dates.
- **Likely cause:** Cache-busting strings were set once and not updated with subsequent CSS edits.
- **User impact:** Cached stale CSS until browser cache expires. Could cause visual inconsistencies if the site was ever served from a previous state.
- **Business impact:** Low until launch — site not yet live. Important to update before first deployment.
- **Confidence:** Confirmed (source code and git history)
- **Recommended next step:** Update the CSS version query string to reflect the actual date of last CSS change before deployment.

---

**M-6: `tel:` Phone Number Missing `+` Country Code Prefix**
- **Severity:** Medium
- **Affected:** `book.html`, `contact.html` — all `tel:` link hrefs
- **What is happening:** Phone links use `tel:18773657678` instead of the RFC-standard `tel:+18773657678`. The `+` prefix is required by RFC 3966 and expected by many mobile dialers to correctly interpret country code. Without it, some devices may not correctly parse the number for direct dialing.
- **Evidence:** `href="tel:18773657678"` confirmed in source.
- **Likely cause:** `+` omitted when the phone number was first hardcoded.
- **User impact:** Mobile users tapping the phone link may see the number fail to dial or dial incorrectly on some devices.
- **Business impact:** Broken phone CTA reduces the fallback contact mechanism.
- **Confidence:** Confirmed (format deviation from RFC 3966)
- **Recommended next step:** Update all `tel:` hrefs to `tel:+18773657678`.

---

**M-7: Formspree `_next` Redirect Is Empty in book.html — CLOSED, NOT APPLICABLE (2026-07-22)**
- **Severity:** Medium
- **Affected:** `book.html`
- **What is happening:** ~~`<input type="hidden" name="_next" value="">` — the `_next` field that controls where Formspree redirects the user after submission is present but empty. When the form is active and submitted, Formspree will redirect to its own generic thank-you page (off-brand, breaks the experience).~~
  Moot as of the Web3Forms/AJAX migration (v2.23.0) — the `_next` field described here no longer
  exists in `book.html`. The form now submits via a JS handler that calls `e.preventDefault()`
  and posts to Web3Forms with `fetch()`; success is shown in-page via `#form-success`. No native
  POST or browser navigation ever occurs, so a `_next`/redirect field would have no effect even
  if re-added. See `DECISION_LOG.md` ADR-018.
- **Evidence:** `_next` field confirmed absent from current `book.html` source; form-submit
  handler confirmed to intercept and never allow a native submission. See `SLICE_REVIEWS.md`
  SR-012.
- **Likely cause:** Finding predates the Web3Forms/AJAX migration; the original Formspree-era
  field was removed, not re-added, when the form was rebuilt.
- **User impact:** None — the in-page `#form-success` message already gives the user
  confirmation without a redirect.
- **Business impact:** None remaining.
- **Confidence:** Confirmed
- **Recommended next step:** None — closed. If a dedicated post-success page/redirect is wanted
  later, that is a new feature request, not a fix to this finding.

---

**M-8: Email Address Mixed Case in `mailto:` Links**
- **Severity:** Medium (low end)
- **Affected:** `book.html`, `contact.html`
- **What is happening:** `mailto:info@SmartLearningSolutions.org` uses mixed case in the domain portion. While email addresses are case-insensitive by specification, this looks inconsistent and potentially unprofessional in source view and on some rendered href displays.
- **Evidence:** `href="mailto:info@SmartLearningSolutions.org"` confirmed.
- **Likely cause:** Mixed-case entered manually.
- **User impact:** Negligible functional impact; aesthetic inconsistency.
- **Confidence:** Confirmed
- **Recommended next step:** Normalize to `mailto:info@smartlearningsolutions.org`.

---

**M-9: No `<meta name="robots">` Tag on Any Page**
- **Severity:** Medium (low end)
- **Affected:** All 10 pages
- **What is happening:** No page has an explicit `<meta name="robots">` tag. The behavior defaults to `index, follow` which is correct for a public marketing site. However, the absence means there is no explicit directive, and if the site was temporarily staged as `noindex` (e.g., via server header) there is no page-level override capability in place.
- **Evidence:** Confirmed absence across all 10 pages.
- **Likely cause:** Not added during initial build. Default behavior is correct so it wasn't flagged.
- **User impact:** No current impact. Risk is that without explicit page-level control, search behavior relies entirely on server headers.
- **Confidence:** Confirmed
- **Recommended next step:** Add `<meta name="robots" content="index, follow">` to all public pages; consider `noindex` on 404.html.

---

### LOW

---

**L-1: Proof Images in Program Cards Have Empty Alt Text**
- **Severity:** Low
- **Affected:** `programs/index.html`, `index.html`, `programs/coding-with-robots.html`, `programs/pstem.html`
- **What is happening:** Proof images showing students in workshop settings use `alt=""`. These images carry contextual meaning for social proof. Screen reader users receive no context.
- **Evidence:** `alt=""` on proof images confirmed across multiple pages.
- **Likely cause:** Treated as decorative; `alt=""` is technically valid for decorative images.
- **User impact:** Screen reader users hear nothing when encountering these images. Missed opportunity for accessible context.
- **Confidence:** Confirmed
- **Recommended next step:** Add brief alt descriptions, e.g. `alt="Students working on the floor with hands-on activity materials"`.

---

**L-2: Footer Logo SVG viewBox/Size Mismatch — RESOLVED v2.26.0**
- **Severity:** Low
- **Affected:** Footer on all pages (rendered by `components.js`)
- **What is happening:** ~~The footer logo has `width="24" height="24"` but `viewBox="0 0 28 28"`.~~
  Moot as of v2.26.0 — the header and footer both now render the client's actual logo image
  (`src/images/brand-logo-mark.png`) via `<img>`, and the inline placeholder SVG this finding
  described no longer exists anywhere in `components.js`.
- **Evidence:** `components.js` footer SVG definition confirmed removed; see `SLICE_REVIEWS.md`
  SR-010.
- **Likely cause:** Footer SVG was reduced from 28×28 to 24×24 but viewBox was not correspondingly updated.
- **User impact:** Virtually none (was already low; now none).
- **Confidence:** Confirmed
- **Recommended next step:** None — resolved by removal, not patched.

---

**L-3: GSAP Ticker Runs Continuously for Cursor Follower**
- **Severity:** Low
- **Affected:** All pages on fine-pointer devices (via `animations.js`)
- **What is happening:** `gsap.ticker.add(tickFollower)` runs the follower interpolation every animation frame indefinitely, even when the mouse is not moving.
- **Evidence:** `animations.js` lines 27-32 confirmed.
- **Likely cause:** Standard cursor follower implementation; GSAP ticker is the idiomatic approach.
- **User impact:** Negligible on modern hardware. Minor battery drain on laptops over extended sessions.
- **Confidence:** Confirmed
- **Recommended next step:** Low priority — optionally add mouse movement detection to pause ticker when idle.

---

**L-4: CTA Band Button Group Uses Inline `style` in programs/index.html**
- **Severity:** Low
- **Affected:** `programs/index.html` CTA band
- **What is happening:** `<div class="btn-group" style="justify-content: center;">` — alignment via inline style rather than a CSS class.
- **Evidence:** `programs/index.html` confirmed.
- **User impact:** None.
- **Confidence:** Confirmed
- **Recommended next step:** Replace with a `.btn-group--center` modifier class in main.css.

---

**L-5: `404.html` Links to `/index.html` Instead of `/`**
- **Severity:** Low
- **Affected:** `404.html`
- **What is happening:** "Back to Home" uses `href="/index.html"` rather than `href="/"`. Both work but `/` is more robust.
- **Evidence:** `404.html` href confirmed.
- **Confidence:** Confirmed
- **Recommended next step:** Change to `href="/"`.

---

**L-6: `resources.html` Contains No Images**
- **Severity:** Low
- **Affected:** `resources.html`
- **What is happening:** The Resources page has zero `<img>` elements. For a page advertising sample activities, educator guides, and investigation previews, the complete absence of imagery is visually sparse.
- **Evidence:** Confirmed from HTML source.
- **Likely cause:** Content placeholder — imagery not yet added.
- **User impact:** Reduced visual appeal; lower conversion rate from resources to booking.
- **Confidence:** Confirmed (structural absence; functional content unverifiable without rendering)
- **Recommended next step:** Review page intent and add imagery if this page is used as a conversion tool.

---

### UNVERIFIED / NEEDS CONFIRMATION

---

**U-1: Actual Browser Rendering of the Programs Page (Reported Errors)**
- **Severity:** Unverified
- **Affected:** `programs/index.html`
- **What is happening:** User reports errors on the Program page. Source code review finds no defect in the HTML, but real rendering errors may be present that cannot be detected from source alone.
- **Possible causes:** (1) Server not serving `programs/index.html` for `/programs/` requests — see H-1. (2) GSAP failing to load causing animation errors. (3) components.js failing to inject header/footer when the page is opened via `file://` protocol. (4) CSS `.btn { cursor: none }` bug causing visual confusion.
- **Confidence:** Suspected — source is clean but runtime behavior unverifiable without browser
- **Recommended next step:** Open `programs/index.html` via a proper local server (not `file://`), open DevTools Console and Network tabs, and record what errors appear.

---

**U-2: GSAP Scripts Load Position on Non-Programs Pages**
- **Severity:** Unverified
- **Affected:** All pages except `programs/index.html`
- **What is happening:** On `programs/index.html`, GSAP scripts are confirmed at end of `<body>`. For other pages, position was not verified — if in `<head>` without `defer`/`async`, they block rendering.
- **Confidence:** Unverified
- **Recommended next step:** Check GSAP script tag position on `index.html`, `book.html`, and `workshops.html`.

---

**U-3: AVIF Support for `program-pstem-whybricks.avif` Across All Target Browsers**
- **Severity:** Unverified
- **Affected:** Multiple pages using this file
- **What is happening:** `program-pstem-whybricks.avif` is used directly as `<img src>` without a WebP/JPG fallback via `<picture>`. AVIF is broadly supported in 2026 but some older mobile browsers or WebViews may not support it.
- **Confidence:** Suspected
- **Recommended next step:** Either verify AVIF support covers the expected audience, or wrap in a `<picture>` element with a JPEG/WebP fallback.

---

**U-4: Plausible Analytics Domain Tracking Split Risk**
- **Severity:** Unverified
- **Affected:** Analytics tracking (`components.js`)
- **What is happening:** Plausible tracks two domains: `smartlearningsolutions.org` and `www.smartlearningsolutions.org`. Without a canonical redirect, data splits across both. If only one domain is ever live, the other is noise.
- **Confidence:** Unverified (deployment configuration unknown)
- **Recommended next step:** Confirm canonical domain at deployment and remove the non-canonical entry from Plausible tracking config.

---

## 4. Program Page Deep Review

### Pages in Scope
- `programs/index.html` — Programs landing page (primary concern)
- `programs/coding-with-robots.html` — Coding with Robots detail page
- `programs/pstem.html` — PSTEM detail page

### programs/index.html

**Most Probable Error Source**

The most probable cause of reported errors is the directory routing dependency (H-1). The page lives at `programs/index.html` but is linked to as `/programs/`. Without server-side directory index configuration, a request to `/programs/` returns a 404 or directory listing. During local `file://` testing this will almost certainly fail. During local server testing it only works if the server is configured to serve `index.html` for directory requests.

No JavaScript errors are detectable from source alone. All image references resolve. All links point to existing pages.

**Layout and Content Issues**
- Title inconsistency: uses `-` hyphen where all other pages use `—` em-dash (M-2)
- PSTEM product image missing `width`/`height` attributes — potential CLS (M-3)
- Proof images have empty alt attributes (L-1)
- CTA button group uses inline style for centering (L-4)

**Structural Weaknesses**
- No `<meta name="robots">` tag (shared with all pages — M-9)
- The page is a relatively thin "choose a program" landing page — limited content depth could reduce its SEO value relative to its priority 0.9 sitemap placement

**Security Concerns**
- No issues unique to this page beyond the CDN/SRI risk shared across all pages
- No form elements on this page

**Page-Specific Priority Order**
1. Confirm `/programs/` directory routing works in the target server environment
2. Fix title em-dash inconsistency
3. Add `width`/`height` to the PSTEM product image

### programs/coding-with-robots.html and programs/pstem.html

Both detail pages have inline `<style>` blocks for page-specific grids (`.levels-grid`, `.investigations-grid`) — maintenance debt item (M-4).

Both pages are otherwise structurally clean. All image references resolve. All CTAs link to valid destinations. Both are compliant with CLAUDE.md confirmed decisions.

---

## 5. Cross-Site Risks

**CR-1: Custom Cursor Failure Mode (C-2)**
`.btn { cursor: none }` affects every page and every button. Any GSAP CDN failure causes all buttons to display no cursor. Most impactful cross-site risk.

**CR-2: CDN Supply Chain (H-2)**
GSAP is loaded from cdnjs.cloudflare.com on all pages without SRI. A single compromised CDN response affects all pages simultaneously. Plausible is similarly exposed.

**CR-3: Page Transition Overlay Stuck (H-4)**
The transition overlay mechanism affects every inter-page link across the site. A single navigation failure anywhere results in a completely blocked page.

**CR-4: Stale CSS Cache-Busting Strings (M-5)**
All pages share the same stale `?v=visual-20260428-navfix` query string. Any caching proxy will serve outdated CSS to all pages simultaneously.

**CR-5: OG Image Format (M-1)**
All pages share the same SVG OG image. Social sharing is broken across the entire site, not just individual pages.

**CR-6: Forms Non-Functional Until Formspree Is Configured (C-1)**
Both contact paths (`book.html` and `contact.html`) are broken simultaneously. There is no functioning lead capture anywhere on the site.

**CR-7: No HTTP Security Headers**
All pages will be served without CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, or HSTS until the server is configured. This is a server-side concern, documented in DEPLOYMENT.md as a known item, but not yet implemented.

**CR-8: robots.txt Allows Full Crawling Including Staging**
If the site is ever deployed to a staging URL before production, the robots.txt allows all crawlers to index staging content. No staging-specific noindex is set at the HTML level. DEPLOYMENT.md documents the server-header approach (`X-Robots-Tag: noindex`), but there is no HTML-level fallback.

---

## 6. Priority Order

| Rank | Issue | Severity | Reason |
|---|---|---|---|
| 1 | C-1: Forms non-functional (Formspree REPLACE_ME) | Critical | Launch blocker — zero conversion possible |
| 2 | C-2: `.btn { cursor: none }` ungated CSS | Critical | All buttons lose cursor on CDN failure — direct UX/conversion damage |
| 3 | H-1: `/programs/` directory routing unconfirmed | High | Most probable cause of reported Program page errors |
| 4 | H-4: Page transition overlay no timeout fallback | High | Can brick any page, blocking all interaction |
| 5 | M-1: OG image SVG format unsupported by social platforms | Medium | All social shares broken — invisible until tested |
| 6 | H-2: No SRI on GSAP CDN scripts | High | Supply chain risk on all pages |
| 7 | M-3: PSTEM image missing width/height | Medium | CLS on the most recently added page |
| 8 | M-2: Title em-dash inconsistency on programs page | Medium | SEO and brand consistency |
| 9 | M-6: `tel:` missing `+` prefix | Medium | Phone CTA may fail on some mobile devices |
| 10 | ~~M-7: `_next` empty on book form~~ — **closed, not applicable** (2026-07-22) | Medium | Superseded by Web3Forms AJAX migration — field is inert/removed |

---

## 7. Open Questions

**Q-1 (Critical):** What errors specifically appear on the Programs page? Are they observed in a browser DevTools Console, as a visual rendering problem, or as a navigation failure (404)? The answer determines whether H-1 (routing), C-2 (cursor CSS), or an undetected runtime error is the root cause.

**Q-2 (High):** What is the target deployment host and has it been confirmed that it will serve `programs/index.html` when `/programs/` is requested? (GitHub Pages, Netlify, Nginx — each behaves differently.)

**Q-3 (Medium):** Has the site ever been served to a browser from a local server or a staging host? If so, what DevTools Console and Network errors were observed?

**Q-4 (Medium):** Is there a confirmed production domain (www vs apex)? This affects which Plausible tracking domain to retain, what canonical URLs are correct, and what the `_next` redirect URL should be.

**Q-5 (Low):** Is there an intended thank-you/success page for the booking form, or should Formspree's default confirmation be used?
