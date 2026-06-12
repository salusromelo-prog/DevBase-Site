export type CursoIndicado = {
  slug: string
  nome: string
  autor: string
  tema: string
  secao: 'iniciante' | 'produto' | 'dev'
  descricaoCurta: string
  porQueIndicamos: string
  preco: string
  linkAfiliado: string
  plataforma: 'Kiwify' | 'Cakto' | 'Hotmart'
  destaque: boolean
}

export const cursos: CursoIndicado[] = [
  {
    slug: 'ninja-do-html',
    nome: 'Ninja do HTML',
    autor: 'Não informado',
    tema: 'HTML & CSS',
    secao: 'iniciante',
    descricaoCurta: 'Do zero ao site completo, sem precisar de experiência anterior.',
    porQueIndicamos: 'Preço de entrada real, sem enrolação. Pra quem está no começo e quer entender como a web funciona antes de partir pra frameworks. HTML e CSS bem feitos ainda são a base de tudo.',
    preco: 'R$ 19,90',
    linkAfiliado: 'https://pay.kiwify.com.br/0QmvhfT?afid=Skjoi1it',
    plataforma: 'Kiwify',
    destaque: false,
  },
  {
    slug: 'viver-de-saas',
    nome: 'Viver de SaaS',
    autor: 'Rafael Lira',
    tema: 'SaaS & Produto',
    secao: 'produto',
    descricaoCurta: 'Como construir e monetizar um SaaS do zero.',
    porQueIndicamos: 'Cobre o tema que mais importa pra quem quer sair do tutorial e lançar produto real. Selecionamos pelo foco prático em monetização e pelo preço acessível.',
    preco: 'R$ 49,90',
    linkAfiliado: 'https://pay.cakto.com.br/5',
    plataforma: 'Cakto',
    destaque: true,
  },
  {
    slug: 'python-turbo',
    nome: 'Curso de Python Turbo',
    autor: 'Não informado',
    tema: 'Python',
    secao: 'dev',
    descricaoCurta: 'Do zero ao avançado com teoria objetiva, prática intensiva e +40 projetos reais.',
    porQueIndicamos: 'Python é a linguagem que abre mais portas hoje — automação, dados, IA, backend. Esse curso não enrola: teoria no ponto certo, projetos reais do início ao fim, e escopo que prepara pra mercado de verdade.',
    preco: 'R$ 197,00',
    linkAfiliado: 'https://pay.kiwify.com.br/N5tuqX7?afid=RfsBDwlH',
    plataforma: 'Kiwify',
    destaque: false,
  },
]
