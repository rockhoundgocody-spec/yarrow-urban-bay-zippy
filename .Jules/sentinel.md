## 2025-09-19 - Prevent Cross-Origin PostMessage Hijacking in `resolveParentEmbedderOrigin`
**Vulnerability:** `resolveParentEmbedderOrigin` unconditionally accepted any parent origin candidate whenever `isSandboxPreviewGuestHost(guestHostname)` returned true. An attacker hosting a malicious site framing `*.grok-sandbox.com` inside an `iframe` could capture sensitive SPA routes and post navigation commands to the guest app.
**Learning:** Origin resolution functions for postMessage bridges must strictly validate parent candidate URLs against explicitly allowlisted origins (`isGrokEmbedderOrigin` / `isRemintPreviewPair`), rather than short-circuiting based solely on the guest's hostname.
**Prevention:** Avoid logical fallback checks (`||`) that return candidate origins solely because a guest domain matches a preview pattern; enforce strict parent origin allowlist checks.

## 2025-09-18 - Prevent DOM XSS via Unsafe Redirect Protocol in `loginUrl`
**Vulnerability:** `redirectToLoginIfRequired` directly passed `loginUrl` to `window.location.assign()` without checking the protocol scheme. If `loginUrl` contained `javascript:` or `data:`, it could result in DOM-based Cross-Site Scripting (XSS).
**Learning:** Client-side redirection handlers that accept dynamic URLs must strictly validate the URL protocol using `URL` parsing rather than trusting `loginUrl` strings.
**Prevention:** Ensure all `window.location` assignment/redirection utilities parse input URLs and enforce `http:` or `https:` protocol checks before navigating.
