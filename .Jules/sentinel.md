## 2025-09-19 - Strict Parent Embedder Origin Validation in `resolveParentEmbedderOrigin`
**Vulnerability:** `resolveParentEmbedderOrigin` previously returned candidate origins without origin validation whenever `isSandboxPreviewGuestHost(guestHostname)` returned `true`. An untrusted third-party site framing the sandbox preview iframe could pretend to be the parent embedder host and receive/send bridge postMessages.
**Learning:** Boolean OR checks in origin validation logic can mistakenly treat a condition on the guest host as authorization for arbitrary parent candidate origins.
**Prevention:** Always require explicit allowlists (`isGrokEmbedderOrigin`) or validated origin pairs (`isRemintPreviewPair`) when resolving trusted parent embedder origins.

## 2025-09-18 - Prevent DOM XSS via Unsafe Redirect Protocol in `loginUrl`
**Vulnerability:** `redirectToLoginIfRequired` directly passed `loginUrl` to `window.location.assign()` without checking the protocol scheme. If `loginUrl` contained `javascript:` or `data:`, it could result in DOM-based Cross-Site Scripting (XSS).
**Learning:** Client-side redirection handlers that accept dynamic URLs must strictly validate the URL protocol using `URL` parsing rather than trusting `loginUrl` strings.
**Prevention:** Ensure all `window.location` assignment/redirection utilities parse input URLs and enforce `http:` or `https:` protocol checks before navigating.
