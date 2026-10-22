## 2025-09-18 - Prevent DOM XSS via Unsafe Redirect Protocol in `loginUrl`
**Vulnerability:** `redirectToLoginIfRequired` directly passed `loginUrl` to `window.location.assign()` without checking the protocol scheme. If `loginUrl` contained `javascript:` or `data:`, it could result in DOM-based Cross-Site Scripting (XSS).
**Learning:** Client-side redirection handlers that accept dynamic URLs must strictly validate the URL protocol using `URL` parsing rather than trusting `loginUrl` strings.
**Prevention:** Ensure all `window.location` assignment/redirection utilities parse input URLs and enforce `http:` or `https:` protocol checks before navigating.

## 2025-09-19 - Enforce Same-Origin and Safe Protocol in Auth Client Redirects
**Vulnerability:** `signOut` and `signIn` client handlers accepted dynamic `redirectTo` or `callbackURL` values and performed `window.location.href = url` navigations. Unsanitized inputs like `javascript:` or `//evil.com` allowed DOM XSS and Open Redirect vulnerabilities.
**Learning:** Auth client utilities that receive redirect targets from user input or query parameters must enforce both safe protocol scheme (`http:`/`https:`) and same-origin alignment before setting `window.location`.
**Prevention:** Use `safeRedirectTarget(url, fallback)` in auth client redirect helpers to sanitize target URLs to safe same-origin pathnames.
