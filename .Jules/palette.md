# Palette's Journal - UX & Accessibility Learnings

## 2025-05-18 - Focus Ring Consistency & Header Button Accessibility
**Learning:** Shared UI buttons and top header icon buttons often miss explicit focus-visible ring indicators and contextual screen-reader labels. Standardizing focus-visible styles on shared UI button components improves keyboard navigation across the entire app without duplicate styling code.
**Action:** Always add `focus-visible:ring-2` with accessible color contrast on base `Button` primitives, and ensure mode toggles dynamic labels (`aria-label`) accurately reflect the target toggle state.

## 2025-05-19 - Filter Chips & Search Input Accessibility
**Learning:** Filter chip button lists often miss `aria-pressed` toggle state and explicit keyboard focus indicators (`focus-visible:ring-2`), leaving screen-reader and keyboard users unable to easily discern active filters. Additionally, search inputs without clear ("X") buttons force manual backspacing to reset query state.
**Action:** Always add `aria-pressed={isActive}` and `focus-visible:ring-2` to interactive filter chips, add explicit `aria-label` to search inputs, and provide a clear button (`X`) when query text is non-empty.
