# Palette's Journal - UX & Accessibility Learnings

## 2025-05-18 - Focus Ring Consistency & Header Button Accessibility
**Learning:** Shared UI buttons and top header icon buttons often miss explicit focus-visible ring indicators and contextual screen-reader labels. Standardizing focus-visible styles on shared UI button components improves keyboard navigation across the entire app without duplicate styling code.
**Action:** Always add `focus-visible:ring-2` with accessible color contrast on base `Button` primitives, and ensure mode toggles dynamic labels (`aria-label`) accurately reflect the target toggle state.

## 2026-09-13 - Destructive Action Protection & Image Accessibility
**Learning:** In local-storage driven mobile web apps, immediate single-tap deletions can cause accidental data loss on small touch targets. Inline confirmation steps (`confirming` state) preserve user data safety without requiring disruptive full-screen modal overlays.
**Action:** Always wrap delete/remove triggers in an inline confirmation card offering clear "Cancel" and "Confirm" actions.
