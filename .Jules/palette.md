# Palette's Journal - UX & Accessibility Learnings

## 2025-05-19 - Contextual Inline Feedback for Disabled Choice Cards
**Learning:** Graying out or disabling card options without inline explanation leaves users guessing why an option is locked. Displaying a subtle contextual status badge (e.g. "Requires legal access") alongside `aria-disabled` and `cursor-not-allowed` immediately clarifies prerequisites without cluttering card layouts.
**Action:** When conditional rules disable action cards or choice options, include a compact inline badge explaining the required condition alongside `aria-disabled="true"`.

## 2025-05-18 - Focus Ring Consistency & Header Button Accessibility
**Learning:** Shared UI buttons and top header icon buttons often miss explicit focus-visible ring indicators and contextual screen-reader labels. Standardizing focus-visible styles on shared UI button components improves keyboard navigation across the entire app without duplicate styling code.
**Action:** Always add `focus-visible:ring-2` with accessible color contrast on base `Button` primitives, and ensure mode toggles dynamic labels (`aria-label`) accurately reflect the target toggle state.
