import type { CookieOptions } from '@supabase/ssr'
import { NextResponse } from 'next/server'

type SupabaseCookie = { name: string; value: string; options: CookieOptions }

export function applySupabaseCookies(response: NextResponse, cookiesToSet: SupabaseCookie[], headers: Record<string, string>) {
  cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
  Object.entries(headers).forEach(([name, value]) => response.headers.set(name, value))
}
