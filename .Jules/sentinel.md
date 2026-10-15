## 2025-09-19 - Prevent Untrusted Parent Frame Embedding in `resolveParentEmbedderOrigin`
**Vulnerability:** `resolveParentEmbedderOrigin` verified `isSandboxPreviewGuestHost(guestHostname)` rather than `isSandboxPreviewGuestHost(url.hostname)`. When a preview app was hosted on `grok-sandbox.com`, any candidate parent origin (e.g. `https://attacker.com`) was accepted as a valid parent embedder origin.
**Learning:** PostMessage origin resolvers must validate the candidate parent origin (`url.hostname`), not the local guest frame hostname (`guestHostname`). Checking guest state instead of candidate origin state allows arbitrary third-party framing.
**Prevention:** Always ensure origin-validation functions pass the external candidate URL's origin or hostname to validator helpers rather than local environment properties.

## 2025-09-18 - Prevent DOM XSS via Unsafe Redirect Protocol in `loginUrl`
**Vulnerability:** `redirectToLoginIfRequired` directly passed `loginUrl` to `window.location.assign()` without checking the protocol scheme. If `loginUrl` contained `javascript:` or `data:`, it could result in DOM-based Cross-Site Scripting (XSS).
**Learning:** Client-side redirection handlers that accept dynamic URLs must strictly validate the URL protocol using `URL` parsing rather than trusting `loginUrl` strings.
**Prevention:** Ensure all `window.location` assignment/redirection utilities parse input URLs and enforce `http:` or `https:` protocol checks before navigating.
