/**
 * One source of truth for response security headers.
 * - Dev server: applied by `securityHeadersPlugin()` in vite.config.ts.
 * - Production (Nitro → Vercel): applied via Nitro `routeRules`, which Vercel
 *   honours for static assets and server-rendered pages alike.
 *
 * script-src keeps 'unsafe-inline' because TanStack Start streams inline
 * hydration scripts; everything else is locked to first-party plus the few
 * hosts the app actually loads from (Google Fonts).
 */

/** Origins allowed to frame the app. Production: same-origin only. */
const DEV_FRAME_ANCESTORS = ["'self'", "https://*.base44.com", "https://*.base44.app"];

export function contentSecurityPolicy({ dev = false } = {}) {
  const directives = {
    "default-src": ["'self'"],
    "script-src": ["'self'", "'unsafe-inline'"],
    "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
    "font-src": ["'self'", "data:", "https://fonts.gstatic.com"],
    "img-src": ["'self'", "data:", "blob:"],
    "media-src": ["'self'", "data:", "blob:"],
    "connect-src": ["'self'", ...(dev ? ["ws:", "wss:"] : [])],
    "worker-src": ["'self'", "blob:"],
    "manifest-src": ["'self'"],
    "frame-src": ["'none'"],
    "object-src": ["'none'"],
    "base-uri": ["'self'"],
    "form-action": ["'self'"],
    "frame-ancestors": dev ? DEV_FRAME_ANCESTORS : ["'self'"],
  };
  const parts = Object.entries(directives).map(([k, v]) => `${k} ${v.join(" ")}`);
  if (!dev) parts.push("upgrade-insecure-requests");
  return parts.join("; ");
}

export function securityHeaders({ dev = false } = {}) {
  const headers = {
    "Content-Security-Policy": contentSecurityPolicy({ dev }),
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(self), microphone=(self), geolocation=(self), payment=(), usb=()",
    "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
  };
  if (!dev) {
    // Legacy clickjacking guard for browsers without frame-ancestors support.
    headers["X-Frame-Options"] = "SAMEORIGIN";
    headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains";
  }
  return headers;
}

/** Vite dev-server plugin: set headers on every response. */
export function securityHeadersPlugin() {
  const headers = securityHeaders({ dev: true });
  return {
    name: "rhgo:security-headers",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use((_req, res, next) => {
        for (const [k, v] of Object.entries(headers)) res.setHeader(k, v);
        next();
      });
    },
  };
}
