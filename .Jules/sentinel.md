## 2025-09-18 - Prevent DOM XSS via Unsafe Redirect Protocol in `loginUrl`
**Vulnerability:** `redirectToLoginIfRequired` directly passed `loginUrl` to `window.location.assign()` without checking the protocol scheme. If `loginUrl` contained `javascript:` or `data:`, it could result in DOM-based Cross-Site Scripting (XSS).
**Learning:** Client-side redirection handlers that accept dynamic URLs must strictly validate the URL protocol using `URL` parsing rather than trusting `loginUrl` strings.
**Prevention:** Ensure all `window.location` assignment/redirection utilities parse input URLs and enforce `http:` or `https:` protocol checks before navigating.

## 2026-03-31 - Fix Cross-Origin postMessage Bridge Bypass in `resolveParentEmbedderOrigin`
**Vulnerability:** `resolveParentEmbedderOrigin` evaluated `isSandboxPreviewGuestHost(guestHostname)` instead of `isSandboxPreviewGuestHost(url.hostname)`. When embedded on a `*.grok-sandbox.com` host, any arbitrary parent frame origin (e.g., `https://evil.com`) was accepted as a valid parent embedder origin for postMessage bridge communication.
**Learning:** Origin resolution functions must validate candidate parent/referrer `URL` properties rather than checking current guest window properties when determining if the candidate frame is trusted.
**Prevention:** Always pass the candidate URL's `hostname` to host allowlist checkers when resolving frame embedder origins.
