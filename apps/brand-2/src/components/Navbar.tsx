"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Why Us", href: "#why-us" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 32);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll spy with IntersectionObserver
  useEffect(() => {
    const sectionIds = navLinks.map((link) => link.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(`#${id}`);
            }
          });
        },
        { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setMobileOpen(false);
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    },
    []
  );

  return (
    <>
      {/* ── Navbar ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#111111]/95 backdrop-blur-md shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-10 h-20">
          {/* ── Logo ── */}
          <a href="#" className="flex items-center gap-3 group">
            <Image
              src="/images/logo-icon.png"
              alt="Oceantech logo"
              width={40}
              height={40}
              className="w-8 h-8 md:w-10 md:h-10 transition-transform duration-300 group-hover:scale-105"
              priority
            />
            <div className="flex flex-col leading-none">
              <span className="font-display text-white text-sm md:text-base lg:text-xl tracking-widest">
                OCEANTECH
              </span>
              <span className="font-heading text-gold text-[10px] tracking-[0.2em] uppercase">
                OFFSHORE
              </span>
            </div>
          </a>

          {/* ── Desktop Nav Links ── */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative font-heading font-medium text-[13px] uppercase tracking-[0.08em] transition-colors duration-200 ${
                    isActive ? "text-gold" : "text-white hover:text-gold"
                  }`}
                >
                  {link.label}
                  {/* Active underline */}
                  <span
                    className={`absolute -bottom-1 left-0 h-[2px] bg-gold transition-all duration-300 ${
                      isActive ? "w-full" : "w-0"
                    }`}
                  />
                </a>
              );
            })}

            {/* ── CTA Button ── */}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="bg-gold text-navy px-6 py-2 font-heading font-semibold uppercase text-sm tracking-wide transition-all duration-200 hover:bg-gold-dark hover:shadow-lg hover:shadow-gold/20"
            >
              Deploy Our Team
            </a>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <span
              className={`block h-[2px] w-6 bg-white transition-all duration-300 origin-center ${
                mobileOpen ? "rotate-45 translate-y-[5px]" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-6 bg-gold transition-all duration-300 ${
                mobileOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-6 bg-white transition-all duration-300 origin-center ${
                mobileOpen ? "-rotate-45 -translate-y-[5px]" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* ── Mobile Full-Screen Overlay ── */}
      <div
        className={`fixed inset-0 z-40 bg-navy transition-all duration-500 lg:hidden ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, i) => {
            const isActive = activeSection === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`font-heading text-2xl uppercase tracking-[0.12em] transition-all duration-300 ${
                  isActive ? "text-gold" : "text-white hover:text-gold"
                }`}
                style={{
                  transitionDelay: mobileOpen ? `${i * 75}ms` : "0ms",
                  transform: mobileOpen ? "translateY(0)" : "translateY(20px)",
                  opacity: mobileOpen ? 1 : 0,
                }}
              >
                {link.label}
                {isActive && (
                  <span className="block h-[2px] w-full bg-gold mt-1" />
                )}
              </a>
            );
          })}

          {/* Mobile CTA */}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="mt-4 bg-gold text-navy px-8 py-3 font-heading font-semibold uppercase text-sm tracking-wide transition-all duration-200 hover:bg-gold-dark"
            style={{
              transitionDelay: mobileOpen
                ? `${navLinks.length * 75}ms`
                : "0ms",
              opacity: mobileOpen ? 1 : 0,
            }}
          >
            Deploy Our Team
          </a>
        </div>
      </div>
    </>
  );
}
