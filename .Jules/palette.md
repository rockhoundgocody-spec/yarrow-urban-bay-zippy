# Palette's Journal - UX & Accessibility Learnings

## 2025-05-18 - Focus Ring Consistency & Header Button Accessibility
**Learning:** Shared UI buttons and top header icon buttons often miss explicit focus-visible ring indicators and contextual screen-reader labels. Standardizing focus-visible styles on shared UI button components improves keyboard navigation across the entire app without duplicate styling code.
**Action:** Always add `focus-visible:ring-2` with accessible color contrast on base `Button` primitives, and ensure mode toggles dynamic labels (`aria-label`) accurately reflect the target toggle state.

## 2025-05-19 - SVG Interactive Map Pins Accessibility
**Learning:** Interactive SVG elements (like `<g>` map pins) are skipped by keyboard navigation and screen readers unless explicitly given `role="button"`, `tabIndex={0}`, contextual `aria-label`, `aria-pressed`, and `onKeyDown` handlers for Enter/Space selection.
**Action:** Always wrap interactive SVG markers with `role="button"`, `tabIndex={0}`, `aria-label`, and `onKeyDown` handlers alongside `onClick` and `focus-visible` styling.
