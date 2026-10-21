# Palette's Journal - UX & Accessibility Learnings

## 2025-05-18 - Interactive SVG Map Pin Accessibility
**Learning:** Custom interactive SVG elements (such as location pins in `<g>` tags) are completely ignored by screen readers and keyboard navigation unless explicitly given `role="button"`, `tabIndex={0}`, descriptive `aria-label`, `aria-pressed`, and keyboard event handlers (`onKeyDown` for Enter and Space).
**Action:** Always make interactive SVG groups keyboard-accessible with `tabIndex={0}`, `role="button"`, `aria-label`, `aria-pressed`, and Enter/Space `onKeyDown` handlers.

## 2025-05-18 - Focus Ring Consistency & Header Button Accessibility
**Learning:** Shared UI buttons and top header icon buttons often miss explicit focus-visible ring indicators and contextual screen-reader labels. Standardizing focus-visible styles on shared UI button components improves keyboard navigation across the entire app without duplicate styling code.
**Action:** Always add `focus-visible:ring-2` with accessible color contrast on base `Button` primitives, and ensure mode toggles dynamic labels (`aria-label`) accurately reflect the target toggle state.
