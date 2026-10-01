# Palette's Journal - UX & Accessibility Learnings

## 2025-05-18 - Focus Ring Consistency & Header Button Accessibility
**Learning:** Shared UI buttons and top header icon buttons often miss explicit focus-visible ring indicators and contextual screen-reader labels. Standardizing focus-visible styles on shared UI button components improves keyboard navigation across the entire app without duplicate styling code.
**Action:** Always add `focus-visible:ring-2` with accessible color contrast on base `Button` primitives, and ensure mode toggles dynamic labels (`aria-label`) accurately reflect the target toggle state.

## 2025-05-19 - Filter Button Group Accessibility & Empty State
**Learning:** Custom pill buttons used as category and attribute filters in catalog views are often missing `aria-pressed` toggle state indicators and `role="group"` semantic wrappers. Without `aria-pressed`, screen reader users cannot perceive which filter is active. Furthermore, missing focus-visible rings hinder keyboard navigation.
**Action:** Always wrap filter button rows in a `role="group"` with an `aria-label`, supply dynamic `aria-pressed` boolean attributes, and add `focus-visible:ring-2` focus rings.
