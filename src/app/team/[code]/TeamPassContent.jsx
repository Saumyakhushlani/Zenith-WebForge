import Link from "next/link";
import { getTeamDetailsAction } from "@/app/actions/registration";
import { ArrowLeft, Users, ShieldCheck, AlertCircle, Copy, Share2, Ticket, Check, AlertTriangle, ClipboardList } from "lucide-react";
import { Tape, Pin, WavyUnderline } from "@/components/HandDrawnSvg";

export default async function TeamPassContent({ params }) {
  const { code } = await params;
  const res = await getTeamDetailsAction(code);
  const team = res.success ? res.team : null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 sm:gap-2 font-kalam font-bold text-sm sm:text-base bg-white border-2 border-[#2d2d2d] border-wobbly-sm px-3.5 sm:px-4 py-1.5 sm:py-2 shadow-hand-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
          <span>Back to Home</span>
        </Link>

        <span className="font-kalam text-xs sm:text-sm font-bold text-[#ff4d4d] -rotate-1 bg-[#fff9c4] px-2.5 sm:px-3 py-1 border border-[#2d2d2d] inline-flex items-center gap-1.5">
          <Ticket className="w-3.5 h-3.5" />
          <span>Official Squad Pass</span>
        </span>
      </div>

      {!team ? (
        <div className="bg-white border-2 sm:border-[3px] border-[#2d2d2d] border-wobbly-md p-6 sm:p-12 text-center shadow-hand-lg">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-red-100 border-2 border-[#2d2d2d] border-wobbly-circle mx-auto flex items-center justify-center text-[#ff4d4d] mb-4">
            <AlertCircle className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-kalam font-bold text-[#2d2d2d] mb-2">
            Team Code Not Found!
          </h2>
          <p className="font-patrick text-lg sm:text-xl text-zinc-600 mb-6">
            No active squad was found under code <strong className="font-kalam font-bold text-[#2d2d2d]">{code}</strong>.
          </p>
          <Link
            href="/register/create"
            className="inline-block bg-[#ff4d4d] text-white px-6 sm:px-8 py-3 sm:py-3.5 font-kalam font-bold text-lg sm:text-xl border-2 sm:border-[3px] border-[#2d2d2d] border-wobbly-sm shadow-hand hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            Create a New Team &rarr;
          </Link>
        </div>
      ) : (
        <div className="bg-white border-2 sm:border-[3px] border-[#2d2d2d] border-wobbly-lg shadow-hand-lg relative rotate-0.5 overflow-hidden">
          <Tape rotate="-1deg" />

          {/* Pass Header */}
          <div className="bg-[#fff9c4] p-5 sm:p-8 md:p-10 border-b-2 sm:border-b-[3px] border-[#2d2d2d]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
              <div>
                <span className="font-kalam font-bold text-xs uppercase bg-[#ff4d4d] text-white px-2.5 py-0.5 border border-[#2d2d2d] inline-block mb-1.5 -rotate-1">
                  Web Forge 2026 // Zenith MANIT
                </span>
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-kalam font-bold text-[#2d2d2d] leading-tight">
                  {team.teamName}
                </h1>
              </div>

              {/* Code Stamp Box */}
              <div className="bg-white border-2 sm:border-[3px] border-[#2d2d2d] border-wobbly-sm p-3 sm:p-4 text-center shadow-hand-sm rotate-2 self-start sm:self-auto">
                <div className="font-kalam font-bold text-[10px] sm:text-xs text-zinc-500 uppercase">
                  OFFICIAL CODE
                </div>
                <div className="text-3xl sm:text-4xl font-kalam font-bold text-[#2d2d2d] tracking-wider">
                  {team.teamCode}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t-2 border-dashed border-[#2d2d2d] flex flex-wrap items-center gap-4 text-base font-kalam font-bold">
              <span className="bg-white border border-[#2d2d2d] px-3 py-1 border-wobbly-sm inline-flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                <span>{team.totalMembers} / 3 Members</span>
              </span>

              {team.hasFemaleMember ? (
                <span className="bg-emerald-600 text-white border border-[#2d2d2d] px-3 py-1 border-wobbly-sm inline-flex items-center gap-1.5">
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Diversity Satisfied (1 Girl Present)</span>
                </span>
              ) : (
                <span className="bg-[#ff4d4d] text-white border border-[#2d2d2d] px-3 py-1 border-wobbly-sm inline-flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  <span>1 Girl Member Compulsory</span>
                </span>
              )}
            </div>
          </div>

          {/* Members Table */}
          <div className="p-5 sm:p-8 md:p-10">
            <h3 className="text-xl sm:text-2xl font-kalam font-bold text-[#2d2d2d] mb-3 sm:mb-4 flex items-center gap-2">
              <span>Confirmed Squad Roster</span>
              <ClipboardList className="w-5 h-5 sm:w-6 sm:h-6 text-[#2d2d2d] flex-shrink-0" />
            </h3>

            <div className="overflow-x-auto -mx-2 sm:mx-0">
              <table className="w-full text-left font-patrick text-base sm:text-xl min-w-[420px]">
                <thead>
                  <tr className="border-b-2 border-[#2d2d2d] font-kalam font-bold text-lg">
                    <th className="p-3">Role</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Scholar No</th>
                    <th className="p-3">Gender</th>
                    <th className="p-3">Year</th>
                  </tr>
                </thead>
                <tbody className="divide-y border-b-2 border-[#2d2d2d]">
                  {team.members.map((m, idx) => (
                    <tr key={idx} className="hover:bg-zinc-50">
                      <td className="p-3">
                        <span className={`px-2 py-0.5 font-kalam text-xs font-bold border border-[#2d2d2d] ${
                          m.role === "leader" ? "bg-[#2d2d2d] text-white" : "bg-[#fff9c4] text-[#2d2d2d]"
                        }`}>
                          {m.role}
                        </span>
                      </td>
                      <td className="p-3 font-bold text-[#2d2d2d]">
                        {m.name}
                      </td>
                      <td className="p-3 font-mono text-base">
                        {m.scholar_number || m.scholarNumber}
                      </td>
                      <td className="p-3">
                        <span className={m.gender === "Female" ? "text-[#ff4d4d] font-bold" : ""}>
                          {m.gender}
                        </span>
                      </td>
                      <td className="p-3">
                        {m.year}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 pt-6 border-t-2 border-dashed border-[#2d2d2d] flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href={`/register/join?code=${team.teamCode}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#ff4d4d] text-white px-8 py-3.5 font-kalam font-bold text-xl border-[3px] border-[#2d2d2d] border-wobbly-sm shadow-hand hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              >
                <span>Join This Squad &rarr;</span>
              </Link>

              <Link
                href="/register"
                className="w-full sm:w-auto text-center bg-white text-[#2d2d2d] border-2 border-[#2d2d2d] border-wobbly-sm px-6 py-3 font-kalam font-bold text-lg shadow-hand-sm hover:bg-[#fff9c4] transition-all"
              >
                Registration Portal
              </Link>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
