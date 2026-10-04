# Palette's Journal - UX & Accessibility Learnings

## 2025-05-18 - Focus Ring Consistency & Header Button Accessibility
**Learning:** Shared UI buttons and top header icon buttons often miss explicit focus-visible ring indicators and contextual screen-reader labels. Standardizing focus-visible styles on shared UI button components improves keyboard navigation across the entire app without duplicate styling code.
**Action:** Always add `focus-visible:ring-2` with accessible color contrast on base `Button` primitives, and ensure mode toggles dynamic labels (`aria-label`) accurately reflect the target toggle state.

## 2026-10-04 - Disabled Option Explanation & Radio Group Accessibility
**Learning:** Option buttons in selection groups that become conditionally disabled (e.g., when legal access is unconfirmed) can confuse users if there is no visible explanation of why the action is blocked. Adding inline status badges (`Requires legal access`) alongside ARIA radiogroup roles (`role="radiogroup"`, `role="radio"`, `aria-checked`, `aria-disabled`) provides clear feedback for both visual and screen-reader users.
**Action:** Always provide inline explanatory text or badges for conditionally disabled choices in selection groups and ensure full keyboard/radio group semantics.
