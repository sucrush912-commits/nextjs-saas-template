'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export type AuthActionState = { error?: string; message?: string; email?: string }

function postLoginRedirect() {
  const configured = process.env.NEXT_PUBLIC_POST_LOGIN_REDIRECT || '/'
  return configured.startsWith('/') && !configured.startsWith('//') ? configured : '/'
}

function safeNext(value: FormDataEntryValue | null) {
  return typeof value === 'string' && value.startsWith('/') && !value.startsWith('//') ? value : postLoginRedirect()
}

export async function signIn(_state: AuthActionState, formData: FormData): Promise<AuthActionState> {
  const supabase = await createClient()
  const email = String(formData.get('email') || '').trim()
  const password = String(formData.get('password') || '')
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return { error: 'Email or password is incorrect.' }
  redirect(safeNext(formData.get('next')))
}

export async function signUp(_state: AuthActionState, formData: FormData): Promise<AuthActionState> {
  const supabase = await createClient()
  const email = String(formData.get('email') || '').trim()
  const password = String(formData.get('password') || '')
  const displayName = String(formData.get('displayName') || '').trim()
  const next = safeNext(formData.get('next'))
  if (password.length < 8) return { error: 'Password must contain at least 8 characters.' }
  const origin = (await headers()).get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { display_name: displayName }, emailRedirectTo: `${origin}/auth/callback?next=${encodeURIComponent(next)}` } })
  if (error) return { error: error.message }
  if (data.session) redirect(next)
  return { email, message: 'Check your email to confirm your account.' }
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect(postLoginRedirect())
}
