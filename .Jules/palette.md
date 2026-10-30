# Palette's Journal - UX & Accessibility Learnings

## 2025-05-18 - Focus Ring Consistency & Header Button Accessibility
**Learning:** Shared UI buttons and top header icon buttons often miss explicit focus-visible ring indicators and contextual screen-reader labels. Standardizing focus-visible styles on shared UI button components improves keyboard navigation across the entire app without duplicate styling code.
**Action:** Always add `focus-visible:ring-2` with accessible color contrast on base `Button` primitives, and ensure mode toggles dynamic labels (`aria-label`) accurately reflect the target toggle state.

## 2026-10-30 - Interactive SVG Map Pin Accessibility
**Learning:** SVG map elements (e.g. `<g>` pin groups) are often rendered without accessibility attributes, hiding interactive map features from screen readers and keyboard users.
**Action:** For interactive SVG pin groups, add `role="button"`, `tabIndex={0}`, descriptive `aria-label` (e.g. site name and location), `aria-pressed` state, Enter/Space key handler (`onKeyDown`), and `focus-visible:ring-2` styling.
