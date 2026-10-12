"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const links = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 h-[72px]">
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 border-b border-border-hairline bg-frosted-white backdrop-blur-[6px] transition-opacity duration-500 ease-in-out",
          isScrolled ? "opacity-100" : "opacity-0"
        )}
      />
      <nav
        aria-label="Primary"
        className="relative mx-auto flex h-full max-w-[1440px] items-center justify-between px-5 md:px-10 xl:px-16"
      >
        <a href="#top" className="flex items-center gap-3">
          <span aria-hidden className="size-5 bg-coral opacity-90" />
          <span className="font-display text-[13px] font-bold tracking-brand text-espresso uppercase">
            Studio
          </span>
        </a>
        <ul className="flex gap-5 sm:gap-10">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-body text-label tracking-nav-caps text-terracotta uppercase transition-colors hover:text-coral"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
