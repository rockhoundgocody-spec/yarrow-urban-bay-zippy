# Palette's Journal - UX & Accessibility Learnings

## 2025-05-18 - Focus Ring Consistency & Header Button Accessibility
**Learning:** Shared UI buttons and top header icon buttons often miss explicit focus-visible ring indicators and contextual screen-reader labels. Standardizing focus-visible styles on shared UI button components improves keyboard navigation across the entire app without duplicate styling code.
**Action:** Always add `focus-visible:ring-2` with accessible color contrast on base `Button` primitives, and ensure mode toggles dynamic labels (`aria-label`) accurately reflect the target toggle state.

## 2025-05-19 - Filter Chips & Empty State Recoverability in Search Catalogs
**Learning:** Category filter chips in searchable catalogs often omit `aria-pressed` states and focus rings, leaving screen-reader and keyboard users unaware of selection state. Furthermore, empty search results without a direct "Clear search filters" call-to-action force users to manually delete text or click default categories.
**Action:** Always add `role="group"`, `aria-pressed`, and `focus-visible` rings to toggle filter chips, along with an explicit reset action in empty state displays.
