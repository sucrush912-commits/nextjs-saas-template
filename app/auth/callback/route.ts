import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { applySupabaseCookies } from '@/lib/supabase/route-response'

function safeNext(value: string | null) {
  const fallback = process.env.NEXT_PUBLIC_POST_LOGIN_REDIRECT || '/'
  return value?.startsWith('/') && !value.startsWith('//') ? value : fallback.startsWith('/') ? fallback : '/'
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  if (code) {
    const next = url.searchParams.get('next')
    const response = NextResponse.redirect(new URL(next === null ? '/' : safeNext(next), url.origin))
    let cookieCount = 0
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        cookies: {
          getAll: () => request.cookies.getAll(),
          setAll: (cookiesToSet, headers) => {
            cookieCount = cookiesToSet.length
            applySupabaseCookies(response, cookiesToSet, headers)
          },
        },
      }
    )
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      console.info('[auth callback]', { sessionCreated: Boolean(data.session), cookieCount })
      return response
    }
  }
  return NextResponse.redirect(new URL('/login?error=callback', url.origin))
}
