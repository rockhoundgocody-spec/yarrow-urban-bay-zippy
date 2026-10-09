# Palette's Journal - UX & Accessibility Learnings

## 2025-05-18 - Focus Ring Consistency & Header Button Accessibility
**Learning:** Shared UI buttons and top header icon buttons often miss explicit focus-visible ring indicators and contextual screen-reader labels. Standardizing focus-visible styles on shared UI button components improves keyboard navigation across the entire app without duplicate styling code.
**Action:** Always add `focus-visible:ring-2` with accessible color contrast on base `Button` primitives, and ensure mode toggles dynamic labels (`aria-label`) accurately reflect the target toggle state.

## 2025-05-19 - Accessible Interactive SVG Map Nodes
**Learning:** Custom interactive SVG nodes (such as map markers `<g>`) are ignored by screen readers and keyboard navigation unless given explicit `tabIndex={0}`, `role="button"`, `aria-label`, and keyboard event handlers (`onKeyDown` for Enter/Space).
**Action:** Always add `tabIndex={0}`, `role="button"`, explicit descriptive `aria-label`, keydown handler with `e.preventDefault()`, and `focus-visible:ring-2` to interactive SVG elements.
