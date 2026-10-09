/**
 * Server-side protection for the paid AI endpoints (xAI).
 * Import ONLY from inside createServerFn handlers.
 *
 * - Same-origin check: browsers always send Origin on these POSTs; scripts
 *   calling from elsewhere (or with no Origin) are refused.
 * - Per-IP limits: a short burst window and a daily budget per endpoint.
 * - Per-instance global ceiling so one instance can't be used to drain quota.
 *
 * Limits live in memory, so they are per server instance. That stops casual
 * and scripted abuse from a single source; a durable, cross-instance limiter
 * needs a shared store (planned with the Supabase move).
 */
import { getRequestHeader, getRequestIP, setResponseStatus } from "@tanstack/react-start/server";
import type { ZodType } from "zod";

export type AiKind = "identify" | "clover" | "speak" | "transcribe";

const LIMITS: Record<AiKind, { perMinute: number; perDay: number }> = {
  identify: { perMinute: 4, perDay: 25 },
  clover: { perMinute: 12, perDay: 200 },
  speak: { perMinute: 12, perDay: 200 },
  transcribe: { perMinute: 12, perDay: 200 },
};
const GLOBAL_PER_MINUTE = 240;
const MINUTE = 60_000;
const DAY = 24 * 60 * MINUTE;
const MAX_KEYS = 20_000;

const hits = new Map<string, number[]>();
let globalHits: number[] = [];

export class AiGuardError extends Error {
  constructor(public readonly userMessage: string) {
    super(userMessage);
  }
}

function sameOrigin(): boolean {
  const origin = getRequestHeader("origin");
  if (!origin) return false;
  const host = getRequestHeader("x-forwarded-host") ?? getRequestHeader("host");
  try {
    return !!host && new URL(origin).host === host.split(",")[0].trim();
  } catch {
    return false;
  }
}

function clientKey(): string {
  try {
    return getRequestIP({ xForwardedFor: true }) ?? "unknown";
  } catch {
    return "unknown";
  }
}

/** Throws AiGuardError when the call must be refused. */
export function guardAiCall(kind: AiKind): void {
  if (!sameOrigin()) throw new AiGuardError("This request isn't allowed.");

  const now = Date.now();
  globalHits = globalHits.filter((t) => now - t < MINUTE);
  if (globalHits.length >= GLOBAL_PER_MINUTE) {
    throw new AiGuardError("The field guide is busy. Try again in a minute.");
  }

  const key = `${kind}:${clientKey()}`;
  const recent = (hits.get(key) ?? []).filter((t) => now - t < DAY);
  const lastMinute = recent.filter((t) => now - t < MINUTE).length;
  const { perMinute, perDay } = LIMITS[kind];
  if (lastMinute >= perMinute) throw new AiGuardError("Slow down a moment, then try again.");
  if (recent.length >= perDay) throw new AiGuardError("Daily limit reached for this feature. It resets tomorrow.");

  recent.push(now);
  if (!hits.has(key) && hits.size >= MAX_KEYS) {
    const oldest = hits.keys().next().value;
    if (oldest !== undefined) hits.delete(oldest);
  }
  hits.set(key, recent);
  globalHits.push(now);
}

export function aiModel(): string {
  return process.env.XAI_MODEL || "grok-4.5";
}

export const AI_TIMEOUT_MS = 25_000;

export type Parsed<T> = { valid: true; value: T } | { valid: false };

/** Validator helper: never throws, so bad input becomes a 400 instead of a 500. */
export function parseInput<T>(schema: ZodType<T>, input: unknown): Parsed<T> {
  const r = schema.safeParse(input);
  return r.success ? { valid: true, value: r.data } : { valid: false };
}

/** Marks the response 400 Bad Request. Call from a handler when input was invalid. */
export function rejectInvalidInput(): void {
  try {
    setResponseStatus(400);
  } catch {
    /* outside a request (tests) */
  }
}
