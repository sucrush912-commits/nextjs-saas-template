import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

function safeNext(value: string | null) {
  const fallback = process.env.NEXT_PUBLIC_POST_LOGIN_REDIRECT || '/'
  return value?.startsWith('/') && !value.startsWith('//') ? value : fallback.startsWith('/') ? fallback : '/'
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      const next = url.searchParams.get('next')
      return NextResponse.redirect(new URL(next === null ? '/' : safeNext(next), url.origin))
    }
  }
  return NextResponse.redirect(new URL('/login?error=callback', url.origin))
}
