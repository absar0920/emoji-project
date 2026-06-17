---
name: sidebar-rail-compound-selector
description: The Sidebar nav rail co-locates fg-rail + theme-editorial on one element; width CSS must use a compound selector, not a descendant one
metadata:
  type: project
---

The desktop nav rail `<aside>` (components/Sidebar.tsx) carries **both** `fg-rail` and
`theme-editorial` classes on the **same element**, and it has no `.theme-editorial`
ancestor. So a descendant selector like `.theme-editorial .fg-rail` (with a space)
matches **nothing** — `document.querySelector(".theme-editorial .fg-rail")` returns
`null`. Rail-width rules must use the **compound** selector `.theme-editorial.fg-rail`
(no space). This bit the expanded width AND the `html[data-sidebar="collapsed"]`
width rule (both in app/globals.css under "primary nav rail (Sidebar)").

Child rules like `.theme-editorial .fg-rail-summary` / `.fg-rail-text` / `.fg-menuitem`
DO work, because those are real descendants of the aside (which is the `.theme-editorial`
ancestor). Only rules targeting the aside itself need the compound form.

Symptom that fooled us: editing the rail width seemed to "sort of work" because the
content bump (item font/icon/padding) grew the rail's *intrinsic* width — masking that
the width rule never applied. If a `.fg-rail` width edit appears to do nothing, check
the selector before bumping numbers or adding `!important`. See [[tailwind-v4-color-token-override]].
