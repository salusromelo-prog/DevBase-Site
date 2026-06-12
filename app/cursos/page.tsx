import type { Metadata } from 'next'
import Reveal from '@/components/reveal'
import HeroCanvas from '@/components/hero-canvas'
import SectionShell from '@/components/visual/section-shell'
import SectionTransition from '@/components/visual/section-transition'
import { cursos, type CursoIndicado } from '@/data/cursos'

export const metadata: Metadata = {
  title: 'Cursos indicados | DevBase',
  description: 'Cursos selecionados pela DevBase para devs brasileiros que querem parar de consumir tutorial e começar a construir produto real.',
}

function CursoCard({ curso, delay }: { curso: CursoIndicado; delay: number }) {
  return (
    <Reveal delay={delay} className={`depth curso-card${curso.destaque ? ' destaque' : ''}`}>
      {curso.destaque && <span className="curso-forte">indicação forte</span>}
      <div className="ptop">
        <span className="pchip curso-tema">{curso.tema}</span>
        <span className="pchip curso-plataforma">{curso.plataforma}</span>
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
        <a href={`/api/go/${curso.slug}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary curso-cta">
          Ver curso <span className="arr">→</span>
        </a>
      </div>
    </Reveal>
  )
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
            Esses cursos não são da DevBase. São de outros profissionais que a gente avaliou e indicaria
            pra qualquer dev que quer parar de consumir tutorial e começar a construir.
          </p>

          <Reveal className="transparency-card">
            <span className="eyebrow">// transparência acima de tudo</span>
            <p>
              Os links desta página são de afiliado: se você comprar, a DevBase recebe uma comissão e
              você paga exatamente o mesmo preço. A gente fala isso porque transparência é o primeiro
              valor desta empresa — e porque só indicamos o que passou pelo nosso filtro.
            </p>
          </Reveal>
        </div>
      </header>
      <SectionTransition />

      {/* ===== COMEÇANDO AGORA ===== */}
      <SectionShell rail="iniciante" soft bleed="tr" className="sx-curtain">
        <div className="wrap wrap-wide">
          <Reveal className="sec-head">
            <span className="eyebrow">// começando agora</span>
            <p>Pra quem está entrando na área agora.</p>
          </Reveal>
          <div className="cursos-grid" data-depth-stagger>
            {cursos.filter(c => c.secao === 'iniciante').map((curso, i) => (
              <CursoCard key={curso.slug} curso={curso} delay={i * 60} />
            ))}
          </div>
        </div>
      </SectionShell>

      {/* ===== LANÇAR PRODUTO ===== */}
      <SectionShell rail="produto" bleed="bl">
        <div className="wrap wrap-wide">
          <Reveal className="sec-head">
            <span className="eyebrow">// lançar produto</span>
            <p>Você já sabe programar. Agora aprende a transformar isso em receita.</p>
          </Reveal>
          <div className="cursos-grid" data-depth-stagger>
            {cursos.filter(c => c.secao === 'produto').map((curso, i) => (
              <CursoCard key={curso.slug} curso={curso} delay={i * 60} />
            ))}
          </div>
        </div>
      </SectionShell>

      {/* ===== JÁ DESENVOLVE ===== */}
      <SectionShell rail="dev" soft bleed="tr">
        <div className="wrap wrap-wide">
          <Reveal className="sec-head">
            <span className="eyebrow">// já desenvolve</span>
            <p>Pra quem quer ir mais fundo na stack.</p>
          </Reveal>
          <div className="cursos-grid" data-depth-stagger>
            {cursos.filter(c => c.secao === 'dev').map((curso, i) => (
              <CursoCard key={curso.slug} curso={curso} delay={i * 60} />
            ))}
          </div>
        </div>
      </SectionShell>

      {/* ===== FECHO ===== */}
      <SectionShell tight>
        <div className="wrap wrap-wide">
          <Reveal className="ctaband">
            <HeroCanvas variant="silk" className="ctaband-canvas" />
            <div className="ctaband-veil" />
            <div className="ctaband-in">
              <h2>Curso ensina. O Boilerplate entrega a base pronta.</h2>
              <p>Enquanto aprende, use uma base Next.js já configurada com auth, pagamentos BR e deploy em 1 clique.</p>
              <div className="hero-cta">
                <a href="/produto/boilerplate" className="btn btn-primary btn-lg">
                  Ver o Boilerplate <span className="arr">→</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </SectionShell>

      <style>{`
        .p-cursos .sec-head p { margin-top: 14px; }

        .p-cursos .transparency-card {
          margin-top: 40px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-width: 720px;
          padding: 28px;
          border-radius: var(--r);
          border: 1px solid rgba(99,102,241,0.2);
          background: rgba(99,102,241,0.06);
          backdrop-filter: blur(8px);
        }
        .p-cursos .transparency-card p {
          color: var(--d-body);
          font-size: 15px;
          line-height: 1.7;
          max-width: 65ch;
        }

        .cursos-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        @media (max-width: 980px) { .cursos-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) { .cursos-grid { grid-template-columns: 1fr; } }

        .curso-card {
          position: relative;
          display: flex; flex-direction: column;
          border-radius: var(--r); border: 1px solid var(--line); background: var(--bg);
          padding: 28px;
          transition: transform .35s var(--ease), box-shadow .35s, border-color .35s;
        }
        .curso-card:hover { transform: translateY(-2px); box-shadow: 0 24px 50px -30px rgba(13,13,18,0.2); }
        .curso-card.destaque { border: 1px solid var(--primary); }

        .curso-forte {
          position: absolute; top: -12px; right: 20px;
          font-family: var(--mono); font-size: 11px; letter-spacing: 0.04em;
          padding: 5px 12px; border-radius: 999px;
          background: var(--primary); color: #fff;
        }

        .curso-card .ptop { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 16px; flex-wrap: wrap; }
        .curso-tema {
          font-family: var(--mono); font-size: 11px; text-transform: uppercase; letter-spacing: 0.04em;
          padding: 5px 10px; border-radius: 999px; border: none;
          color: var(--primary); background: rgba(99,102,241,0.10);
        }
        .curso-plataforma {
          font-family: var(--mono); font-size: 11px;
          padding: 5px 10px; border-radius: 999px; border: 1px solid var(--line-2);
          color: var(--muted); background: transparent;
        }

        .curso-card h3 { font-size: 21px; letter-spacing: -0.025em; margin-bottom: 4px; }
        .curso-autor { font-size: 13.5px; color: var(--muted); margin-bottom: 14px; }
        .curso-card .pdesc { color: var(--body); margin-bottom: 0; }

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
