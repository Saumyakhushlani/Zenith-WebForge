"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, AlertCircle } from "lucide-react";
import { getTeamDetailsAction } from "@/app/actions/registration";
import { Tape } from "@/components/HandDrawnSvg";

export default function LookupRoster() {
  const router = useRouter();
  const [lookupCode, setLookupCode] = useState("");
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupError, setLookupError] = useState("");

  const handleLookupSubmit = async (e) => {
    e.preventDefault();
    const cleanCode = lookupCode.trim().toUpperCase();
    if (!cleanCode) return;

    setLookupLoading(true);
    setLookupError("");

    const res = await getTeamDetailsAction(cleanCode);
    setLookupLoading(false);

    if (res.success && res.team?.teamCode) {
      router.push(`/team/${res.team.teamCode}`);
    } else {
      setLookupError(res.error || "Squad not found. Please verify the code.");
    }
  };

  return (
    <div className="bg-white border-2 md:border-[3px] border-[#2d2d2d] border-wobbly-lg p-4 sm:p-7 md:p-8 shadow-hand sm:shadow-hand-lg relative">
      <Tape rotate="1deg" />

      <div className="pb-3 mb-4 sm:mb-5 border-b-2 border-dashed border-[#2d2d2d]">
        <div className="flex items-center gap-2">
          <Search className="w-5 h-5 text-[#2d2d2d] flex-shrink-0" />
          <h3 className="text-lg sm:text-2xl font-kalam font-bold text-[#2d2d2d]">
            Already Registered? Check Squad Pass
          </h3>
        </div>
        <p className="text-xs sm:text-base font-patrick text-zinc-600 mt-0.5">
          Enter your team code to view your official squad pass, roster, and share link.
        </p>
      </div>

      <form onSubmit={handleLookupSubmit} className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
        <input
          type="text"
          required
          placeholder="ENTER CODE (E.G. WF-JE3MM)"
          value={lookupCode}
          onChange={(e) => setLookupCode(e.target.value.toUpperCase())}
          className="flex-1 bg-[#fdfbf7] border-2 border-[#2d2d2d] p-2.5 sm:p-3 text-base sm:text-lg font-kalam font-bold text-[#2d2d2d] uppercase tracking-wider placeholder:text-zinc-400"
        />
        <button
          type="submit"
          disabled={lookupLoading}
          className="w-full sm:w-auto bg-[#2d2d2d] text-white px-5 sm:px-6 py-2.5 sm:py-3 font-kalam font-bold text-base sm:text-lg border-2 border-[#2d2d2d] border-wobbly-sm shadow-hand-sm hover:bg-[#ff4d4d] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Search className="w-4 h-4" />
          <span>{lookupLoading ? "Searching..." : "Open Squad Pass &rarr;"}</span>
        </button>
      </form>

      {lookupError && (
        <div className="mt-4 bg-red-50 border-2 border-[#ff4d4d] border-wobbly-sm text-[#2d2d2d] p-3 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-[#ff4d4d] flex-shrink-0" />
          <span className="font-patrick text-base font-bold">{lookupError}</span>
        </div>
      )}
    </div>
  );
}
