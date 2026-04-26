// GSAP animations — requires gsap + ScrollTrigger loaded via CDN before this module
// Called from index.html after initPage()

function initAnimations() {
  const { gsap, ScrollTrigger } = window;
  if (!gsap || !ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  // ── Custom Cursor ─────────────────────────────────────────
  const cursor         = document.getElementById('cursor');
  const cursorFollower = document.getElementById('cursor-follower');

  if (cursor && cursorFollower && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    window.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.set(cursor, { x: mouseX, y: mouseY });
    });

    // Lerp follower
    const tickFollower = () => {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      gsap.set(cursorFollower, { x: followerX, y: followerY });
    };
    gsap.ticker.add(tickFollower);

    // Hover state
    document.querySelectorAll('a, button, [role="button"]').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    // Hide on leave / show on enter
    document.addEventListener('mouseleave', () => gsap.to([cursor, cursorFollower], { opacity: 0, duration: 0.3 }));
    document.addEventListener('mouseenter', () => gsap.to([cursor, cursorFollower], { opacity: 1, duration: 0.3 }));
  }

  // ── Header nav entrance ──────────────────────────────────
  const navLinks = document.querySelectorAll('.site-nav a, .header-cta');
  if (navLinks.length) {
    gsap.from(navLinks, {
      opacity: 0, y: -10, duration: 0.45, stagger: 0.06, ease: 'power2.out', delay: 0.25
    });
  }

  // ── Hero ─────────────────────────────────────────────────
  const heroHeading = document.querySelector('.hero-content h1');

  if (heroHeading) {
    // Walk child nodes so inline elements (e.g. .gradient-text) are preserved intact
    const wordInners = [];
    const nodes = Array.from(heroHeading.childNodes);
    heroHeading.innerHTML = '';

    nodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        node.textContent.split(/(\s+)/).forEach(chunk => {
          if (/^\s+$/.test(chunk) || chunk === '') {
            heroHeading.appendChild(document.createTextNode(chunk));
          } else {
            const wrap  = document.createElement('span');
            const inner = document.createElement('span');
            wrap.className  = 'word-wrap';
            inner.className = 'word-inner';
            inner.textContent = chunk;
            wrap.appendChild(inner);
            heroHeading.appendChild(wrap);
            wordInners.push(inner);
          }
        });
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // Wrap the whole element as one word unit (preserves gradient span, etc.)
        const wrap  = document.createElement('span');
        const inner = document.createElement('span');
        wrap.className  = 'word-wrap';
        inner.className = 'word-inner';
        inner.appendChild(node.cloneNode(true));
        wrap.appendChild(inner);
        heroHeading.appendChild(wrap);
        wordInners.push(inner);
      }
    });
  }

  const heroTl = gsap.timeline({ delay: 0.1 });

  heroTl
    .to('.hero-content .eyebrow', {
      opacity: 1, y: 0, duration: 0.7, ease: 'power3.out'
    })
    .to('.word-inner', {
      y: '0%', duration: 0.9, stagger: 0.055, ease: 'power4.out'
    }, '-=0.4')
    .to('.hero-content p', {
      opacity: 1, y: 0, duration: 0.7, ease: 'power3.out'
    }, '-=0.5')
    .to('.hero-cta', {
      opacity: 1, y: 0, duration: 0.6, ease: 'power3.out'
    }, '-=0.4')
    .to('.scroll-indicator', {
      opacity: 1, duration: 0.5
    }, '-=0.2');

  // Initial hidden states for hero elements
  gsap.set('.hero-content p', { y: 24 });
  gsap.set('.hero-cta', { y: 20 });

  // Orb parallax on scroll
  gsap.to('.orb-1', {
    y: -200,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.5
    }
  });

  gsap.to('.orb-2', {
    y: -100,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 2
    }
  });

  gsap.to('.orb-3', {
    y: -60, x: 40,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    }
  });

  // ── Interior page-hero entrance ───────────────────────────
  const pageHero = document.querySelector('.page-hero');
  if (pageHero) {
    const eyebrow = pageHero.querySelector('.eyebrow');
    const h1      = pageHero.querySelector('h1');
    const p       = pageHero.querySelector('p');
    const tl = gsap.timeline({ delay: 0.1 });
    if (eyebrow) tl.from(eyebrow, { opacity: 0, y: 16, duration: 0.55, ease: 'power3.out' });
    if (h1)      tl.from(h1,      { opacity: 0, y: 28, duration: 0.7,  ease: 'power3.out' }, '-=0.25');
    if (p)       tl.from(p,       { opacity: 0, y: 16, duration: 0.55, ease: 'power3.out' }, '-=0.35');
  }

  // ── Section reveals ───────────────────────────────────────
  gsap.utils.toArray('.reveal-up').forEach(el => {
    gsap.fromTo(el,
      { y: 48, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // ── Card staggers ─────────────────────────────────────────
  ScrollTrigger.batch('.stagger-card', {
    start: 'top 88%',
    onEnter: batch => gsap.fromTo(batch,
      { y: 64, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.12, duration: 0.75, ease: 'power3.out' }
    ),
    once: true
  });

  // ── Step number bounce-in ─────────────────────────────────
  ScrollTrigger.batch('.step-number', {
    start: 'top 90%',
    onEnter: batch => gsap.fromTo(batch,
      { scale: 0.5, opacity: 0 },
      { scale: 1, opacity: 1, stagger: 0.18, duration: 0.65, ease: 'back.out(1.7)' }
    ),
    once: true
  });

  // ── Section header reveals ────────────────────────────────
  gsap.utils.toArray('.section-header').forEach(header => {
    gsap.fromTo(header,
      { y: 32, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: {
          trigger: header,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // ── Trust strip items ─────────────────────────────────────
  gsap.fromTo('.trust-item',
    { y: 16, opacity: 0 },
    {
      y: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: 'power2.out',
      scrollTrigger: {
        trigger: '.trust-strip',
        start: 'top 90%',
        toggleActions: 'play none none none'
      }
    }
  );

  // ── CTA band content ──────────────────────────────────────
  gsap.utils.toArray('.cta-band').forEach(band => {
    const children = band.querySelectorAll('h2, p, .btn-group, .eyebrow, .microcopy');
    children.forEach((el, i) => {
      if (!el.classList.contains('reveal-up')) {
        gsap.from(el, {
          opacity: 0, y: 22, duration: 0.65, ease: 'power3.out',
          delay: i * 0.1,
          scrollTrigger: {
            trigger: band,
            start: 'top 88%',
            toggleActions: 'play none none none'
          }
        });
      }
    });
  });

  // ── Program card tags stagger ─────────────────────────────
  gsap.utils.toArray('.program-card').forEach(card => {
    const tags = card.querySelectorAll('.tag');
    if (tags.length) {
      gsap.from(tags, {
        opacity: 0, x: -10, duration: 0.4, stagger: 0.07, ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 86%',
          toggleActions: 'play none none none'
        }
      });
    }
  });

  // ── Footer reveal ─────────────────────────────────────────
  gsap.utils.toArray('.footer-brand, .footer-col').forEach((el, i) => {
    gsap.from(el, {
      opacity: 0, y: 28, duration: 0.65, ease: 'power3.out',
      delay: i * 0.09,
      scrollTrigger: {
        trigger: '.site-footer',
        start: 'top 92%',
        toggleActions: 'play none none none'
      }
    });
  });

  // ── Magnetic buttons ──────────────────────────────────────
  document.querySelectorAll('.btn--primary, .btn--outline-accent, .btn--outline').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width  / 2) * 0.28;
      const y = (e.clientY - rect.top  - rect.height / 2) * 0.28;
      gsap.to(btn, { x, y, duration: 0.35, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    });
  });

  // ── CTA band orb pulse ────────────────────────────────────
  gsap.to('.cta-band-orb', {
    scale: 1.3, opacity: 0.7,
    duration: 3, ease: 'sine.inOut',
    yoyo: true, repeat: -1
  });
}

export { initAnimations };
