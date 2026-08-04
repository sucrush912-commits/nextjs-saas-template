import { NextResponse } from 'next/server'
import { createWaffoCheckout } from '@/lib/payments/waffo'
import { safeCheckoutPath, stringMetadata } from '@/lib/payments/waffo-checkout'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  if (typeof body?.productId !== 'string' || !body.productId.trim()) return NextResponse.json({ error: 'INVALID_PRODUCT_ID' }, { status: 400 })
  const successPath = safeCheckoutPath(body.successPath)
  try {
    const checkout = await createWaffoCheckout({ productId: body.productId, successUrl: new URL(successPath, request.url).toString(), buyerEmail: typeof body.buyerEmail === 'string' ? body.buyerEmail : undefined, merchantExternalId: typeof body.merchantExternalId === 'string' ? body.merchantExternalId : undefined, metadata: stringMetadata(body.metadata) })
    return NextResponse.json({ checkoutUrl: checkout.checkoutUrl, sessionId: checkout.id })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'CHECKOUT_FAILED' }, { status: 502 })
  }
}
