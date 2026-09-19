# Palette's Journal - UX & Accessibility Learnings

## 2025-05-18 - Focus Ring Consistency & Header Button Accessibility
**Learning:** Shared UI buttons and top header icon buttons often miss explicit focus-visible ring indicators and contextual screen-reader labels. Standardizing focus-visible styles on shared UI button components improves keyboard navigation across the entire app without duplicate styling code.
**Action:** Always add `focus-visible:ring-2` with accessible color contrast on base `Button` primitives, and ensure mode toggles dynamic labels (`aria-label`) accurately reflect the target toggle state.

## 2025-05-19 - Accessible Search Inputs & Filter Button States
**Learning:** Custom search inputs with `type="search"` need CSS reset rules for `::-webkit-search-cancel-button` to avoid rendering duplicate native clear buttons alongside custom interactive clear buttons. Providing explicit `aria-label`, `aria-pressed` on filter chips, and `alt` text on thumbnail images ensures a seamless screen reader experience.
**Action:** Always use a central `SearchInput` component with `aria-label` and `::-webkit-search-cancel-button` reset, and ensure all toggleable filter chips include `aria-pressed`.
