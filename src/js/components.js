// Shared header and footer injection
// Call initPage({ activePage }) from each page's <script>

const NAV_LINKS = [
  { label: 'Home',       href: '/index.html',     key: 'home' },
  { label: 'Workshops',  href: '/workshops.html',  key: 'workshops' },
  { label: 'Programs',   href: '/programs/coding-with-robots.html', key: 'programs' },
  { label: 'Resources',  href: '/resources.html',  key: 'resources' },
  { label: 'About',      href: '/about.html',      key: 'about' },
  { label: 'Contact',    href: '/contact.html',    key: 'contact' },
];

const BOOK_HREF = '/book.html';
const PHONE    = '1-877-365-SMRT (7678)';
const EMAIL    = 'info@SmartLearningSolutions.org';
const YEAR     = new Date().getFullYear();
const TRANSITION_DELAY_MS = 100;
const PLAUSIBLE_DOMAINS = 'smartlearningsolutions.org,www.smartlearningsolutions.org';

function injectHeadAssets() {
  if (!document.querySelector('script[data-domain="' + PLAUSIBLE_DOMAINS + '"]')) {
    const plausible = document.createElement('script');
    plausible.defer = true;
    plausible.dataset.domain = PLAUSIBLE_DOMAINS;
    plausible.src = 'https://plausible.io/js/script.js';
    document.head.appendChild(plausible);
  }
}

function buildHeader(activePage = '') {
  const navItems = NAV_LINKS.map(({ label, href, key }) =>
    `<a href="${href}" class="${key === activePage ? 'active' : ''}">${label}</a>`
  ).join('');

  const mobileItems = NAV_LINKS.map(({ label, href, key }) =>
    `<a href="${href}" class="${key === activePage ? 'active' : ''}">${label}</a>`
  ).join('');

  return `
<header class="site-header transparent" id="site-header">
  <div class="header-inner">
    <a href="/index.html" class="site-logo" aria-label="Smart Learning Solutions home">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect width="28" height="28" rx="7" fill="#E85D1A"/>
        <path d="M8 18l6-8 6 8" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="14" cy="10" r="2" fill="white"/>
      </svg>
      Smart<span>Learning</span>
    </a>

    <nav class="site-nav" aria-label="Primary navigation">
      ${navItems}
    </nav>

    <a href="${BOOK_HREF}" class="btn btn--primary header-cta">Request a Workshop</a>

    <button class="nav-toggle" aria-label="Toggle navigation" aria-expanded="false" id="nav-toggle">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>

<nav class="mobile-nav" id="mobile-nav" aria-label="Mobile navigation">
  ${mobileItems}
  <a href="${BOOK_HREF}" class="btn btn--primary">Request a Workshop</a>
</nav>`;
}

function buildFooter() {
  return `
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="/index.html" class="site-logo" aria-label="Smart Learning Solutions home">
          <svg width="24" height="24" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <rect width="28" height="28" rx="7" fill="#E85D1A"/>
            <path d="M8 18l6-8 6 8" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="14" cy="10" r="2" fill="white"/>
          </svg>
          Smart<span>Learning</span>
        </a>
        <p>Hands-on STEM workshops for curious learners — bringing robotics, coding, and physical science to life in schools and communities.</p>
        <div class="footer-contact">
          <a href="tel:18773657678">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.02 2.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/>
            </svg>
            ${PHONE}
          </a>
          <a href="mailto:${EMAIL}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
            </svg>
            ${EMAIL}
          </a>
        </div>
      </div>

      <div class="footer-col">
        <h5>Programs</h5>
        <a href="/programs/coding-with-robots.html">Coding with Robots</a>
        <a href="/programs/pstem.html">PSTEM</a>
      </div>

      <div class="footer-col">
        <h5>Navigation</h5>
        <a href="/workshops.html">Workshops</a>
        <a href="/resources.html">Resources</a>
        <a href="/about.html">About</a>
        <a href="/book.html">Request a Workshop</a>
        <a href="/contact.html">Contact</a>
      </div>

      <div class="footer-col">
        <h5>Get Started</h5>
        <a href="/book.html" class="btn btn--primary" style="margin-top: var(--space-1)">Request a Workshop</a>
      </div>
    </div>

    <div class="footer-bottom">
      <p>&copy; ${YEAR} Smart Learning Solutions. All rights reserved.</p>
      <p>Licensed partner: Microbric (Edison) &amp; Whybricks</p>
    </div>
  </div>
</footer>`;
}

function initPage({ activePage = '' } = {}) {
  injectHeadAssets();

  // Cover browser document swaps with the brand background during internal navigation.
  if (!document.getElementById('page-transition')) {
    const transition = document.createElement('div');
    transition.id = 'page-transition';
    transition.setAttribute('aria-hidden', 'true');
    document.body.prepend(transition);
  }

  // Inject cursor elements if not already in the HTML
  if (!document.getElementById('cursor')) {
    const cursor = document.createElement('div');
    cursor.id = 'cursor';
    cursor.setAttribute('aria-hidden', 'true');
    const follower = document.createElement('div');
    follower.id = 'cursor-follower';
    follower.setAttribute('aria-hidden', 'true');
    document.body.prepend(follower);
    document.body.prepend(cursor);
  }

  // Inject header
  const headerEl = document.getElementById('page-header');
  if (headerEl) headerEl.innerHTML = buildHeader(activePage);

  // Inject footer
  const footerEl = document.getElementById('page-footer');
  if (footerEl) footerEl.innerHTML = buildFooter();

  // Sticky header behaviour
  const header = document.getElementById('site-header');
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 20) {
        header.classList.remove('transparent');
        header.classList.add('scrolled');
      } else {
        header.classList.add('transparent');
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Mobile nav toggle
  const toggle = document.getElementById('nav-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  window.addEventListener('pageshow', () => {
    document.body.classList.remove('is-navigating');
    document.body.style.overflow = '';
  });

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href]');
    if (!link) return;
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (link.target || link.hasAttribute('download')) return;

    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

    const nextUrl = new URL(href, window.location.href);
    if (nextUrl.origin !== window.location.origin) return;
    if (nextUrl.href === window.location.href) return;

    event.preventDefault();
    document.body.classList.add('is-navigating');
    document.body.style.overflow = 'hidden';
    window.setTimeout(() => {
      window.location.assign(nextUrl.href);
    }, TRANSITION_DELAY_MS);
  });
}

export { initPage };
