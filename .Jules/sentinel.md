## 2025-09-18 - Prevent DOM XSS via Unsafe Redirect Protocol in `loginUrl`
**Vulnerability:** `redirectToLoginIfRequired` directly passed `loginUrl` to `window.location.assign()` without checking the protocol scheme. If `loginUrl` contained `javascript:` or `data:`, it could result in DOM-based Cross-Site Scripting (XSS).
**Learning:** Client-side redirection handlers that accept dynamic URLs must strictly validate the URL protocol using `URL` parsing rather than trusting `loginUrl` strings.
**Prevention:** Ensure all `window.location` assignment/redirection utilities parse input URLs and enforce `http:` or `https:` protocol checks before navigating.
