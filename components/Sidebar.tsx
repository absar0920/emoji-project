"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_GROUPS, type NavItem } from "@/lib/nav";

interface SidebarProps {
  /** Mobile drawer open state (desktop rail ignores this). */
  open: boolean;
  onClose: () => void;
}

/* Match the current route against a nav item. Pathname-only on the server (SSR-safe);
   category links (/search?category=…) additionally match the query on the client. */
function useIsActive() {
  const pathname = usePathname();
  const [search, setSearch] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: read browser-only search params after hydration
    setSearch(window.location.search);
  }, [pathname]);

  return (href: string) => {
    const [path, query] = href.split("?");
    if (path !== pathname) return false;
    if (!query) return true;
    const want = new URLSearchParams(query).get("category");
    if (!want) return true;
    return new URLSearchParams(search).get("category") === want;
  };
}

function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg className={`w-3.5 h-3.5 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function NavLink({ item, active, onClick }: { item: NavItem; active: boolean; onClick?: () => void }) {
  return (
    <Link
      href={item.href}
      onClick={onClick}
      data-active={active}
      title={item.label}
      className="fg-menuitem flex items-center gap-3.5 py-2.5 px-2.5 font-read text-[1rem]"
    >
      <span className="fg-rail-icon w-6 shrink-0 text-[1.05rem]" data-icon-kind={item.textIcon ? "text" : "emoji"} aria-hidden="true">{item.icon}</span>
      <span className="fg-rail-text min-w-0 truncate">{item.label}</span>
    </Link>
  );
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const isActive = useIsActive();
  const pathname = usePathname();

  // Whole-rail collapse (desktop). Visual width + label hiding is driven by CSS on
  // html[data-sidebar] (set pre-paint by the inline script in layout.tsx, so there's no
  // flash); React state only drives the toggle button + persistence.
  const [collapsed, setCollapsed] = useState(false);

  // Per-group accordion open state — all groups expanded by default (so every link renders
  // server-side for crawlers, and the group containing the active item is open).
  const [openGroups, setOpenGroups] = useState<Set<string>>(() => new Set(NAV_GROUPS.map((g) => g.id)));

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: sync toggle state from the pre-paint dataset attribute
    setCollapsed(document.documentElement.dataset.sidebar === "collapsed");
  }, []);

  // Lock body scroll while the mobile drawer is open (mirrors the old MobileMenu).
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close the mobile drawer on route change.
  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  function toggleCollapse() {
    setCollapsed((c) => {
      const next = !c;
      document.documentElement.dataset.sidebar = next ? "collapsed" : "expanded";
      try {
        localStorage.setItem("sidebar-collapsed", next ? "1" : "0");
      } catch {
        /* ignore */
      }
      return next;
    });
  }

  function setGroupOpen(id: string, isOpen: boolean) {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (isOpen) next.add(id);
      else next.delete(id);
      return next;
    });
  }

  const groups = (onItemClick?: () => void) =>
    NAV_GROUPS.map((group) => (
      <details
        key={group.id}
        open={openGroups.has(group.id)}
        onToggle={(e) => setGroupOpen(group.id, (e.currentTarget as HTMLDetailsElement).open)}
        className="fg-rail-group border-b border-[var(--line)] py-1"
      >
        <summary className="fg-rail-summary fg-label flex items-center justify-between cursor-pointer select-none py-2.5 px-2.5 list-none">
          <span>{group.label}</span>
          <Chevron className="fg-chev opacity-60" />
        </summary>
        <ul className="fg-rail-items pb-1">
          {group.items.map((item) => (
            <li key={item.href}>
              <NavLink item={item} active={isActive(item.href)} onClick={onItemClick} />
            </li>
          ))}
        </ul>
      </details>
    ));

  return (
    <>
      {/* ───────── Desktop rail (lg+) ───────── */}
      <aside className="fg-rail theme-editorial hidden lg:block shrink-0 border-r border-[var(--line)]">
        <nav className="sticky top-16 max-h-[calc(100vh-4rem)] overflow-y-auto scrollbar-hide px-2 py-3">
          <div className="flex items-center justify-end px-2 pb-2">
            <button
              onClick={toggleCollapse}
              className="fg-iconbtn w-8 h-8"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={collapsed ? "M13 5l7 7-7 7M5 5l7 7-7 7" : "M11 19l-7-7 7-7M19 19l-7-7 7-7"}
                />
              </svg>
            </button>
          </div>
          {groups()}
        </nav>
      </aside>

      {/* ───────── Mobile drawer (<lg) ───────── */}
      {open && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-[80] bg-black/30" onClick={onClose} aria-hidden="true" />
          <div className="theme-editorial fixed inset-y-0 left-0 z-[90] w-[min(20rem,85vw)] bg-[var(--paper)] border-r-[1.5px] border-[var(--rule)] flex flex-col">
            <div className="flex items-center justify-between px-5 h-16 border-b-[1.5px] border-[var(--rule)] shrink-0">
              <span className="fg-label">Menu</span>
              <button onClick={onClose} className="fg-iconbtn w-9 h-9" aria-label="Close menu">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="overflow-y-auto px-3 py-3 grow">{groups(onClose)}</nav>
          </div>
        </div>
      )}
    </>
  );
}
