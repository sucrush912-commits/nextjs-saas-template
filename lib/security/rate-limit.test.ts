import assert from 'node:assert/strict'
import { createFixedWindowRateLimiter } from './rate-limit'

const limiter = createFixedWindowRateLimiter({ limit: 2, windowMs: 1_000 })

assert.equal(limiter.consume('user-1', 0), true)
assert.equal(limiter.consume('user-1', 100), true)
assert.equal(limiter.consume('user-1', 200), false)
assert.equal(limiter.consume('user-1', 1_001), true)
