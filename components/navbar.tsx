"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { List, X, Moon, Sun } from "@phosphor-icons/react/dist/ssr";
import { motion, AnimatePresence } from "framer-motion";

interface SubLink {
  name: string;
  href: string;
}

interface NavLink {
  name: string;
  href: string;
  children?: SubLink[];
}

import { SearchBar } from "@/components/search-bar";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Accordion states for mobile
  const [mobileStrategiesOpen, setMobileStrategiesOpen] = useState(false);
  const [mobileDealPacksOpen, setMobileDealPacksOpen] = useState(false);

  // Dropdown states for desktop
  const [strategiesOpen, setStrategiesOpen] = useState(false);
  const [dealPacksOpen, setDealPacksOpen] = useState(false);
  const strategiesTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dealPacksTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleStrategiesEnter = () => {
    if (strategiesTimeoutRef.current) clearTimeout(strategiesTimeoutRef.current);
    setStrategiesOpen(true);
  };
  const handleStrategiesLeave = () => {
    strategiesTimeoutRef.current = setTimeout(() => {
      setStrategiesOpen(false);
    }, 150);
  };

  const handleDealPacksEnter = () => {
    if (dealPacksTimeoutRef.current) clearTimeout(dealPacksTimeoutRef.current);
    setDealPacksOpen(true);
  };
  const handleDealPacksLeave = () => {
    dealPacksTimeoutRef.current = setTimeout(() => {
      setDealPacksOpen(false);
    }, 150);
  };

  const navLinks: NavLink[] = [
    { name: "Home", href: "/" },
    { name: "Opportunities", href: "/opportunities" },
    {
      name: "Strategies",
      href: "/opportunities",
      children: [
        { name: "Serviced Accommodation", href: "/opportunities?strategy=Serviced+Accommodation" },
        { name: "Council Leasing", href: "/opportunities?strategy=Council+Leasing" },
        { name: "Rent-to-Rent", href: "/opportunities?strategy=Rent-to-Rent" },
      ],
    },
    { name: "Process", href: "/#process" },
    { name: "FAQ", href: "/#faq" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <div className="fixed top-4 left-0 right-0 z-50 px-4 md:px-6 transition-all duration-300">
      <nav
        className={`w-full rounded-full border transition-all duration-300 flex items-center justify-between ${
          scrolled
            ? "bg-white/90 backdrop-blur-lg border-white/20 shadow-[0_12px_40px_rgba(0,0,0,0.12)] py-2.5 md:py-3 px-5 md:px-8"
            : "bg-white/75 backdrop-blur-md border-white/15 shadow-md py-3 md:py-4 px-5 md:px-10"
        }`}
      >
        <Link href="#" className="flex items-center gap-1 group">
          <Image
            src="/Rent4you-light-mode.png"
            alt="Rent4uSolutions"
            width={180}
            height={44}
            className="h-9 md:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-102"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => {
              const hasChildren = !!link.children;
              const isOpen = link.name === "Strategies" ? strategiesOpen : dealPacksOpen;
              const handleEnter = link.name === "Strategies" ? handleStrategiesEnter : handleDealPacksEnter;
              const handleLeave = link.name === "Strategies" ? handleStrategiesLeave : handleDealPacksLeave;

              if (hasChildren) {
                return (
                  <li
                    key={link.name}
                    className="relative py-2"
                    onMouseEnter={handleEnter}
                    onMouseLeave={handleLeave}
                  >
                    <button
                      onClick={() => {
                        if (link.name === "Strategies") setStrategiesOpen(!strategiesOpen);
                        if (link.name === "Deal Packs") setDealPacksOpen(!dealPacksOpen);
                      }}
                      className="flex items-center gap-1 text-xs lg:text-sm font-medium text-slate-900/80 hover:text-primary transition-colors cursor-pointer"
                    >
                      <span>{link.name}</span>
                      <svg
                        className={`h-3 w-3 transition-transform duration-300 ${isOpen ? "rotate-180 text-primary" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-[calc(100%+2px)] left-1/2 -translate-x-1/2 mt-1 w-56 bg-surface border border-border-subtle rounded-2xl shadow-2xl p-2 z-50 text-left backdrop-blur-md"
                        >
                          {link.children?.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              className="block px-4 py-2.5 text-xs lg:text-sm font-medium text-slate-900/80 hover:bg-primary/10 hover:text-primary rounded-xl transition-all"
                            >
                              {child.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              }

              return (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-xs lg:text-sm font-medium text-slate-900/80 hover:text-primary transition-colors relative group py-1"
                  >
                    {link.name}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-4 border-l border-border-subtle pl-4">
            <SearchBar variant="compact" />
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-9 h-9 rounded-full bg-white hover:bg-primary/10 border border-border-subtle flex items-center justify-center text-slate-500 hover:text-primary transition-colors cursor-pointer"
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}
            <Link
              href="#contact"
              className="px-5 py-2.5 rounded-full bg-primary hover:bg-primary-hover text-white font-bold text-xs lg:text-sm shadow-md transition-all hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] hover:-translate-y-0.5 active:scale-95"
            >
              Join Investor List
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-3">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-9 h-9 rounded-full bg-white/50 border border-border-subtle flex items-center justify-center text-slate-500 hover:text-primary transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-9 h-9 rounded-full bg-white/50 border border-border-subtle flex items-center justify-center text-slate-900 hover:text-primary focus:outline-none transition-colors"
          >
            {mobileMenuOpen ? <X size={20} /> : <List size={20} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="md:hidden absolute top-[calc(100%+0.75rem)] left-4 right-4 bg-white dark:bg-slate-900 border border-border-subtle px-6 py-6 shadow-2xl rounded-3xl flex flex-col gap-4 z-50">
              {navLinks.map((link) => {
              const hasChildren = !!link.children;
              const isAccordionOpen = link.name === "Strategies" ? mobileStrategiesOpen : mobileDealPacksOpen;
              const toggleAccordion = () => {
                if (link.name === "Strategies") setMobileStrategiesOpen(!mobileStrategiesOpen);
                if (link.name === "Deal Packs") setMobileDealPacksOpen(!mobileDealPacksOpen);
              };

              if (hasChildren) {
                return (
                  <div key={link.name} className="flex flex-col border-b border-border-subtle/50 py-1">
                    <button
                      onClick={toggleAccordion}
                      className="flex items-center justify-between text-base font-bold text-slate-900 py-2 hover:text-primary transition-colors w-full text-left"
                    >
                      <span>{link.name}</span>
                      <svg
                        className={`h-4 w-4 transition-transform duration-300 ${isAccordionOpen ? "rotate-180 text-primary" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    <AnimatePresence>
                      {isAccordionOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden pl-4 flex flex-col gap-2 py-2 bg-black/5  rounded-xl mt-1"
                        >
                          {link.children?.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              className="text-sm font-medium text-slate-900/80 py-1.5 hover:text-primary transition-colors"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {child.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-base font-semibold text-slate-900 py-2 border-b border-border-subtle/50 hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              );
            })}
            <Link
              href="#contact"
              className="mt-2 w-full text-center py-3 rounded-2xl bg-primary hover:bg-primary-hover text-white font-bold shadow-md transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Join Investor List
            </Link>
          </motion.div>
        )}
        </AnimatePresence>
      </nav>
    </div>
  );
}
