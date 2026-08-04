'use client'

import Link from 'next/link'
import { CircleUserRound } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

type User = { email?: string } | null

export function AccountMenu() {
  const router = useRouter()
  const [user, setUser] = useState<User>(null)
  useEffect(() => { createClient().auth.getUser().then(({ data }) => setUser(data.user)).catch(() => setUser(null)) }, [])
  if (!user) return <div className="flex items-center gap-2"><Link href="/signup" className="text-sm">Register</Link><Link href="/login" className="rounded-md bg-foreground px-3 py-2 text-sm text-background">Sign in</Link></div>
  async function logout() { await createClient().auth.signOut(); setUser(null); router.refresh() }
  return <details className="relative"><summary className="flex cursor-pointer list-none items-center gap-2 rounded-md border border-border px-3 py-2 text-sm"><CircleUserRound className="size-4" />Account</summary><div className="absolute right-0 top-[calc(100%+0.5rem)] w-56 rounded-md border border-border bg-background p-3 shadow-lg"><p className="truncate px-2 py-1 text-sm">{user.email}</p><Link href="/account" className="block rounded px-2 py-2 text-sm hover:bg-muted">Account</Link><button onClick={logout} className="w-full rounded px-2 py-2 text-left text-sm hover:bg-muted">Sign out</button></div></details>
}
