type FixedWindowRateLimiterOptions = {
  limit: number
  windowMs: number
}

type FixedWindowEntry = {
  count: number
  resetAt: number
}

export function createFixedWindowRateLimiter({ limit, windowMs }: FixedWindowRateLimiterOptions) {
  const entries = new Map<string, FixedWindowEntry>()

  return {
    consume(key: string, now = Date.now()) {
      const entry = entries.get(key)

      if (!entry || now >= entry.resetAt) {
        entries.set(key, { count: 1, resetAt: now + windowMs })
        return true
      }

      if (entry.count >= limit) return false
      entry.count += 1
      return true
    },
  }
}
