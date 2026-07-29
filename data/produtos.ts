/* Fonte única do catálogo.
   A prateleira do topo, as fichas do catálogo e a tabela de comparação
   leem daqui — três leituras do mesmo dado, para não divergirem
   quando um preço ou um item de lista mudar. */

export type Produto = {
  id: string
  n: string
  nome: string
  /* nome curto — cabe na lombada vertical da prateleira */
  curto: string
  /* frase curta que aparece na lombada da prateleira */
  linha: string
  desc: string
  itens: string[]
  preco: { de?: string; por: string; nota: string; tom: 'green' | 'indigo' | 'teal' }
  href: string
  checkout: string
  /* Duas faces do mesmo acento, porque uma cor não serve às duas:
     `accent` é o tom que aparece COMO TEXTO sobre o preto (número,
     bullets, borda, brilho) — precisa ser claro; `accentBtn` é o
     tom que vai ATRÁS de texto branco no botão de compra — precisa
     ser escuro. Usar um só derrubava o contraste de um dos lados. */
  accent: string
  accentBtn: string
  chip: { txt: string; live: boolean }
  /* colunas da tabela de comparação */
  resolve: string
  paraQuem: string
}

export const PRODUTOS: Produto[] = [
  {
    id: 'micro-saas',
    n: '01',
    nome: '100 Micro SaaS + 25 Automações',
    curto: 'Micro SaaS',
    linha: 'o ponto de partida',
    desc:
      'Cem ideias com problema, público, monetização, stack e escopo de MVP. Pra quem sabe construir qualquer coisa e trava na pergunta anterior: construir o quê.',
    itens: [
      '100 ideias com problema e escopo de MVP',
      '25 automações prontas pra vender como serviço',
      'público, monetização e stack de cada uma',
      'dashboard exclusivo de acesso',
      'acesso vitalício, com novas ideias adicionadas',
    ],
    preco: { por: 'R$ 29,90', nota: 'pagamento único', tom: 'teal' },
    href: '/produto/micro-saas',
    checkout: 'https://pay.kiwify.com.br/5cyFrhr',
    accent: '#2dd4bf',
    accentBtn: '#0f766e',
    chip: { txt: 'ao vivo · novo', live: true },
    resolve: 'a página em branco — o que construir',
    paraQuem: 'dev que quer lançar e não sabe o quê',
  },
  {
    id: 'boilerplate',
    n: '02',
    nome: 'DevBase Boilerplate',
    curto: 'Boilerplate',
    linha: 'a base pronta',
    desc:
      'Kit Next.js completo pra lançar SaaS no Brasil. Auth, pagamentos, dashboard, e-mail e deploy já ligados — a parte chata resolvida antes do primeiro commit seu.',
    itens: [
      'Next.js + TypeScript + Tailwind',
      'auth completo com Supabase',
      'Pagar.me: PIX, boleto e cartão',
      'dashboard com métricas e área admin',
      'e-mail transacional com Resend',
      'documentação 100% em PT-BR',
    ],
    preco: { de: 'R$ 297', por: 'R$ 147', nota: 'vitalício · atualizações incluídas', tom: 'green' },
    href: '/produto/boilerplate',
    checkout: 'https://pay.kiwify.com.br/d4yYNFy',
    accent: '#818cf8',
    accentBtn: '#4f46e5',
    chip: { txt: 'ao vivo', live: true },
    resolve: 'as duas semanas de setup antes da primeira tela',
    paraQuem: 'dev que já sabe o quê e quer pular a fundação',
  },
  {
    id: 'components',
    n: '03',
    nome: 'DevBase Components',
    curto: 'Components',
    linha: 'as peças do Brasil',
    desc:
      'Oito componentes React que todo produto brasileiro precisa e ninguém quer reescrever. Com máscara, validação real e TypeScript — copia, cola, funciona.',
    itens: [
      'CPF/CNPJ com validação de dígito',
      'CEP com busca via ViaCEP',
      'telefone com máscara BR',
      'seletor de banco (20 bancos)',
      'PIX Button com QR Code',
      'cartão com validação Luhn',
      'tipados, sem `any`',
      'sem dependência pesada',
    ],
    preco: { por: 'R$ 67', nota: 'vitalício · use em quantos projetos quiser', tom: 'indigo' },
    href: '/produto/components',
    checkout: 'https://pay.kiwify.com.br/7OQNJ1C',
    accent: '#a78bfa',
    accentBtn: '#7c3aed',
    chip: { txt: 'ao vivo', live: true },
    resolve: 'o formulário que trava na hora de pagar',
    paraQuem: 'quem já tem projeto e precisa das peças BR',
  },
  {
    id: 'combo',
    n: '04',
    nome: 'Boilerplate + Components',
    curto: 'Combo',
    linha: 'a base e as peças',
    desc:
      'Os dois produtos juntos, por menos do que custam separados. Do login ao checkout, tudo que um SaaS brasileiro precisa pra sair do zero.',
    itens: [
      'tudo do DevBase Boilerplate',
      'tudo do DevBase Components',
      'auth, pagamentos, dashboard e deploy',
      'CPF, CNPJ, CEP, PIX e cartão',
      'acesso vitalício aos dois',
    ],
    preco: { de: 'R$ 214', por: 'R$ 197', nota: 'economia de R$ 17', tom: 'green' },
    href: '/produto/combo',
    checkout: 'https://pay.kiwify.com.br/Y6jViIR',
    accent: '#c4b5fd',
    accentBtn: 'linear-gradient(110deg, #4f46e5, #7c3aed)',
    chip: { txt: '✦ combo', live: false },
    resolve: 'os dois problemas de uma vez',
    paraQuem: 'quem vai lançar um SaaS BR do zero',
  },
]
