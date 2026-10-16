"use client";

import { useState, useEffect } from "react";
import { Copy, Check, Send, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function TeamPassActions({ teamCode, teamName, isFull = false }) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [teamUrl, setTeamUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setTeamUrl(`${window.location.origin}/team/${teamCode}`);
    }
  }, [teamCode]);

  const handleCopyLink = () => {
    if (typeof navigator !== "undefined") {
      const url = teamUrl || (typeof window !== "undefined" ? `${window.location.origin}/team/${teamCode}` : `https://zenith-webforge.vercel.app/team/${teamCode}`);
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const shareText = `Web Forge 2026 // Zenith MANIT\nJoin my squad "${teamName}"!\n\nTeam Code: ${teamCode}\nSquad Pass Link: ${teamUrl || `https://zenith-webforge.vercel.app/team/${teamCode}`}\n\nEvent Date: 22nd October 2026 (Virtual on Google Meet)\nStrictly 3 members (1 girl compulsory).`;

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;

  return (
    <div className="mt-6 pt-5 border-t-2 border-dashed border-[#2d2d2d] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Share Link to Join This Squad Button */}
        <button
          onClick={handleCopyLink}
          type="button"
          className={`inline-flex items-center justify-center gap-2 px-6 py-3 font-kalam font-bold text-lg sm:text-xl border-[3px] border-[#2d2d2d] border-wobbly-sm shadow-hand hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all ${
            copiedLink 
              ? "bg-emerald-600 text-white shadow-hand-sm" 
              : "bg-[#ff4d4d] text-white"
          }`}
        >
          {copiedLink ? <Check className="w-5 h-5 stroke-[3]" /> : <Copy className="w-5 h-5" />}
          <span>{copiedLink ? "Link Copied!" : "Share Link to Join This Squad"}</span>
        </button>

        {/* WhatsApp Share Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white hover:bg-[#1fae53] px-5 py-3 font-kalam font-bold text-base sm:text-lg border-2 border-[#2d2d2d] border-wobbly-sm shadow-hand-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-all -rotate-1 hover:rotate-0"
        >
          <Send className="w-4 h-4 fill-white" />
          <span>Share on WhatsApp</span>
        </a>
      </div>

      {!isFull && (
        <Link
          href={`/register/join?code=${teamCode}`}
          className="inline-flex items-center justify-center gap-1.5 text-base font-kalam font-bold text-[#2d5da1] hover:underline bg-white border border-[#2d2d2d] border-wobbly-sm px-4 py-2.5 shadow-hand-sm hover:bg-[#fff9c4] transition-colors"
        >
          <span>Fill Join Form</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
}
