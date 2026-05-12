import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json() as { email: string }
  console.log('[newsletter]', body.email)
  return Response.json({ ok: true })
}
