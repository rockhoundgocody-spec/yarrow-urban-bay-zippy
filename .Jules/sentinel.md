## 2025-05-18 - Sanitize Redirect URLs in Browser Auth Client
**Vulnerability:** Unsanitized `callbackURL` and `redirectTo` options in `signIn` and `signOut` allowed potential open redirects and client-side XSS via `javascript:` scheme URLs or protocol-relative URLs (`//attacker.com`).
**Learning:** Browser navigation (`window.location.href`) must validate that target redirect strings are safe relative paths starting with a single `/` and contains no protocol schemes, double slashes, or backslashes.
**Prevention:** Use `sanitizeRedirectUrl(url, fallback)` in `src/lib/auth/sanitize-redirect.ts` before setting `window.location.href`.
