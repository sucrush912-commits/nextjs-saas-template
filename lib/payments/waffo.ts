import 'server-only'

import { WaffoPancake } from '@waffo/pancake-ts'

export type WaffoCheckoutInput = {
  productId: string
  successUrl: string
  currency?: string
  buyerEmail?: string
  merchantExternalId?: string
  metadata?: Record<string, string>
}

export function getWaffoClient() {
  const merchantId = process.env.WAFFO_MERCHANT_ID
  const privateKey = process.env.WAFFO_PRIVATE_KEY
  if (!merchantId || !privateKey) throw new Error('WAFFO_NOT_CONFIGURED')
  return new WaffoPancake({ merchantId, privateKey })
}

export async function createWaffoCheckout(input: WaffoCheckoutInput) {
  const session = await getWaffoClient().checkout.createSession({
    productId: input.productId,
    currency: input.currency || process.env.WAFFO_DEFAULT_CURRENCY || 'USD',
    successUrl: input.successUrl,
    ...(input.buyerEmail ? { buyerEmail: input.buyerEmail } : {}),
    ...(input.merchantExternalId ? { orderMerchantExternalId: input.merchantExternalId } : {}),
    ...(input.metadata ? { metadata: input.metadata } : {}),
  })
  if (!session.sessionId || !session.checkoutUrl) throw new Error('WAFFO_CHECKOUT_FAILED')
  return { id: session.sessionId, checkoutUrl: session.checkoutUrl }
}
