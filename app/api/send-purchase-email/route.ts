import { NextRequest } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const BOILERPLATE_HTML = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Seu DevBase Boilerplate está pronto</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:'Segoe UI',Arial,sans-serif;color:#ffffff;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <span style="font-size:20px;font-weight:700;letter-spacing:-0.5px;color:#ffffff;">
                Dev<span style="color:#6366f1;">Base</span>
              </span>
            </td>
          </tr>

          <!-- Card principal -->
          <tr>
            <td style="background:#111111;border:1px solid #27272a;border-radius:12px;padding:40px 36px;">

              <!-- Ícone de check -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding-bottom:24px;">
                    <div style="width:52px;height:52px;border-radius:50%;background:rgba(34,197,94,0.08);border:1px solid rgba(34,197,94,0.2);display:inline-flex;align-items:center;justify-content:center;text-align:center;line-height:52px;font-size:24px;">
                      ✓
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Título -->
              <h1 style="margin:0 0 12px;font-size:26px;font-weight:700;letter-spacing:-0.8px;text-align:center;color:#ffffff;">
                Compra confirmada!
              </h1>

              <!-- Subtítulo -->
              <p style="margin:0 0 32px;font-size:15px;color:#a1a1aa;text-align:center;line-height:1.6;">
                Obrigado pela compra do DevBase Boilerplate. Clique no botão abaixo para baixar seu código.
              </p>

              <!-- Botão de download -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding-bottom:36px;">
                    <a
                      href="https://drive.google.com/uc?export=download&id=18JQJQJHe3nMjAwnpq4Chny2jJmR5S7wd"
                      style="display:inline-block;background:#6366f1;color:#ffffff;text-decoration:none;font-size:15px;font-weight:600;padding:14px 32px;border-radius:8px;letter-spacing:-0.2px;"
                    >
                      Baixar Boilerplate
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Divisor -->
              <hr style="border:none;border-top:1px solid #27272a;margin:0 0 28px;" />

              <!-- Instruções -->
              <p style="margin:0 0 14px;font-size:11px;font-family:monospace;letter-spacing:0.1em;color:#6366f1;text-transform:uppercase;">
                // como começar
              </p>
              <ol style="margin:0;padding:0 0 0 18px;color:#a1a1aa;font-size:13px;line-height:1.9;">
                <li>Clique em "Baixar Boilerplate" acima — o download começa automaticamente</li>
                <li>Extraia o arquivo ZIP em uma pasta do seu projeto</li>
                <li>Copie o arquivo .env.example para .env.local e preencha suas chaves</li>
                <li>Rode <code style="background:#1a1a1a;padding:1px 5px;border-radius:3px;font-size:12px;">npm install</code> e depois <code style="background:#1a1a1a;padding:1px 5px;border-radius:3px;font-size:12px;">npm run dev</code></li>
                <li>Acesse http://localhost:3000 — seu SaaS está no ar</li>
                <li>Personalize à vontade — o código é todo seu</li>
              </ol>

            </td>
          </tr>

          <!-- Rodapé -->
          <tr>
            <td align="center" style="padding-top:28px;">
              <p style="margin:0;font-size:12px;color:#52525b;">
                DevBase — Ferramentas para devs brasileiros |
                <a href="https://devbase.tools" style="color:#52525b;text-decoration:underline;">devbase.tools</a>
              </p>
              <p style="margin:6px 0 0;font-size:11px;color:#3f3f46;">
                Dúvidas? Fale com a gente em
                <a href="mailto:contato@devbase.tools" style="color:#3f3f46;text-decoration:underline;">contato@devbase.tools</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`

export async function POST(request: NextRequest) {
  const body = await request.json() as { email: string; produto: string }
  const { email, produto } = body

  if (!email || !produto) {
    return Response.json({ error: 'email e produto são obrigatórios' }, { status: 400 })
  }

  if (produto !== 'boilerplate') {
    return Response.json({ error: 'produto não suportado' }, { status: 400 })
  }

  const { error } = await resend.emails.send({
    from: 'DevBase <contato@devbase.tools>',
    to: email,
    subject: 'Seu DevBase Boilerplate está pronto 🚀',
    html: BOILERPLATE_HTML,
  })

  if (error) {
    console.error('[send-purchase-email] Resend error:', error)
    return Response.json({ error: 'falha ao enviar email' }, { status: 500 })
  }

  return Response.json({ ok: true })
}
