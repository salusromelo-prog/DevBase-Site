/* ============================================================
   DevBase — shared chrome (nav + footer) + scroll behaviors
   ============================================================ */
(function () {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const page = document.body.dataset.page || 'home';

  const LOGO = `<span class="logo-mark" aria-hidden="true"><svg viewBox="0 0 64 64" fill="none">
    <rect width="64" height="64" rx="12" fill="#6366f1"/>
    <path d="M32 12 L50 22 L32 32 L14 22 Z" fill="#fff"/>
    <path d="M14 22 L32 32 L32 50 L14 40 Z" fill="#fff" opacity=".85"/>
    <path d="M50 22 L32 32 L32 50 L50 40 Z" fill="#fff" opacity=".55"/>
    <line x1="12" y1="55" x2="52" y2="55" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".6"/>
  </svg></span>`;

  const LINKS = [
    { t: 'Produtos', h: 'produtos.html', k: 'produtos' },
    { t: 'Empresa', h: 'empresa.html', k: 'empresa' },
    { t: 'Jobs', h: 'jobs.html', k: 'jobs' },
  ];

  // NAV — dark variant only over the home hero (which is full-height dark)
  const darkStart = page === 'home';
  const navEl = $('#nav');
  if (navEl) {
    navEl.innerHTML = `
    <nav class="nav ${darkStart ? 'dark' : ''}">
      <div class="wrap wrap-wide">
        <a href="index.html" class="logo" aria-label="dev/base">${LOGO}<span class="logo-text">dev<span class="s">/</span>base</span></a>
        <div class="nav-mid">
          ${LINKS.map(l => `<a href="${l.h}" class="nav-link ${page===l.k?'active':''}">${l.t}</a>`).join('')}
        </div>
        <div class="nav-cta">
          <a href="https://dev-base-jobs.vercel.app" target="_blank" rel="noopener" class="btn ${darkStart?'btn-glass':'btn-line'} btn-sm">Entrar</a>
          <a href="produtos.html" class="btn btn-primary btn-sm">Ver produtos <span class="arr">→</span></a>
          <button class="nav-toggle" aria-label="menu"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg></button>
        </div>
      </div>
    </nav>
    <div class="mobile-menu">
      ${LINKS.map(l => `<a href="${l.h}">${l.t}</a>`).join('')}
      <a href="https://dev-base-jobs.vercel.app" target="_blank" rel="noopener">Entrar no Jobs</a>
      <a href="produtos.html" class="btn btn-primary">Ver produtos →</a>
    </div>`;
  }

  // FOOTER
  const footEl = $('#footer');
  if (footEl) {
    footEl.innerHTML = `
    <footer class="footer">
      <div class="wrap wrap-wide">
        <div class="foot-grid">
          <div class="foot-brand">
            <a href="index.html" class="logo logo-sm" aria-label="dev/base">${LOGO}<span class="logo-text">dev<span class="s">/</span>base</span></a>
            <p>Ferramentas para desenvolvedores brasileiros. Feito em Goiânia, pro Brasil inteiro.</p>
            <div class="foot-soc">
              <a href="#" aria-label="GitHub"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.34.85 0 1.7.12 2.5.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z"/></svg></a>
              <a href="#" aria-label="X"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
              <a href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56z"/></svg></a>
            </div>
          </div>
          <div class="foot-col">
            <h4>Produtos</h4>
            <a href="produtos.html">100 Micro SaaS</a>
            <a href="produtos.html">Boilerplate</a>
            <a href="produtos.html">Components</a>
            <a href="jobs.html">Jobs</a>
          </div>
          <div class="foot-col">
            <h4>Empresa</h4>
            <a href="empresa.html">Quem somos</a>
            <a href="empresa.html#manifesto">Manifesto</a>
            <a href="empresa.html#time">O time</a>
          </div>
          <div class="foot-col">
            <h4>Recursos</h4>
            <a href="#">Documentação</a>
            <a href="#">Contato</a>
            <a href="#">Garantia</a>
          </div>
        </div>
        <div class="foot-bot">
          <span>© 2025 dev/base · Goiânia, GO</span>
          <span>Feito por devs BR, pra devs BR 🇧🇷</span>
        </div>
      </div>
    </footer>`;
  }

  // NAV scroll state
  const nav = $('.nav');
  function onScroll() {
    const y = scrollY || document.documentElement.scrollTop;
    if (nav) {
      if (darkStart) {
        // over the full hero: dark until user passes most of viewport
        const past = y > innerHeight - 120;
        nav.classList.toggle('scrolled', past);
        nav.classList.toggle('dark', !past);
      } else {
        nav.classList.toggle('scrolled', y > 20);
      }
    }
  }
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  // mobile menu
  const toggle = $('.nav-toggle'), menu = $('.mobile-menu');
  if (toggle && menu) toggle.addEventListener('click', () => menu.classList.toggle('open'));

  // reveals
  const io = new IntersectionObserver((es) => {
    es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
  $$('.reveal').forEach(el => io.observe(el));
  $$('[data-stagger]').forEach(g => [...g.children].forEach((c,i)=>{ if(c.classList.contains('reveal')) c.style.setProperty('--d',(i*80)+'ms'); }));

  // counters
  function count(el) {
    const raw = el.dataset.count; const target = parseFloat(raw);
    const dec = (raw.split('.')[1]||'').length; const suf = el.dataset.suffix||''; const pre = el.dataset.prefix||'';
    const dur = 1500, s = performance.now();
    (function tick(n){ const t=Math.min(1,(n-s)/dur); const e=1-Math.pow(1-t,3);
      el.textContent = pre + (target*e).toFixed(dec) + suf;
      if(t<1) requestAnimationFrame(tick); else el.textContent = pre + target.toFixed(dec) + suf; })(s);
  }
  const cio = new IntersectionObserver((es)=>{ es.forEach(e=>{ if(e.isIntersecting && !e.target.dataset.done){ e.target.dataset.done='1'; count(e.target); cio.unobserve(e.target);} }); }, { threshold: 0.6 });
  $$('[data-count]').forEach(el => cio.observe(el));

  // chips toggle
  $$('.chip').forEach(c => c.addEventListener('click', () => c.classList.toggle('on')));
  // fake form submit
  $$('form').forEach(f => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const b = f.querySelector('button[type="submit"], .btn'); if(!b) return;
    const o = b.innerHTML; b.style.pointerEvents='none'; b.innerHTML = '✓ Recebido';
    setTimeout(()=>{ b.innerHTML=o; b.style.pointerEvents=''; f.reset && f.reset(); }, 1800);
  }));
})();
