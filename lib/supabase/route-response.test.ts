import assert from 'node:assert/strict'
import { NextResponse } from 'next/server'
import { applySupabaseCookies } from './route-response'

const response = NextResponse.redirect(new URL('http://localhost:3413/'))

applySupabaseCookies(response, [{ name: 'sb-test-auth-token', value: 'session-token', options: { path: '/', sameSite: 'lax' } }], { 'Cache-Control': 'private, no-store' })

assert.equal(response.cookies.get('sb-test-auth-token')?.value, 'session-token')
assert.equal(response.headers.get('Cache-Control'), 'private, no-store')
