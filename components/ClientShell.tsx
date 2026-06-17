"use client";

import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import SearchModal from "./SearchModal";

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    }
    function handleOpenSearch() {
      setSearchOpen(true);
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
      <Navbar onSearchClick={() => setSearchOpen(true)} onMenuClick={() => setNavOpen(true)} />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <div className="flex">
        <Sidebar open={navOpen} onClose={() => setNavOpen(false)} />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </>
  );
}
