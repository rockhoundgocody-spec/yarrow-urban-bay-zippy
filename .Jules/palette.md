# Palette's Journal - UX & Accessibility Learnings

## 2025-05-18 - Disabled Choice Guidance & ARIA Radiogroup Semantics
**Learning:** Conditional form options disabled by precursor controls (e.g. legal access check) can confuse users if disabled without inline explanation. Adding explicit inline guidance ("Requires legal access check"), `title` tooltips, `role="radiogroup"` / `role="radio"`, and `focus-visible:ring-2` styles makes decision flows transparent and accessible.
**Action:** When disabling selection options based on prerequisite form controls, always include inline guidance badges, `aria-disabled`, `title` tooltips, and keyboard focus states.

## 2025-05-18 - Focus Ring Consistency & Header Button Accessibility
**Learning:** Shared UI buttons and top header icon buttons often miss explicit focus-visible ring indicators and contextual screen-reader labels. Standardizing focus-visible styles on shared UI button components improves keyboard navigation across the entire app without duplicate styling code.
**Action:** Always add `focus-visible:ring-2` with accessible color contrast on base `Button` primitives, and ensure mode toggles dynamic labels (`aria-label`) accurately reflect the target toggle state.
