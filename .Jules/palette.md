# Palette's Journal - UX & Accessibility Learnings

## 2025-05-18 - Focus Ring Consistency & Header Button Accessibility
**Learning:** Shared UI buttons and top header icon buttons often miss explicit focus-visible ring indicators and contextual screen-reader labels. Standardizing focus-visible styles on shared UI button components improves keyboard navigation across the entire app without duplicate styling code.
**Action:** Always add `focus-visible:ring-2` with accessible color contrast on base `Button` primitives, and ensure mode toggles dynamic labels (`aria-label`) accurately reflect the target toggle state.

## 2025-05-19 - Disabled Option Clarity in Conditional Ethics Choices
**Learning:** Disabling an interactive choice card without visible explanation leaves users confused as to why an action is blocked. Providing inline contextual helper text directly within the disabled option card alongside standard `title` tooltips and `cursor-not-allowed` states transforms blocked choices into clear, actionable prompts.
**Action:** Always include inline helper text explaining the required prerequisite condition inside disabled or blocked option cards, and pair with `aria-pressed` and `focus-visible` styling.
