"use client";

import { useState, useEffect } from "react";
import { Copy, Check, Share2, Send, ExternalLink, Users, AlertTriangle } from "lucide-react";
import { Tape, Pin } from "@/components/HandDrawnSvg";

export default function ShareSquadCard({ teamCode, teamName, totalMembers = 1, hasFemaleMember = false }) {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [joinUrl, setJoinUrl] = useState("");
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}/register/join?code=${teamCode}`;
      setJoinUrl(url);
      if (navigator.share) {
        setCanNativeShare(true);
      }
    }
  }, [teamCode]);

  const copyCode = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(teamCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const copyLink = () => {
    if (typeof navigator !== "undefined" && joinUrl) {
      navigator.clipboard.writeText(joinUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const shareText = `Web Forge 2026 // Zenith MANIT\nJoin my hackathon squad "${teamName}"!\n\nTeam Code: ${teamCode}\nDirect Join Link: ${joinUrl}\n\nEvent Date: 22nd October 2026 (Virtual on Google Meet)\nStrictly 3 members (1 girl compulsory).`;

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Join squad ${teamName} - Web Forge 2026`,
          text: shareText,
          url: joinUrl,
        });
      } catch (e) {
        // user cancelled or share failed
      }
    }
  };

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;

  const remaining = 3 - (totalMembers || 1);

  return (
    <div className="bg-[#fff9c4] border-[3px] border-[#2d2d2d] border-wobbly-md p-5 sm:p-7 shadow-hand relative rotate-0.5 mb-8">
      <Pin />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b-2 border-dashed border-[#2d2d2d]">
        <div className="flex items-center gap-2">
          <Share2 className="w-5 h-5 text-[#2d5da1]" />
          <h2 className="text-2xl sm:text-3xl font-kalam font-bold text-[#2d2d2d]">
            Invite Your Teammates
          </h2>
        </div>

        <span className="self-start sm:self-auto bg-[#ff4d4d] text-white text-xs sm:text-sm font-kalam font-bold px-2.5 py-0.5 border border-[#2d2d2d] border-wobbly-sm -rotate-1">
          {remaining > 0 ? `${remaining} SPOT${remaining > 1 ? "S" : ""} REMAINING` : "SQUAD FULL"}
        </span>
      </div>

      <p className="font-patrick text-base sm:text-lg text-zinc-700 mt-3 mb-5">
        Share this code or direct link with your MANIT batchmates. Each squad must have strictly 3 members (with at least 1 girl developer).
      </p>

      {/* Code & Link Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Team Code Box */}
        <div className="bg-white border-2 border-[#2d2d2d] border-wobbly-sm p-4 shadow-hand-sm flex flex-col justify-between">
          <div className="text-xs font-kalam font-bold text-zinc-500 uppercase tracking-wider mb-1">
            Squad Code
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-2xl sm:text-3xl font-kalam font-bold text-[#2d2d2d] tracking-wider font-mono">
              {teamCode}
            </span>
            <button
              onClick={copyCode}
              type="button"
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 font-kalam font-bold text-sm border-2 border-[#2d2d2d] border-wobbly-sm transition-all shadow-hand-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${
                copiedCode 
                  ? "bg-emerald-600 text-white" 
                  : "bg-[#fff9c4] text-[#2d2d2d] hover:bg-white"
              }`}
            >
              {copiedCode ? <Check className="w-4 h-4 stroke-[3]" /> : <Copy className="w-4 h-4" />}
              <span>{copiedCode ? "Copied!" : "Copy Code"}</span>
            </button>
          </div>
        </div>

        {/* Direct Link Box */}
        <div className="bg-white border-2 border-[#2d2d2d] border-wobbly-sm p-4 shadow-hand-sm flex flex-col justify-between">
          <div className="text-xs font-kalam font-bold text-zinc-500 uppercase tracking-wider mb-1">
            Direct Join Link
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs sm:text-sm font-mono text-zinc-700 truncate max-w-[200px] sm:max-w-[240px]">
              {joinUrl || `/register/join?code=${teamCode}`}
            </span>
            <button
              onClick={copyLink}
              type="button"
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 font-kalam font-bold text-sm border-2 border-[#2d2d2d] border-wobbly-sm transition-all shadow-hand-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${
                copiedLink 
                  ? "bg-emerald-600 text-white" 
                  : "bg-[#2d5da1] text-white hover:bg-[#1e4276]"
              }`}
            >
              {copiedLink ? <Check className="w-4 h-4 stroke-[3]" /> : <Copy className="w-4 h-4" />}
              <span>{copiedLink ? "Copied!" : "Copy Link"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Social & Direct Actions */}
      <div className="flex flex-wrap items-center gap-3">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white hover:bg-[#1fae53] px-5 py-2.5 font-kalam font-bold text-base sm:text-lg border-2 border-[#2d2d2d] border-wobbly-sm shadow-hand-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all -rotate-1 hover:rotate-0"
        >
          <Send className="w-4 h-4 fill-white" />
          <span>Share via WhatsApp</span>
        </a>

        {canNativeShare && (
          <button
            onClick={handleNativeShare}
            type="button"
            className="inline-flex items-center justify-center gap-2 bg-white text-[#2d2d2d] hover:bg-[#fff9c4] px-5 py-2.5 font-kalam font-bold text-base sm:text-lg border-2 border-[#2d2d2d] border-wobbly-sm shadow-hand-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all rotate-1 hover:rotate-0"
          >
            <Share2 className="w-4 h-4 text-[#2d5da1]" />
            <span>More Share Options</span>
          </button>
        )}
      </div>
    </div>
  );
}
