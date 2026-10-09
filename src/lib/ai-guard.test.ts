import { beforeEach, describe, expect, it, vi } from "vitest";

const headers: Record<string, string | undefined> = {};
let ip = "203.0.113.1";

vi.mock("@tanstack/react-start/server", () => ({
  getRequestHeader: (name: string) => headers[name.toLowerCase()],
  getRequestIP: () => ip,
}));

async function freshGuard() {
  vi.resetModules();
  return import("@/lib/ai-guard");
}

describe("AI guard", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-10-09T12:00:00Z"));
    for (const k of Object.keys(headers)) delete headers[k];
    headers.host = "rhgo.me";
    headers.origin = "https://rhgo.me";
    ip = "203.0.113.1";
  });

  it("allows a same-origin call", async () => {
    const { guardAiCall } = await freshGuard();
    expect(() => guardAiCall("identify")).not.toThrow();
  });

  it("refuses calls with no Origin or a foreign Origin", async () => {
    const { guardAiCall, AiGuardError } = await freshGuard();
    delete headers.origin;
    expect(() => guardAiCall("clover")).toThrow(AiGuardError);
    headers.origin = "https://evil.example";
    expect(() => guardAiCall("clover")).toThrow(AiGuardError);
  });

  it("enforces the per-minute burst limit per IP", async () => {
    const { guardAiCall } = await freshGuard();
    for (let i = 0; i < 4; i++) guardAiCall("identify");
    expect(() => guardAiCall("identify")).toThrow(/Slow down/);
    ip = "203.0.113.2"; // a different client is unaffected
    expect(() => guardAiCall("identify")).not.toThrow();
  });

  it("enforces the daily budget per IP and resets after 24 hours", async () => {
    const { guardAiCall } = await freshGuard();
    for (let i = 0; i < 25; i++) {
      guardAiCall("identify");
      vi.advanceTimersByTime(61_000);
    }
    expect(() => guardAiCall("identify")).toThrow(/Daily limit/);
    vi.advanceTimersByTime(24 * 60 * 60 * 1000);
    expect(() => guardAiCall("identify")).not.toThrow();
  });

  it("counts each feature separately", async () => {
    const { guardAiCall } = await freshGuard();
    for (let i = 0; i < 4; i++) guardAiCall("identify");
    expect(() => guardAiCall("clover")).not.toThrow();
  });
});
