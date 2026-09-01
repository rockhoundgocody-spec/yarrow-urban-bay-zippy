# Palette's Journal - UX & Accessibility Learnings

## 2025-05-18 - Focus Ring Consistency & Header Button Accessibility
**Learning:** Shared UI buttons and top header icon buttons often miss explicit focus-visible ring indicators and contextual screen-reader labels. Standardizing focus-visible styles on shared UI button components improves keyboard navigation across the entire app without duplicate styling code.
**Action:** Always add `focus-visible:ring-2` with accessible color contrast on base `Button` primitives, and ensure mode toggles dynamic labels (`aria-label`) accurately reflect the target toggle state.

## 2026-09-01 - Search Clear Button & Filter Empty States
**Learning:** List filter views without clear buttons force keyboard and screen-reader users to backspace character by character to reset searches, and missing empty state panels leave users without recovery actions when filters yield zero items.
**Action:** When adding search inputs to list pages, include an explicit clear button (`aria-label="Clear search"`) and an empty state panel with a "Reset search & filters" action.
