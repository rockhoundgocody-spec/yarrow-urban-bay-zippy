## 2025-09-19 - Enforce Scheme and Payload Size Validation on AI Vision Image Inputs
**Vulnerability:** `identifySpecimen` accepted unvalidated `imageDataUrl` and unbounded text inputs before passing them to the xAI vision model endpoint. Unsanitized non-`data:` URLs (e.g., `http:` or `file:`) could expose SSRF vectors or unexpected remote fetching, while unbounded base64 strings and text inputs risked server memory exhaustion and prompt bloat DoS.
**Learning:** AI image processing server functions must explicitly enforce `data:image/` protocol scheme checks and hard payload length bounds before invoking LLM APIs.
**Prevention:** Always validate `data:image/` MIME prefixes and cap maximum byte/character counts on user-uploaded media data URLs and prompt fields in server functions.

## 2025-09-18 - Prevent DOM XSS via Unsafe Redirect Protocol in `loginUrl`
**Vulnerability:** `redirectToLoginIfRequired` directly passed `loginUrl` to `window.location.assign()` without checking the protocol scheme. If `loginUrl` contained `javascript:` or `data:`, it could result in DOM-based Cross-Site Scripting (XSS).
**Learning:** Client-side redirection handlers that accept dynamic URLs must strictly validate the URL protocol using `URL` parsing rather than trusting `loginUrl` strings.
**Prevention:** Ensure all `window.location` assignment/redirection utilities parse input URLs and enforce `http:` or `https:` protocol checks before navigating.
