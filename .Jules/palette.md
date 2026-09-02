# Palette's Journal - UX & Accessibility Learnings

## 2025-05-18 - Focus Ring Consistency & Header Button Accessibility
**Learning:** Shared UI buttons and top header icon buttons often miss explicit focus-visible ring indicators and contextual screen-reader labels. Standardizing focus-visible styles on shared UI button components improves keyboard navigation across the entire app without duplicate styling code.
**Action:** Always add `focus-visible:ring-2` with accessible color contrast on base `Button` primitives, and ensure mode toggles dynamic labels (`aria-label`) accurately reflect the target toggle state.

## 2025-05-19 - Interactive SVG Elements & Keyboard Accessibility
**Learning:** Interactive map pins or custom graphical nodes rendered via SVG `<g>` elements are often inaccessible to keyboard and screen-reader users unless explicitly assigned `role="button"`, `tabIndex={0}`, `aria-label`, `aria-pressed`, and `onKeyDown` handlers for Enter and Space selection.
**Action:** Always make SVG map pins accessible by adding `tabIndex={0}`, `role="button"`, descriptive `aria-label`, `aria-pressed`, Enter/Space key listeners, and visual `group-focus-visible` focus rings.
