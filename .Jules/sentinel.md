## 2026-09-26 - Validate Parent Hostname in Embedder Origin Resolution
**Vulnerability:** `resolveParentEmbedderOrigin` accepted any candidate referrer/ancestor origin as a parent origin if the guest was on a sandbox preview host (`grok-sandbox.com`), because it only checked `isSandboxPreviewGuestHost(guestHostname)` rather than validating `isSandboxPreviewGuestHost(url.hostname)` as well.
**Learning:** Cross-document communication checks that establish parent origin trust based on iframe embedding context must validate both the guest AND parent hostnames against the trusted domain pattern.
**Prevention:** Always verify both guest and parent hostnames when validating iframe embedder origins for `postMessage` security boundaries.

## 2025-09-18 - Prevent DOM XSS via Unsafe Redirect Protocol in `loginUrl`
**Vulnerability:** `redirectToLoginIfRequired` directly passed `loginUrl` to `window.location.assign()` without checking the protocol scheme. If `loginUrl` contained `javascript:` or `data:`, it could result in DOM-based Cross-Site Scripting (XSS).
**Learning:** Client-side redirection handlers that accept dynamic URLs must strictly validate the URL protocol using `URL` parsing rather than trusting `loginUrl` strings.
**Prevention:** Ensure all `window.location` assignment/redirection utilities parse input URLs and enforce `http:` or `https:` protocol checks before navigating.
