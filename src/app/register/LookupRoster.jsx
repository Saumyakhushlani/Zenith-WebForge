"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Search, 
  Check, 
  Copy, 
  AlertCircle, 
  AlertTriangle,
  Users,
  ShieldCheck,
  ArrowRight
} from "lucide-react";
import { getTeamDetailsAction } from "@/app/actions/registration";
import { Tape } from "@/components/HandDrawnSvg";

export default function LookupRoster() {
  const [lookupCode, setLookupCode] = useState("");
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupResult, setLookupResult] = useState(null);
  const [lookupError, setLookupError] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);

  const handleLookupSubmit = async (e) => {
    e.preventDefault();
    if (!lookupCode.trim()) return;

    setLookupLoading(true);
    setLookupError("");
    setLookupResult(null);

    const res = await getTeamDetailsAction(lookupCode);
    setLookupLoading(false);

    if (res.success) {
      setLookupResult(res.team);
    } else {
      setLookupError(res.error || "Squad not found. Please verify the 5-character code.");
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="bg-white border-2 md:border-[3px] border-[#2d2d2d] border-wobbly-lg p-4 sm:p-7 md:p-8 shadow-hand sm:shadow-hand-lg relative">
      <Tape rotate="1deg" />

      <div className="pb-3 mb-4 sm:mb-5 border-b-2 border-dashed border-[#2d2d2d]">
        <div className="flex items-center gap-2">
          <Search className="w-5 h-5 text-[#2d2d2d] flex-shrink-0" />
          <h3 className="text-lg sm:text-2xl font-kalam font-bold text-[#2d2d2d]">
            Already Registered? Check Squad Roster
          </h3>
        </div>
        <p className="text-xs sm:text-base font-patrick text-zinc-600 mt-0.5">
          Enter any 5-character team code to inspect confirmed teammates and diversity status.
        </p>
      </div>

      <form onSubmit={handleLookupSubmit} className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 mb-4">
        <input
          type="text"
          required
          placeholder="ENTER CODE (E.G. 8K92L)"
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
          <span>{lookupLoading ? "Searching..." : "Find Squad"}</span>
        </button>
      </form>

      {lookupError && (
        <div className="bg-red-50 border-2 border-[#ff4d4d] border-wobbly-sm text-[#2d2d2d] p-3 mb-4 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-[#ff4d4d] flex-shrink-0" />
          <span className="font-patrick text-base font-bold">{lookupError}</span>
        </div>
      )}

      {lookupResult && (
        <div className="mt-4 bg-[#fdfbf7] border-2 border-[#2d2d2d] border-wobbly-sm p-3.5 sm:p-5 shadow-hand-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b-2 border-dashed border-[#2d2d2d]">
            <div>
              <span className="font-kalam text-xs font-bold uppercase text-[#2d5da1]">
                OFFICIAL SQUAD
              </span>
              <h4 className="text-xl sm:text-2xl font-kalam font-bold text-[#2d2d2d]">
                {lookupResult.teamName}
              </h4>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-kalam font-bold text-xs bg-[#fff9c4] border border-[#2d2d2d] px-2 py-0.5 sm:px-2.5 sm:py-1">
                Code: {lookupResult.teamCode}
              </span>
              <span className="font-kalam font-bold text-xs bg-white border border-[#2d2d2d] px-2 py-0.5 sm:px-2.5 sm:py-1">
                {lookupResult.totalMembers} / 3 Members
              </span>
            </div>
          </div>

          {/* Members Table */}
          <div className="overflow-x-auto mt-3 -mx-1 sm:mx-0">
            <table className="w-full text-left font-patrick text-sm sm:text-base md:text-lg min-w-[380px]">
              <thead>
                <tr className="border-b border-[#2d2d2d] font-kalam font-bold text-sm">
                  <th className="p-2">Role</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Scholar No</th>
                  <th className="p-2">Gender</th>
                  <th className="p-2">Year</th>
                </tr>
              </thead>
              <tbody className="divide-y border-b border-[#2d2d2d]">
                {lookupResult.members.map((m, idx) => (
                  <tr key={idx} className="hover:bg-zinc-100">
                    <td className="p-2">
                      <span className={`px-2 py-0.5 font-kalam text-xs font-bold border border-[#2d2d2d] ${
                        m.role === "leader" ? "bg-[#2d2d2d] text-white" : "bg-white text-[#2d2d2d]"
                      }`}>
                        {m.role}
                      </span>
                    </td>
                    <td className="p-2 font-bold">{m.name}</td>
                    <td className="p-2">{m.scholarNumber}</td>
                    <td className="p-2">
                      <span className={m.gender === "Female" ? "font-bold text-emerald-700" : ""}>
                        {m.gender}
                      </span>
                    </td>
                    <td className="p-2">{m.year}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Diversity & Actions */}
          <div className="mt-4 pt-3 border-t-2 border-dashed border-[#2d2d2d] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 text-sm font-patrick text-zinc-700">
              {lookupResult.totalMembers < 3 ? (
                <>
                  <AlertTriangle className="w-4 h-4 text-[#ff4d4d] inline flex-shrink-0" />
                  <span>Need {3 - lookupResult.totalMembers} more member(s) to reach strictly 3 members.</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 text-[#2d5da1] inline stroke-[3] flex-shrink-0" />
                  <span>Squad is complete (3/3 members).</span>
                </>
              )}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => {
                  const url = `${window.location.origin}/register/join?code=${lookupResult.teamCode}`;
                  copyToClipboard(url);
                }}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-white text-[#2d2d2d] px-3 py-1.5 font-kalam font-bold text-xs border border-[#2d2d2d] border-wobbly-sm shadow-hand-sm hover:bg-[#fff9c4] transition-all"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? "Link Copied!" : "Copy Join Link"}</span>
              </button>

              <Link
                href={`/team/${lookupResult.teamCode}`}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1 bg-[#2d2d2d] text-white px-3 py-1.5 font-kalam font-bold text-xs border border-[#2d2d2d] border-wobbly-sm shadow-hand-sm hover:bg-[#ff4d4d] transition-all"
              >
                <span>Full Pass</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
