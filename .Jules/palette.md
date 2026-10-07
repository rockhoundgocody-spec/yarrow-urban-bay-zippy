# Palette's Journal - UX & Accessibility Learnings

## 2025-05-18 - Focus Ring Consistency & Header Button Accessibility
**Learning:** Shared UI buttons and top header icon buttons often miss explicit focus-visible ring indicators and contextual screen-reader labels. Standardizing focus-visible styles on shared UI button components improves keyboard navigation across the entire app without duplicate styling code.
**Action:** Always add `focus-visible:ring-2` with accessible color contrast on base `Button` primitives, and ensure mode toggles dynamic labels (`aria-label`) accurately reflect the target toggle state.

## 2026-10-07 - Disabled Action Card Context & Selection Semantics
**Learning:** Disabling action choice cards without inline feedback causes user confusion regarding prerequisite requirements (e.g., legal access confirmation). Adding clear inline messaging alongside `aria-pressed` toggle states and keyboard focus rings restores keyboard navigability and clarifies required action steps.
**Action:** When an option card is conditionally disabled due to unmet form conditions, always provide inline feedback explaining how to unlock it and maintain standard focus-visible rings.
