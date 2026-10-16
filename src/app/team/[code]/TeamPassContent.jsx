import Link from "next/link";
import { getTeamDetailsAction } from "@/app/actions/registration";
import { ArrowLeft, Users, AlertCircle, Ticket, Check, AlertTriangle, ClipboardList, ShieldCheck } from "lucide-react";
import { Tape } from "@/components/HandDrawnSvg";
import TeamPassActions from "./TeamPassActions";
import CopyCodeButton from "./CopyCodeButton";

export default async function TeamPassContent({ params }) {
  const { code } = await params;
  const res = await getTeamDetailsAction(code);
  const team = res.success ? res.team : null;

  return (
    <div className="max-w-2xl mx-auto px-3 sm:px-6 pb-20 sm:pb-8">
      {/* Top Navigation */}
      <div className="mb-3 sm:mb-4 flex items-center justify-between gap-2">
        <Link
          href="/"
          className="inline-flex items-center gap-1 font-kalam font-bold text-xs sm:text-sm bg-white border-2 border-[#2d2d2d] border-wobbly-sm px-3 py-1 shadow-hand-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Back to Home</span>
        </Link>

        <span className="font-kalam text-xs sm:text-sm font-bold text-[#ff4d4d] -rotate-1 bg-[#fff9c4] px-2.5 py-1 border border-[#2d2d2d] inline-flex items-center gap-1">
          <Ticket className="w-3.5 h-3.5" />
          <span>Official Squad Pass</span>
        </span>
      </div>

      {!team ? (
        <div className="bg-white border-2 sm:border-[3px] border-[#2d2d2d] border-wobbly-md p-6 sm:p-8 text-center shadow-hand-lg">
          <div className="w-12 h-12 rounded-full bg-red-100 border-2 border-[#2d2d2d] border-wobbly-circle mx-auto flex items-center justify-center text-[#ff4d4d] mb-3">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-kalam font-bold text-[#2d2d2d] mb-1">
            Team Code Not Found
          </h2>
          <p className="font-patrick text-base text-zinc-600 mb-4">
            No active squad was found under code <strong className="font-mono text-[#2d2d2d]">{code}</strong>.
          </p>
          <Link
            href="/register/create"
            className="inline-block bg-[#ff4d4d] text-white px-5 py-2 font-kalam font-bold text-base border-2 border-[#2d2d2d] border-wobbly-sm shadow-hand hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            Create New Squad &rarr;
          </Link>
        </div>
      ) : (
        <div className="bg-white border-2 sm:border-[3px] border-[#2d2d2d] border-wobbly-lg shadow-hand-lg relative rotate-0.5 overflow-hidden">
          <Tape rotate="-1deg" />

          {/* Pass Header */}
          <div className="bg-[#fff9c4] p-4 sm:p-6 border-b-2 sm:border-b-[3px] border-[#2d2d2d]">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <span className="font-kalam font-bold text-[10px] sm:text-xs uppercase bg-[#ff4d4d] text-white px-2 py-0.5 border border-[#2d2d2d] inline-block mb-1 -rotate-1">
                  Web Forge 2026
                </span>
                <h1 className="text-2xl sm:text-4xl font-kalam font-bold text-[#2d2d2d] leading-tight truncate">
                  {team.teamName}
                </h1>
                <p className="text-xs font-patrick text-zinc-600 mt-0.5">
                  Zenith Coding Society • MANIT Bhopal
                </p>
              </div>

              {/* Compact Code Stamp */}
              <div className="bg-white border-2 border-[#2d2d2d] border-wobbly-sm p-2 sm:p-2.5 text-center shadow-hand-sm flex-shrink-0 rotate-1">
                <div className="text-[9px] sm:text-[10px] font-kalam font-bold text-zinc-500 uppercase leading-none mb-0.5">
                  SQUAD CODE
                </div>
                <div className="text-xl sm:text-2xl font-kalam font-bold text-[#2d2d2d] tracking-wider font-mono leading-none">
                  {team.teamCode}
                </div>
                <CopyCodeButton teamCode={team.teamCode} />
              </div>
            </div>

            {/* Badges */}
            <div className="mt-4 pt-3 border-t-2 border-dashed border-[#2d2d2d] flex flex-wrap items-center gap-2 text-xs sm:text-sm font-kalam font-bold">
              <span className="bg-white border border-[#2d2d2d] px-2 py-0.5 border-wobbly-sm inline-flex items-center gap-1">
                <Users className="w-3.5 h-3.5" />
                <span>{team.totalMembers} / 3 Members</span>
              </span>

              {team.hasFemaleMember ? (
                <span className="bg-emerald-600 text-white border border-[#2d2d2d] px-2 py-0.5 border-wobbly-sm inline-flex items-center gap-1">
                  <Check className="w-3 h-3 stroke-[3]" />
                  <span>Diversity Satisfied</span>
                </span>
              ) : (
                <span className="bg-[#ff4d4d] text-white border border-[#2d2d2d] px-2 py-0.5 border-wobbly-sm inline-flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  <span>1 Girl Required</span>
                </span>
              )}

              <span className="bg-white border border-[#2d2d2d] px-2 py-0.5 border-wobbly-sm text-zinc-600">
                22nd Oct 2026
              </span>
            </div>
          </div>

          {/* Members Section */}
          <div className="p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-kalam font-bold text-[#2d2d2d] mb-3 flex items-center gap-1.5">
              <span>Confirmed Squad Roster</span>
              <ClipboardList className="w-4 h-4 text-[#2d2d2d]" />
            </h3>

            {/* Mobile View: Stacked Cards (Zero Cutoff, Zero Horizontal Scrollbars) */}
            <div className="sm:hidden space-y-2">
              {team.members.map((m, idx) => (
                <div 
                  key={idx}
                  className="bg-[#fdfbf7] border-2 border-[#2d2d2d] border-wobbly-sm p-3 shadow-hand-sm"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-kalam font-bold text-base text-[#2d2d2d] truncate">
                      {m.name}
                    </span>
                    <span className={`px-2 py-0.2 font-kalam text-[10px] font-bold border border-[#2d2d2d] ${
                      m.role === "leader" ? "bg-[#2d2d2d] text-white" : "bg-[#fff9c4] text-[#2d2d2d]"
                    }`}>
                      {m.role === "leader" ? "LEADER" : "MEMBER"}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-xs font-patrick text-zinc-700">
                    <span className="font-mono text-zinc-900 font-bold">{m.scholar_number || m.scholarNumber}</span>
                    <span>•</span>
                    <span className={m.gender === "Female" ? "text-[#ff4d4d] font-bold" : ""}>{m.gender}</span>
                    <span>•</span>
                    <span>{m.year}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop View: Full Table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-left font-patrick text-base">
                <thead>
                  <tr className="border-b-2 border-[#2d2d2d] font-kalam font-bold text-sm">
                    <th className="p-2">Role</th>
                    <th className="p-2">Name</th>
                    <th className="p-2">Scholar No</th>
                    <th className="p-2">Gender</th>
                    <th className="p-2">Year</th>
                  </tr>
                </thead>
                <tbody className="divide-y border-b-2 border-[#2d2d2d]">
                  {team.members.map((m, idx) => (
                    <tr key={idx} className="hover:bg-zinc-50">
                      <td className="p-2">
                        <span className={`px-2 py-0.5 font-kalam text-xs font-bold border border-[#2d2d2d] ${
                          m.role === "leader" ? "bg-[#2d2d2d] text-white" : "bg-[#fff9c4] text-[#2d2d2d]"
                        }`}>
                          {m.role}
                        </span>
                      </td>
                      <td className="p-2 font-bold text-[#2d2d2d]">
                        {m.name}
                      </td>
                      <td className="p-2 font-mono text-sm">
                        {m.scholar_number || m.scholarNumber}
                      </td>
                      <td className="p-2">
                        <span className={m.gender === "Female" ? "text-[#ff4d4d] font-bold" : ""}>
                          {m.gender}
                        </span>
                      </td>
                      <td className="p-2">
                        {m.year}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Actions: Share Link to Join Squad & WhatsApp Share */}
            <TeamPassActions 
              teamCode={team.teamCode} 
              teamName={team.teamName} 
              isFull={team.totalMembers >= 3} 
            />
          </div>

        </div>
      )}
    </div>
  );
}
