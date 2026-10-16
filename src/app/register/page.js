import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LookupRoster from "./LookupRoster";
import { ArrowLeft, Rocket, Users, PenTool, ShieldCheck, ArrowRight, UserPlus, FileText } from "lucide-react";
import { Tape, Pin } from "@/components/HandDrawnSvg";

export const metadata = {
  title: "Register Squad // WEB FORGE - Zenith MANIT",
  description: "Form your squad or join an existing team for Web Forge 2026 12-hour hackathon at MANIT Bhopal.",
};

export default function RegisterHubPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fdfbf7] text-[#2d2d2d] font-patrick paper-dots">
      <Header />

      <main className="flex-1 py-8 sm:py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          
          {/* Back Navigation & Breadcrumb */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 sm:gap-2 font-kalam font-bold text-sm sm:text-base bg-white border-2 border-[#2d2d2d] border-wobbly-sm px-3 sm:px-4 py-1.5 sm:py-2 shadow-hand-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
              <span>Back to Home</span>
            </Link>

            <span className="font-kalam text-xs sm:text-sm font-bold text-[#ff4d4d] -rotate-1 bg-[#fff9c4] px-2.5 sm:px-3 py-1 border border-[#2d2d2d] inline-flex items-center gap-1.5">
              <PenTool className="w-3.5 h-3.5" />
              <span>Registration Hub</span>
            </span>
          </div>

          {/* Heading Banner */}
          <div className="bg-[#fff9c4] border-2 sm:border-[3px] border-[#2d2d2d] border-wobbly-lg p-5 sm:p-8 md:p-10 mb-6 sm:mb-8 shadow-hand sm:shadow-hand-lg relative rotate-0.5">
            <Tape rotate="-1deg" />

            <span className="font-kalam font-bold text-xs sm:text-sm text-[#ff4d4d] uppercase block mb-1">
              Zenith Coding Society // MANIT Bhopal
            </span>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-kalam font-bold text-[#2d2d2d] leading-tight mb-2 sm:mb-3 flex items-center gap-2 sm:gap-3">
              <span>Squad Registration</span>
              <FileText className="w-6 h-6 sm:w-9 sm:h-9 text-[#2d2d2d] flex-shrink-0" />
            </h1>
            <p className="text-base sm:text-xl font-patrick text-zinc-800 max-w-2xl">
              Choose your registration route below. One teammate creates the squad and generates a code; others join with that code.
            </p>

            {/* Diversity Badge */}
            <div className="mt-4 pt-3 border-t-2 border-dashed border-[#2d2d2d] flex items-start sm:items-center gap-2 text-xs sm:text-base font-patrick text-zinc-700">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#ff4d4d] flex-shrink-0 mt-0.5 sm:mt-0" />
              <span>
                <strong>Team Rule:</strong> Strictly 3 members per squad (1 Girl Compulsory, 1st &amp; 2nd Year UG only).
              </span>
            </div>
          </div>

          {/* TWO MAIN OPTIONS: CREATE OR JOIN */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12">
            
            {/* OPTION 1: CREATE A TEAM */}
            <div className="bg-white border-2 sm:border-[3px] border-[#2d2d2d] border-wobbly-md p-5 sm:p-7 md:p-8 shadow-hand sm:shadow-hand-lg relative flex flex-col justify-between -rotate-1 hover:rotate-0 transition-transform">
              <Pin />
              
              <div>
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#ff4d4d] text-white border-2 border-[#2d2d2d] border-wobbly-circle shadow-hand-sm flex items-center justify-center">
                    <Rocket className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <span className="font-kalam text-xs font-bold uppercase bg-[#fff9c4] border border-[#2d2d2d] px-2.5 py-0.5 sm:py-1">
                    Route A: Leaders
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-kalam font-bold text-[#2d2d2d] mb-1.5 sm:mb-2">
                  Create a New Team
                </h2>
                
                <p className="font-patrick text-base sm:text-lg text-zinc-600 mb-4 sm:mb-6">
                  Start your squad from scratch. As the leader, you choose your team name and receive an official 5-character Team Code to distribute to your teammates.
                </p>

                <ul className="space-y-1.5 sm:space-y-2 mb-6 sm:mb-8 text-sm sm:text-base font-patrick text-zinc-700">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#ff4d4d] flex-shrink-0" />
                    <span>Register as official Team Leader</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#ff4d4d] flex-shrink-0" />
                    <span>Generate unique Team Code (e.g. WF-8K92L)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#ff4d4d] flex-shrink-0" />
                    <span>Share direct invite link with your 2 teammates (1 Girl Compulsory)</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/register/create"
                className="w-full bg-[#ff4d4d] text-white py-3 sm:py-3.5 px-4 sm:px-6 font-kalam font-bold text-lg sm:text-xl border-2 sm:border-[3px] border-[#2d2d2d] border-wobbly-sm shadow-hand hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hand-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center gap-2"
              >
                <span>Create Team Form</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
              </Link>
            </div>

            {/* OPTION 2: JOIN A TEAM */}
            <div className="bg-white border-2 sm:border-[3px] border-[#2d2d2d] border-wobbly-md p-5 sm:p-7 md:p-8 shadow-hand sm:shadow-hand-lg relative flex flex-col justify-between rotate-1 hover:rotate-0 transition-transform">
              <Tape rotate="2deg" />

              <div>
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#2d5da1] text-white border-2 border-[#2d2d2d] border-wobbly-circle shadow-hand-sm flex items-center justify-center">
                    <Users className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <span className="font-kalam text-xs font-bold uppercase bg-[#fff9c4] border border-[#2d2d2d] px-2.5 py-0.5 sm:py-1">
                    Route B: Members
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-kalam font-bold text-[#2d2d2d] mb-1.5 sm:mb-2">
                  Join an Existing Team
                </h2>

                <p className="font-patrick text-base sm:text-lg text-zinc-600 mb-4 sm:mb-6">
                  Got a team code from your team leader? Enter your code to attach yourself to their squad roster and confirm your spot in Web Forge.
                </p>

                <ul className="space-y-1.5 sm:space-y-2 mb-6 sm:mb-8 text-sm sm:text-base font-patrick text-zinc-700">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#2d5da1] flex-shrink-0" />
                    <span>Requires 5-character code from leader (Max 3 members)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#2d5da1] flex-shrink-0" />
                    <span>Enter your Scholar No. &amp; details</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#2d5da1] flex-shrink-0" />
                    <span>Strict 1 Female member mandate per 3-person squad</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/register/join"
                className="w-full bg-[#2d5da1] text-white py-3 sm:py-3.5 px-4 sm:px-6 font-kalam font-bold text-lg sm:text-xl border-2 sm:border-[3px] border-[#2d2d2d] border-wobbly-sm shadow-hand hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hand-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center gap-2"
              >
                <span>Join Team Form</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
              </Link>
            </div>

          </div>

          {/* CHECK SQUAD ROSTER COMPONENT */}
          <div className="mt-6">
            <LookupRoster />
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
