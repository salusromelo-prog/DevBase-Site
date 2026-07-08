/* Fonte única da história da DevBase.
   A timeline do /sobre e os fragmentos do sistema vivo (LivingSystem
   mode='sobre') derivam deste array — pra nunca divergirem. */

export type GitlogEntry = {
  hash: string
  date: string
  type: string
  msg: string
  desc: string
}

// Datas verificadas no git history do repo (hashes reais, exceto o init,
// que antecede o repositório — fato fornecido pelo founder: fundação mai/2025).
export const GITLOG: GitlogEntry[] = [
  {
    hash: 'e0f2b81',
    date: 'mai 2025',
    type: 'init',
    msg: '',
    desc: 'DevBase é fundada em Goiânia. Três pessoas, zero promessa, uma regra: só conta o que está no ar.',
  },
  {
    hash: '5f42a3c',
    date: 'mai 2026',
    type: 'feat:',
    msg: 'devbase.tools',
    desc: 'O site entra no ar — já vendendo o DevBase Boilerplate desde o primeiro commit.',
  },
  {
    hash: '2ca1110',
    date: 'mai 2026',
    type: 'feat:',
    msg: 'components + combo',
    desc: 'O kit de componentes em PT-BR entra no catálogo, junto do combo com o Boilerplate.',
  },
  {
    hash: 'b463e25',
    date: 'mai 2026',
    type: 'feat:',
    msg: 'micro-saas',
    desc: '100 ideias validadas e 25 automações — problema, público, monetização e stack, prontas pra executar.',
  },
  {
    hash: '829aaa6',
    date: 'jul 2026',
    type: 'refactor:',
    msg: 'dois públicos',
    desc: 'A DevBase passa a construir também para empresas. Mesma engenharia, nova frente.',
  },
]

/* fragmentos do fundo vivo do /sobre — derivados das entradas reais */
export const GITLOG_FRAGMENTS: string[] = GITLOG.map((e) =>
  e.type === 'init' ? `${e.hash} · init` : `${e.type} ${e.msg}`
)
