# Palette's Journal - UX & Accessibility Learnings

## 2025-05-18 - Focus Ring Consistency & Header Button Accessibility
**Learning:** Shared UI buttons and top header icon buttons often miss explicit focus-visible ring indicators and contextual screen-reader labels. Standardizing focus-visible styles on shared UI button components improves keyboard navigation across the entire app without duplicate styling code.
**Action:** Always add `focus-visible:ring-2` with accessible color contrast on base `Button` primitives, and ensure mode toggles dynamic labels (`aria-label`) accurately reflect the target toggle state.

## 2026-10-19 - Interactive SVG Map Pin Keyboard Accessibility
**Learning:** Custom SVG elements like map location pins are often rendered without interactive roles or focus states. Adding `tabIndex={0}`, `role="button"`, descriptive `aria-label`, keydown handlers (`Enter`/`Space`), and `group-focus-visible` stroke styling allows keyboard and screen reader users to navigate and select map pins seamlessly.
**Action:** When making SVG nodes interactive, always include `role="button"`, `tabIndex={0}`, keyboard handlers, and visible focus indicators via Tailwind's `group-focus-visible:` classes.
