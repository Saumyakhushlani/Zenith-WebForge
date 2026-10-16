"use client";

export function WavyUnderline({ className = "text-[#ff4d4d]" }) {
  return (
    <svg 
      viewBox="0 0 160 16" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={`w-full h-3 overflow-visible ${className}`}
    >
      <path 
        d="M2 9C20 4 35 14 55 9C75 4 90 14 110 9C130 4 145 14 158 9" 
        stroke="currentColor" 
        strokeWidth="3.5" 
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DoodleArrow({ className = "text-[#2d2d2d]" }) {
  return (
    <svg 
      viewBox="0 0 100 60" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={`overflow-visible ${className}`}
    >
      <path 
        d="M10 50C35 48 65 35 85 15" 
        stroke="currentColor" 
        strokeWidth="3" 
        strokeLinecap="round" 
        strokeDasharray="4 4"
      />
      <path 
        d="M65 14L86 14L83 35" 
        stroke="currentColor" 
        strokeWidth="3" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ScribbleCircle({ className = "text-[#ff4d4d]" }) {
  return (
    <svg 
      viewBox="0 0 120 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={`overflow-visible ${className}`}
    >
      <path 
        d="M60 10C28 12 10 32 12 65C14 98 35 110 65 108C95 106 112 85 108 55C104 25 80 14 52 14" 
        stroke="currentColor" 
        strokeWidth="3" 
        strokeLinecap="round"
      />
    </svg>
  );
}

export function StarDoodle({ className = "text-[#fff9c4]" }) {
  return (
    <svg 
      viewBox="0 0 32 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={`overflow-visible ${className}`}
    >
      <path 
        d="M16 2L19 12L29 14L21 21L24 31L16 25L8 31L11 21L3 14L13 12L16 2Z" 
        fill="currentColor" 
        stroke="#2d2d2d" 
        strokeWidth="2" 
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Tape({ rotate = "-2deg", className = "" }) {
  return (
    <div 
      style={{ transform: `translateX(-50%) rotate(${rotate})` }}
      className={`absolute -top-3 left-1/2 w-24 h-6 bg-[#e5e0d8]/85 border-l-2 border-r-2 border-dashed border-[#2d2d2d]/30 shadow-sm z-20 pointer-events-none ${className}`}
    />
  );
}

export function Pin({ className = "" }) {
  return (
    <div className={`push-pin pointer-events-none ${className}`} />
  );
}
