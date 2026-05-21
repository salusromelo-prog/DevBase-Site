import { NextRequest } from 'next/server'
import { Resend } from 'resend'
import { getSupabaseAdmin } from '@/lib/supabase-admin'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  const supabaseAdmin = getSupabaseAdmin()
  let body: { email?: string }
  try {
    body = await request.json() as { email?: string }
  } catch {
    return Response.json({ error: 'JSON inválido' }, { status: 400 })
  }

  const { email } = body
  if (!email) {
    return Response.json({ error: 'email é obrigatório' }, { status: 400 })
  }

  const { data: acesso } = await supabaseAdmin
    .from('acessos')
    .select('id')
    .eq('email', email)
    .single()

  if (!acesso) {
    return Response.json({ error: 'Acesso não encontrado para este email' }, { status: 404 })
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
    type: 'magiclink',
    email,
    options: { redirectTo: `${siteUrl}/acesso` },
  })

  if (linkError || !linkData?.properties?.action_link) {
    console.error('[send-access-email] generateLink error:', linkError)
    return Response.json({ error: 'Erro ao gerar link de acesso' }, { status: 500 })
  }

  const magicLink = linkData.properties.action_link

  const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Seu acesso ao DevBase Boilerplate</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:'Segoe UI',Arial,sans-serif;color:#ffffff;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

          <tr>
            <td align="center" style="padding-bottom:32px;">
              <span style="font-size:20px;font-weight:700;letter-spacing:-0.5px;color:#ffffff;">
                Dev<span style="color:#6366f1;">Base</span>
              </span>
            </td>
          </tr>

          <tr>
            <td style="background:#111111;border:1px solid #27272a;border-radius:12px;padding:40px 36px;">

              <h1 style="margin:0 0 16px;font-size:24px;font-weight:700;letter-spacing:-0.8px;text-align:center;color:#ffffff;">
                Seu acesso ao DevBase Boilerplate
              </h1>

              <p style="margin:0 0 32px;font-size:15px;color:#a1a1aa;text-align:center;line-height:1.6;">
                Clique no botão abaixo para acessar sua plataforma.
                O link expira em 1 hora.
              </p>

              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding-bottom:32px;">
                    <a
                      href="${magicLink}"
                      style="display:inline-block;background:#6366f1;color:#ffffff;text-decoration:none;font-size:15px;font-weight:600;padding:14px 32px;border-radius:8px;letter-spacing:-0.2px;"
                    >
                      Acessar agora →
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0;font-size:12px;color:#52525b;text-align:center;line-height:1.6;">
                Se você não solicitou este link, ignore este email com segurança.
              </p>

            </td>
          </tr>

          <tr>
            <td align="center" style="padding-top:28px;">
              <p style="margin:0;font-size:12px;color:#52525b;">
                DevBase — Ferramentas para devs brasileiros |
                <a href="https://devbase.tools" style="color:#52525b;text-decoration:underline;">devbase.tools</a>
              </p>
              <p style="margin:6px 0 0;font-size:11px;color:#3f3f46;">
                Dúvidas? Fale com a gente em
                <a href="mailto:devbasebr@gmail.com" style="color:#3f3f46;text-decoration:underline;">devbasebr@gmail.com</a>
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

  const { error: emailError } = await resend.emails.send({
    from: 'DevBase <contato@devbase.tools>',
    to: email,
    replyTo: 'devbasebr@gmail.com',
    subject: 'Seu acesso ao DevBase Boilerplate',
    html,
  })

  if (emailError) {
    console.error('[send-access-email] Resend error:', emailError)
    return Response.json({ error: 'Falha ao enviar email' }, { status: 500 })
  }

  return Response.json({ ok: true })
}
