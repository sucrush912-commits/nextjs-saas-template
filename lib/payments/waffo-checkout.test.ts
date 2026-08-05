import assert from 'node:assert/strict'
import { configuredWaffoProductIds, safeCheckoutPath } from './waffo-checkout'

assert.deepEqual([...configuredWaffoProductIds(' starter,pro,,starter ')], ['starter', 'pro'])
assert.deepEqual([...configuredWaffoProductIds(undefined)], [])
assert.equal(safeCheckoutPath('/payment/success'), '/payment/success')
assert.equal(safeCheckoutPath('https://untrusted.example'), '/')
