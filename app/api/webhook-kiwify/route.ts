import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase-admin'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const token = url.searchParams.get('token')

    if (!process.env.KIWIFY_TOKEN || token !== process.env.KIWIFY_TOKEN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body: any = await request.json()

    const { webhook_event_type, order_status, order_id, Product, Customer } = body

    if (webhook_event_type !== 'order_approved' || order_status !== 'paid') {
      return NextResponse.json({ ok: true })
    }

    const supabase = getSupabaseAdmin()

    // upsert ignora duplicatas — Kiwify pode reenviar o mesmo webhook
    const { error } = await supabase.from('webhook_queue').upsert(
      {
        order_id,
        product_id: Product?.product_id ?? '',
        customer_email: Customer?.email ?? '',
        customer_name: Customer?.full_name ?? '',
        raw_payload: body,
        status: 'pending',
      },
      { onConflict: 'order_id', ignoreDuplicates: true }
    )

    if (error) {
      console.error('[webhook-kiwify] DB error:', error)
      return NextResponse.json({ error: 'DB error' }, { status: 500 })
    }

    console.log(`[webhook-kiwify] enfileirado: ${order_id} (${Customer?.email})`)
    return NextResponse.json({ ok: true })

  } catch (error) {
    console.error('[webhook-kiwify] erro:', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
