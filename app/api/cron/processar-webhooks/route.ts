import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getSupabaseAdmin } from '@/lib/supabase-admin'

export const dynamic = 'force-dynamic'

type Produto = 'boilerplate' | 'components' | 'combo' | 'microsaas'

const PRODUTO_MAP: Record<string, { produto: Produto; nome: string }> = {
  '68680ef0-4728-11f1-a69e-ddf874444b77': { produto: 'boilerplate', nome: 'DevBase Boilerplate' },
  '7eff05b0-4fc5-11f1-b00b-3baa6973ec19': { produto: 'components', nome: 'DevBase Components' },
  '47e01a50-4fda-11f1-ad93-a1ef8c0c7f93': { produto: 'combo',       nome: 'DevBase Boilerplate + Components' },
  '203d3800-532e-11f1-b721-a71d7454cdca': { produto: 'microsaas',   nome: '100 Micro SaaS + 25 Automações' },
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

export async function GET(request: NextRequest) {
  const headerSecret = request.headers.get('authorization')?.replace('Bearer ', '')
  const querySecret = new URL(request.url).searchParams.get('secret')
  if (!process.env.CRON_SECRET || (headerSecret !== process.env.CRON_SECRET && querySecret !== process.env.CRON_SECRET)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = getSupabaseAdmin()

  const { data: pending, error: fetchError } = await supabase
    .from('webhook_queue')
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: true })

  if (fetchError) {
    console.error('[cron] erro ao buscar pending:', fetchError)
    return NextResponse.json({ error: 'DB error' }, { status: 500 })
  }

  const results = { processed: 0, failed: 0, total: pending?.length ?? 0 }
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://devbase.tools'

  for (const item of pending ?? []) {
    try {
      const mapped = PRODUTO_MAP[item.product_id]
      if (!mapped) {
        console.warn(`[cron] produto não reconhecido: ${item.product_id} (order: ${item.order_id})`)
        await supabase
          .from('webhook_queue')
          .update({ status: 'failed', processed_at: new Date().toISOString() })
          .eq('id', item.id)
        results.failed++
        continue
      }

      const { produto, nome: nomeProduto } = mapped

      const { error: dbError } = await supabase
        .from('acessos')
        .upsert({ email: item.customer_email, produto }, { onConflict: 'email', ignoreDuplicates: false })

      if (dbError) throw new Error(`acessos upsert: ${dbError.message}`)

      const { data: linkData, error: linkError } = await supabase.auth.admin.generateLink({
        type: 'magiclink',
        email: item.customer_email,
        options: { redirectTo: `${siteUrl}/acesso` },
      })

      if (linkError || !linkData?.properties?.action_link) {
        throw new Error(`generateLink: ${linkError?.message ?? 'no action_link'}`)
      }

      const magicLink = linkData.properties.action_link

      const resend = new Resend(process.env.RESEND_API_KEY)
      const { error: emailError } = await resend.emails.send({
        from: 'DevBase <contato@devbase.tools>',
        to: item.customer_email,
        replyTo: 'devbasebr@gmail.com',
        subject: `Seu acesso ao ${nomeProduto} está pronto 🎉`,
        html: makeEmailHtml(item.customer_name, nomeProduto, magicLink, siteUrl),
      })

      if (emailError) throw new Error(`resend: ${JSON.stringify(emailError)}`)

      await supabase
        .from('webhook_queue')
        .update({ status: 'processed', processed_at: new Date().toISOString() })
        .eq('id', item.id)

      results.processed++
      console.log(`[cron] processado: ${item.order_id} → ${item.customer_email}`)

    } catch (error) {
      console.error(`[cron] falhou order ${item.order_id}:`, error)
      await supabase
        .from('webhook_queue')
        .update({ status: 'failed', processed_at: new Date().toISOString() })
        .eq('id', item.id)
      results.failed++
    }
  }

  console.log('[cron] resultado:', results)
  return NextResponse.json({ ok: true, ...results })
}
