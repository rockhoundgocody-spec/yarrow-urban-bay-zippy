# Palette's Journal - UX & Accessibility Learnings

## 2025-05-18 - Focus Ring Consistency & Header Button Accessibility
**Learning:** Shared UI buttons and top header icon buttons often miss explicit focus-visible ring indicators and contextual screen-reader labels. Standardizing focus-visible styles on shared UI button components improves keyboard navigation across the entire app without duplicate styling code.
**Action:** Always add `focus-visible:ring-2` with accessible color contrast on base `Button` primitives, and ensure mode toggles dynamic labels (`aria-label`) accurately reflect the target toggle state.

## 2025-05-19 - Accessible Search Inputs & Filter Control Micro-Interactions
**Learning:** Search inputs on filterable listing surfaces (GeoDex, Mineralpedia, Localities) often omit screen reader `aria-label` attributes, keyboard `focus-visible` rings, and single-click clear buttons. Consolidating search into a primitive `SearchInput` component guarantees `aria-label` accessibility, focus rings, and an instant clear button (`X`) when query text is typed.
**Action:** Encapsulate search inputs into shared primitives with built-in clear buttons and `aria-label` props, and ensure multi-select chip controls toggle off when clicked again.
