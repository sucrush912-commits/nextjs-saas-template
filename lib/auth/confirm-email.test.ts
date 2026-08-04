import assert from 'node:assert/strict'
import { confirmEmail } from './confirm-email'

const calls: Array<{ token_hash: string; type: 'email' }> = []
const successClient = { auth: { verifyOtp: async (input: { token_hash: string; type: 'email' }) => { calls.push(input); return { error: null } } } }

async function run() {
  assert.equal(await confirmEmail({ supabase: successClient, tokenHash: 'hash-123', type: 'email', next: '/account' }), '/account')
  assert.deepEqual(calls, [{ token_hash: 'hash-123', type: 'email' }])
  assert.equal(await confirmEmail({ supabase: successClient, tokenHash: null, type: 'email', next: '/' }), '/login?error=confirmation')
  assert.equal(await confirmEmail({ supabase: successClient, tokenHash: 'hash-123', type: 'email', next: '//example.com' }), '/')
}

void run()
