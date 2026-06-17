# Memory Index

- [Tailwind v4 color-token override](tailwind-v4-color-token-override.md) — why bare `:root --color-*` overrides vanish; use scoped non-`--color-` vars. Canonical UI reference is `design-system.md` at repo root (Field Guide tokens + `fg-*` primitives, site-wide)
- [User design taste](user-design-taste.md) — rejects generic "AI-like" UI; wants distinctive editorial craft; lock art direction first
- [Sidebar rail compound selector](sidebar-rail-compound-selector.md) — nav rail has fg-rail + theme-editorial on one element; width CSS needs `.theme-editorial.fg-rail` (no space), else it silently matches nothing
