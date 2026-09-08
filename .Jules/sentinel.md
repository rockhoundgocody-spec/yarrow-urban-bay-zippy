## 2025-05-10 - Preview PostMessage Bridge Path Validation Bypass
**Vulnerability:** `isSafeBridgePath` in `src/lib/preview-host-bridge.ts` accepted paths with protocol schemes in the path segment (e.g., `/javascript:alert(1)`, `/http://evil.com`) and null/control bytes because `new URL("/javascript:...", "https://preview.invalid")` inherits the base URL's origin.
**Learning:** Checking `new URL(path, base).origin === base.origin` alone is insufficient when `path` contains scheme prefixes or control characters in relative paths.
**Prevention:** Always validate that relative URL path segments do not contain colons, credentials, or control characters before passing them to client-side routers or history state APIs.
