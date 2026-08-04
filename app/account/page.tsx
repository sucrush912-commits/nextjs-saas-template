import { redirect } from 'next/navigation'
import { AccountShell } from '@/components/account/account-shell'
import { AccountDeletionPanel } from '@/components/account/account-deletion-panel'
import { createClient } from '@/lib/supabase/server'

export const metadata = { robots: { index: false, follow: false } }

export default async function AccountPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login?next=/account')
  const displayName = typeof user.user_metadata?.display_name === 'string' ? user.user_metadata.display_name : user.email?.split('@')[0]
  return <AccountShell email={user.email} displayName={displayName}><p className="text-sm text-muted-foreground">{'{{ACCOUNT_PAGE_CONTENT}}'}</p><AccountDeletionPanel /></AccountShell>
}
