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
    <div className="mt-5 pt-4 border-t-2 border-dashed border-[#2d2d2d] space-y-2.5">
      {/* Share Link to Join This Squad Button */}
      <button
        onClick={handleCopyLink}
        type="button"
        className={`w-full inline-flex items-center justify-center gap-2 py-2.5 sm:py-3 px-4 font-kalam font-bold text-base sm:text-lg border-2 border-[#2d2d2d] border-wobbly-sm shadow-hand hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all ${
          copiedLink 
            ? "bg-emerald-600 text-white shadow-hand-sm" 
            : "bg-[#ff4d4d] text-white hover:bg-[#e03a3a]"
        }`}
      >
        {copiedLink ? <Check className="w-4 h-4 sm:w-5 sm:h-5 stroke-[3]" /> : <Copy className="w-4 h-4 sm:w-5 sm:h-5" />}
        <span>{copiedLink ? "Link Copied to Clipboard!" : "Share Link to Join This Squad"}</span>
      </button>

      {/* WhatsApp Share Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] text-white hover:bg-[#1fae53] py-2 sm:py-2.5 px-4 font-kalam font-bold text-sm sm:text-base border-2 border-[#2d2d2d] border-wobbly-sm shadow-hand hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
      >
        <Send className="w-4 h-4 fill-white" />
        <span>Share on WhatsApp</span>
      </a>

      {!isFull && (
        <div className="text-center pt-1">
          <Link
            href={`/register/join?code=${teamCode}`}
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-kalam font-bold text-[#2d5da1] hover:underline"
          >
            <span>Need to register yourself into this squad? Fill Join Form</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
}
