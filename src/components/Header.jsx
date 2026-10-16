"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Sparkles, ArrowUpRight } from "lucide-react";
import { Tape } from "./HandDrawnSvg";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "01. Overview", href: "/#overview" },
    { label: "02. Itinerary", href: "/#itinerary" },
    { label: "03. Rules", href: "/#rules" },
    { label: "04. FAQ", href: "/#faq" },
    { label: "05. Contacts", href: "/#contact" },
    { label: "06. Squad Roster", href: "/register?tab=lookup" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#fdfbf7] border-b-[3px] border-[#2d2d2d] shadow-sm">
      {/* Top Sketch Strip */}
      <div className="bg-[#fff9c4] text-[#2d2d2d] text-xs sm:text-sm font-patrick px-3 sm:px-4 py-1 sm:py-1.5 flex items-center justify-between border-b-2 border-dashed border-[#2d2d2d] overflow-hidden">
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Lockup */}
        <Link 
          href="/" 
          className="flex items-center gap-2.5 sm:gap-3 group"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 bg-black border-2 border-[#2d2d2d] border-wobbly-sm shadow-hand-sm p-1 flex items-center justify-center overflow-hidden flex-shrink-0 group-hover:rotate-6 transition-transform">
            <img 
              src="/zenith-logo-clean.png" 
              alt="Zenith MANIT" 
              className="w-full h-full object-contain" 
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl md:text-3xl font-kalam font-bold tracking-tight text-[#2d2d2d] group-hover:text-[#ff4d4d] transition-colors leading-none flex items-center gap-1.5">
              <span>Web Forge</span>
              <span className="bg-[#ff4d4d] text-white text-[10px] sm:text-xs font-mono px-1.5 py-0.5 rounded border border-[#2d2d2d]">
                2026
              </span>
            </span>
            <span className="text-xs sm:text-sm font-patrick text-zinc-600 tracking-wide mt-0.5">
              Zenith • Programming Club MANIT
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 font-kalam text-lg font-bold">
          {navLinks.map((link, idx) => (
            <Link
              key={link.label}
              href={link.href}
              className={`hover:text-[#ff4d4d] transition-all hover:-rotate-1 relative group px-2 py-1 ${
                idx % 2 === 0 ? "rotate-0.5" : "-rotate-0.5"
              }`}
            >
              <span>{link.label}</span>
              <span className="block h-0.5 bg-[#ff4d4d] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-150" />
            </Link>
          ))}
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-4">
          <Link
            href="/register"
            className="hidden sm:inline-flex items-center gap-2 bg-[#ff4d4d] text-white px-6 py-2.5 font-kalam font-bold text-lg border-[3px] border-[#2d2d2d] border-wobbly-sm shadow-hand hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hand-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all rotate-1 hover:rotate-0"
          >
            <span>Register Squad!</span>
            <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 border-2 border-[#2d2d2d] bg-white border-wobbly-sm shadow-hand-sm hover:bg-[#fff9c4] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 stroke-[2.5]" /> : <Menu className="w-6 h-6 stroke-[2.5]" />}
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
            className="lg:hidden border-t-2 border-dashed border-[#2d2d2d] bg-[#fdfbf7] p-6 space-y-4 font-kalam text-xl"
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 hover:text-[#ff4d4d] border-b border-[#e5e0d8]"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#ff4d4d] text-white py-3 border-[3px] border-[#2d2d2d] border-wobbly-sm shadow-hand font-kalam font-bold text-xl"
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
