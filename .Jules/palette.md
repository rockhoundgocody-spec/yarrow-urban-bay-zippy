# Palette's Journal - UX & Accessibility Learnings

## 2025-05-18 - Focus Ring Consistency & Header Button Accessibility
**Learning:** Shared UI buttons and top header icon buttons often miss explicit focus-visible ring indicators and contextual screen-reader labels. Standardizing focus-visible styles on shared UI button components improves keyboard navigation across the entire app without duplicate styling code.
**Action:** Always add `focus-visible:ring-2` with accessible color contrast on base `Button` primitives, and ensure mode toggles dynamic labels (`aria-label`) accurately reflect the target toggle state.

## 2025-05-19 - SVG Map Pin Accessibility & Interactivity
**Learning:** Custom interactive SVG components (like map pins or data plots) are frequently invisible to keyboard navigation and screen readers unless explicitly marked with `role="button"`, `tabIndex={0}`, keyboard event handlers (`Enter`/`Space`), and descriptive `aria-label`/`aria-pressed` states.
**Action:** Always wrap interactive SVG group (`<g>`) nodes with proper ARIA attributes, keyboard listeners (`onKeyDown`), and `focus-visible` outline styles.
