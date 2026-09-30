## 2025-05-10 - Server function validation and error disclosure in AI Vision API
**Vulnerability:** Upstream AI vision function accepted unvalidated URL strings for `imageDataUrl` and leaked upstream error response bodies to clients.
**Learning:** TanStack `createServerFn` handlers require server runtime storage context when invoked directly in Node test runners.
**Prevention:** Extract validation and business logic into standalone async helper functions (e.g. `validateAndIdentifySpecimen`) exported alongside `createServerFn` for direct unit testing.
