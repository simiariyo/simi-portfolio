"use client";
import { useState, useEffect } from "react";

const links = [
  { label: "About", href: "#about" },
  { label: "Approach", href: "#how-i-work" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      {/* Load Fira Code only for the logo */}
      {/* Font link removed from this client component to avoid per-page font loading.
          Add the Google Fonts link in app/layout.tsx or app/head.tsx, or use next/font/google for global loading. */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-navy/90 backdrop-blur-md border-b border-navy-light" : ""
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          {/* Logo — Fira Code font for the VS Code pun */}
          <a href="#" className="flex items-baseline gap-0 group">
            <span
              className="text-teal font-semibold text-lg tracking-tight transition-colors group-hover:text-teal/80"
              style={{ fontFamily: "'Fira Code', monospace" }}
            >
              VS
            </span>
            <span
              className="text-cream font-semibold text-lg tracking-tight transition-colors group-hover:text-cream/80"
              style={{ fontFamily: "'Fira Code', monospace" }}
            >
              Codes
            </span>
            <span className="text-teal text-lg ml-0.5">.</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-cream-muted hover:text-cream text-sm transition-colors duration-200"
              >
                {l.label}
              </a>
            ))}
            <a
              href="mailto:simiariyo@gmail.com"
              className="text-sm border border-teal text-teal px-4 py-2 rounded-full hover:bg-teal hover:text-navy transition-all duration-200 font-medium"
            >
              Hire me
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-cream-muted"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <div className="w-5 flex flex-col gap-1">
              <span className={`h-0.5 bg-current transition-all ${open ? "rotate-45 translate-y-1.5" : ""}`} />
              <span className={`h-0.5 bg-current transition-all ${open ? "opacity-0" : ""}`} />
              <span className={`h-0.5 bg-current transition-all ${open ? "-rotate-45 -translate-y-1.5" : ""}`} />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden bg-navy-mid border-t border-navy-light px-6 pb-6 flex flex-col gap-4">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-cream-muted hover:text-cream py-1 text-sm"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <a
              href="mailto:simiariyo@gmail.com"
              className="text-sm border border-teal text-teal px-4 py-2 rounded-full text-center font-medium"
            >
              Hire me
            </a>
          </div>
        )}
      </nav>
    </>
  );
}