## 2025-09-18 - Prevent DOM XSS via Unsafe Redirect Protocol in `loginUrl`
**Vulnerability:** `redirectToLoginIfRequired` directly passed `loginUrl` to `window.location.assign()` without checking the protocol scheme. If `loginUrl` contained `javascript:` or `data:`, it could result in DOM-based Cross-Site Scripting (XSS).
**Learning:** Client-side redirection handlers that accept dynamic URLs must strictly validate the URL protocol using `URL` parsing rather than trusting `loginUrl` strings.
**Prevention:** Ensure all `window.location` assignment/redirection utilities parse input URLs and enforce `http:` or `https:` protocol checks before navigating.

## 2025-09-19 - Sanitize Auth Redirect Parameters in `signIn` and `signOut`
**Vulnerability:** `signOut` and `signIn` directly assigned `redirectTo`, `callbackURL`, `errorCallbackURL`, and OAuth redirect URLs (`data.url`) to `window.location.href` without verifying protocol schemes or origin matching, creating risks of DOM XSS (via `javascript:` or `data:`) and Open Redirects to external domains.
**Learning:** Auth client utilities that perform dynamic window redirects must validate and sanitize all redirect target parameters against the current window origin using strict URL parsing and protocol matching (`http:`/`https:`).
**Prevention:** Always wrap client-side redirect parameters in same-origin and protocol-validating helpers before assigning to `window.location.href`.
