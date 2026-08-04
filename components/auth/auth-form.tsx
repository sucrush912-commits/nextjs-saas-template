'use client'

import Link from 'next/link'
import { useActionState } from 'react'
import { signIn, signUp, type AuthActionState } from '@/app/auth/actions'

const initialState: AuthActionState = {}

export function AuthForm({ mode, next }: { mode: 'login' | 'signup'; next?: string }) {
  const [state, action, pending] = useActionState(mode === 'login' ? signIn : signUp, initialState)
  const isSignup = mode === 'signup'
  return <form action={action} className="grid gap-4"><input type="hidden" name="next" value={next || ''} />{isSignup && <label className="grid gap-1 text-sm">Name<input name="displayName" autoComplete="name" className="rounded-md border border-border bg-background px-3 py-2" /></label>}<label className="grid gap-1 text-sm">Email<input required name="email" type="email" autoComplete="email" className="rounded-md border border-border bg-background px-3 py-2" /></label><label className="grid gap-1 text-sm">Password<input required name="password" type="password" minLength={8} autoComplete={isSignup ? 'new-password' : 'current-password'} className="rounded-md border border-border bg-background px-3 py-2" /></label>{state.error && <p className="text-sm text-red-700">{state.error}</p>}{state.message && <p className="text-sm text-emerald-700">{state.message}</p>}<button disabled={pending} className="rounded-md bg-foreground px-4 py-2 text-sm text-background disabled:opacity-60">{pending ? 'Working…' : isSignup ? 'Create account' : 'Sign in'}</button><p className="text-sm text-muted-foreground">{isSignup ? 'Already have an account?' : 'Need an account?'} <Link className="underline" href={isSignup ? '/login' : '/signup'}>{isSignup ? 'Sign in' : 'Create one'}</Link></p></form>
}
