import { NextResponse } from 'next/server'
import { normalizeWaffoWebhook, verifyWaffoWebhook } from '@/lib/payments/waffo-webhook'

export async function POST(request: Request) {
  const raw = await request.text()
  try {
    const event = verifyWaffoWebhook(raw, request.headers.get('x-waffo-signature'))
    const normalized = normalizeWaffoWebhook(event)
    if (!normalized.eventId || !normalized.eventType) return NextResponse.json({ error: 'INVALID_EVENT' }, { status: 400 })
    // TODO: pass the verified event to your business-layer fulfillment handler.
    return NextResponse.json({ received: true })
  } catch {
    return NextResponse.json({ error: 'INVALID_SIGNATURE' }, { status: 401 })
  }
}
