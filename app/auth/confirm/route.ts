import { NextResponse } from 'next/server'
import { confirmEmail } from '@/lib/auth/confirm-email'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const redirectTo = await confirmEmail({ supabase: await createClient(), tokenHash: url.searchParams.get('token_hash'), type: url.searchParams.get('type'), next: url.searchParams.get('next') })
  return NextResponse.redirect(new URL(redirectTo, url.origin))
}
