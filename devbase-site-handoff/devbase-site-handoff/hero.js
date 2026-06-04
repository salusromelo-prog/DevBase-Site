/* ============================================================
   DevBase — hero motion engine
   Three looping, premium background animations the user can switch:
     · aurora  — drifting gradient light (default)
     · flow    — flow-field particle streams
     · silk    — layered wave ribbons
   Renders to any <canvas data-hero> ; reliable canvas-2D, captures cleanly.
   ============================================================ */
(function () {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const PURP = [
    [99,102,241],   // indigo
    [139,92,246],   // violet
    [167,139,250],  // light violet
    [79,70,229],    // deep indigo
    [125,211,252],  // hint of sky for life
  ];

  function mk(canvas, variant) {
    const ctx = canvas.getContext('2d');
    let W=0, H=0, dpr=Math.min(devicePixelRatio||1,2), raf=0, t0=performance.now();
    const mouse = { x:.5, y:.5, tx:.5, ty:.5 };

    function resize() {
      const r = canvas.getBoundingClientRect();
      W = Math.max(1, Math.round(r.width)); H = Math.max(1, Math.round(r.height));
      canvas.width = W*dpr; canvas.height = H*dpr; ctx.setTransform(dpr,0,0,dpr,0,0);
      build();
    }

    /* ---------- AURORA ---------- */
    let blobs=[];
    function buildAurora(){
      blobs=[]; const n = Math.max(5, Math.round(W*H/240000));
      for(let i=0;i<n;i++){
        const c = PURP[i%PURP.length];
        blobs.push({ c, r: 220+Math.random()*320,
          ax:Math.random()*W, ay:Math.random()*H,
          ex:120+Math.random()*220, ey:120+Math.random()*220,
          sx:.18+Math.random()*.22, sy:.16+Math.random()*.2,
          px:Math.random()*6.28, py:Math.random()*6.28 });
      }
    }
    function drawAurora(now){
      ctx.clearRect(0,0,W,H);
      ctx.fillStyle = '#0a0913'; ctx.fillRect(0,0,W,H);
      ctx.globalCompositeOperation = 'lighter';
      const tt = now/1000;
      const mx=(mouse.x-.5), my=(mouse.y-.5);
      for(const b of blobs){
        const x = b.ax + Math.sin(tt*b.sx + b.px)*b.ex + mx*60;
        const y = b.ay + Math.cos(tt*b.sy + b.py)*b.ey + my*60;
        const g = ctx.createRadialGradient(x,y,0,x,y,b.r);
        const [r,gr,bl]=b.c;
        g.addColorStop(0, `rgba(${r},${gr},${bl},0.42)`);
        g.addColorStop(.4, `rgba(${r},${gr},${bl},0.16)`);
        g.addColorStop(1, `rgba(${r},${gr},${bl},0)`);
        ctx.fillStyle=g; ctx.beginPath(); ctx.arc(x,y,b.r,0,6.2832); ctx.fill();
      }
      ctx.globalCompositeOperation = 'source-over';
      // soft grain-ish vignette
      const v = ctx.createRadialGradient(W/2,H*0.4,0,W/2,H*0.4,Math.max(W,H)*0.75);
      v.addColorStop(0,'rgba(10,9,19,0)'); v.addColorStop(1,'rgba(10,9,19,0.55)');
      ctx.fillStyle=v; ctx.fillRect(0,0,W,H);
    }

    /* ---------- FLOW FIELD ---------- */
    let parts=[];
    function buildFlow(){
      parts=[]; const n = Math.max(140, Math.round(W*H/5200));
      for(let i=0;i<n;i++) parts.push(resetP({}, true));
    }
    function resetP(p, init){
      p.x = Math.random()*W; p.y = Math.random()*H;
      p.life = 0; p.max = 60+Math.random()*120;
      p.c = PURP[(Math.random()*PURP.length)|0];
      p.w = 0.6+Math.random()*1.2;
      return p;
    }
    function field(x,y,t){
      // cheap layered-sine flow angle
      const s=0.0016;
      return Math.sin(x*s + Math.cos(y*s*1.3 + t)) * 1.6
           + Math.cos(y*s - Math.sin(x*s*0.8 - t)) * 1.6;
    }
    function drawFlow(now){
      // fade prev frame for trails
      ctx.globalCompositeOperation='source-over';
      ctx.fillStyle='rgba(10,9,19,0.08)'; ctx.fillRect(0,0,W,H);
      ctx.globalCompositeOperation='lighter';
      const t=now/2600;
      const mx=(mouse.x-.5)*40, my=(mouse.y-.5)*40;
      for(const p of parts){
        const a=field(p.x,p.y,t);
        const nx=p.x+Math.cos(a)*1.6, ny=p.y+Math.sin(a)*1.6;
        const [r,g,b]=p.c;
        const al = 0.5*Math.sin((p.life/p.max)*Math.PI);
        ctx.strokeStyle=`rgba(${r},${g},${b},${al})`; ctx.lineWidth=p.w;
        ctx.beginPath(); ctx.moveTo(p.x+mx*0.02,p.y+my*0.02); ctx.lineTo(nx+mx*0.02,ny+my*0.02); ctx.stroke();
        p.x=nx; p.y=ny; p.life++;
        if(p.life>p.max||p.x<0||p.x>W||p.y<0||p.y>H) resetP(p);
      }
      ctx.globalCompositeOperation='source-over';
    }

    /* ---------- SILK (wave ribbons) ---------- */
    function drawSilk(now){
      ctx.clearRect(0,0,W,H);
      ctx.fillStyle='#0a0913'; ctx.fillRect(0,0,W,H);
      const t=now/1000; const layers=6;
      ctx.globalCompositeOperation='lighter';
      const mx=(mouse.x-.5)*40;
      for(let L=0;L<layers;L++){
        const c=PURP[L%PURP.length];
        const yBase=H*(0.35+L*0.085);
        const amp=40+L*16; const k=0.004+L*0.0006; const sp=0.5+L*0.18;
        ctx.beginPath(); ctx.moveTo(0,H);
        for(let x=0;x<=W;x+=14){
          const y=yBase+Math.sin(x*k + t*sp + L)*amp + Math.cos(x*k*0.6 - t*0.4)*amp*0.4 + mx*0.1;
          ctx.lineTo(x,y);
        }
        ctx.lineTo(W,H); ctx.closePath();
        const g=ctx.createLinearGradient(0,yBase-amp,0,H);
        const[r,gg,b]=c;
        g.addColorStop(0,`rgba(${r},${gg},${b},0.16)`);
        g.addColorStop(1,`rgba(${r},${gg},${b},0)`);
        ctx.fillStyle=g; ctx.fill();
      }
      ctx.globalCompositeOperation='source-over';
      const v=ctx.createLinearGradient(0,0,0,H);
      v.addColorStop(0,'rgba(10,9,19,0.4)'); v.addColorStop(.5,'rgba(10,9,19,0)'); v.addColorStop(1,'rgba(10,9,19,0.6)');
      ctx.fillStyle=v; ctx.fillRect(0,0,W,H);
    }

    function build(){
      if(variant==='aurora') buildAurora();
      else if(variant==='flow') buildFlow();
      // silk needs nothing
      if(variant==='flow'){ ctx.fillStyle='#0a0913'; ctx.fillRect(0,0,W,H); }
    }
    function loop(now){
      if(variant==='aurora') drawAurora(now);
      else if(variant==='flow') drawFlow(now);
      else drawSilk(now);
      raf=requestAnimationFrame(loop);
    }

    addEventListener('mousemove',(e)=>{ mouse.tx=e.clientX/innerWidth; mouse.ty=e.clientY/innerHeight; });
    (function ease(){ mouse.x+=(mouse.tx-mouse.x)*0.06; mouse.y+=(mouse.ty-mouse.y)*0.06; requestAnimationFrame(ease); })();

    resize(); addEventListener('resize', resize); setTimeout(resize,250);
    if(reduced){ // single static frame
      if(variant==='aurora') drawAurora(1200);
      else if(variant==='flow'){ for(let i=0;i<60;i++) drawFlow(i*16); }
      else drawSilk(800);
    } else { raf=requestAnimationFrame(loop); }

    return { setVariant(v){ cancelAnimationFrame(raf); variant=v; build(); if(!reduced) raf=requestAnimationFrame(loop); else loop(performance.now()); } };
  }

  // boot all hero canvases
  window.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('db-hero') || 'silk';
    const instances = [];
    document.querySelectorAll('canvas[data-hero]').forEach(cv => {
      const v = cv.dataset.hero === 'fixed' ? (cv.dataset.variant || saved) : saved;
      instances.push({ cv, inst: mk(cv, v), fixed: cv.dataset.hero === 'fixed' });
    });
    // switcher
    const sw = document.querySelector('.hero-switch');
    if (sw) {
      sw.querySelectorAll('button').forEach(b => {
        b.classList.toggle('on', b.dataset.v === saved);
        b.addEventListener('click', () => {
          const v = b.dataset.v;
          localStorage.setItem('db-hero', v);
          sw.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b));
          instances.forEach(i => { if (!i.fixed) i.inst.setVariant(v); });
        });
      });
    }
  });
})();
