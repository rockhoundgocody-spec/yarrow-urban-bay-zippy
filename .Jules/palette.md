# Palette's Journal - UX & Accessibility Learnings

## 2025-05-18 - Focus Ring Consistency & Header Button Accessibility
**Learning:** Shared UI buttons and top header icon buttons often miss explicit focus-visible ring indicators and contextual screen-reader labels. Standardizing focus-visible styles on shared UI button components improves keyboard navigation across the entire app without duplicate styling code.
**Action:** Always add `focus-visible:ring-2` with accessible color contrast on base `Button` primitives, and ensure mode toggles dynamic labels (`aria-label`) accurately reflect the target toggle state.

## 2025-05-19 - Progress Bar ARIA Semantics & Smooth Transitions
**Learning:** Custom progress bar components styled with background divs are completely invisible to screen readers without ARIA attributes (`role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-label`, `aria-valuetext`).
**Action:** Always supply full progress bar ARIA attributes along with `transition-all duration-300` when rendering dynamic progress fills so screen readers announce completion and state updates render smoothly.
