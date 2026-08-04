'use client'

import { useState } from 'react'

export function AccountDeletionPanel({ onDelete }: { onDelete?: () => Promise<void> }) {
  const [confirmed, setConfirmed] = useState(false)
  const [status, setStatus] = useState('')
  async function requestDeletion() {
    if (!onDelete) { setStatus('{{ACCOUNT_DELETION_NOTICE}}'); return }
    await onDelete(); setStatus('Account deletion requested.')
  }
  return <section className="mt-10 border border-border p-6"><h2 className="font-serif text-2xl">Delete account</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">{'{{ACCOUNT_DELETION_DESCRIPTION}}'}</p><label className="mt-5 flex gap-2 text-sm"><input type="checkbox" checked={confirmed} onChange={(event) => setConfirmed(event.target.checked)} />I understand this action cannot be undone.</label><button type="button" disabled={!confirmed} onClick={requestDeletion} className="mt-5 rounded-md border border-border px-4 py-2 text-sm disabled:opacity-50">Request deletion</button>{status && <p className="mt-3 text-sm text-muted-foreground">{status}</p>}</section>
}
