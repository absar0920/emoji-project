"use client";

import { useState, useEffect, lazy, Suspense } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

// The search modal is never visible at first paint, and it pulls in fuse.js +
// the client search index. Code-split it with React.lazy so none of that lands
// on the initial bundle; it's only rendered (below) after the first open, so
// the chunk fetches on first ⌘K / search-button click.
const SearchModal = lazy(() => import("./SearchModal"));

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);
  // Latch: only mount the lazy SearchModal once it's first requested, then keep
  // it mounted (preserves its cached search index). Until then, its chunk +
  // fuse.js are never fetched.
  const [searchMounted, setSearchMounted] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  function openSearch() {
    setSearchMounted(true);
    setSearchOpen(true);
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        openSearch();
      }
    }
    function handleOpenSearch() {
      openSearch();
    }
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-search", handleOpenSearch);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-search", handleOpenSearch);
    };
  }, []);

  return (
    <>
      <Navbar onSearchClick={openSearch} onMenuClick={() => setNavOpen(true)} />
      {searchMounted && (
        <Suspense fallback={null}>
          <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
        </Suspense>
      )}
      <div className="flex">
        <Sidebar open={navOpen} onClose={() => setNavOpen(false)} />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </>
  );
}
