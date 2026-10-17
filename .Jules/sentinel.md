## 2025-09-18 - Prevent DOM XSS via Unsafe Redirect Protocol in `loginUrl`
**Vulnerability:** `redirectToLoginIfRequired` directly passed `loginUrl` to `window.location.assign()` without checking the protocol scheme. If `loginUrl` contained `javascript:` or `data:`, it could result in DOM-based Cross-Site Scripting (XSS).
**Learning:** Client-side redirection handlers that accept dynamic URLs must strictly validate the URL protocol using `URL` parsing rather than trusting `loginUrl` strings.
**Prevention:** Ensure all `window.location` assignment/redirection utilities parse input URLs and enforce `http:` or `https:` protocol checks before navigating.

## 2025-09-18 - Prevent DOM XSS via Unsafe Redirect Protocols in `signOut` and `signIn`
**Vulnerability:** `signOut` and `signIn` in `src/lib/auth/client.ts` directly navigated `window.location.href` to user-provided callback or redirect parameters without protocol scheme validation. If an attacker passed a `javascript:` or `data:` URL, setting `window.location.href` resulted in DOM-based Cross-Site Scripting (XSS).
**Learning:** Client-side authentication helpers taking dynamic destination URLs (`redirectTo` / `callbackURL`) must sanitize redirect targets using `URL` parsing to verify `http:` or `https:` protocol schemes before assigning to `window.location.href`.
**Prevention:** Always filter dynamic redirect URLs through `sanitizeRedirectUrl` to ensure unsafe URI schemes default to a safe fallback path (`/`).
