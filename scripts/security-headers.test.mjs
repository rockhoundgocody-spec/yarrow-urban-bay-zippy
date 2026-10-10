import { describe, expect, it } from "vitest";
import { contentSecurityPolicy, securityHeaders } from "./security-headers.mjs";

const directive = (csp, name) => csp.split("; ").find((d) => d.startsWith(`${name} `)) ?? "";

describe("security headers", () => {
  it("production blocks framing, objects and foreign scripts", () => {
    const csp = contentSecurityPolicy({ dev: false });
    expect(directive(csp, "frame-ancestors")).toBe("frame-ancestors 'self'");
    expect(directive(csp, "object-src")).toBe("object-src 'none'");
    expect(directive(csp, "script-src")).toBe("script-src 'self' 'unsafe-inline'");
    expect(csp).toContain("upgrade-insecure-requests");
    expect(csp).not.toMatch(/grok/);
  });

  it("production sends clickjacking, HSTS and nosniff headers", () => {
    const h = securityHeaders({ dev: false });
    expect(h["X-Frame-Options"]).toBe("SAMEORIGIN");
    expect(h["Strict-Transport-Security"]).toMatch(/max-age=31536000/);
    expect(h["X-Content-Type-Options"]).toBe("nosniff");
    expect(h["Permissions-Policy"]).toMatch(/camera=\(self\)/);
  });

  it("dev allows HMR websockets but no HSTS", () => {
    const h = securityHeaders({ dev: true });
    expect(directive(h["Content-Security-Policy"], "connect-src")).toContain("ws:");
    expect(h["Strict-Transport-Security"]).toBeUndefined();
  });
});
