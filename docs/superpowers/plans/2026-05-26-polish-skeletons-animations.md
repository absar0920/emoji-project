# Polish: Skeleton Loading & Framer Motion Animations — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add shimmer skeleton loading screens and subtle Framer Motion entrance/interaction animations across all page types to eliminate plain "Loading..." text and give the app a polished, snappy feel.

**Architecture:** A shared `Skeleton.tsx` component exports reusable skeleton primitives (base block, card, grid, tabs, chips). Each route gets a `loading.tsx` file that composes these primitives. `MotionWrappers.tsx` gains two new components (`AnimatedSection`, `AnimatedCard`), and existing wrappers (`FadeIn`, `StaggerContainer`, `StaggerItem`) are wired into pages. All animations are 150-300ms with ease curves — no springs, no page transitions.

**Tech Stack:** Next.js 16 `loading.tsx` convention, Framer Motion 12 (`motion`, `whileInView`, `whileHover`, `whileTap`), Tailwind CSS 4, React 19.

**Spec:** `docs/superpowers/specs/2026-05-26-polish-skeletons-animations-design.md`

---

### Task 1: Shimmer CSS + Skeleton Primitives

**Files:**
- Modify: `app/globals.css`
- Create: `components/Skeleton.tsx`

- [ ] **Step 1: Add shimmer keyframes to globals.css**

Add at the end of `app/globals.css`:

```css
@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

- [ ] **Step 2: Create `components/Skeleton.tsx`**

```tsx
interface SkeletonProps {
  w?: string;
  h?: string;
  round?: boolean;
  className?: string;
}

export function Skeleton({ w = "100%", h = "14px", round = false, className = "" }: SkeletonProps) {
  return (
    <div
      className={`skeleton ${className}`}
      style={{
        width: w,
        height: h,
        borderRadius: round ? "9999px" : "8px",
        background: "linear-gradient(90deg, #E5E7EB 25%, #F3F4F6 50%, #E5E7EB 75%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s ease-in-out infinite",
      }}
    />
  );
}

export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-white rounded-xl p-4 shadow-sm border border-neutral-100 ${className}`}>
      <Skeleton w="48px" h="48px" className="mb-3" />
      <Skeleton w="70%" h="14px" className="mb-2" />
      <Skeleton w="50%" h="12px" />
    </div>
  );
}

export function SkeletonGrid({ cols = 3, count = 6 }: { cols?: number; count?: number }) {
  return (
    <div
      className="gap-3"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export function SkeletonTabs({ count = 4 }: { count?: number }) {
  return (
    <div className="mb-6">
      <div className="flex gap-1 mb-4">
        {Array.from({ length: count }).map((_, i) => (
          <Skeleton key={i} w={`${60 + i * 10}px`} h="36px" />
        ))}
      </div>
      <Skeleton w="100%" h="14px" className="mb-2" />
      <Skeleton w="85%" h="14px" className="mb-2" />
      <Skeleton w="65%" h="14px" />
    </div>
  );
}

export function SkeletonChips({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} w={`${80 + (i % 3) * 20}px`} h="32px" round />
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Verify build**

Run: `npx next build 2>&1 | tail -5`
Expected: Build succeeds (new file is not yet imported, so no impact).

- [ ] **Step 4: Commit**

```bash
git add app/globals.css components/Skeleton.tsx
git commit -m "feat: add shimmer CSS keyframes and skeleton primitive components"
```

---

### Task 2: New Motion Wrapper Components

**Files:**
- Modify: `components/MotionWrappers.tsx`

- [ ] **Step 1: Add `AnimatedSection` and `AnimatedCard` to MotionWrappers.tsx**

Add these two components after the existing `StaggerItem` export:

```tsx
export function AnimatedSection({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/MotionWrappers.tsx
git commit -m "feat: add AnimatedSection and AnimatedCard motion wrappers"
```

---

### Task 3: Homepage Loading Skeleton

**Files:**
- Create: `app/loading.tsx`

- [ ] **Step 1: Create `app/loading.tsx`**

```tsx
import { Skeleton, SkeletonCard, SkeletonChips } from "@/components/Skeleton";

export default function HomeLoading() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#F8F7FF] to-[#EEF2FF] py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Skeleton w="180px" h="28px" round className="mx-auto mb-6" />
          <Skeleton w="80%" h="40px" className="mx-auto mb-3" />
          <Skeleton w="60%" h="40px" className="mx-auto mb-4" />
          <Skeleton w="200px" h="16px" className="mx-auto mb-8" />
          <Skeleton w="100%" h="48px" round className="max-w-md mx-auto" />
        </div>
      </section>

      {/* Popular */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <Skeleton w="140px" h="24px" />
            <Skeleton w="80px" h="16px" />
          </div>
          <div className="flex justify-center gap-3 sm:gap-4 flex-wrap">
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton key={i} w="48px" h="48px" />
            ))}
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="py-12 bg-neutral-50/50">
        <div className="max-w-5xl mx-auto px-4">
          <Skeleton w="160px" h="24px" className="mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4">
          <Skeleton w="180px" h="24px" className="mb-6" />
          <SkeletonChips count={9} />
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/loading.tsx
git commit -m "feat: add homepage loading skeleton"
```

---

### Task 4: Emoji Detail Loading Skeleton

**Files:**
- Create: `app/emoji/[slug]/loading.tsx`

- [ ] **Step 1: Create `app/emoji/[slug]/loading.tsx`**

```tsx
import { Skeleton, SkeletonTabs, SkeletonGrid, SkeletonChips } from "@/components/Skeleton";

export default function EmojiDetailLoading() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <Skeleton w="200px" h="14px" className="mb-4" />

      {/* Hero */}
      <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 text-center mb-6">
        <Skeleton w="96px" h="96px" round className="mx-auto mb-4" />
        <Skeleton w="200px" h="28px" className="mx-auto mb-2" />
        <Skeleton w="140px" h="14px" className="mx-auto mb-3" />
        <div className="flex gap-2 justify-center">
          <Skeleton w="80px" h="32px" round />
          <Skeleton w="100px" h="32px" round />
        </div>
      </div>

      {/* Meaning Tabs */}
      <SkeletonTabs count={4} />

      {/* Platforms */}
      <div className="mb-10">
        <Skeleton w="160px" h="24px" className="mb-4" />
        <Skeleton w="100%" h="48px" className="mb-2" />
        <Skeleton w="100%" h="48px" className="mb-2" />
        <Skeleton w="100%" h="48px" />
      </div>

      {/* Cultures */}
      <div className="mb-10">
        <Skeleton w="180px" h="24px" className="mb-4" />
        <SkeletonGrid cols={2} count={4} />
      </div>

      {/* Timeline */}
      <div className="mb-10">
        <Skeleton w="180px" h="24px" className="mb-4" />
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex gap-4 items-center mb-3">
            <Skeleton w="50px" h="20px" />
            <Skeleton w="100%" h="16px" />
          </div>
        ))}
      </div>

      {/* Related */}
      <div className="mb-10">
        <Skeleton w="140px" h="24px" className="mb-4" />
        <SkeletonGrid cols={3} count={6} />
      </div>

      {/* Platform links */}
      <div className="mb-10">
        <Skeleton w="200px" h="20px" className="mb-4" />
        <SkeletonChips count={8} />
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/emoji/[slug]/loading.tsx
git commit -m "feat: add emoji detail page loading skeleton"
```

---

### Task 5: Platform, VS, Combo, Culture, Search Loading Skeletons

**Files:**
- Create: `app/[platform]/[slug]/loading.tsx`
- Create: `app/vs/[slug]/loading.tsx`
- Create: `app/combo/[type]/loading.tsx`
- Create: `app/culture/[region]/loading.tsx`
- Create: `app/search/loading.tsx`

- [ ] **Step 1: Create `app/[platform]/[slug]/loading.tsx`**

```tsx
import { Skeleton, SkeletonChips } from "@/components/Skeleton";

export default function PlatformPageLoading() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-6">
      <Skeleton w="220px" h="14px" className="mb-4" />

      {/* Hero */}
      <div className="bg-gradient-to-br from-[#EEF2FF] to-[#F5F3FF] rounded-2xl p-6 sm:p-8 mb-6 flex flex-col sm:flex-row items-center gap-6">
        <Skeleton w="128px" h="128px" />
        <div className="flex-1">
          <Skeleton w="70%" h="28px" className="mb-2" />
          <Skeleton w="140px" h="14px" className="mb-3" />
          <div className="flex gap-2">
            <Skeleton w="80px" h="32px" round />
            <Skeleton w="120px" h="32px" round />
          </div>
        </div>
      </div>

      {/* Platform meaning */}
      <div className="mb-10">
        <Skeleton w="180px" h="24px" className="mb-4" />
        <div className="bg-white rounded-lg p-6 shadow-sm border border-neutral-100 space-y-4">
          <Skeleton w="100%" h="14px" />
          <Skeleton w="90%" h="14px" />
          <Skeleton w="75%" h="14px" />
          <Skeleton w="60%" h="14px" />
        </div>
      </div>

      {/* Other platforms */}
      <div className="mb-10">
        <Skeleton w="200px" h="20px" className="mb-4" />
        <SkeletonChips count={8} />
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Create `app/vs/[slug]/loading.tsx`**

```tsx
import { Skeleton } from "@/components/Skeleton";

export default function ComparisonLoading() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-6">
      <Skeleton w="240px" h="14px" className="mb-4" />

      {/* Hero */}
      <div className="bg-gradient-to-br from-[#EEF2FF] to-[#F5F3FF] rounded-2xl p-6 sm:p-8 mb-6">
        <div className="flex items-center justify-center gap-6 sm:gap-12">
          <div className="text-center">
            <Skeleton w="80px" h="80px" className="mx-auto mb-2" />
            <Skeleton w="60px" h="14px" className="mx-auto" />
          </div>
          <Skeleton w="40px" h="32px" />
          <div className="text-center">
            <Skeleton w="80px" h="80px" className="mx-auto mb-2" />
            <Skeleton w="60px" h="14px" className="mx-auto" />
          </div>
        </div>
        <Skeleton w="250px" h="24px" className="mx-auto mt-4" />
      </div>

      {/* Winner */}
      <Skeleton w="100%" h="60px" round className="mb-8" />

      {/* Differences */}
      <div className="mb-10">
        <Skeleton w="160px" h="24px" className="mb-4" />
        <div className="bg-white rounded-lg shadow-sm border border-neutral-100 p-4 space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="grid grid-cols-3 gap-4">
              <Skeleton w="100%" h="14px" />
              <Skeleton w="60px" h="14px" className="mx-auto" />
              <Skeleton w="100%" h="14px" />
            </div>
          ))}
        </div>
      </div>

      {/* When to use */}
      <div className="mb-10">
        <Skeleton w="160px" h="24px" className="mb-4" />
        <Skeleton w="100%" h="14px" className="mb-2" />
        <Skeleton w="80%" h="14px" />
      </div>
    </main>
  );
}
```

- [ ] **Step 3: Create `app/combo/[type]/loading.tsx`**

```tsx
import { Skeleton, SkeletonGrid } from "@/components/Skeleton";

export default function ComboLoading() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-6">
      <Skeleton w="180px" h="14px" className="mb-4" />

      <Skeleton w="250px" h="28px" className="mb-2" />
      <Skeleton w="100%" h="14px" className="mb-8" />

      {/* Primary combo */}
      <div className="bg-white rounded-xl p-6 shadow-md mb-6">
        <Skeleton w="200px" h="40px" className="mx-auto mb-3" />
        <Skeleton w="140px" h="14px" className="mx-auto" />
      </div>

      {/* More combos */}
      <Skeleton w="200px" h="20px" className="mb-4" />
      <SkeletonGrid cols={2} count={4} />
    </main>
  );
}
```

- [ ] **Step 4: Create `app/culture/[region]/loading.tsx`**

```tsx
import { Skeleton, SkeletonChips } from "@/components/Skeleton";

export default function CultureLoading() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-6">
      <Skeleton w="180px" h="14px" className="mb-4" />

      {/* Hero */}
      <div className="bg-gradient-to-br from-[#EEF2FF] to-[#F5F3FF] rounded-2xl p-6 sm:p-8 mb-8 text-center">
        <Skeleton w="64px" h="64px" className="mx-auto mb-3" />
        <Skeleton w="280px" h="28px" className="mx-auto mb-2" />
        <Skeleton w="220px" h="14px" className="mx-auto" />
      </div>

      {/* Emoji list */}
      <div className="mb-10">
        <Skeleton w="200px" h="24px" className="mb-4" />
        <div className="space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm border border-neutral-100">
              <Skeleton w="48px" h="48px" />
              <div className="flex-1">
                <Skeleton w="120px" h="16px" className="mb-2" />
                <Skeleton w="100%" h="12px" className="mb-1" />
                <Skeleton w="80%" h="12px" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Other cultures */}
      <div className="mb-10">
        <Skeleton w="200px" h="20px" className="mb-4" />
        <SkeletonChips count={10} />
      </div>
    </main>
  );
}
```

- [ ] **Step 5: Create `app/search/loading.tsx`**

```tsx
import { Skeleton } from "@/components/Skeleton";

export default function SearchLoading() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <Skeleton w="250px" h="28px" className="mb-2" />
      <Skeleton w="120px" h="16px" className="mb-8" />
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-1 p-3 bg-white rounded-xl shadow-sm border border-neutral-100">
            <Skeleton w="36px" h="36px" />
            <Skeleton w="60px" h="12px" />
          </div>
        ))}
      </div>
    </main>
  );
}
```

- [ ] **Step 6: Commit**

```bash
git add app/[platform]/[slug]/loading.tsx app/vs/[slug]/loading.tsx app/combo/[type]/loading.tsx app/culture/[region]/loading.tsx app/search/loading.tsx
git commit -m "feat: add loading skeletons for platform, vs, combo, culture, and search pages"
```

---

### Task 6: Tool Page Loading Skeletons

**Files:**
- Create: `app/tools/emoji-kitchen/loading.tsx`
- Create: `app/tools/vibe-search/loading.tsx`
- Create: `app/tools/smart-search/loading.tsx`
- Create: `app/tools/text-to-emoji/loading.tsx`
- Create: `app/tools/caption-generator/loading.tsx`
- Create: `app/tools/emoji-vs/loading.tsx`
- Create: `app/tools/emoji-combos/loading.tsx`
- Create: `app/tools/emoji-keyboard/loading.tsx`
- Create: `app/tools/emoji-shortcodes/loading.tsx`
- Create: `app/tools/emoji-trends/loading.tsx`
- Create: `app/tools/emoji-maker/loading.tsx`

- [ ] **Step 1: Create shared tool skeleton helper**

All tool loading skeletons share the ToolHero shape. Create each file — the common pattern is: badge pill + heading + description + input area + button. I'll show distinct files for the 3 unique layouts and the shared pattern for the rest.

Create `app/tools/emoji-kitchen/loading.tsx`:

```tsx
import { Skeleton } from "@/components/Skeleton";

export default function EmojiKitchenLoading() {
  return (
    <>
      {/* ToolHero skeleton */}
      <div className="bg-gradient-to-b from-primary-light/30 to-transparent -mx-4 px-4 py-8 mb-8 rounded-2xl">
        <Skeleton w="100px" h="24px" round className="mb-4" />
        <Skeleton w="200px" h="28px" className="mb-2" />
        <Skeleton w="300px" h="16px" />
      </div>

      {/* Two pickers */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        <div className="flex-1 w-full text-center">
          <Skeleton w="64px" h="64px" className="mx-auto mb-2" />
          <div className="bg-white rounded-xl border border-neutral-200 p-3 w-full max-w-xs mx-auto">
            <Skeleton w="100%" h="36px" round className="mb-2" />
            <div className="grid grid-cols-6 gap-1">
              {Array.from({ length: 12 }).map((_, i) => (
                <Skeleton key={i} w="32px" h="32px" />
              ))}
            </div>
          </div>
        </div>
        <Skeleton w="32px" h="32px" />
        <div className="flex-1 w-full text-center">
          <Skeleton w="64px" h="64px" className="mx-auto mb-2" />
          <div className="bg-white rounded-xl border border-neutral-200 p-3 w-full max-w-xs mx-auto">
            <Skeleton w="100%" h="36px" round className="mb-2" />
            <div className="grid grid-cols-6 gap-1">
              {Array.from({ length: 12 }).map((_, i) => (
                <Skeleton key={i} w="32px" h="32px" />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mb-8">
        <Skeleton w="160px" h="48px" round className="mx-auto" />
      </div>
    </>
  );
}
```

- [ ] **Step 2: Create `app/tools/emoji-keyboard/loading.tsx`**

```tsx
import { Skeleton, SkeletonChips } from "@/components/Skeleton";

export default function EmojiKeyboardLoading() {
  return (
    <>
      <div className="bg-gradient-to-b from-primary-light/30 to-transparent -mx-4 px-4 py-8 mb-8 rounded-2xl">
        <Skeleton w="180px" h="28px" className="mb-2" />
        <Skeleton w="280px" h="16px" />
      </div>

      <Skeleton w="100%" h="44px" round className="mb-4" />
      <SkeletonChips count={9} />
      <div className="grid grid-cols-8 gap-1 mt-4">
        {Array.from({ length: 40 }).map((_, i) => (
          <Skeleton key={i} w="100%" h="44px" />
        ))}
      </div>
    </>
  );
}
```

- [ ] **Step 3: Create `app/tools/emoji-shortcodes/loading.tsx`**

```tsx
import { Skeleton } from "@/components/Skeleton";

export default function ShortcodesLoading() {
  return (
    <>
      <div className="bg-gradient-to-b from-primary-light/30 to-transparent -mx-4 px-4 py-8 mb-8 rounded-2xl">
        <Skeleton w="200px" h="28px" className="mb-2" />
        <Skeleton w="320px" h="16px" />
      </div>

      <Skeleton w="100%" h="44px" round className="mb-6" />

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-4 py-3 border-b border-neutral-200 bg-neutral-50 flex gap-4">
          <Skeleton w="60px" h="14px" />
          <Skeleton w="80px" h="14px" />
          <Skeleton w="100px" h="14px" />
          <Skeleton w="50px" h="14px" className="ml-auto" />
        </div>
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="px-4 py-3 border-b border-neutral-100 flex items-center gap-4">
            <Skeleton w="32px" h="32px" />
            <Skeleton w="100px" h="14px" />
            <Skeleton w="80px" h="14px" />
            <Skeleton w="60px" h="28px" round className="ml-auto" />
          </div>
        ))}
      </div>
    </>
  );
}
```

- [ ] **Step 4: Create the remaining tool loading files using the shared ToolHero + input + button pattern**

Create `app/tools/vibe-search/loading.tsx`:

```tsx
import { Skeleton, SkeletonChips } from "@/components/Skeleton";

export default function VibeSearchLoading() {
  return (
    <>
      <div className="bg-gradient-to-b from-primary-light/30 to-transparent -mx-4 px-4 py-8 mb-8 rounded-2xl">
        <Skeleton w="100px" h="24px" round className="mb-4" />
        <Skeleton w="160px" h="28px" className="mb-2" />
        <Skeleton w="360px" h="16px" />
      </div>
      <div className="flex gap-2 mb-4">
        <Skeleton w="100%" h="48px" round />
        <Skeleton w="100px" h="48px" round />
      </div>
      <SkeletonChips count={10} />
    </>
  );
}
```

Create `app/tools/smart-search/loading.tsx`:

```tsx
import { Skeleton, SkeletonChips } from "@/components/Skeleton";

export default function SmartSearchLoading() {
  return (
    <>
      <div className="bg-gradient-to-b from-primary-light/30 to-transparent -mx-4 px-4 py-8 mb-8 rounded-2xl">
        <Skeleton w="100px" h="24px" round className="mb-4" />
        <Skeleton w="170px" h="28px" className="mb-2" />
        <Skeleton w="400px" h="16px" />
      </div>
      <div className="flex gap-2 mb-4">
        <Skeleton w="100%" h="48px" round />
        <Skeleton w="100px" h="48px" round />
      </div>
      <SkeletonChips count={6} />
    </>
  );
}
```

Create `app/tools/text-to-emoji/loading.tsx`:

```tsx
import { Skeleton, SkeletonChips } from "@/components/Skeleton";

export default function TextToEmojiLoading() {
  return (
    <>
      <div className="bg-gradient-to-b from-primary-light/30 to-transparent -mx-4 px-4 py-8 mb-8 rounded-2xl">
        <Skeleton w="100px" h="24px" round className="mb-4" />
        <Skeleton w="250px" h="28px" className="mb-2" />
        <Skeleton w="380px" h="16px" />
      </div>
      <Skeleton w="100%" h="120px" className="mb-2" />
      <Skeleton w="60px" h="12px" className="mb-4" />
      <SkeletonChips count={5} />
      <Skeleton w="140px" h="48px" round className="mt-4" />
    </>
  );
}
```

Create `app/tools/caption-generator/loading.tsx`:

```tsx
import { Skeleton, SkeletonChips } from "@/components/Skeleton";

export default function CaptionGeneratorLoading() {
  return (
    <>
      <div className="bg-gradient-to-b from-primary-light/30 to-transparent -mx-4 px-4 py-8 mb-8 rounded-2xl">
        <Skeleton w="100px" h="24px" round className="mb-4" />
        <Skeleton w="210px" h="28px" className="mb-2" />
        <Skeleton w="380px" h="16px" />
      </div>
      <Skeleton w="100%" h="44px" round className="mb-4" />
      <Skeleton w="50px" h="14px" className="mb-2" />
      <SkeletonChips count={8} />
      <Skeleton w="60px" h="14px" className="mt-4 mb-2" />
      <SkeletonChips count={5} />
      <Skeleton w="180px" h="48px" round className="mt-4" />
    </>
  );
}
```

Create `app/tools/emoji-vs/loading.tsx`:

```tsx
import { Skeleton } from "@/components/Skeleton";

export default function EmojiVsLoading() {
  return (
    <>
      <div className="bg-gradient-to-b from-primary-light/30 to-transparent -mx-4 px-4 py-8 mb-8 rounded-2xl">
        <Skeleton w="210px" h="28px" className="mb-2" />
        <Skeleton w="340px" h="16px" />
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        <div className="flex-1 w-full text-center">
          <Skeleton w="64px" h="64px" className="mx-auto mb-2" />
          <div className="bg-white rounded-xl border border-neutral-200 p-3 w-full max-w-xs mx-auto">
            <Skeleton w="100%" h="36px" round className="mb-2" />
            <div className="grid grid-cols-6 gap-1">
              {Array.from({ length: 12 }).map((_, i) => (
                <Skeleton key={i} w="32px" h="32px" />
              ))}
            </div>
          </div>
        </div>
        <Skeleton w="32px" h="32px" />
        <div className="flex-1 w-full text-center">
          <Skeleton w="64px" h="64px" className="mx-auto mb-2" />
          <div className="bg-white rounded-xl border border-neutral-200 p-3 w-full max-w-xs mx-auto">
            <Skeleton w="100%" h="36px" round className="mb-2" />
            <div className="grid grid-cols-6 gap-1">
              {Array.from({ length: 12 }).map((_, i) => (
                <Skeleton key={i} w="32px" h="32px" />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mb-10">
        <Skeleton w="180px" h="48px" round className="mx-auto" />
      </div>
    </>
  );
}
```

Create `app/tools/emoji-combos/loading.tsx`:

```tsx
import { Skeleton, SkeletonGrid } from "@/components/Skeleton";

export default function EmojiCombosLoading() {
  return (
    <>
      <div className="bg-gradient-to-b from-primary-light/30 to-transparent -mx-4 px-4 py-8 mb-8 rounded-2xl">
        <Skeleton w="170px" h="28px" className="mb-2" />
        <Skeleton w="340px" h="16px" />
      </div>
      <SkeletonGrid cols={3} count={12} />
    </>
  );
}
```

Create `app/tools/emoji-trends/loading.tsx`:

```tsx
import { Skeleton } from "@/components/Skeleton";

export default function EmojiTrendsLoading() {
  return (
    <>
      <div className="bg-gradient-to-b from-primary-light/30 to-transparent -mx-4 px-4 py-8 mb-8 rounded-2xl">
        <Skeleton w="100px" h="24px" round className="mb-4" />
        <Skeleton w="210px" h="28px" className="mb-2" />
        <Skeleton w="320px" h="16px" />
      </div>
      <div className="space-y-3">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-neutral-100">
            <Skeleton w="24px" h="20px" />
            <Skeleton w="48px" h="48px" />
            <div className="flex-1">
              <Skeleton w="120px" h="16px" className="mb-1" />
              <Skeleton w="80px" h="12px" />
            </div>
            <Skeleton w="60px" h="28px" round />
          </div>
        ))}
      </div>
    </>
  );
}
```

Create `app/tools/emoji-maker/loading.tsx`:

```tsx
import { Skeleton, SkeletonChips } from "@/components/Skeleton";

export default function EmojiMakerLoading() {
  return (
    <>
      <div className="bg-gradient-to-b from-primary-light/30 to-transparent -mx-4 px-4 py-8 mb-8 rounded-2xl">
        <Skeleton w="100px" h="24px" round className="mb-4" />
        <Skeleton w="170px" h="28px" className="mb-2" />
        <Skeleton w="360px" h="16px" />
      </div>
      <Skeleton w="100%" h="44px" round className="mb-2" />
      <Skeleton w="60px" h="12px" className="mb-4" />
      <SkeletonChips count={4} />
      <Skeleton w="140px" h="48px" round className="mt-4" />
    </>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add app/tools/emoji-kitchen/loading.tsx app/tools/vibe-search/loading.tsx app/tools/smart-search/loading.tsx app/tools/text-to-emoji/loading.tsx app/tools/caption-generator/loading.tsx app/tools/emoji-vs/loading.tsx app/tools/emoji-combos/loading.tsx app/tools/emoji-keyboard/loading.tsx app/tools/emoji-shortcodes/loading.tsx app/tools/emoji-trends/loading.tsx app/tools/emoji-maker/loading.tsx
git commit -m "feat: add loading skeletons for all 11 tool pages"
```

---

### Task 7: Wire Animations into Homepage

**Files:**
- Modify: `app/page.tsx`

The homepage is a server component. The motion wrappers are client components. Server components can render client components as children — this is standard Next.js composition.

- [ ] **Step 1: Add motion wrapper imports and wrap sections in `app/page.tsx`**

Add import at the top:

```tsx
import { FadeIn, StaggerContainer, StaggerItem, AnimatedCard } from "@/components/MotionWrappers";
```

Replace the hero content (inside the `<section className="bg-gradient-to-br ...">`) to wrap the inner `<div>` with `FadeIn`:

Change:
```tsx
        <section className="bg-gradient-to-br from-[#F8F7FF] to-[#EEF2FF] py-16 sm:py-24">
          <div className="max-w-3xl mx-auto px-4 text-center">
```

To:
```tsx
        <section className="bg-gradient-to-br from-[#F8F7FF] to-[#EEF2FF] py-16 sm:py-24">
          <FadeIn className="max-w-3xl mx-auto px-4 text-center">
```

And close the `FadeIn` at the end of that section (replace the closing `</div>` before `</section>` with `</FadeIn>`).

Replace the trending emojis container:

Change:
```tsx
            <div className="flex justify-center gap-3 sm:gap-4 flex-wrap">
              {trending.map((e) => (
                <Link
```

To:
```tsx
            <StaggerContainer className="flex justify-center gap-3 sm:gap-4 flex-wrap">
              {trending.map((e) => (
                <StaggerItem key={e.slug}>
                  <Link
```

And close `</StaggerItem>` after each `</Link>`, replace closing `</div>` with `</StaggerContainer>`.

Replace the tools grid:

Change:
```tsx
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {TOOLS.map((tool) => (
                <Link
```

To:
```tsx
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {TOOLS.map((tool) => (
                <StaggerItem key={tool.href}>
                  <AnimatedCard>
                    <Link
```

Close with `</AnimatedCard></StaggerItem>` after each `</Link>`, and `</StaggerContainer>` at the end.

Replace the categories row:

Change:
```tsx
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {CATEGORIES.map((cat) => (
                <Link
```

To:
```tsx
            <StaggerContainer className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {CATEGORIES.map((cat) => (
                <StaggerItem key={cat.name}>
                  <Link
```

Close with `</StaggerItem>` after each `</Link>`, replace closing `</div>` with `</StaggerContainer>`.

- [ ] **Step 2: Commit**

```bash
git add app/page.tsx
git commit -m "feat: add entrance animations to homepage"
```

---

### Task 8: Wire Animations into Emoji Detail Page

**Files:**
- Modify: `app/emoji/[slug]/page.tsx`

- [ ] **Step 1: Add motion imports and wrap sections**

Add import:

```tsx
import { FadeIn, AnimatedSection, StaggerContainer, StaggerItem, AnimatedCard } from "@/components/MotionWrappers";
```

Wrap the hero card (the `<div className="bg-white rounded-2xl shadow-md ...">`) with `<FadeIn>`:

```tsx
        <FadeIn>
          <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 text-center mb-6">
            ...
          </div>
        </FadeIn>
```

Wrap each remaining `<section>` with `<AnimatedSection>`. There are sections for: meanings (MeaningTabs), platforms (PlatformAccordion), cultures, timeline, related, platform links, compare with, emoji combos, see also, FAQ, safety, and design variations. For each one, wrap the outermost element:

```tsx
        <AnimatedSection>
          <MeaningTabs meanings={meanings} />
        </AnimatedSection>

        <AnimatedSection>
          <PlatformAccordion platforms={platforms} />
        </AnimatedSection>

        <AnimatedSection>
          <section id="cultures" className="mb-10">
            ...
          </section>
        </AnimatedSection>
```

Repeat this pattern for every section block (`id="timeline"`, `id="related"`, platform links, compare with, emoji combos, see also, `id="faq"`, safety, and design variations).

- [ ] **Step 2: Commit**

```bash
git add app/emoji/[slug]/page.tsx
git commit -m "feat: add FadeIn and AnimatedSection to emoji detail page"
```

---

### Task 9: Wire Animations into Platform, VS, Combo, Culture Pages

**Files:**
- Modify: `app/[platform]/[slug]/page.tsx`
- Modify: `app/vs/[slug]/page.tsx`
- Modify: `app/combo/[type]/page.tsx`
- Modify: `app/culture/[region]/page.tsx`

- [ ] **Step 1: Add animations to `app/[platform]/[slug]/page.tsx`**

Add import:

```tsx
import { FadeIn, AnimatedSection } from "@/components/MotionWrappers";
```

Wrap the hero `<div className="bg-gradient-to-br ...">` with `<FadeIn>`.

Wrap the platform meaning `<section>` and "See on Other Platforms" `<section>` each with `<AnimatedSection>`.

- [ ] **Step 2: Add animations to `app/vs/[slug]/page.tsx`**

Add import:

```tsx
import { FadeIn, AnimatedSection } from "@/components/MotionWrappers";
```

Wrap the hero `<div className="bg-gradient-to-br ...">` with `<FadeIn>`.

Wrap the winner `<div>`, differences `<section>`, when-to-use `<section>`, related comparisons `<section>`, and FAQ `<section>` each with `<AnimatedSection>`.

- [ ] **Step 3: Add animations to `app/combo/[type]/page.tsx`**

Add import:

```tsx
import { FadeIn, AnimatedSection } from "@/components/MotionWrappers";
```

Wrap the hero `<div className="mb-8">` with `<FadeIn>`.

Wrap the primary combo, alternate combos `<section>`, and related combos `<section>` each with `<AnimatedSection>`.

- [ ] **Step 4: Add animations to `app/culture/[region]/page.tsx`**

Add import:

```tsx
import { FadeIn, AnimatedSection } from "@/components/MotionWrappers";
```

Wrap the hero `<div className="bg-gradient-to-br ...">` with `<FadeIn>`.

Wrap the emoji grid `<section>` and "Explore Other Cultures" `<section>` each with `<AnimatedSection>`.

- [ ] **Step 5: Commit**

```bash
git add app/[platform]/[slug]/page.tsx app/vs/[slug]/page.tsx app/combo/[type]/page.tsx app/culture/[region]/page.tsx
git commit -m "feat: add entrance animations to platform, vs, combo, and culture pages"
```

---

### Task 10: Upgrade SearchModal Loading States

**Files:**
- Modify: `components/SearchModal.tsx`

- [ ] **Step 1: Add skeleton and motion imports**

Add at the top of `components/SearchModal.tsx`:

```tsx
import { Skeleton } from "@/components/Skeleton";
import { StaggerContainer, StaggerItem } from "@/components/MotionWrappers";
```

- [ ] **Step 2: Replace "Loading search index..." with skeleton rows**

Find this line:

```tsx
          {loading && <div className="p-6 text-center text-neutral-400">Loading search index...</div>}
```

Replace with:

```tsx
          {loading && (
            <div className="px-5 py-4 space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton w="32px" h="32px" />
                  <div className="flex-1">
                    <Skeleton w="70%" h="14px" className="mb-1.5" />
                    <Skeleton w="50%" h="12px" />
                  </div>
                </div>
              ))}
            </div>
          )}
```

- [ ] **Step 3: Replace "Searching with AI..." with pulsing dots**

Find this block:

```tsx
          {smartLoading && (
            <div className="p-4 text-center text-neutral-400 text-sm">
              Searching with AI...
            </div>
          )}
```

Replace with:

```tsx
          {smartLoading && (
            <div className="p-4 text-center">
              <span className="text-lg">🤖</span>
              <div className="flex justify-center gap-1 my-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
              <span className="text-xs text-neutral-400">Finding the perfect emojis...</span>
            </div>
          )}
```

- [ ] **Step 4: Wrap result lists with stagger animation**

Find the fuzzy results map:

```tsx
          {results.map((item) => (
            <button key={item.slug} onClick={() => handleSelect(item.slug)} className="w-full flex items-center gap-3 px-5 py-3 hover:bg-neutral-50 transition-colors text-left">
```

Wrap with `StaggerContainer`:

```tsx
          <StaggerContainer>
            {results.map((item) => (
              <StaggerItem key={item.slug}>
                <button onClick={() => handleSelect(item.slug)} className="w-full flex items-center gap-3 px-5 py-3 hover:bg-neutral-50 transition-colors text-left">
                  <span className="text-3xl">{item.character}</span>
                  <div>
                    <div className="font-medium text-neutral-900">{item.name}</div>
                    <div className="text-xs text-neutral-500">{item.category} · {item.shortcode}</div>
                  </div>
                </button>
              </StaggerItem>
            ))}
          </StaggerContainer>
```

Do the same for the smart results list — wrap the `{smartResults.map(...)}` block with `<StaggerContainer>` and each item with `<StaggerItem>`.

- [ ] **Step 5: Commit**

```bash
git add components/SearchModal.tsx
git commit -m "feat: upgrade SearchModal with skeleton loading and stagger animations"
```

---

### Task 11: Upgrade EmojiPicker Loading State

**Files:**
- Modify: `components/EmojiPicker.tsx`

- [ ] **Step 1: Add skeleton import**

Add at the top:

```tsx
import { Skeleton } from "@/components/Skeleton";
```

- [ ] **Step 2: Replace "Loading..." text with skeleton grid**

Find:

```tsx
        <div className="text-center text-neutral-400 py-4 text-sm">Loading...</div>
```

Replace with:

```tsx
        <div className="grid grid-cols-6 gap-1">
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} w="32px" h="32px" />
          ))}
        </div>
```

- [ ] **Step 3: Commit**

```bash
git add components/EmojiPicker.tsx
git commit -m "feat: replace EmojiPicker loading text with skeleton grid"
```

---

### Task 12: Add FadeIn to Tool Page Results

**Files:**
- Modify: `app/tools/emoji-kitchen/page.tsx`
- Modify: `app/tools/emoji-vs/page.tsx`
- Modify: `app/tools/emoji-keyboard/page.tsx`
- Modify: `app/tools/emoji-shortcodes/page.tsx`

These are the tool pages that don't already use `StaggerContainer`/`StaggerItem` for results. The pages that already use them (vibe-search, text-to-emoji, caption-generator, smart-search, emoji-maker) are already covered.

- [ ] **Step 1: Add FadeIn to emoji-kitchen result**

Add import to `app/tools/emoji-kitchen/page.tsx`:

```tsx
import { FadeIn } from "@/components/MotionWrappers";
```

Wrap the result block — find:

```tsx
      {resultUrl && (
        <div className="text-center">
```

Replace with:

```tsx
      {resultUrl && (
        <FadeIn className="text-center">
```

Change the closing `</div>` (that matches this block) to `</FadeIn>`.

Also wrap the not-found block:

```tsx
      {notFound && (
        <FadeIn className="text-center py-8">
```

- [ ] **Step 2: Add FadeIn to emoji-vs popular comparisons**

Add import to `app/tools/emoji-vs/page.tsx`:

```tsx
import { FadeIn } from "@/components/MotionWrappers";
```

Wrap the popular comparisons section:

```tsx
      {popular.length > 0 && (
        <FadeIn>
          <>
            <h2 className="text-lg font-bold text-primary-dark mb-4">Popular Comparisons</h2>
            ...
          </>
        </FadeIn>
      )}
```

- [ ] **Step 3: Commit**

```bash
git add app/tools/emoji-kitchen/page.tsx app/tools/emoji-vs/page.tsx
git commit -m "feat: add FadeIn to emoji-kitchen and emoji-vs results"
```

---

### Task 13: Build Verification

**Files:** None (verification only)

- [ ] **Step 1: Run TypeScript type check**

Run: `npx tsc --noEmit 2>&1 | tail -20`
Expected: No type errors.

- [ ] **Step 2: Run Next.js build**

Run: `npx next build 2>&1 | tail -20`
Expected: Build succeeds. All routes compile.

- [ ] **Step 3: Fix any errors**

If there are type errors or build failures, fix them. Common issues:
- Missing `"use client"` on components that use motion (all MotionWrappers components already have it)
- Import path typos
- JSX nesting issues from wrapping elements

- [ ] **Step 4: Final commit if any fixes were needed**

```bash
git add -A
git commit -m "fix: resolve build issues from animation/skeleton integration"
```
