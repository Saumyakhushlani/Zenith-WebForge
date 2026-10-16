"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FaqAccordion from "@/components/FaqAccordion";
import { 
  ArrowUpRight, 
  Cpu, 
  Video, 
  GitBranch, 
  ShieldCheck, 
  Check, 
  Sparkles, 
  Clock, 
  Users, 
  Flame,
  Award,
  ChevronDown,
  ChevronUp,
  Bot,
  Laptop,
  Lightbulb,
  Zap,
  GraduationCap,
  School,
  FileText,
  ClipboardList,
  Rocket,
  HelpCircle,
  PenTool,
  Calendar,
  Phone,
  Mail
} from "lucide-react";
import { 
  WavyUnderline, 
  DoodleArrow, 
  ScribbleCircle, 
  StarDoodle, 
  Tape, 
  Pin 
} from "@/components/HandDrawnSvg";

export default function Home() {
  const [showFullSchedule, setShowFullSchedule] = useState(false);

  const fullItinerary = [
    { time: "08:30 AM", title: "Check-in & Roll Call", desc: "Teams join the main Google Meet call. Attendance logged and squad rooms checked.", tag: "Stage 00", bg: "bg-white", isKey: true },
    { time: "09:00 AM", title: "Opening & Problem Statement Reveal", desc: "Rules rundown and official problem tracks revealed to all teams.", tag: "Kickoff", bg: "bg-[#fff9c4]", highlight: true, isKey: true },
    { time: "09:30 AM", title: "Mentor Session 1: Architecture Check", desc: "Mentors visit breakout rooms to validate database schemas and tech stack decisions.", tag: "Mentor 1", bg: "bg-white", isKey: false },
    { time: "10:30 AM", title: "Sprint 1: Frontend & Routing", desc: "Core hacking begins. Focus on wireframes, UI layouts, and core route scaffolding.", tag: "Coding", bg: "bg-white", isKey: false },
    { time: "11:30 AM", title: "Mentor Session 2: UI/UX & Routing", desc: "Mentors ensure frontend foundation is clean and nobody is blocked on CSS.", tag: "Mentor 2", bg: "bg-white", isKey: false },
    { time: "01:30 PM", title: "Sprint 2: Backend & APIs", desc: "Focus shifts to server-side mutations, databases, logic, and external API hooks.", tag: "Coding", bg: "bg-white", isKey: false },
    { time: "02:30 PM", title: "Mentor Session 3: Backend & Integration", desc: "Reviewing database connections, endpoints, authentication, and state flow.", tag: "Mentor 3", bg: "bg-white", isKey: false },
    { time: "04:30 PM", title: "Mentor Session 4: The 'Mid-Point Crisis'", desc: "Strict velocity audit. Teams behind schedule cut non-essential scope to save their MVP.", tag: "Triage", bg: "bg-[#fff9c4]", isKey: true },
    { time: "06:30 PM", title: "Mentor Session 5: Pre-Deployment Check", desc: "Resolving lingering CORS issues, environment variables, and build bugs.", tag: "Mentor 5", bg: "bg-white", isKey: false },
    { time: "07:30 PM", title: "Final Polish & Deployment Kickoff", desc: "Deploy to Vercel/Render immediately to catch last-minute pipeline glitches early.", tag: "Deploy", bg: "bg-white", isKey: false },
    { time: "09:00 PM", title: "Hacking Ends (Hard Cutoff!)", desc: "Permanent code freeze. Form closes. Zero late pushes permitted.", tag: "Freeze", bg: "bg-[#ff4d4d] text-white", alert: true, isKey: true },
    { time: "09:15 PM", title: "Pitching & Jury Judging", desc: "Each squad gets exactly 3 minutes of live screen demo + 2 minutes of judge Q&A.", tag: "Judging", bg: "bg-[#fff9c4]", highlight: true, isKey: true },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfbf7] text-[#2d2d2d] font-patrick paper-dots pb-16 sm:pb-0">
      <Header />

      {/* =========================================================================
          HERO SECTION
      ========================================================================== */}
      <section className="relative pt-8 pb-14 md:py-20 overflow-hidden border-b-[3px] border-[#2d2d2d]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          {/* Top Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4 md:mb-6">
            <span className="inline-flex items-center gap-1.5 bg-[#fff9c4] text-[#2d2d2d] px-3 py-1 border-2 border-[#2d2d2d] border-wobbly-sm shadow-hand-sm font-kalam font-bold text-xs sm:text-sm -rotate-1">
              <PenTool className="w-3.5 h-3.5 text-[#ff4d4d]" />
              <span>Zenith Coding Society • MANIT Bhopal</span>
            </span>
            <span className="inline-flex items-center gap-1.5 bg-[#ff4d4d] text-white px-3 py-1 border-2 border-[#2d2d2d] border-wobbly-sm shadow-hand-sm font-kalam font-bold text-xs sm:text-sm rotate-1">
              <Calendar className="w-3.5 h-3.5 text-white" />
              <span>22nd Oct 2026 • Virtual</span>
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Narrative & Primary CTA */}
            <div className="lg:col-span-7 space-y-4 md:space-y-6">
              
              <div className="relative inline-block">
                <h1 className="text-4xl sm:text-6xl md:text-8xl font-kalam font-bold tracking-tight text-[#2d2d2d] leading-[0.95]">
                  Web <span className="text-[#ff4d4d] inline-block -rotate-2">Forge</span> !
                </h1>
                <div className="w-32 sm:w-56 mt-1">
                  <WavyUnderline className="text-[#ff4d4d]" />
                </div>
              </div>

              <p className="text-lg sm:text-2xl md:text-3xl font-patrick text-zinc-800 leading-snug">
                The 12-hour virtual coding sprint for <strong className="text-[#2d2d2d] underline decoration-wavy decoration-[#ff4d4d]">MANIT Bhopal</strong> students.
              </p>

              <p className="text-base sm:text-lg text-zinc-600 leading-relaxed">
                Go from a messy napkin idea to a deployed MVP in half a day. AI coding tools (Cursor, Claude, Copilot) are 100% encouraged!
              </p>

              {/* Instant Tap Actions */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 relative">
                <Link
                  href="/register/create"
                  className="inline-flex items-center justify-center gap-2 bg-[#ff4d4d] text-white px-7 py-3.5 font-kalam font-bold text-xl sm:text-2xl border-[3px] border-[#2d2d2d] border-wobbly-sm shadow-hand hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hand-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all rotate-1 hover:rotate-0"
                >
                  <span>Create Team!</span>
                  <ArrowUpRight className="w-5 h-5 stroke-[3]" />
                </Link>

                <Link
                  href="/register/join"
                  className="inline-flex items-center justify-center gap-2 bg-white text-[#2d2d2d] px-6 py-3.5 font-kalam font-bold text-lg sm:text-xl border-2 border-[#2d2d2d] border-wobbly-md shadow-hand-sm hover:bg-[#fff9c4] transition-all -rotate-1 hover:rotate-0"
                >
                  <span>Have a Code? Join</span>
                </Link>

                {/* Hand-Drawn Arrow (Desktop) */}
                <div className="hidden md:block absolute -right-24 -top-12 w-24 h-16 pointer-events-none">
                  <DoodleArrow className="text-[#2d5da1]" />
                  <span className="text-xs font-kalam font-bold text-[#2d5da1] block -mt-2 rotate-6">
                    start here!
                  </span>
                </div>
              </div>

            </div>

            {/* Right: Summary Card */}
            <div className="hidden lg:block lg:col-span-5 relative">
              <div className="bg-[#fff9c4] border-[3px] border-[#2d2d2d] border-wobbly-lg p-7 shadow-hand-lg relative rotate-2 hover:rotate-0 transition-transform duration-150">
                <Pin />

                <div className="flex items-center justify-between pb-3 border-b-2 border-dashed border-[#2d2d2d]">
                  <span className="font-kalam font-bold text-base text-[#2d2d2d] flex items-center gap-1.5">
                    <ClipboardList className="w-4 h-4 text-[#2d5da1]" />
                    <span>Quick Cheat Sheet</span>
                  </span>
                  <span className="bg-[#ff4d4d] text-white text-xs font-kalam px-2.5 py-0.5 border border-[#2d2d2d] border-wobbly-sm -rotate-3">
                    12H SPRINT
                  </span>
                </div>

                <div className="py-5 space-y-3 font-patrick text-lg text-zinc-800">
                  <div className="flex items-start gap-2.5">
                    <Calendar className="w-5 h-5 text-[#ff4d4d] flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-bold text-[#2d2d2d]">Event Date:</strong> 22nd October 2026 (Virtual on Google Meet).
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Clock className="w-5 h-5 text-[#2d5da1] flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-bold text-[#2d2d2d]">12 Hours:</strong> 08:30 AM to 09:15 PM online.
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Users className="w-5 h-5 text-[#ff4d4d] flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-bold text-[#2d2d2d]">Team Size:</strong> Strictly 3 members (1 Girl Compulsory).
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Bot className="w-5 h-5 text-[#2d5da1] flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-bold text-[#2d2d2d]">AI Tools 100% Legal:</strong> Cursor, Claude, Copilot fully allowed.
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Laptop className="w-5 h-5 text-[#2d2d2d] flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-bold text-[#2d2d2d]">Screen Sharing:</strong> At least 1 member sharing screen in Meet breakout room.
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t-2 border-dashed border-[#2d2d2d] flex items-center justify-between font-kalam text-xs">
                  <span className="text-zinc-600">Platform: Google Meet</span>
                  <span className="text-[#ff4d4d] font-bold">MANIT Bhopal Only!</span>
                </div>
              </div>
            </div>

          </div>

          {/* 4 Compact Stat Badges */}
          <div className="mt-8 md:mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            <div className="bg-white border-2 md:border-[3px] border-[#2d2d2d] border-wobbly-sm p-3.5 sm:p-5 shadow-hand text-center -rotate-1">
              <div className="text-3xl sm:text-5xl font-kalam font-bold text-[#2d2d2d] leading-none mb-1">
                12h
              </div>
              <div className="text-sm sm:text-base font-patrick text-zinc-600">
                Non-Stop Sprint
              </div>
            </div>

            <div className="bg-[#fff9c4] border-2 md:border-[3px] border-[#2d2d2d] border-wobbly-md p-3.5 sm:p-5 shadow-hand text-center rotate-1">
              <div className="text-3xl sm:text-5xl font-kalam font-bold text-[#2d2d2d] leading-none mb-1">
                3
              </div>
              <div className="text-sm sm:text-base font-patrick text-zinc-600">
                Members / Squad (Strict)
              </div>
            </div>

            <div className="bg-white border-2 md:border-[3px] border-[#2d2d2d] border-wobbly-alt p-3.5 sm:p-5 shadow-hand text-center -rotate-1">
              <div className="text-3xl sm:text-5xl font-kalam font-bold text-[#2d5da1] leading-none mb-1">
                100%
              </div>
              <div className="text-sm sm:text-base font-patrick text-zinc-600">
                AI Permitted
              </div>
            </div>

            <div className="bg-[#fff9c4] border-2 md:border-[3px] border-[#2d2d2d] border-wobbly-sm p-3.5 sm:p-5 shadow-hand text-center rotate-1">
              <div className="text-3xl sm:text-5xl font-kalam font-bold text-[#ff4d4d] leading-none mb-1">
                &ge;1
              </div>
              <div className="text-sm sm:text-base font-patrick text-zinc-600">
                Female Teammate
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 01 // OVERVIEW & ELIGIBILITY
      ========================================================================== */}
      <section id="overview" className="py-12 md:py-16 border-b-[3px] border-[#2d2d2d] bg-[#fdfbf7]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-xl mx-auto mb-8 md:mb-12">
            <span className="inline-block bg-[#e5e0d8] text-[#2d2d2d] px-3 py-0.5 font-kalam font-bold text-xs border border-[#2d2d2d] border-wobbly-sm mb-2">
              01 // Overview
            </span>
            <h2 className="text-3xl sm:text-5xl font-kalam font-bold text-[#2d2d2d] flex items-center justify-center gap-2">
              <span>About Web Forge</span>
              <Lightbulb className="w-7 h-7 text-[#ff4d4d]" />
            </h2>
            <div className="w-36 mx-auto mt-1">
              <WavyUnderline className="text-[#2d5da1]" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            {/* Story Card */}
            <div className="md:col-span-7 bg-white border-2 md:border-[3px] border-[#2d2d2d] border-wobbly-md p-6 sm:p-8 shadow-hand relative">
              <Tape rotate="-1deg" />

              <h3 className="text-2xl sm:text-3xl font-kalam font-bold mb-3 text-[#2d2d2d]">
                Zero to Deployed MVP in 12 Hours
              </h3>

              <div className="space-y-3 font-patrick text-lg sm:text-xl text-zinc-800 leading-relaxed">
                <p>
                  Hosted by <strong className="text-[#2d2d2d]">Zenith</strong>, the coding society of MANIT Bhopal. This virtual sprint tests rapid prototyping, architecture, and your ability to ship under pressure.
                </p>
                <p>
                  No pitch decks without code. Submit a working GitHub repository and an accessible live deployment link (Vercel, Render) by the 12th hour.
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-2 text-sm font-kalam font-bold">
                <span className="inline-flex items-center gap-1 bg-[#fff9c4] px-3 py-1 border border-[#2d2d2d] border-wobbly-sm">
                  <Zap className="w-3.5 h-3.5 text-[#ff4d4d]" />
                  <span>Rapid Prototyping</span>
                </span>
                <span className="inline-flex items-center gap-1 bg-[#e5e0d8] px-3 py-1 border border-[#2d2d2d] border-wobbly-sm">
                  <Award className="w-3.5 h-3.5 text-[#2d5da1]" />
                  <span>5 Mentor Checkpoints</span>
                </span>
              </div>
            </div>

            {/* Eligibility Note */}
            <div className="md:col-span-5 bg-[#fff9c4] border-2 md:border-[3px] border-[#2d2d2d] border-wobbly-lg p-6 sm:p-8 shadow-hand relative">
              <Pin />

              <h3 className="text-2xl sm:text-3xl font-kalam font-bold mb-3 text-[#2d2d2d] flex items-center gap-2">
                <span>Eligibility & Format</span>
                <GraduationCap className="w-6 h-6 text-[#2d5da1]" />
              </h3>

              <ul className="space-y-3 font-patrick text-base sm:text-lg text-zinc-800">
                <li className="flex items-start gap-2.5">
                  <School className="w-5 h-5 text-[#ff4d4d] flex-shrink-0 mt-0.5" />
                  <span><strong>MANIT Students:</strong> Open to all UG engineers (1st to 4th Year).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Users className="w-5 h-5 text-[#2d5da1] flex-shrink-0 mt-0.5" />
                  <span><strong>Team Size:</strong> Strictly 3 members (1 Girl Compulsory).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Sparkles className="w-5 h-5 text-[#ff4d4d] flex-shrink-0 mt-0.5" />
                  <span><strong className="text-[#ff4d4d]">Diversity:</strong> Exactly 1 female developer mandatory per 3-person team.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Laptop className="w-5 h-5 text-[#2d2d2d] flex-shrink-0 mt-0.5" />
                  <span><strong>Format:</strong> Google Meet + private breakout rooms.</span>
                </li>
              </ul>

              <div className="mt-6 pt-4 border-t-2 border-dashed border-[#2d2d2d]">
                <Link
                  href="/register/create"
                  className="w-full inline-block text-center bg-[#2d2d2d] text-white hover:bg-[#ff4d4d] py-3 font-kalam font-bold text-lg border-2 border-[#2d2d2d] border-wobbly-sm shadow-hand-sm transition-all"
                >
                  Create Team Now &rarr;
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 02 // TIMELINE
      ========================================================================== */}
      <section id="itinerary" className="py-12 md:py-16 border-b-[3px] border-[#2d2d2d] bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-xl mx-auto mb-8 md:mb-12">
            <span className="inline-block bg-[#fff9c4] text-[#2d2d2d] px-3 py-0.5 font-kalam font-bold text-xs border border-[#2d2d2d] border-wobbly-sm mb-2">
              02 // Schedule
            </span>
            <h2 className="text-3xl sm:text-5xl font-kalam font-bold text-[#2d2d2d] flex items-center justify-center gap-2">
              <span>12-Hour Timeline</span>
              <Clock className="w-7 h-7 text-[#ff4d4d]" />
            </h2>
            <div className="w-40 mx-auto mt-1">
              <WavyUnderline className="text-[#ff4d4d]" />
            </div>
            <p className="text-base sm:text-lg font-patrick text-zinc-600 mt-2">
              <span className="font-bold text-[#2d2d2d] bg-[#fff9c4] px-2 py-0.5 border border-[#2d2d2d] border-wobbly-sm mr-1">22nd October 2026</span>
              From 08:30 AM check-in to 09:15 PM live pitch.
            </p>
          </div>

          {/* Timeline Cards */}
          <div className="space-y-3">
            {fullItinerary
              .filter((item) => (showFullSchedule ? true : item.isKey))
              .map((item, idx) => (
                <div
                  key={item.time}
                  className={`border-2 md:border-[3px] border-[#2d2d2d] border-wobbly-sm p-4 sm:p-5 shadow-hand flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 ${item.bg}`}
                >
                  <div className="flex items-center gap-3 min-w-[190px]">
                    <span className={`px-2.5 py-0.5 font-kalam text-xs font-bold border border-[#2d2d2d] border-wobbly-pill ${
                      item.alert 
                        ? "bg-white text-[#ff4d4d]" 
                        : item.highlight 
                        ? "bg-[#ff4d4d] text-white" 
                        : "bg-[#2d2d2d] text-white"
                    }`}>
                      {item.tag}
                    </span>
                    <span className="font-kalam text-xl sm:text-2xl font-bold tracking-tight">
                      {item.time}
                    </span>
                  </div>

                  <div className="flex-1">
                    <h4 className="font-kalam text-xl font-bold text-[#2d2d2d]">
                      {item.title}
                    </h4>
                    <p className={`text-base font-patrick ${item.alert ? "text-white" : "text-zinc-700"}`}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
          </div>

          {/* Toggle */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setShowFullSchedule(!showFullSchedule)}
              className="inline-flex items-center gap-2 bg-[#fdfbf7] text-[#2d2d2d] border-2 border-[#2d2d2d] border-wobbly-sm px-6 py-2.5 font-kalam font-bold text-base shadow-hand-sm hover:bg-[#fff9c4] transition-all"
            >
              <span>{showFullSchedule ? "Show Key Milestones Only" : "Show Complete 12-Hour Checkpoints (12 steps)"}</span>
              {showFullSchedule ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 03 // CORE RULES
      ========================================================================== */}
      <section id="rules" className="py-12 md:py-16 border-b-[3px] border-[#2d2d2d] bg-[#fdfbf7] paper-dots">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-xl mx-auto mb-8 md:mb-12">
            <span className="inline-block bg-[#e5e0d8] text-[#2d2d2d] px-3 py-0.5 font-kalam font-bold text-xs border border-[#2d2d2d] border-wobbly-sm mb-2">
              03 // Rules
            </span>
            <h2 className="text-3xl sm:text-5xl font-kalam font-bold text-[#2d2d2d] flex items-center justify-center gap-2">
              <span>Rules & Guidelines</span>
              <FileText className="w-7 h-7 text-[#2d5da1]" />
            </h2>
            <div className="w-40 mx-auto mt-1">
              <WavyUnderline className="text-[#2d5da1]" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            
            {/* Rule 1 */}
            <div className="bg-[#fff9c4] border-2 md:border-[3px] border-[#2d2d2d] border-wobbly-md p-6 shadow-hand relative">
              <Pin />
              <div className="flex items-center gap-2.5 mb-2">
                <Bot className="w-6 h-6 text-[#2d5da1]" />
                <h3 className="text-2xl font-kalam font-bold text-[#2d2d2d]">
                  The AI Mandate
                </h3>
              </div>
              <p className="text-lg font-patrick text-zinc-800">
                All AI tools (Cursor, Claude, Copilot, ChatGPT) are <strong>100% permitted</strong>. Judging focuses on utility, architecture, and execution.
              </p>
            </div>

            {/* Rule 2 */}
            <div className="bg-white border-2 md:border-[3px] border-[#2d2d2d] border-wobbly-lg p-6 shadow-hand relative">
              <Tape rotate="1deg" />
              <div className="flex items-center gap-2.5 mb-2">
                <Video className="w-6 h-6 text-[#ff4d4d]" />
                <h3 className="text-2xl font-kalam font-bold text-[#2d2d2d]">
                  Screen Sharing Mandate
                </h3>
              </div>
              <p className="text-lg font-patrick text-zinc-800">
                At least <strong>one team member must actively stream screens</strong> in their Google Meet room to verify live hacking.
              </p>
            </div>

            {/* Rule 3 */}
            <div className="bg-white border-2 md:border-[3px] border-[#2d2d2d] border-wobbly-alt p-6 shadow-hand relative">
              <Tape rotate="-1deg" />
              <div className="flex items-center gap-2.5 mb-2">
                <GitBranch className="w-6 h-6 text-emerald-600" />
                <h3 className="text-2xl font-kalam font-bold text-[#2d2d2d]">
                  Fresh Code Only
                </h3>
              </div>
              <p className="text-lg font-patrick text-zinc-800">
                No pre-existing apps. Starter templates and libraries are fine, but core application logic must be authored within the 12 hours.
              </p>
            </div>

            {/* Rule 4 */}
            <div className="bg-[#fff9c4] border-2 md:border-[3px] border-[#2d2d2d] border-wobbly-sm p-6 shadow-hand relative">
              <Pin />
              <div className="flex items-center gap-2.5 mb-2">
                <Rocket className="w-6 h-6 text-[#ff4d4d]" />
                <h3 className="text-2xl font-kalam font-bold text-[#2d2d2d]">
                  Submission Criteria
                </h3>
              </div>
              <p className="text-lg font-patrick text-zinc-800">
                A public GitHub repo and a <strong>live deployed endpoint</strong> (Vercel, Render) must be submitted by 09:00 PM IST.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 04 // FAQ ACCORDION
      ========================================================================== */}
      <section id="faq" className="py-12 md:py-16 border-b-[3px] border-[#2d2d2d] bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-xl mx-auto mb-8 md:mb-12">
            <span className="inline-block bg-[#fff9c4] text-[#2d2d2d] px-3 py-0.5 font-kalam font-bold text-xs border border-[#2d2d2d] border-wobbly-sm mb-2">
              04 // Q&A
            </span>
            <h2 className="text-3xl sm:text-5xl font-kalam font-bold text-[#2d2d2d] flex items-center justify-center gap-2">
              <span>Frequently Asked Questions</span>
              <HelpCircle className="w-7 h-7 text-[#ff4d4d]" />
            </h2>
            <div className="w-40 mx-auto mt-1">
              <WavyUnderline className="text-[#ff4d4d]" />
            </div>
          </div>

          <FaqAccordion />

        </div>
      </section>

      {/* =========================================================================
          SECTION 05 // CONTACT & ORGANIZERS
      ========================================================================== */}
      <section id="contact" className="py-12 md:py-16 border-b-[3px] border-[#2d2d2d] bg-[#fdfbf7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-8 md:mb-10">
            <span className="inline-block bg-[#fff9c4] text-[#2d2d2d] px-3 py-0.5 font-kalam font-bold text-xs border border-[#2d2d2d] border-wobbly-sm mb-2">
              05 // Contact
            </span>
            <h2 className="text-3xl sm:text-5xl font-kalam font-bold text-[#2d2d2d] flex items-center justify-center gap-2">
              <span>Organizing Leads</span>
              <Phone className="w-7 h-7 text-[#ff4d4d]" />
            </h2>
            <div className="w-44 mx-auto mt-1">
              <WavyUnderline className="text-[#ff4d4d]" />
            </div>
            <p className="text-base sm:text-lg font-patrick text-zinc-600 mt-2">
              Have questions about team formation, rules, or Google Meet breakout rooms? Ping us directly!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {/* Contact 1 */}
            <div className="bg-white border-[3px] border-[#2d2d2d] border-wobbly-sm p-5 shadow-hand text-center relative -rotate-1 hover:rotate-0 transition-transform">
              <Pin />
              <div className="w-10 h-10 bg-[#ff4d4d] text-white rounded-full border-2 border-[#2d2d2d] flex items-center justify-center mx-auto mb-2 font-kalam font-bold text-base">
                SK
              </div>
              <h3 className="text-xl sm:text-2xl font-kalam font-bold text-[#2d2d2d]">
                Saumya Khushlani
              </h3>
              <p className="text-xs font-patrick text-zinc-500 uppercase tracking-wider mb-3">
                Lead Organizer // Zenith
              </p>
              <a
                href="tel:8690375307"
                className="inline-flex items-center gap-1.5 bg-[#fff9c4] hover:bg-[#ff4d4d] hover:text-white text-[#2d2d2d] px-3.5 py-1.5 font-kalam font-bold text-base border-2 border-[#2d2d2d] border-wobbly-sm shadow-hand-sm transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>86903 75307</span>
              </a>
            </div>

            {/* Contact 2 */}
            <div className="bg-white border-[3px] border-[#2d2d2d] border-wobbly-md p-5 shadow-hand text-center relative rotate-1 hover:rotate-0 transition-transform">
              <Tape rotate="1deg" />
              <div className="w-10 h-10 bg-[#2d5da1] text-white rounded-full border-2 border-[#2d2d2d] flex items-center justify-center mx-auto mb-2 font-kalam font-bold text-base">
                TA
              </div>
              <h3 className="text-xl sm:text-2xl font-kalam font-bold text-[#2d2d2d]">
                Tanishq Agrawal
              </h3>
              <p className="text-xs font-patrick text-zinc-500 uppercase tracking-wider mb-3">
                Coordinator // Zenith
              </p>
              <a
                href="tel:7489164811"
                className="inline-flex items-center gap-1.5 bg-[#fff9c4] hover:bg-[#2d5da1] hover:text-white text-[#2d2d2d] px-3.5 py-1.5 font-kalam font-bold text-base border-2 border-[#2d2d2d] border-wobbly-sm shadow-hand-sm transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>74891 64811</span>
              </a>
            </div>

            {/* Contact 3 */}
            <div className="bg-white border-[3px] border-[#2d2d2d] border-wobbly-sm p-5 shadow-hand text-center relative -rotate-1 hover:rotate-0 transition-transform">
              <Pin />
              <div className="w-10 h-10 bg-[#2d2d2d] text-white rounded-full border-2 border-[#2d2d2d] flex items-center justify-center mx-auto mb-2 font-kalam font-bold text-base">
                GS
              </div>
              <h3 className="text-xl sm:text-2xl font-kalam font-bold text-[#2d2d2d]">
                Geetesh Singh
              </h3>
              <p className="text-xs font-patrick text-zinc-500 uppercase tracking-wider mb-3">
                Coordinator // Zenith
              </p>
              <a
                href="tel:9109974250"
                className="inline-flex items-center gap-1.5 bg-[#fff9c4] hover:bg-[#2d2d2d] hover:text-white text-[#2d2d2d] px-3.5 py-1.5 font-kalam font-bold text-base border-2 border-[#2d2d2d] border-wobbly-sm shadow-hand-sm transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>91099 74250</span>
              </a>
            </div>
          </div>

          <div className="mt-8 text-center">
            <span className="font-patrick text-sm sm:text-base text-zinc-600 inline-flex flex-wrap items-center justify-center gap-2 bg-white px-4 py-2 border border-[#2d2d2d] border-wobbly-sm shadow-hand-sm">
              <Mail className="w-4 h-4 text-[#ff4d4d]" />
              <span>Official Support Email:</span>
              <a href="mailto:zenith.nitb.manit@gmail.com" className="font-bold text-[#2d5da1] hover:underline font-mono">
                zenith.nitb.manit@gmail.com
              </a>
            </span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 06 // QUICK CALL TO ACTION
      ========================================================================== */}
      <section className="py-16 bg-[#fff9c4] border-b-[3px] border-[#2d2d2d] relative">
        <Tape rotate="1deg" />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <h2 className="text-4xl sm:text-6xl font-kalam font-bold text-[#2d2d2d] leading-none mb-4 flex items-center justify-center gap-2">
            <span>Ready to Forge?</span>
            <Zap className="w-9 h-9 text-[#ff4d4d]" />
          </h2>

          <p className="text-xl sm:text-2xl font-patrick text-zinc-800 max-w-lg mx-auto mb-8">
            Form your squad of strictly 3 members (1 girl compulsory) from MANIT Bhopal and register before slots fill up!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/register/create"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#ff4d4d] text-white px-8 py-3.5 font-kalam font-bold text-xl border-[3px] border-[#2d2d2d] border-wobbly-sm shadow-hand hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hand-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
            >
              <span>Create Squad &rarr;</span>
            </Link>

            <Link
              href="/register/join"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-[#2d2d2d] px-8 py-3.5 font-kalam font-bold text-xl border-2 border-[#2d2d2d] border-wobbly-md shadow-hand hover:bg-[#e5e0d8] transition-all"
            >
              <span>Join with Team Code</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MOBILE STICKY REGISTER BAR
      ========================================================================== */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#fff9c4] border-t-[3px] border-[#2d2d2d] p-3 px-4 flex items-center justify-between shadow-lg">
        <div>
          <span className="font-kalam font-bold text-sm text-[#2d2d2d] block leading-none">
            Web Forge
          </span>
          <span className="text-xs font-patrick text-zinc-600">
            12H Virtual Sprint
          </span>
        </div>

        <Link
          href="/register"
          className="bg-[#ff4d4d] text-white px-5 py-2 font-kalam font-bold text-base border-2 border-[#2d2d2d] border-wobbly-sm shadow-hand-sm active:translate-x-1 active:translate-y-1 transition-all"
        >
          Register Now!
        </Link>
      </div>

      <Footer />
    </div>
  );
}
