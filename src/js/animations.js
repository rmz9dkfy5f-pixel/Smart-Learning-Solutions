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

  // ── Hero ─────────────────────────────────────────────────
  const heroHeading = document.querySelector('.hero-content h1');

  if (heroHeading) {
    // Split h1 into word spans
    const rawText = heroHeading.innerHTML;
    const words = rawText.split(/(\s+)/);
    heroHeading.innerHTML = words.map(chunk => {
      if (/^\s+$/.test(chunk)) return chunk;
      return `<span class="word-wrap"><span class="word-inner">${chunk}</span></span>`;
    }).join('');
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

  // ── Magnetic buttons ──────────────────────────────────────
  document.querySelectorAll('.btn--primary, .btn--outline-accent').forEach(btn => {
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
