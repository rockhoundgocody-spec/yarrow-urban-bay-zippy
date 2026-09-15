## 2025-05-15 - Preview Bridge Cross-Origin Parent Host Validation Bypass
**Vulnerability:** `resolveParentEmbedderOrigin` checked `isSandboxPreviewGuestHost(guestHostname)` instead of checking `url.hostname` (the parent frame host). When the guest app was framed on `*.grok-sandbox.com`, any parent origin (e.g., `https://attacker.com`) was accepted as a valid embedder origin.
**Learning:** Checking the local/guest domain state instead of the candidate message/frame origin in postMessage bridge filters allows arbitrary cross-origin framing and communication.
**Prevention:** Always validate the candidate parent/embedder URL origin directly against the allowed host patterns rather than checking the guest's own host environment.
