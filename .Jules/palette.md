# Palette's Journal - UX & Accessibility Learnings

## 2025-05-18 - Focus Ring Consistency & Header Button Accessibility
**Learning:** Shared UI buttons and top header icon buttons often miss explicit focus-visible ring indicators and contextual screen-reader labels. Standardizing focus-visible styles on shared UI button components improves keyboard navigation across the entire app without duplicate styling code.
**Action:** Always add `focus-visible:ring-2` with accessible color contrast on base `Button` primitives, and ensure mode toggles dynamic labels (`aria-label`) accurately reflect the target toggle state.

## 2025-05-19 - Radio Group Accessibility & Disabled Option Badges
**Learning:** Custom card radio selection components often lack ARIA group markup (`role="radiogroup"` / `role="radio"`) and provide no inline explanation when individual choices are disabled due to prerequisite form conditions (e.g. legal confirmation). Adding explicit status badges and tooltips makes blocked states instantly understandable and accessible to screen readers and keyboard users.
**Action:** Wrap custom single-select option groups in `role="radiogroup"`, mark choices with `role="radio"` / `aria-checked`, and accompany disabled options with inline badge text explaining why the option is locked.
