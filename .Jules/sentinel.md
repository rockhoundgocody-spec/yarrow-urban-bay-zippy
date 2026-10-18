## 2025-09-18 - Validate Client Auth Redirect Targets Against DOM XSS and Open Redirects
**Vulnerability:** `signIn` (`callbackURL`/`errorCallbackURL`) and `signOut` (`redirectTo`) accepted unvalidated client redirect parameters, which could be exploited for DOM XSS via `javascript:` URIs or Open Redirects to external domains.
**Learning:** Client authentication navigation parameters must enforce scheme (`http:`/`https:`) and same-origin checks (`parsed.origin === window.location.origin`) before triggering `window.location.href` assignments.
**Prevention:** Always sanitize dynamic redirect options in client authentication methods using `isSafeRedirectUrl` with fallbacks to `/`.

## 2025-09-18 - Prevent DOM XSS via Unsafe Redirect Protocol in `loginUrl`
**Vulnerability:** `redirectToLoginIfRequired` directly passed `loginUrl` to `window.location.assign()` without checking the protocol scheme. If `loginUrl` contained `javascript:` or `data:`, it could result in DOM-based Cross-Site Scripting (XSS).
**Learning:** Client-side redirection handlers that accept dynamic URLs must strictly validate the URL protocol using `URL` parsing rather than trusting `loginUrl` strings.
**Prevention:** Ensure all `window.location` assignment/redirection utilities parse input URLs and enforce `http:` or `https:` protocol checks before navigating.
