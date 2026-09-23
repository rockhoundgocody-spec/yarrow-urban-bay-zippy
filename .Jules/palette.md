# Palette's Journal - UX & Accessibility Learnings

## 2025-05-18 - Focus Ring Consistency & Header Button Accessibility
**Learning:** Shared UI buttons and top header icon buttons often miss explicit focus-visible ring indicators and contextual screen-reader labels. Standardizing focus-visible styles on shared UI button components improves keyboard navigation across the entire app without duplicate styling code.
**Action:** Always add `focus-visible:ring-2` with accessible color contrast on base `Button` primitives, and ensure mode toggles dynamic labels (`aria-label`) accurately reflect the target toggle state.

## 2026-09-23 - Accessible Search Inputs & Zero-State Recovery
**Learning:** Catalog search inputs and category filter groups frequently lack explicit screen-reader labels (`aria-label`, `aria-pressed`) and empty-state recovery actions. Providing a clear button inside active search fields and a prominent "Clear filters" action in zero-result views prevents users from getting stranded during exploration.
**Action:** Always attach `aria-label` to search inputs, set `aria-pressed` on category filter toggles, and provide a clear recovery button whenever search or filter lists yield zero results.
