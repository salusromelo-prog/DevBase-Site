import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json() as { chips: string[]; texto: string; email?: string }
  console.log('[sugestao]', body)
  return Response.json({ ok: true })
}
