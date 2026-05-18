CREATE TABLE IF NOT EXISTS acessos (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL UNIQUE,
  produto text NOT NULL DEFAULT 'boilerplate',
  criado_em timestamptz DEFAULT now(),
  ultimo_acesso timestamptz,
  progresso jsonb DEFAULT '{}'::jsonb
);

ALTER TABLE acessos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuario ve proprio acesso" ON acessos FOR SELECT USING (email = auth.email());
CREATE POLICY "Usuario atualiza proprio acesso" ON acessos FOR UPDATE USING (email = auth.email());
