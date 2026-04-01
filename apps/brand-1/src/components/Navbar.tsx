"use client";

import { useState, useEffect, useCallback } from "react";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Why Us", href: "#why-us" },
  { label: "Contact", href: "#contact" },
] as const;

const SECTION_IDS = NAV_LINKS.map((link) => link.href.slice(1));

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  /* ------------------------------------------------------------------ */
  /*  Scroll detection — swap transparent to solid teal                 */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 32);
    handleScroll(); // set initial state
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ------------------------------------------------------------------ */
  /*  Scroll-spy via IntersectionObserver                               */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(callback, {
        rootMargin: "-40% 0px -55% 0px", // fires when section is ~in upper-middle viewport
        threshold: 0,
      });
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  /* ------------------------------------------------------------------ */
  /*  Lock body scroll when mobile menu is open                         */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* ------------------------------------------------------------------ */
  /*  Smooth scroll handler                                             */
  /* ------------------------------------------------------------------ */
  const scrollTo = useCallback(
    (href: string) => {
      setMobileOpen(false);
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    },
    [],
  );

  /* ------------------------------------------------------------------ */
  /*  Render                                                            */
  /* ------------------------------------------------------------------ */
  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-teal/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          {/* ---------- Logo ---------- */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="font-heading text-xl font-bold tracking-widest text-white select-none"
          >
            OCEANTECH
          </a>

          {/* ---------- Desktop links ---------- */}
          <ul className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = activeSection === href.slice(1);
              return (
                <li key={href}>
                  <a
                    href={href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(href);
                    }}
                    className={`font-heading text-sm font-medium uppercase tracking-wide transition-colors duration-200 ${
                      isActive
                        ? "text-orange"
                        : "text-white hover:text-orange"
                    } relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-orange after:transition-all after:duration-200 ${
                      isActive
                        ? "after:w-full"
                        : "after:w-0 hover:after:w-full"
                    }`}
                  >
                    {label}
                  </a>
                </li>
              );
            })}

            {/* ---------- CTA ---------- */}
            <li>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("#contact");
                }}
                className="inline-block rounded-sm bg-orange px-5 py-2 font-heading text-sm font-semibold text-white transition-colors duration-200 hover:bg-orange-dark"
              >
                Get a Quote
              </a>
            </li>
          </ul>

          {/* ---------- Mobile hamburger ---------- */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <span
              className={`block h-0.5 w-6 rounded bg-white transition-all duration-300 ${
                mobileOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 rounded bg-white transition-all duration-300 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 rounded bg-white transition-all duration-300 ${
                mobileOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* ================================================================ */}
      {/*  Mobile full-screen menu                                         */}
      {/* ================================================================ */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center bg-teal transition-all duration-300 md:hidden ${
          mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!mobileOpen}
      >
        <ul className="flex flex-col items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = activeSection === href.slice(1);
            return (
              <li key={href}>
                <a
                  href={href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(href);
                  }}
                  className={`font-heading text-2xl font-medium uppercase tracking-wide transition-colors duration-200 ${
                    isActive ? "text-orange" : "text-white hover:text-orange"
                  }`}
                >
                  {label}
                </a>
              </li>
            );
          })}

          {/* Mobile CTA */}
          <li className="mt-4">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#contact");
              }}
              className="inline-block rounded-sm bg-orange px-8 py-3 font-heading text-lg font-semibold text-white transition-colors duration-200 hover:bg-orange-dark"
            >
              Get a Quote
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
