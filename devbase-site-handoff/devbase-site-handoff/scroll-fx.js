/* ============================================================
   DevBase — premium scroll engine (position-driven, no IO reliance)
   · smoothed scroll (lerp) → buttery parallax
   · velocity skew (Awwwards/Locomotive feel)
   · hero dissolve (content drifts + fades, canvas scales)
   · word-by-word heading reveal
   · depth reveal (3D rise + unblur) + .reveal + counters
   Single rAF loop · transforms only · respects reduced-motion
   ============================================================ */
(function () {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('js');
  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const scrollTop = () => -document.documentElement.getBoundingClientRect().top;

  /* ---------- progress bar ---------- */
  const bar = document.createElement('div'); bar.className = 'sx-progress'; document.body.appendChild(bar);

  /* ---------- split big headings into words ---------- */
  $$('[data-split]').forEach(h => {
    const frag = document.createElement('div'); frag.innerHTML = h.innerHTML;
    const words = [];
    (function walk(node, cls) {
      node.childNodes.forEach(n => {
        if (n.nodeType === 3) {
          n.textContent.split(/(\s+)/).forEach(tok => {
            if (tok.trim() === '') { if (tok.length) words.push({ space: true }); }
            else words.push({ w: tok, cls });
          });
        } else if (n.nodeType === 1) {
          walk(n, ((n.className || '') + ' ' + cls).trim());
        }
      });
    })(frag, '');
    h.innerHTML = '';
    let i = 0;
    words.forEach(o => {
      if (o.space) { h.appendChild(document.createTextNode(' ')); return; }
      const wrap = document.createElement('span'); wrap.className = 'sw';
      const inner = document.createElement('span'); inner.textContent = o.w;
      if (o.cls) inner.className = o.cls;
      inner.style.setProperty('--wd', (i * 55) + 'ms');
      wrap.appendChild(inner); h.appendChild(wrap); i++;
    });
    h._sws = $$('.sw', h);
  });

  /* ---------- depth-stagger delays ---------- */
  $$('[data-depth-stagger]').forEach(g => [...g.children].forEach((c, i) => { if (c.classList.contains('depth')) c.style.setProperty('--d', (i * 90) + 'ms'); }));

  /* ---------- reveal targets (position-driven, bulletproof) ---------- */
  const revealEls = $$('.reveal, .depth');
  const splitEls = $$('[data-split]');
  const counters = $$('[data-count]');

  function inView(el, frac) {
    const r = el.getBoundingClientRect();
    if (r.height === 0 && r.width === 0) return false;
    return r.top < innerHeight * (frac || 0.88) && r.bottom > 0;
  }

  function animateCount(el) {
    const raw = el.dataset.count; const target = parseFloat(raw);
    const dec = (raw.split('.')[1] || '').length; const suf = el.dataset.suffix || ''; const pre = el.dataset.prefix || '';
    const dur = 1500, s = performance.now();
    (function t(n){ const k = Math.min(1,(n-s)/dur); const e = 1-Math.pow(1-k,3);
      el.textContent = pre + (target*e).toFixed(dec) + suf;
      if (k<1) requestAnimationFrame(t); else el.textContent = pre + target.toFixed(dec) + suf; })(s);
  }

  function scanReveals() {
    for (let i = revealEls.length - 1; i >= 0; i--) {
      const el = revealEls[i];
      if (inView(el)) { el.classList.add('in'); revealEls.splice(i, 1); }
    }
    for (let i = splitEls.length - 1; i >= 0; i--) {
      const h = splitEls[i];
      if (inView(h, 0.94)) { (h._sws || []).forEach(s => s.classList.add('lit')); splitEls.splice(i, 1); }
    }
    for (let i = counters.length - 1; i >= 0; i--) {
      const el = counters[i];
      if (el.dataset.done) { counters.splice(i, 1); continue; }
      if (inView(el, 0.95)) { el.dataset.done = '1'; animateCount(el); counters.splice(i, 1); }
    }
  }

  /* ---------- section rail ---------- */
  const secs = $$('[data-rail]');
  let rail = null, railBtns = [];
  if (secs.length > 2) {
    rail = document.createElement('div'); rail.className = 'sx-rail';
    secs.forEach((s, i) => {
      const b = document.createElement('button');
      b.dataset.label = s.dataset.rail || ('0' + (i + 1));
      b.addEventListener('click', () => s.scrollIntoView({ behavior: 'smooth', block: 'start' }));
      rail.appendChild(b);
    });
    document.body.appendChild(rail);
    railBtns = [...rail.children];
  }

  /* ---------- elements ---------- */
  const hero = $('.hero'), heroInner = $('.hero-inner'), heroCanvas = $('.hero-canvas');
  const heroSwitch = $('.hero-switch'), scrollcue = $('.scrollcue');
  const skews = $$('[data-skew-item]'), paras = $$('[data-parallax]');

  let current = scrollTop();

  function tick() {
    const top = scrollTop();
    const docH = document.documentElement.scrollHeight - innerHeight;
    current = lerp(current, top, 0.14);
    if (Math.abs(top - current) < 0.06) current = top;
    const vel = top - current;

    bar.style.setProperty('--sx', (docH > 0 ? clamp(top / docH, 0, 1) : 0).toFixed(4));

    if (!reduced) {
      // hero dissolve
      if (hero && heroInner && current < innerHeight * 1.15) {
        const p = clamp(current / innerHeight, 0, 1);
        heroInner.style.transform = `translateY(${current * 0.4}px) scale(${1 - p * 0.06})`;
        heroInner.style.opacity = `${clamp(1 - p * 1.15, 0, 1)}`;
        if (heroCanvas) heroCanvas.style.transform = `scale(${1 + p * 0.16}) translateY(${current * 0.1}px)`;
        if (heroSwitch) heroSwitch.style.opacity = `${clamp(1 - p * 1.8, 0, 1)}`;
        if (scrollcue) scrollcue.style.opacity = `${clamp(1 - p * 2.4, 0, 1)}`;
      }
      // velocity skew
      const sk = clamp(vel * 0.05, -3, 3);
      for (const el of skews) el.style.transform = `skewY(${sk * (parseFloat(el.dataset.skewItem) || 1)}deg)`;
      // parallax
      for (const el of paras) {
        const r = el.getBoundingClientRect();
        const center = r.top + r.height / 2 - innerHeight / 2;
        el.style.transform = `translate3d(0, ${(-center * (parseFloat(el.dataset.parallax) || 0.15)).toFixed(2)}px, 0)`;
      }
      // rail active
      if (railBtns.length) {
        let active = 0;
        secs.forEach((s, i) => { if (s.getBoundingClientRect().top <= innerHeight * 0.42) active = i; });
        railBtns.forEach((b, i) => b.classList.toggle('on', i === active));
        rail.classList.toggle('on-dark', secs[active] && (secs[active].classList.contains('hero') || secs[active].classList.contains('phead')));
      }
    }

    scanReveals();
    requestAnimationFrame(tick);
  }

  // run the loop always (reveals need it); transforms gated by !reduced inside
  requestAnimationFrame(tick);
  // bulletproof: also scan on real scroll/resize (covers throttled-rAF cases)
  addEventListener('scroll', scanReveals, { passive: true });
  addEventListener('resize', scanReveals);
  // immediate first paint of reveals already on screen
  scanReveals();
  setTimeout(scanReveals, 60);
  setTimeout(scanReveals, 300);
})();
