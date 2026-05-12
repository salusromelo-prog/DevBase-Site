// DevBase — FX layer: scroll progress, cursor spotlight, magnetic buttons,
// 3D tilt on cards, number counter, stagger indexing.

(function () {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ===== Scroll progress bar ===============================
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.appendChild(bar);
  function updateProgress() {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    const p = max > 0 ? h.scrollTop / max : 0;
    bar.style.setProperty('--sp', p.toFixed(4));
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();

  // ===== Aurora orbs =======================================
  if (!reduced) {
    const a = document.createElement('div'); a.className = 'aurora';
    const b = document.createElement('div'); b.className = 'aurora b';
    document.body.appendChild(a); document.body.appendChild(b);
  }

  // ===== Hero cursor spotlight =============================
  document.addEventListener('mousemove', (e) => {
    const hero = $('.hero');
    if (hero) {
      const r = hero.getBoundingClientRect();
      const mx = ((e.clientX - r.left) / r.width) * 100;
      const my = ((e.clientY - r.top) / r.height) * 100;
      hero.style.setProperty('--mx', mx + '%');
      hero.style.setProperty('--my', my + '%');
    }
  });

  // ===== Magnetic buttons ==================================
  if (!reduced) {
    $$('.btn').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.14}px, ${y * 0.18}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  // ===== 3D tilt on product cards ==========================
  if (!reduced) {
    $$('.product').forEach(card => {
      let raf = 0;
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const mx = e.clientX - r.left;
        const my = e.clientY - r.top;
        const dx = (mx / r.width  - 0.5);
        const dy = (my / r.height - 0.5);
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          card.classList.add('tilt');
          card.style.setProperty('--rx', (dx *  8).toFixed(2) + 'deg');
          card.style.setProperty('--ry', (dy * -6).toFixed(2) + 'deg');
          card.style.setProperty('--mx', (mx / r.width  * 100).toFixed(1) + '%');
          card.style.setProperty('--my', (my / r.height * 100).toFixed(1) + '%');
        });
      });
      card.addEventListener('mouseleave', () => {
        card.classList.remove('tilt');
        card.style.removeProperty('--rx');
        card.style.removeProperty('--ry');
      });
    });
  }

  // ===== Number counters in .stat .k =======================
  function animateCounter(el, target, suffix = '') {
    const dur = 1200;
    const start = performance.now();
    const from = 0;
    function tick(now) {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(from + (target - from) * eased) + suffix;
      if (t < 1) requestAnimationFrame(tick);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(tick);
  }

  function setupCounters() {
    $$('.stat .k[data-count]').forEach(el => {
      const seen = el.dataset.counted;
      if (seen) return;
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      const io = new IntersectionObserver((entries) => {
        entries.forEach(en => {
          if (en.isIntersecting && !el.dataset.counted) {
            el.dataset.counted = '1';
            animateCounter(el, target, suffix);
            io.disconnect();
          }
        });
      }, { threshold: 0.4 });
      io.observe(el);
    });
  }

  // ===== Stagger indexing for grids ========================
  function indexStagger() {
    $$('.stagger').forEach(g => {
      [...g.children].forEach((c, i) => c.style.setProperty('--i', i));
    });
  }

  // ===== Init ==============================================
  document.addEventListener('DOMContentLoaded', () => {
    setupCounters();
    indexStagger();
  });

  // Re-run after route changes (since pages may show counters)
  window.addEventListener('hashchange', () => {
    setTimeout(() => {
      setupCounters();
      indexStagger();
    }, 50);
  });
})();
