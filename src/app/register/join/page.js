import { Suspense } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JoinTeamForm from "../JoinTeamForm";
import { ArrowLeft, Users } from "lucide-react";

export const metadata = {
  title: "Join Squad // WEB FORGE 2026 - Zenith MANIT",
  description: "Join an existing squad using your team leader's official Web Forge code.",
};

export default function JoinTeamPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fdfbf7] text-[#2d2d2d] font-patrick paper-dots">
      <Header />

      <main className="flex-1 py-8 sm:py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          {/* Navigation Back to Register Hub */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <Link
              href="/register"
              className="inline-flex items-center gap-1.5 sm:gap-2 font-kalam font-bold text-sm sm:text-base bg-white border-2 border-[#2d2d2d] border-wobbly-sm px-3 sm:px-4 py-1.5 sm:py-2 shadow-hand-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
              <span>Back to Hub</span>
            </Link>

            <span className="font-kalam text-xs sm:text-sm font-bold text-[#2d5da1] rotate-1 bg-[#fff9c4] px-2.5 sm:px-3 py-1 border border-[#2d2d2d] inline-flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2d5da1]" />
              <span>Teammate Attachment</span>
            </span>
          </div>

          {/* Dedicated Join Form inside Suspense for search params */}
          <Suspense fallback={
            <div className="bg-white border-[3px] border-[#2d2d2d] border-wobbly-md p-16 text-center font-kalam text-xl font-bold text-zinc-600 shadow-hand">
              Loading Join Form...
            </div>
          }>
            <JoinTeamForm />
          </Suspense>

        </div>
      </main>

      <Footer />
    </div>
  );
}
