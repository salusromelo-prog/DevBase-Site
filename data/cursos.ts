export type CursoIndicado = {
  slug: string
  nome: string
  autor: string
  tema: string
  descricaoCurta: string
  porQueIndicamos: string
  preco: string
  linkAfiliado: string
  plataforma: string
  categoria: 'comecando' | 'dev'
  destaque: boolean
}

export const cursos: CursoIndicado[] = [
  // SUBSTITUIR — placeholder, dados reais a definir
  {
    slug: 'ninja-do-html',
    nome: 'Ninja do HTML',
    autor: 'Nome do Autor',
    tema: 'HTML & CSS',
    descricaoCurta: 'Os fundamentos de HTML e CSS direto ao ponto, sem enrolação.',
    porQueIndicamos: 'É o curso que a gente indicaria pra quem nunca escreveu uma linha de código. Ensina os fundamentos certos, na ordem certa, sem te perder em teoria que você só vai precisar meses depois.',
    preco: 'R$ 97',
    linkAfiliado: 'https://exemplo.com/afiliado/ninja-do-html',
    plataforma: 'Hotmart',
    categoria: 'comecando',
    destaque: true,
  },
  // SUBSTITUIR — placeholder, dados reais a definir
  {
    slug: 'web-do-zero',
    nome: 'Web do Zero',
    autor: 'Nome do Autor',
    tema: 'Front-end',
    descricaoCurta: 'Do zero até o primeiro projeto front-end publicado.',
    porQueIndicamos: 'Pega quem terminou os fundamentos e está perdido sobre o próximo passo. Constrói projetos reais e termina com algo no portfólio, não só certificado.',
    preco: 'R$ 127',
    linkAfiliado: 'https://exemplo.com/afiliado/web-do-zero',
    plataforma: 'Udemy',
    categoria: 'comecando',
    destaque: false,
  },
  // SUBSTITUIR — placeholder, dados reais a definir
  {
    slug: 'python-turbo',
    nome: 'Python Turbo',
    autor: 'Nome do Autor',
    tema: 'Python',
    descricaoCurta: 'Python aplicado: automação, APIs e scripts que resolvem problema real.',
    porQueIndicamos: 'Pra quem já programa e quer Python prático — sem voltar ao "Hello World". Direto pra automação e APIs, que é onde a maioria usa Python no dia a dia.',
    preco: 'R$ 197',
    linkAfiliado: 'https://exemplo.com/afiliado/python-turbo',
    plataforma: 'Hotmart',
    categoria: 'dev',
    destaque: false,
  },
]
