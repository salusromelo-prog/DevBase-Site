CREATE TABLE IF NOT EXISTS curso_cliques (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL,
  clicked_at timestamptz DEFAULT now(),
  referrer text,
  user_agent text
);
