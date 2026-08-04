import { verifyWebhook } from '@waffo/pancake-ts'

export type WaffoWebhookEvent = { id?: unknown; timestamp?: unknown; eventType?: unknown; eventId?: unknown; mode?: unknown; data?: Record<string, unknown> }
const stringValue = (value: unknown) => typeof value === 'string' && value.length > 0 ? value : null

export function verifyWaffoWebhook(raw: string, signature: string | null): WaffoWebhookEvent {
  return verifyWebhook(raw, signature) as WaffoWebhookEvent
}

export function normalizeWaffoWebhook(value: WaffoWebhookEvent) {
  return { eventId: stringValue(value.id), businessEventId: stringValue(value.eventId), eventType: stringValue(value.eventType), mode: stringValue(value.mode), occurredAt: stringValue(value.timestamp), data: value.data || {} }
}
