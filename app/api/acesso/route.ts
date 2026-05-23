import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getSupabaseAdmin } from '@/lib/supabase-admin'

export async function POST(request: NextRequest) {
  try {
    const { email, nome, produto_id } = await request.json()

    console.log('[acesso] recebido:', { email, nome, produto_id })

    if (!email) return NextResponse.json({ error: 'email obrigatório' }, { status: 400 })

    const supabaseAdmin = getSupabaseAdmin()

    const PRODUTO_MAP: Record<string, string> = {
      '68680ef0-4728-11f1-a69e-ddf874444b77': 'boilerplate',
      '7eff05b0-4fc5-11f1-b00b-3baa6973ec19': 'components',
      '47e01a50-4fda-11f1-ad93-a1ef8c0c7f93': 'combo',
      '203d3800-532e-11f1-b721-a71d7454cdca': 'microsaas',
    }

    const produto = PRODUTO_MAP[produto_id] || 'microsaas'

    await supabaseAdmin.from('acessos').upsert({ email, produto }, { onConflict: 'email' })

    const { data: linkData } = await supabaseAdmin.auth.admin.generateLink({
      type: 'magiclink',
      email,
      options: { redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/acesso` }
    })

    const magicLink = linkData?.properties?.action_link
    if (!magicLink) return NextResponse.json({ error: 'erro ao gerar link' }, { status: 500 })

    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: 'DevBase <contato@devbase.tools>',
      to: email,
      subject: 'Seu acesso DevBase está pronto 🎉',
      html: `<p>Olá ${nome || ''},</p><p>Clique para acessar: <a href="${magicLink}">${magicLink}</a></p>`
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[acesso] erro:', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
