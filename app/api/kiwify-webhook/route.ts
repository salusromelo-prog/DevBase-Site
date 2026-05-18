import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { supabaseAdmin } from '@/lib/supabase-admin'

const resend = new Resend(process.env.RESEND_API_KEY)

type Produto = 'boilerplate' | 'components' | 'combo'

const PRODUTO_MAP: Record<string, { produto: Produto; nome: string }> = {
  '68680ef0-4728-11f1-a69e-ddf874444b77': { produto: 'boilerplate', nome: 'DevBase Boilerplate' },
  '7eff05b0-4fc5-11f1-b00b-3baa6973ec19': { produto: 'components', nome: 'DevBase Components' },
  '47e01a50-4fda-11f1-ad93-a1ef8c0c7f93': { produto: 'combo',       nome: 'DevBase Boilerplate + Components' },
}

function makeEmailHtml(nome: string, nomeProduto: string, magicLink: string, siteUrl: string): string {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Seu acesso ao ${nomeProduto}</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:Inter,'Segoe UI',Arial,sans-serif;color:#e5e7eb;">
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

              <p style="margin:0 0 8px;font-size:16px;color:#e5e7eb;line-height:1.6;">
                Olá, ${nome}!
              </p>

              <p style="margin:0 0 28px;font-size:15px;color:#9ca3af;line-height:1.7;">
                Sua compra do <strong style="color:#e5e7eb;">${nomeProduto}</strong> foi confirmada.
                Clique no botão abaixo para acessar sua plataforma.
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

              <p style="margin:0 0 0;font-size:12px;color:#6b7280;text-align:center;line-height:1.7;">
                O link expira em 1 hora. Se precisar de um novo link, acesse
                <a href="${siteUrl}/acesso/login" style="color:#a5b4fc;text-decoration:none;">${siteUrl}/acesso/login</a>
              </p>

            </td>
          </tr>

          <tr>
            <td align="center" style="padding-top:28px;">
              <p style="margin:0;font-size:12px;color:#52525b;">
                DevBase — feito no Brasil 🇧🇷 |
                <a href="${siteUrl}" style="color:#52525b;text-decoration:underline;">${siteUrl}</a>
              </p>
              <p style="margin:6px 0 0;font-size:11px;color:#3f3f46;">
                Dúvidas? <a href="mailto:devbasebr@gmail.com" style="color:#3f3f46;text-decoration:underline;">devbasebr@gmail.com</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

export async function POST(request: NextRequest) {
  // ── Auth ──────────────────────────────────────────────────────────────────
  const url = new URL(request.url)
  const token = url.searchParams.get('token')

  if (process.env.KIWIFY_TOKEN && token !== process.env.KIWIFY_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: Record<string, unknown>
  try {
    body = await request.json() as Record<string, unknown>
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  console.log('[kiwify-webhook] Webhook recebido')

  // ── Status — só processa compras aprovadas ────────────────────────────────
  const orderStatus = (body.order_status ?? body.status) as string | undefined
  if (orderStatus !== 'paid' && orderStatus !== 'approved') {
    console.log(`[kiwify-webhook] Status ignorado: ${orderStatus}`)
    return Response.json({ ok: true })
  }

  // ── Produto ───────────────────────────────────────────────────────────────
  const product = body.product as Record<string, string> | undefined
  const productId = product?.id ?? product?.product_id ?? ''
  const mapped = PRODUTO_MAP[productId]

  if (!mapped) {
    console.log('[kiwify-webhook] Produto não reconhecido. Payload completo:', JSON.stringify(body))
    return Response.json({ ok: true })
  }

  const { produto, nome: nomeProduto } = mapped
  console.log(`[kiwify-webhook] Produto identificado: ${nomeProduto}`)

  // ── Email do comprador (Kiwify usa Customer com C maiúsculo) ──────────────
  const customer = (body.Customer ?? body.customer) as Record<string, string> | undefined
  const email = customer?.email ?? (body.buyer as Record<string, string> | undefined)?.email

  if (!email) {
    console.error('[kiwify-webhook] Email não encontrado no payload:', JSON.stringify(body))
    return Response.json({ error: 'email não encontrado no payload' }, { status: 400 })
  }

  const customerName = customer?.name ?? customer?.full_name ?? email.split('@')[0]

  // ── a) Upsert na tabela acessos ───────────────────────────────────────────
  const { error: dbError } = await supabaseAdmin
    .from('acessos')
    .upsert({ email, produto }, { onConflict: 'email', ignoreDuplicates: false })

  if (dbError) {
    console.error('[kiwify-webhook] Supabase error:', dbError)
    return Response.json({ error: 'Erro ao registrar acesso' }, { status: 500 })
  }

  console.log(`[kiwify-webhook] Acesso criado para email ${email}`)

  // ── b) Gera magic link ────────────────────────────────────────────────────
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://devbase.tools'

  const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
    type: 'magiclink',
    email,
    options: { redirectTo: `${siteUrl}/acesso` },
  })

  if (linkError || !linkData?.properties?.action_link) {
    console.error('[kiwify-webhook] generateLink error:', linkError)
    return Response.json({ error: 'Erro ao gerar magic link' }, { status: 500 })
  }

  const magicLink = linkData.properties.action_link

  // ── c) Envia email via Resend ─────────────────────────────────────────────
  const { error: emailError } = await resend.emails.send({
    from: 'DevBase <contato@devbase.tools>',
    to: email,
    replyTo: 'devbasebr@gmail.com',
    subject: `Seu acesso ao ${nomeProduto} está pronto 🎉`,
    html: makeEmailHtml(customerName, nomeProduto, magicLink, siteUrl),
  })

  if (emailError) {
    console.error('[kiwify-webhook] Resend error:', emailError)
    return Response.json({ error: 'Falha ao enviar email' }, { status: 500 })
  }

  console.log('[kiwify-webhook] Email enviado')

  return Response.json({ ok: true })
}
