# Palette's Journal - UX & Accessibility Learnings

## 2025-05-18 - Focus Ring Consistency & Header Button Accessibility
**Learning:** Shared UI buttons and top header icon buttons often miss explicit focus-visible ring indicators and contextual screen-reader labels. Standardizing focus-visible styles on shared UI button components improves keyboard navigation across the entire app without duplicate styling code.
**Action:** Always add `focus-visible:ring-2` with accessible color contrast on base `Button` primitives, and ensure mode toggles dynamic labels (`aria-label`) accurately reflect the target toggle state.

## 2026-10-28 - Interactive Map Pin Accessibility
**Learning:** Interactive SVG elements (`<g>` elements acting as map pins or map markers) are invisible to screen readers and keyboard users unless explicitly assigned `role="button"`, `tabIndex={0}`, descriptive `aria-label`s, `aria-pressed`, `onKeyDown` handlers (for Enter and Space keys), and focus rings (`focus-visible:ring-2`).
**Action:** Always wrap interactive map pins or custom SVG elements with keyboard listeners, accessible labels, pressed states, and focus visible indicators when creating custom visual controls.
