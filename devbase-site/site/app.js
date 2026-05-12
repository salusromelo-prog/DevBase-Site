// DevBase — site interactivity: hash router, reveal-on-scroll, chips

(function () {
  'use strict';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  // ===== Hash router =======================================
  const routes = ['home', 'produtos', 'sobre'];

  function currentRoute() {
    const h = location.hash.replace(/^#\//, '').replace(/^#/, '');
    return routes.includes(h) ? h : 'home';
  }

  function go(route) {
    const view = $('main');
    view.classList.remove('page');
    void view.offsetWidth; // restart animation
    view.classList.add('page');

    $$('.page-view').forEach(el => {
      el.style.display = el.dataset.route === route ? '' : 'none';
    });
    $$('.nav-link').forEach(a => {
      a.classList.toggle('active', a.dataset.route === route);
    });
    window.scrollTo({ top: 0, behavior: 'instant' });
    setTimeout(observeReveals, 30);
  }

  window.addEventListener('hashchange', () => go(currentRoute()));

  // intercept clicks on internal links
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[data-route-link]');
    if (!a) return;
    e.preventDefault();
    const route = a.dataset.routeLink;
    if (route === currentRoute()) return;
    location.hash = '#/' + route;
  });

  // ===== Reveal on scroll ==================================
  let io;
  function observeReveals() {
    if (io) io.disconnect();
    io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    $$('.reveal:not(.in)').forEach(el => io.observe(el));
  }

  // ===== Pain chips toggle =================================
  document.addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    chip.classList.toggle('on');
  });

  // ===== Form fake submit ==================================
  document.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('button[type="submit"], button:not([type])');
    if (!btn) return;
    const orig = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = 'Enviando…';
    setTimeout(() => {
      btn.innerHTML = '✓ Recebido';
      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = orig;
        form.reset();
      }, 1600);
    }, 600);
  });

  // ===== Init ==============================================
  document.addEventListener('DOMContentLoaded', () => {
    go(currentRoute());
    observeReveals();
  });
})();
