/* shared.js — runs on every page */

document.addEventListener('DOMContentLoaded', () => {

  // ── PAGE FADE IN ──────────────────────────────────────────────
  requestAnimationFrame(() => document.body.classList.add('page-ready'));

  // ── NAV SCROLL SHADOW ────────────────────────────────────────
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  // ── ACTIVE NAV LINK ──────────────────────────────────────────
  // Highlights the link matching the current page filename
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ── MOBILE HAMBURGER ─────────────────────────────────────────
  const hbg = document.getElementById('hbg');
  const mob = document.getElementById('mob');
  if (hbg && mob) {
    hbg.addEventListener('click', () => {
      const open = mob.classList.toggle('open');
      hbg.classList.toggle('open', open);
      hbg.setAttribute('aria-expanded', open);
    });
    mob.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mob.classList.remove('open');
        hbg.classList.remove('open');
        hbg.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ── SCROLL REVEAL ────────────────────────────────────────────
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  // ── FORM PLACEHOLDER HANDLER ─────────────────────────────────
  // Replace this with Formspree / Netlify Forms before going live
  const forms = document.querySelectorAll('form[data-contact]');
  forms.forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Sent ✓';
      btn.disabled = true;
      setTimeout(() => { btn.textContent = original; btn.disabled = false; }, 3000);
    });
  });

});
