"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface NavDropdownItem {
  icon?: string;
  name: string;
  href: string;
}

interface NavDropdownProps {
  label: string;
  items: NavDropdownItem[];
  columns?: 1 | 2;
}

export default function NavDropdown({ label, items, columns = 1 }: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1 text-sm font-medium transition-colors ${
          open ? "text-primary" : "text-neutral-600 hover:text-primary"
        }`}
      >
        {label}
        <svg
          className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          className={`absolute top-full left-0 mt-2 bg-white rounded-xl shadow-lg border border-neutral-100 py-2 z-50 transition-all ${
            columns === 2 ? "w-80 grid grid-cols-2 gap-0" : "w-56"
          }`}
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-50 hover:text-primary transition-colors"
            >
              {item.icon && <span className="text-base">{item.icon}</span>}
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
