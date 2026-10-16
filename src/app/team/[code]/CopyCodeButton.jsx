"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function CopyCodeButton({ teamCode }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(teamCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      type="button"
      className={`mt-1.5 inline-flex items-center gap-1 px-2.5 py-1 text-xs font-kalam font-bold border border-[#2d2d2d] border-wobbly-sm transition-all shadow-hand-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none ${
        copied ? "bg-emerald-600 text-white" : "bg-[#fff9c4] text-[#2d2d2d] hover:bg-white"
      }`}
    >
      {copied ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Copy className="w-3.5 h-3.5" />}
      <span>{copied ? "Code Copied!" : "Copy Code"}</span>
    </button>
  );
}
