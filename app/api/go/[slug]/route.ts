import { NextRequest, NextResponse } from 'next/server'
import { cursos } from '@/data/cursos'
import { getSupabaseAdmin } from '@/lib/supabase-admin'

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const curso = cursos.find(c => c.slug === slug)

  if (!curso) {
    return NextResponse.redirect(new URL('/cursos', request.url))
  }

  try {
    const supabaseAdmin = getSupabaseAdmin()
    const { error } = await supabaseAdmin.from('curso_cliques').insert({
      slug: curso.slug,
      referrer: request.headers.get('referer'),
      user_agent: request.headers.get('user-agent'),
    })
    if (error) console.error('[go] erro ao registrar clique:', error)
  } catch (error) {
    console.error('[go] erro ao registrar clique:', error)
  }

  return NextResponse.redirect(curso.linkAfiliado, 307)
}
