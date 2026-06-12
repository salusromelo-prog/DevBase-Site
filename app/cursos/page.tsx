import type { Metadata } from 'next'
import Reveal from '@/components/reveal'
import HeroCanvas from '@/components/hero-canvas'
import SectionShell from '@/components/visual/section-shell'
import SectionTransition from '@/components/visual/section-transition'
import { cursos, type CursoIndicado } from '@/data/cursos'

function CursoCard({ curso, delay }: { curso: CursoIndicado; delay: number }) {
  return (
    <Reveal delay={delay} className={`depth curso-card${curso.destaque ? ' destaque' : ''}`}>
      <div className="ptop">
        <span className="pchip curso-tema">{curso.tema}</span>
        {curso.destaque && <span className="pchip curso-destaque">★ indicação forte</span>}
      </div>
      <h3>{curso.nome}</h3>
      <p className="curso-autor">{curso.autor}</p>
      <p className="pdesc">{curso.descricaoCurta}</p>
      <div className="curso-divider" />
      <div className="curso-why">
        <span className="eyebrow">por que indicamos</span>
        <p>{curso.porQueIndicamos}</p>
      </div>
      <div className="curso-foot">
        <span className="curso-preco">{curso.preco}</span>
        <a href={`/api/go/${curso.slug}`} className="btn btn-primary curso-cta">
          Ver curso <span className="arr">→</span>
        </a>
      </div>
    </Reveal>
  )
}

export const metadata: Metadata = {
  title: 'Cursos indicados | DevBase',
  description: 'Curadoria de cursos de terceiros pra devs brasileiros que querem sair do tutorial e lançar produto. Sem hype, com transparência sobre os links de afiliado.',
}

export default function Cursos() {
  return (
    <div className="p-cursos">
      {/* ===== HERO ===== */}
      <header className="phead">
        <HeroCanvas variant="silk" className="phead-canvas" />
        <div className="phead-veil" />
        <div className="wrap">
          <span className="eyebrow on-dark">// curadoria devbase</span>
          <h1 data-split>Cursos que a gente indica</h1>
          <p>
            Esses cursos não são da DevBase. São cursos de terceiros que passaram pelo nosso filtro —
            e que a gente indicaria pra qualquer dev que quer sair do tutorial e lançar produto.
          </p>

          <Reveal className="transparency-card">
            <div className="transparency-ic" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </div>
            <div>
              <span className="eyebrow">transparência acima de tudo</span>
              <p>
                A gente verifica reputação, atualização recente e política de garantia antes de indicar
                qualquer curso aqui. Os links são de afiliado: se você comprar, a DevBase ganha comissão —
                e você paga exatamente o mesmo preço.
              </p>
            </div>
          </Reveal>
        </div>
      </header>
      <SectionTransition />

      {/* ===== COMEÇANDO AGORA ===== */}
      <SectionShell rail="comecando" bleed="tr" className="sx-curtain">
        <div className="wrap wrap-wide">
          <div className="sec-rule"><span className="sec-rule__line" /><span className="sec-rule__label">// começando agora</span><span className="sec-rule__line" /></div>
          <div className="cursos-grid" data-depth-stagger>
            {cursos.filter(c => c.categoria === 'comecando').map((curso, i) => (
              <CursoCard key={curso.slug} curso={curso} delay={i * 60} />
            ))}
          </div>
        </div>
      </SectionShell>

      {/* ===== FECHO — INICIANTE ===== */}
      <SectionShell tight soft>
        <div className="wrap wrap-wide">
          <Reveal className="ctaband">
            <HeroCanvas variant="silk" className="ctaband-canvas" />
            <div className="ctaband-veil" />
            <div className="ctaband-in">
              <h2>Curso ensina. A gente acompanha de graça.</h2>
              <p>Enquanto você faz o curso, segue a gente no Instagram pra conteúdo gratuito sobre o dia a dia de quem tá saindo do zero.</p>
              <div className="hero-cta">
                {/* SUBSTITUIR — link do Instagram */}
                <a href="https://instagram.com/devbase" target="_blank" rel="noopener noreferrer" className="btn btn-glass btn-lg">Seguir no Instagram</a>
              </div>
            </div>
          </Reveal>
        </div>
      </SectionShell>

      {/* ===== JÁ DESENVOLVE ===== */}
      <SectionShell rail="dev" bleed="bl">
        <div className="wrap wrap-wide">
          <div className="sec-rule"><span className="sec-rule__line" /><span className="sec-rule__label">// já desenvolve</span><span className="sec-rule__line" /></div>
          <div className="cursos-grid" data-depth-stagger>
            {cursos.filter(c => c.categoria === 'dev').map((curso, i) => (
              <CursoCard key={curso.slug} curso={curso} delay={i * 60} />
            ))}
          </div>
        </div>
      </SectionShell>

      {/* ===== FECHO — DEV ===== */}
      <SectionShell tight soft>
        <div className="wrap wrap-wide">
          <Reveal className="ctaband">
            <HeroCanvas variant="silk" className="ctaband-canvas" />
            <div className="ctaband-veil" />
            <div className="ctaband-in">
              <h2>Curso ensina. O Boilerplate entrega a base pronta.</h2>
              <p>Depois de aprender, pule a parte de montar auth, pagamento e dashboard do zero — a base já vem pronta.</p>
              <div className="hero-cta">
                <a href="/produto/boilerplate" className="btn btn-glass btn-lg">Conhecer o Boilerplate</a>
              </div>
            </div>
          </Reveal>
        </div>
      </SectionShell>

      <style>{`
        .p-cursos .transparency-card {
          margin-top: 40px;
          display: flex;
          gap: 20px;
          align-items: flex-start;
          max-width: 720px;
          padding: 28px;
          border-radius: var(--r);
          border: 1px solid rgba(99,102,241,0.28);
          background: rgba(99,102,241,0.06);
          backdrop-filter: blur(8px);
        }
        .p-cursos .transparency-card p {
          color: var(--d-body);
          font-size: 15px;
          line-height: 1.7;
          margin-top: 8px;
          max-width: 60ch;
        }
        .p-cursos .transparency-ic {
          flex-shrink: 0;
          width: 40px; height: 40px;
          border-radius: 10px;
          display: grid; place-items: center;
          background: rgba(99,102,241,0.14);
          color: var(--violet-2);
        }
        .p-cursos .transparency-ic svg { width: 20px; height: 20px; }

        .cursos-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        @media (max-width: 980px) { .cursos-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) { .cursos-grid { grid-template-columns: 1fr; } }

        .curso-card {
          display: flex; flex-direction: column;
          border-radius: var(--r); border: 1px solid var(--line); background: var(--bg);
          padding: 28px;
          transition: transform .35s var(--ease), box-shadow .35s, border-color .35s;
        }
        .curso-card:hover { transform: translateY(-5px); box-shadow: 0 30px 60px -34px rgba(13,13,18,0.22), 0 0 28px -8px rgba(99,102,241,0.10) inset; border-color: var(--soft-2); }
        .curso-card.destaque { border-color: var(--primary); box-shadow: 0 0 0 1px var(--primary), 0 24px 50px -28px rgba(99,102,241,0.32); }

        .curso-card .ptop { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 16px; flex-wrap: wrap; }
        .curso-tema { color: var(--primary); border-color: var(--soft-2); background: var(--soft); }
        .curso-destaque { color: var(--primary); border-color: var(--soft-2); background: var(--soft); }

        .curso-card h3 { font-size: 21px; letter-spacing: -0.025em; margin-bottom: 4px; }
        .curso-autor { font-size: 13.5px; color: var(--muted); margin-bottom: 14px; }
        .curso-card .pdesc { margin-bottom: 0; }

        .curso-divider { height: 1px; background: var(--line); margin: 22px 0; }

        .curso-why { background: var(--soft); border-radius: var(--r-sm); padding: 18px 20px; margin-bottom: 22px; }
        .curso-why .eyebrow { margin-bottom: 8px; }
        .curso-why p { font-size: 14.5px; color: var(--ink-2); line-height: 1.65; }

        .curso-foot { margin-top: auto; display: flex; flex-direction: column; gap: 14px; }
        .curso-preco { font-size: 26px; font-weight: 700; letter-spacing: -0.03em; color: var(--signal); }
        .curso-cta { width: 100%; justify-content: center; }
      `}</style>
    </div>
  )
}
