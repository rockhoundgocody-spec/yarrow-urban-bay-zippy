## 2025-09-18 - Prevent DOM XSS via Unsafe Redirect Protocol in `loginUrl`
**Vulnerability:** `redirectToLoginIfRequired` directly passed `loginUrl` to `window.location.assign()` without checking the protocol scheme. If `loginUrl` contained `javascript:` or `data:`, it could result in DOM-based Cross-Site Scripting (XSS).
**Learning:** Client-side redirection handlers that accept dynamic URLs must strictly validate the URL protocol using `URL` parsing rather than trusting `loginUrl` strings.
**Prevention:** Ensure all `window.location` assignment/redirection utilities parse input URLs and enforce `http:` or `https:` protocol checks before navigating.

## 2026-10-02 - Prevent Open Redirect and DOM XSS via Encoded Slashes and Control Characters in Bridge Navigation
**Vulnerability:** `isSafeBridgePath` in `src/lib/preview-host-bridge.ts` previously checked `!path.startsWith("//")` and `!path.includes("\\")`. However, URL-encoded slashes (`/%2f%2fevil.com`), backslashes (`/%5cevil.com`), or ASCII control characters (`\t`, `\r`, `\n`) passed `path.startsWith("/")`, yet resolved to protocol-relative paths (`//evil.com`) in `new URL()` or when decoded.
**Learning:** Checking raw string prefix `startsWith("//")` is insufficient for paths that may undergo URL parsing or component decoding.
**Prevention:** Validate both `resolved.pathname` and `decodeURIComponent(resolved.pathname)` to ensure they do not begin with `//` or contain `\`, and reject ASCII control characters.
