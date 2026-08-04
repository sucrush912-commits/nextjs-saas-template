import Link from 'next/link'
import { signOut } from '@/app/auth/actions'
import { SiteNav } from '@/components/site-nav'

type AccountShellProps = { email?: string; displayName?: string; children: React.ReactNode }

export function AccountShell({ email, displayName, children }: AccountShellProps) {
  return <><SiteNav /><main className="mx-auto min-h-[calc(100dvh-4rem)] max-w-6xl px-6 py-10"><div className="grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)]"><aside className="h-fit border-b border-border pb-6 lg:sticky lg:top-8 lg:border-b-0"><p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Account</p><h1 className="mt-3 font-serif text-3xl font-medium">{displayName || '{{ACCOUNT_NAME}}'}</h1>{email && <p className="mt-2 truncate text-sm text-muted-foreground">{email}</p>}<nav className="mt-6 grid gap-2"><Link href="/account" className="text-sm underline underline-offset-4">Overview</Link>{/* TODO: add your account routes. */}</nav><form action={signOut} className="mt-6"><button className="text-sm text-muted-foreground underline underline-offset-4">Sign out</button></form></aside><div>{children}</div></div></main></>
}
