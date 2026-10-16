"use client";

import { useState } from "react";
import { Plus, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Tape, Pin } from "./HandDrawnSvg";

const FAQ_ITEMS = [
  {
    id: "01",
    question: "When is Web Forge taking place?",
    answer: "Web Forge takes place on 22nd October 2026. The 12-hour virtual sprint starts sharp at 08:30 AM with roll call and problem reveal, running until 09:15 PM for live pitching and demos.",
    bg: "bg-[#fff9c4]",
  },
  {
    id: "02",
    question: "Who is eligible to participate in Web Forge?",
    answer: "Web Forge is exclusively open to 1st and 2nd year undergraduate engineering students of Maulana Azad National Institute of Technology (MANIT), Bhopal.",
    bg: "bg-white",
  },
  {
    id: "03",
    question: "What is the team size and diversity requirement?",
    answer: "Squad size is strictly 3 members (all 1st and 2nd year undergraduate engineering students of MANIT Bhopal). In accordance with Zenith's rules, having at least 1 female developer in your 3-person squad is strictly compulsory.",
    bg: "bg-[#fff9c4]", // post-it yellow
  },
  {
    id: "04",
    question: "How will the virtual Google Meet & Breakout rooms work?",
    answer: "Web Forge is strictly virtual via Google Meet. There is a central Main Room for announcements and mentor check-ins, plus dedicated Breakout Rooms for each team. At least one team member must actively keep their screen shared continuously in their room to verify live hacking.",
    bg: "bg-white",
  },
  {
    id: "05",
    question: "Can we use AI tools like Cursor, Claude, or Copilot?",
    answer: "YES! 100% allowed and encouraged. Web Forge tests architectural intuition, product taste, and shipping velocity. The jury judges your final working product, not your syntax typing speed.",
    bg: "bg-[#fff9c4]",
  },
  {
    id: "06",
    question: "What tech stack is allowed?",
    answer: "Anything you like! Next.js, React, Node.js, Python, Django, FastAPI, Supabase, Tailwind, etc. The only hard rule: you must submit a working GitHub repo and a live deployed link (Vercel, Render, etc.).",
    bg: "bg-white",
  },
  {
    id: "07",
    question: "Can we start coding before the hackathon opens?",
    answer: "No. Fresh code only! Open source boilerplates and template libraries (shadcn, Tailwind) are fine, but all actual application logic must be built within the 12-hour sprint window.",
    bg: "bg-[#fff9c4]",
  },
  {
    id: "08",
    question: "How do mentor check-ins work?",
    answer: "Zenith mentors will visit your breakout rooms at 5 scheduled checkpoints (Ideation, UI/Routing, Backend, Mid-Point Crisis, and Pre-Deploy) to unblock code and help you lock down an MVP.",
    bg: "bg-white",
  },
  {
    id: "09",
    question: "How does the final pitching and demo work?",
    answer: "Starting at 09:15 PM, every squad gets exactly 3 minutes to screen-share their live deployed MVP, followed by 2 minutes of judge Q&A.",
    bg: "bg-[#fff9c4]",
  },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {FAQ_ITEMS.map((item, idx) => {
        const isOpen = openIndex === idx;
        const rotateClass = idx % 2 === 0 ? "hover:rotate-0.5" : "hover:-rotate-0.5";

        return (
          <div
            key={item.id}
            className={`border-[3px] border-[#2d2d2d] border-wobbly-md ${item.bg} shadow-hand transition-all duration-150 ${rotateClass}`}
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full p-5 md:p-6 flex items-center justify-between text-left gap-4"
            >
              <div className="flex items-center gap-3 md:gap-4">
                <span className="w-8 h-8 rounded-full bg-[#ff4d4d] text-white border-2 border-[#2d2d2d] border-wobbly-circle flex items-center justify-center font-kalam font-bold text-sm flex-shrink-0">
                  {item.id}
                </span>
                <span className="font-kalam text-xl md:text-2xl font-bold text-[#2d2d2d] leading-snug">
                  {item.question}
                </span>
              </div>

              <div
                className={`w-9 h-9 rounded-full border-2 border-[#2d2d2d] flex items-center justify-center flex-shrink-0 transition-transform duration-150 ${
                  isOpen ? "bg-[#ff4d4d] text-white rotate-45" : "bg-white text-[#2d2d2d]"
                }`}
              >
                <Plus className="w-5 h-5 stroke-[3]" />
              </div>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="overflow-hidden border-t-2 border-dashed border-[#2d2d2d] bg-white/70"
                >
                  <div className="p-6 text-lg md:text-xl font-patrick text-zinc-800 leading-relaxed">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
