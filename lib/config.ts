/* Variante da entrada do site — troca A/B manual do founder.
   Editar esta linha é a única coisa necessária pra alternar.

   'A' — splash: overlay cobre a página enquanto o cubo se monta grande,
         some em 1.2s. O hero nasce montado (a coreografia da B fica off).
   'B' — sem splash: o cubo se monta no logo da navbar e o hero sobe
         atrás, com a página visível o tempo todo.

   Nas duas, a entrada roda só na home e só na primeira visita da sessão
   (sessionStorage "db_entered", compartilhado — quem viu uma não vê a
   outra na mesma sessão). */
export const ENTRADA_VARIANTE: 'A' | 'B' = 'A'
