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
      <button onClick={() => setOpen(!open)} className="fg-navlink" data-active={open} aria-expanded={open}>
        {label}
        <svg className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          className={`absolute top-full left-0 mt-3 bg-[var(--paper)] border border-[var(--line)] py-1.5 z-50 shadow-[0_16px_40px_-24px_rgba(0,0,0,0.5)] ${
            columns === 2 ? "w-[22rem] grid grid-cols-2" : "w-60"
          }`}
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="fg-menuitem flex items-center gap-2.5 px-4 py-2 text-[0.92rem] font-read"
            >
              {item.icon && <span className="text-base shrink-0" aria-hidden="true">{item.icon}</span>}
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
