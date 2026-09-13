# Sentinel's Journal - Security Learnings

## 2025-05-18 - Auth Redirect URL Sanitization
**Vulnerability:** Client-side auth navigation procedures (`signIn` and `signOut`) accepting arbitrary `callbackURL` or `redirectTo` parameters could execute open redirects to untrusted external domains or execute script payloads via `javascript:` URIs.
**Learning:** Browser navigation using `window.location.href = redirectUrl` directly from user-influenced options requires strict same-origin path sanitization.
**Prevention:** Always validate and clamp redirect targets with `sanitizeRedirectUrl` to relative paths starting with `/`, disallowing protocol-relative (`//`), backslashes (`\`), or cross-origin URLs.
