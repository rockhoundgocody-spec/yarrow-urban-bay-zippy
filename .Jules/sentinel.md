## 2025-05-23 - Prevent Upstream API Response Leakage and Validate Data URIs in Server Functions
**Vulnerability:** Server functions returning upstream LLM API error responses directly to the client (`res.text().slice(0, 140)`) exposed internal upstream error details and system metadata. Unvalidated image inputs allowed unconstrained payload sizes and non-image URI schemes (`javascript:`).
**Learning:** Server functions should sanitize user inputs (`imageDataUrl` schemes and length caps) and never propagate raw upstream HTTP response bodies to client errors.
**Prevention:** Validate input schemes and length bounds before API dispatch, and return sanitized, generic error messages to clients while logging detailed errors server-side.
