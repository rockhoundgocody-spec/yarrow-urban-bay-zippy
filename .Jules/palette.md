# Palette's Journal - UX & Accessibility Learnings

## 2026-10-15 - Filter Chip Toggle States & Search Input Clear Controls
**Learning:** Filter chip controls used for list filtering frequently omit `aria-pressed` toggle state and `focus-visible` focus indicators, leaving screen reader and keyboard users without state feedback. Pairing search inputs with an accessible clear button (`X`) and `aria-pressed` on filter chips provides complete feedback for search and filter controls.
**Action:** Always attach `aria-pressed` and `focus-visible` ring utilities to filter chip controls, and pair text input filters with an accessible clear button when text is present.

## 2025-05-18 - Focus Ring Consistency & Header Button Accessibility
**Learning:** Shared UI buttons and top header icon buttons often miss explicit focus-visible ring indicators and contextual screen-reader labels. Standardizing focus-visible styles on shared UI button components improves keyboard navigation across the entire app without duplicate styling code.
**Action:** Always add `focus-visible:ring-2` with accessible color contrast on base `Button` primitives, and ensure mode toggles dynamic labels (`aria-label`) accurately reflect the target toggle state.
