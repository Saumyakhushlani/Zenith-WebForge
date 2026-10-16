import Link from "next/link";
import { getTeamDetailsAction } from "@/app/actions/registration";
import { ArrowLeft, Users, AlertCircle, Ticket, Check, AlertTriangle, ClipboardList } from "lucide-react";
import { Tape } from "@/components/HandDrawnSvg";
import TeamPassActions from "./TeamPassActions";
import CopyCodeButton from "./CopyCodeButton";

export default async function TeamPassContent({ params }) {
  const { code } = await params;
  const res = await getTeamDetailsAction(code);
  const team = res.success ? res.team : null;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6">
      {/* Top Bar */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-kalam font-bold text-sm bg-white border-2 border-[#2d2d2d] border-wobbly-sm px-3.5 py-1.5 shadow-hand-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
          <span>Back to Home</span>
        </Link>

        <span className="font-kalam text-xs sm:text-sm font-bold text-[#ff4d4d] -rotate-1 bg-[#fff9c4] px-2.5 py-1 border border-[#2d2d2d] inline-flex items-center gap-1.5">
          <Ticket className="w-3.5 h-3.5" />
          <span>Official Squad Pass</span>
        </span>
      </div>

      {!team ? (
        <div className="bg-white border-2 sm:border-[3px] border-[#2d2d2d] border-wobbly-md p-6 sm:p-10 text-center shadow-hand-lg">
          <div className="w-12 h-12 rounded-full bg-red-100 border-2 border-[#2d2d2d] border-wobbly-circle mx-auto flex items-center justify-center text-[#ff4d4d] mb-3">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-kalam font-bold text-[#2d2d2d] mb-1">
            Team Code Not Found
          </h2>
          <p className="font-patrick text-base sm:text-lg text-zinc-600 mb-5">
            No active squad was found under code <strong className="font-mono text-[#2d2d2d]">{code}</strong>.
          </p>
          <Link
            href="/register/create"
            className="inline-block bg-[#ff4d4d] text-white px-6 py-2.5 font-kalam font-bold text-lg border-2 border-[#2d2d2d] border-wobbly-sm shadow-hand hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            Create New Squad &rarr;
          </Link>
        </div>
      ) : (
        <div className="bg-white border-2 sm:border-[3px] border-[#2d2d2d] border-wobbly-lg shadow-hand-lg relative rotate-0.5 overflow-hidden">
          <Tape rotate="-1deg" />

          {/* Pass Header */}
          <div className="bg-[#fff9c4] p-5 sm:p-7 border-b-2 sm:border-b-[3px] border-[#2d2d2d]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="font-kalam font-bold text-[10px] sm:text-xs uppercase bg-[#ff4d4d] text-white px-2 py-0.5 border border-[#2d2d2d] inline-block mb-1.5 -rotate-1">
                  Web Forge 2026 // Zenith MANIT
                </span>
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-kalam font-bold text-[#2d2d2d] leading-tight">
                  {team.teamName}
                </h1>
              </div>

              {/* Code Stamp Box with Copy Code */}
              <div className="bg-white border-2 sm:border-[3px] border-[#2d2d2d] border-wobbly-sm p-3 text-center shadow-hand-sm rotate-2 self-start sm:self-auto min-w-[130px]">
                <div className="font-kalam font-bold text-[10px] text-zinc-500 uppercase">
                  SQUAD CODE
                </div>
                <div className="text-2xl sm:text-3xl font-kalam font-bold text-[#2d2d2d] tracking-wider font-mono">
                  {team.teamCode}
                </div>
                <CopyCodeButton teamCode={team.teamCode} />
              </div>
            </div>

            {/* Badges */}
            <div className="mt-5 pt-3 border-t-2 border-dashed border-[#2d2d2d] flex flex-wrap items-center gap-2.5 text-sm font-kalam font-bold">
              <span className="bg-white border border-[#2d2d2d] px-2.5 py-1 border-wobbly-sm inline-flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                <span>{team.totalMembers} / 3 Members</span>
              </span>

              {team.hasFemaleMember ? (
                <span className="bg-emerald-600 text-white border border-[#2d2d2d] px-2.5 py-1 border-wobbly-sm inline-flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Diversity Satisfied</span>
                </span>
              ) : (
                <span className="bg-[#ff4d4d] text-white border border-[#2d2d2d] px-2.5 py-1 border-wobbly-sm inline-flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>1 Girl Member Required</span>
                </span>
              )}

              <span className="bg-white border border-[#2d2d2d] px-2.5 py-1 border-wobbly-sm text-zinc-600">
                22nd Oct 2026
              </span>
            </div>
          </div>

          {/* Members Table */}
          <div className="p-5 sm:p-7">
            <h3 className="text-lg sm:text-xl font-kalam font-bold text-[#2d2d2d] mb-3 flex items-center gap-2">
              <span>Confirmed Squad Roster</span>
              <ClipboardList className="w-4 h-4 text-[#2d2d2d]" />
            </h3>

            <div className="overflow-x-auto -mx-2 sm:mx-0">
              <table className="w-full text-left font-patrick text-base sm:text-lg min-w-[380px]">
                <thead>
                  <tr className="border-b-2 border-[#2d2d2d] font-kalam font-bold text-base">
                    <th className="p-2 sm:p-2.5">Role</th>
                    <th className="p-2 sm:p-2.5">Name</th>
                    <th className="p-2 sm:p-2.5">Scholar No</th>
                    <th className="p-2 sm:p-2.5">Gender</th>
                    <th className="p-2 sm:p-2.5">Year</th>
                  </tr>
                </thead>
                <tbody className="divide-y border-b-2 border-[#2d2d2d]">
                  {team.members.map((m, idx) => (
                    <tr key={idx} className="hover:bg-zinc-50">
                      <td className="p-2 sm:p-2.5">
                        <span className={`px-2 py-0.5 font-kalam text-xs font-bold border border-[#2d2d2d] ${
                          m.role === "leader" ? "bg-[#2d2d2d] text-white" : "bg-[#fff9c4] text-[#2d2d2d]"
                        }`}>
                          {m.role}
                        </span>
                      </td>
                      <td className="p-2 sm:p-2.5 font-bold text-[#2d2d2d]">
                        {m.name}
                      </td>
                      <td className="p-2 sm:p-2.5 font-mono text-sm sm:text-base">
                        {m.scholar_number || m.scholarNumber}
                      </td>
                      <td className="p-2 sm:p-2.5">
                        <span className={m.gender === "Female" ? "text-[#ff4d4d] font-bold" : ""}>
                          {m.gender}
                        </span>
                      </td>
                      <td className="p-2 sm:p-2.5">
                        {m.year}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Concise Actions (Share Link to Join This Squad & WhatsApp Share) */}
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
