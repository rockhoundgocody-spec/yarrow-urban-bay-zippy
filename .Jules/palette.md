# Palette's Journal - UX & Accessibility Learnings

## 2025-05-18 - Focus Ring Consistency & Header Button Accessibility
**Learning:** Shared UI buttons and top header icon buttons often miss explicit focus-visible ring indicators and contextual screen-reader labels. Standardizing focus-visible styles on shared UI button components improves keyboard navigation across the entire app without duplicate styling code.
**Action:** Always add `focus-visible:ring-2` with accessible color contrast on base `Button` primitives, and ensure mode toggles dynamic labels (`aria-label`) accurately reflect the target toggle state.

## 2025-05-18 - Radio Group Accessibility & Disabled Reason Badges
**Learning:** Selectable choice lists (like discovery disposition cards) behave as single-select controls but often lack `role="radiogroup"` and `role="radio"` attributes. Additionally, disabling options without inline explanatory text leaves users confused as to why an action is unavailable.
**Action:** Annotate single-select option card groups with `role="radiogroup"` and `role="radio"` (`aria-checked`), and present explicit inline reason labels (such as "Requires legal access") when an option is conditionally disabled.
