# Sentinel Security Journal

## 2025-05-18 - Input Validation on TanStack Start Server Functions
**Vulnerability:** `createServerFn` handlers used dummy validator functions `(input) => input`, bypassing runtime payload validation and leaving server endpoints vulnerable to malformed inputs, unhandled `TypeError` crashes, and type-confusion DoS.
**Learning:** TanStack Start's `.validator()` requires an explicit schema parser function like `zodSchema.parse` to enforce runtime validation at the HTTP endpoint boundary before reaching the handler.
**Prevention:** Always wrap `createServerFn` validator inputs with strict Zod schemas defining expected properties, enum checks, and maximum string length bounds.
