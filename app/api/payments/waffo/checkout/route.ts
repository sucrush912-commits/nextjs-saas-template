import { NextResponse } from 'next/server'
import { createWaffoCheckout } from '@/lib/payments/waffo'
import { configuredWaffoProductIds, safeCheckoutPath } from '@/lib/payments/waffo-checkout'
import { createFixedWindowRateLimiter } from '@/lib/security/rate-limit'
import { createClient } from '@/lib/supabase/server'

const checkoutRateLimiter = createFixedWindowRateLimiter({ limit: 5, windowMs: 60_000 })

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'AUTHENTICATION_REQUIRED' }, { status: 401 })

  if (!checkoutRateLimiter.consume(user.id)) {
    return NextResponse.json({ error: 'TOO_MANY_REQUESTS' }, { status: 429 })
  }

  const body = await request.json().catch(() => null)
  if (typeof body?.productId !== 'string' || !body.productId.trim()) return NextResponse.json({ error: 'INVALID_PRODUCT_ID' }, { status: 400 })
  const allowedProductIds = configuredWaffoProductIds(process.env.WAFFO_ALLOWED_PRODUCT_IDS)
  if (!allowedProductIds.size) return NextResponse.json({ error: 'CHECKOUT_NOT_CONFIGURED' }, { status: 503 })
  if (!allowedProductIds.has(body.productId)) return NextResponse.json({ error: 'INVALID_PRODUCT_ID' }, { status: 400 })

  const successPath = safeCheckoutPath(body.successPath)
  try {
    const checkout = await createWaffoCheckout({ productId: body.productId, successUrl: new URL(successPath, request.url).toString(), buyerEmail: user.email })
    return NextResponse.json({ checkoutUrl: checkout.checkoutUrl, sessionId: checkout.id })
  } catch {
    return NextResponse.json({ error: 'CHECKOUT_UNAVAILABLE' }, { status: 502 })
  }
}
