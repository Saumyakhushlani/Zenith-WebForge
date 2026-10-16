"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { num: "01.", label: "Overview", href: "/#overview" },
    { num: "02.", label: "Itinerary", href: "/#itinerary" },
    { num: "03.", label: "Rules", href: "/#rules" },
    { num: "04.", label: "FAQ", href: "/#faq" },
    { num: "05.", label: "Contacts", href: "/#contact" },
    { num: "06.", label: "Squad Roster", href: "/register?tab=lookup" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#fdfbf7] border-b-[3px] border-[#2d2d2d] shadow-sm">
      {/* Top Sketch Strip */}
      <div className="bg-[#fff9c4] text-[#2d2d2d] text-xs sm:text-sm font-patrick px-3 sm:px-6 py-1 sm:py-1.5 flex items-center justify-between border-b-2 border-dashed border-[#2d2d2d] overflow-hidden whitespace-nowrap">
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#ff4d4d] border border-[#2d2d2d] flex-shrink-0"></span>
          <span className="font-bold truncate text-xs sm:text-sm">MANIT Bhopal • Zenith</span>
          <span className="text-zinc-500">•</span>
          <span className="font-bold text-[#ff4d4d] whitespace-nowrap">22nd Oct 2026</span>
          <span className="hidden sm:inline text-zinc-500">•</span>
          <span className="hidden sm:inline font-bold">12-Hour Sprint</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 text-xs md:text-sm font-bold flex-shrink-0">
          <span className="hidden md:inline text-zinc-600">Edition 2026</span>
          <span className="bg-[#2d5da1] text-white px-2 py-0.5 border border-[#2d2d2d] border-wobbly-sm -rotate-1 text-[10px] sm:text-xs whitespace-nowrap">
            REGISTRATIONS OPEN
          </span>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 min-h-[4.25rem] sm:min-h-[4.75rem] py-2 flex items-center justify-between gap-3 sm:gap-4">
        {/* Brand Lockup */}
        <Link 
          href="/" 
          className="flex items-center gap-2.5 sm:gap-3 group flex-shrink-0"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 bg-black border-2 border-[#2d2d2d] border-wobbly-sm shadow-hand-sm p-1 flex items-center justify-center overflow-hidden flex-shrink-0 group-hover:rotate-6 transition-transform">
            <img 
              src="/zenith-logo-clean.png" 
              alt="Zenith MANIT" 
              className="w-full h-full object-contain" 
            />
          </div>
          <div className="flex flex-col justify-center">
            <div className="text-xl sm:text-2xl xl:text-3xl font-kalam font-bold tracking-tight text-[#2d2d2d] group-hover:text-[#ff4d4d] transition-colors leading-none flex items-center gap-1.5 whitespace-nowrap">
              <span>Web Forge</span>
              <span className="bg-[#ff4d4d] text-white text-[10px] sm:text-xs font-mono px-1.5 py-0.5 rounded border border-[#2d2d2d]">
                2026
              </span>
            </div>
            <span className="text-[11px] sm:text-xs font-patrick text-zinc-600 tracking-wide mt-1 whitespace-nowrap leading-none">
              Zenith • Programming Club MANIT
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-2 xl:gap-4 font-kalam text-sm xl:text-base font-bold flex-shrink min-w-0">
          {navLinks.map((link, idx) => (
            <Link
              key={link.label}
              href={link.href}
              className={`hover:text-[#ff4d4d] transition-all hover:-rotate-1 relative group px-1.5 py-1 whitespace-nowrap flex-shrink-0 ${
                idx % 2 === 0 ? "rotate-0.5" : "-rotate-0.5"
              }`}
            >
              <span className="hidden xl:inline text-zinc-400 mr-1 text-xs">{link.num}</span>
              <span>{link.label}</span>
              <span className="block h-0.5 bg-[#ff4d4d] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-150" />
            </Link>
          ))}
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <Link
            href="/register"
            className="hidden sm:inline-flex items-center gap-1.5 bg-[#ff4d4d] text-white px-3.5 py-2 xl:px-5 xl:py-2.5 font-kalam font-bold text-sm sm:text-base xl:text-lg border-2 sm:border-[3px] border-[#2d2d2d] border-wobbly-sm shadow-hand-sm xl:shadow-hand hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all rotate-1 hover:rotate-0 whitespace-nowrap flex-shrink-0"
          >
            <span>Register Squad!</span>
            <ArrowUpRight className="w-4 h-4 xl:w-5 xl:h-5 stroke-[2.5]" />
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 sm:p-2.5 border-2 border-[#2d2d2d] bg-white border-wobbly-sm shadow-hand-sm hover:bg-[#fff9c4] transition-colors flex-shrink-0"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.15 }}
            className="lg:hidden border-t-2 border-dashed border-[#2d2d2d] bg-[#fdfbf7] p-5 sm:p-6 space-y-3 font-kalam text-lg sm:text-xl"
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 py-2 hover:text-[#ff4d4d] border-b border-[#e5e0d8]"
              >
                <span className="text-[#ff4d4d] font-bold text-xs font-mono">{link.num}</span>
                <span>{link.label}</span>
              </Link>
            ))}
            <div className="pt-2">
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#ff4d4d] text-white py-2.5 sm:py-3 border-[3px] border-[#2d2d2d] border-wobbly-sm shadow-hand font-kalam font-bold text-lg sm:text-xl"
              >
                <span>Register Squad!</span>
                <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
