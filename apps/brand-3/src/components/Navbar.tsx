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
    const sectionIds = navLinks.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${id}`);
          }
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleLinkClick = useCallback(
    (href: string) => {
      setActiveSection(href);
      setMobileOpen(false);
      const el = document.getElementById(href.replace("#", ""));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    },
    []
  );

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#1B4332]/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a
              href="#"
              className="flex items-center gap-3 group"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <Image
                src="/images/logo-icon.png"
                alt="Oceantech logo"
                width={40}
                height={40}
                className="w-8 h-8 md:w-10 md:h-10"
              />
              <div className="flex items-baseline gap-1.5">
                <span className="font-display text-[#FAF3E8] text-lg md:text-xl tracking-wide">
                  OCEANTECH
                </span>
                <span className="font-heading font-semibold text-[#C1440E] text-sm md:text-base">
                  OFFSHORE
                </span>
              </div>
            </a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className={`relative font-body font-medium text-sm transition-colors duration-300 ${
                    activeSection === link.href
                      ? "text-[#C1440E]"
                      : "text-[#FAF3E8]/80 hover:text-[#C1440E]"
                  }`}
                >
                  {link.label}
                  {activeSection === link.href && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#C1440E] rounded-full" />
                  )}
                </a>
              ))}

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick("#contact");
                }}
                className="bg-[#C1440E] text-[#FAF3E8] px-6 py-2 rounded-sm font-body font-medium text-sm transition-colors duration-300 hover:bg-[#A33A0C]"
              >
                Tell Us What You Need
              </a>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] group"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <span
                className={`block w-6 h-[2px] bg-[#FAF3E8] transition-all duration-300 origin-center ${
                  mobileOpen ? "rotate-45 translate-y-[7px]" : ""
                }`}
              />
              <span
                className={`block w-6 h-[2px] bg-[#FAF3E8] transition-all duration-300 ${
                  mobileOpen ? "opacity-0 scale-x-0" : ""
                }`}
              />
              <span
                className={`block w-6 h-[2px] bg-[#FAF3E8] transition-all duration-300 origin-center ${
                  mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#1B4332] transition-all duration-500 lg:hidden ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.href);
              }}
              className={`font-body font-medium text-xl transition-colors duration-300 ${
                activeSection === link.href
                  ? "text-[#C1440E]"
                  : "text-[#FAF3E8] hover:text-[#C1440E]"
              }`}
            >
              {link.label}
            </a>
          ))}

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick("#contact");
            }}
            className="mt-4 bg-[#C1440E] text-[#FAF3E8] px-8 py-3 rounded-sm font-body font-medium text-lg transition-colors duration-300 hover:bg-[#A33A0C]"
          >
            Tell Us What You Need
          </a>
        </div>
      </div>
    </>
  );
}
