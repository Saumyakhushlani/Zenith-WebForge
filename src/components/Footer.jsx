import Link from "next/link";
import { ArrowUpRight, Heart, Sparkles, Code2, MapPin, Mail, Building2, FileText, PenTool } from "lucide-react";
import { Tape, Pin, WavyUnderline } from "./HandDrawnSvg";

export default function Footer() {
  return (
    <footer className="w-full bg-[#fdfbf7] border-t-[3px] border-[#2d2d2d] relative pt-16 pb-8 paper-dots">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b-2 border-dashed border-[#2d2d2d]">
          
          {/* Card 1: Manifesto Note with Tape */}
          <div className="md:col-span-6 bg-white border-[3px] border-[#2d2d2d] border-wobbly-md p-8 shadow-hand relative -rotate-1 hover:rotate-0 transition-transform">
            <Tape rotate="-1deg" />

            <div className="inline-flex items-center gap-1.5 bg-[#fff9c4] text-[#2d2d2d] px-3 py-1 font-kalam text-xs font-bold border border-[#2d2d2d] border-wobbly-sm mb-3">
              <FileText className="w-3.5 h-3.5 text-[#ff4d4d]" />
              <span>Manifesto // Zenith MANIT</span>
            </div>

            <h3 className="text-3xl md:text-4xl font-kalam font-bold text-[#2d2d2d] leading-tight mb-4">
              Rapid Prototyping, Napkin Ideas, Zero Excuses!
            </h3>

            <p className="text-lg text-zinc-700 font-patrick leading-relaxed">
              Web Forge is an unfiltered 12-hour build sprint organized by <strong>Zenith</strong>, the official coding society of Maulana Azad National Institute of Technology (MANIT), Bhopal. We bring engineers together to sketch, build, and ship real applications.
            </p>

            <div className="mt-6 flex flex-wrap gap-2 text-sm font-kalam font-bold">
              <span className="bg-[#fff9c4] px-3 py-1 border border-[#2d2d2d] border-wobbly-sm">#MANIT_Bhopal</span>
              <span className="bg-[#e5e0d8] px-3 py-1 border border-[#2d2d2d] border-wobbly-sm">#12HourSprint</span>
              <span className="bg-[#ff4d4d] text-white px-3 py-1 border border-[#2d2d2d] border-wobbly-sm">#DrawnToCode</span>
            </div>
          </div>

          {/* Column 2: Index Directory */}
          <div className="md:col-span-3 bg-[#fff9c4] border-[3px] border-[#2d2d2d] border-wobbly-sm p-6 shadow-hand rotate-1 hover:rotate-0 transition-transform relative">
            <Pin />
            <h4 className="text-2xl font-kalam font-bold mb-1 text-[#2d2d2d]">
              Site Map
            </h4>
            <div className="w-20 mb-4">
              <WavyUnderline className="text-[#ff4d4d]" />
            </div>

            <ul className="space-y-2.5 font-kalam text-lg font-bold">
              <li>
                <Link href="/#overview" className="hover:text-[#ff4d4d] flex items-center gap-2 group">
                  <span className="text-[#ff4d4d]">&rarr;</span>
                  <span>01. Overview</span>
                </Link>
              </li>
              <li>
                <Link href="/#itinerary" className="hover:text-[#ff4d4d] flex items-center gap-2 group">
                  <span className="text-[#ff4d4d]">&rarr;</span>
                  <span>02. Timeline</span>
                </Link>
              </li>
              <li>
                <Link href="/#rules" className="hover:text-[#ff4d4d] flex items-center gap-2 group">
                  <span className="text-[#ff4d4d]">&rarr;</span>
                  <span>03. Rules & AI</span>
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-[#ff4d4d] flex items-center gap-2 group">
                  <span className="text-[#ff4d4d]">&rarr;</span>
                  <span>04. FAQ</span>
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-[#ff4d4d] flex items-center gap-2 group">
                  <span className="text-[#ff4d4d]">&rarr;</span>
                  <span>05. Register</span>
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#2d5da1] flex items-center gap-2 group text-zinc-600">
                  <span className="text-[#2d5da1]">&rarr;</span>
                  <span>06. Admin Portal</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Coordinates & Note */}
          <div className="md:col-span-3 bg-white border-[3px] border-[#2d2d2d] border-wobbly-md p-6 shadow-hand -rotate-1 hover:rotate-0 transition-transform relative flex flex-col justify-between">
            <Tape rotate="2deg" />
            <div>
              <h4 className="text-2xl font-kalam font-bold mb-1 text-[#2d2d2d]">
                Campus Base
              </h4>
              <div className="w-20 mb-4">
                <WavyUnderline className="text-[#2d5da1]" />
              </div>

              <div className="font-patrick text-base text-zinc-700 space-y-1.5">
                <p className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#ff4d4d] flex-shrink-0" />
                  <span>MANIT, Link Road 3</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-zinc-500 flex-shrink-0" />
                  <span>Bhopal, MP 462003</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-[#2d5da1] flex-shrink-0" />
                  <a href="mailto:zenith.nitb.manit@gmail.com" className="hover:underline">zenith.nitb.manit@gmail.com</a>
                </p>
                <p className="pt-2 text-sm text-[#2d5da1] font-bold">Virtual on Google Meet</p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-dashed border-[#2d2d2d]">
              <Link
                href="/register"
                className="block text-center bg-[#2d2d2d] text-white hover:bg-[#ff4d4d] py-2.5 font-kalam font-bold text-base border-2 border-[#2d2d2d] border-wobbly-sm shadow-hand-sm transition-colors"
              >
                Join Hackathon &rarr;
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-base font-patrick text-zinc-700 gap-4">
          <div className="flex items-center gap-2">
            <span>&copy; 2026 Zenith Coding Society</span>
            <span>•</span>
            <span className="text-[#ff4d4d] font-bold">Web Forge Sprint</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span>Drawn with ink & code</span>
            <PenTool className="w-4 h-4 text-[#ff4d4d]" />
            <span>for MANIT Bhopal</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
