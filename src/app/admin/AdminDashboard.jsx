"use client";

import { useState, useEffect, useMemo } from "react";
import { 
  Lock, 
  LogOut, 
  Search, 
  Download, 
  RefreshCw, 
  ChevronDown, 
  ChevronUp, 
  Trash2, 
  Check, 
  AlertTriangle,
  AlertCircle,
  ShieldCheck,
  Wrench
} from "lucide-react";
import { 
  adminLoginAction, 
  adminLogoutAction, 
  getAdminAuthStatusAction, 
  getAdminDashboardDataAction,
  deleteTeamAction,
  deleteMemberAction
} from "@/app/actions/admin";
import { Tape, Pin, WavyUnderline } from "@/components/HandDrawnSvg";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Login form state
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Dashboard data state
  const [loadingData, setLoadingData] = useState(false);
  const [stats, setStats] = useState(null);
  const [teams, setTeams] = useState([]);
  const [expandedTeamId, setExpandedTeamId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDiversity, setFilterDiversity] = useState("all");
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    async function checkAuth() {
      const res = await getAdminAuthStatusAction();
      setIsAuthenticated(res.authenticated);
      setCheckingAuth(false);
      if (res.authenticated) {
        loadDashboardData();
      }
    }
    checkAuth();
  }, []);

  const loadDashboardData = async () => {
    setLoadingData(true);
    const res = await getAdminDashboardDataAction();
    setLoadingData(false);

    if (res.success) {
      setStats(res.stats);
      setTeams(res.teams);
    } else if (res.error?.includes("UNAUTHORIZED")) {
      setIsAuthenticated(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");

    const res = await adminLoginAction(password);
    setLoginLoading(false);

    if (res.success) {
      setIsAuthenticated(true);
      setPassword("");
      loadDashboardData();
    } else {
      setLoginError(res.error || "Authentication failed.");
    }
  };

  const handleLogout = async () => {
    await adminLogoutAction();
    setIsAuthenticated(false);
    setStats(null);
    setTeams([]);
  };

  const handleDeleteTeam = async (teamId, teamName) => {
    if (!confirm(`Are you sure you want to delete squad "${teamName}" and all members?`)) {
      return;
    }
    setDeletingId(teamId);
    const res = await deleteTeamAction(teamId);
    setDeletingId(null);
    if (res.success) {
      loadDashboardData();
    } else {
      alert("Error deleting team: " + res.error);
    }
  };

  const handleDeleteMember = async (memberId, memberName) => {
    if (!confirm(`Remove member "${memberName}" from this team?`)) {
      return;
    }
    const res = await deleteMemberAction(memberId);
    if (res.success) {
      loadDashboardData();
    } else {
      alert("Error removing member: " + res.error);
    }
  };

  const filteredTeams = useMemo(() => {
    return teams.filter((t) => {
      if (filterDiversity === "met" && !t.hasFemaleMember) return false;
      if (filterDiversity === "missing" && t.hasFemaleMember) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();

      const matchName = t.teamName.toLowerCase().includes(q);
      const matchCode = t.teamCode.toLowerCase().includes(q);
      const matchLeader = t.leader?.name.toLowerCase().includes(q);
      const matchScholar = t.members.some((m) => (m.scholar_number || m.scholarNumber || "").toLowerCase().includes(q));
      const matchMember = t.members.some((m) => m.name.toLowerCase().includes(q));

      return matchName || matchCode || matchLeader || matchScholar || matchMember;
    });
  }, [teams, searchQuery, filterDiversity]);

  const handleExportCsv = () => {
    if (!teams || teams.length === 0) {
      alert("No registered squads to export.");
      return;
    }

    const headers = [
      "Team Code",
      "Team Name",
      "Total Members",
      "Diversity Satisfied",
      "Registration Date",
      "Member Role",
      "Member Name",
      "Scholar Number",
      "Email",
      "Phone",
      "Gender",
      "Year",
    ];

    const rows = [];

    teams.forEach((t) => {
      t.members.forEach((m) => {
        rows.push([
          `"${t.teamCode}"`,
          `"${t.teamName.replace(/"/g, '""')}"`,
          t.memberCount,
          t.hasFemaleMember ? "YES" : "NO",
          `"${new Date(t.createdAt).toLocaleString()}"`,
          `"${m.role.toUpperCase()}"`,
          `"${m.name.replace(/"/g, '""')}"`,
          `"${m.scholar_number || m.scholarNumber}"`,
          `"${m.email}"`,
          `"${m.phone}"`,
          `"${m.gender}"`,
          `"${m.year}"`,
        ]);
      });
    });

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `web_forge_teams_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (checkingAuth) {
    return (
      <div className="bg-white border-[3px] border-[#2d2d2d] border-wobbly-md p-16 text-center font-kalam text-xl font-bold shadow-hand">
        Authenticating Admin Privileges...
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // LOGIN FORM
  // ---------------------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto bg-white border-[3px] border-[#2d2d2d] border-wobbly-lg p-8 md:p-10 shadow-hand-lg relative rotate-0.5">
        <Pin />

        <div className="text-center pb-6 border-b-2 border-dashed border-[#2d2d2d] mb-6">
          <div className="w-14 h-14 rounded-full bg-[#fff9c4] border-2 border-[#2d2d2d] border-wobbly-circle shadow-hand-sm mx-auto flex items-center justify-center mb-3">
            <Lock className="w-6 h-6 text-[#2d2d2d]" />
          </div>
          <span className="font-kalam font-bold text-xs uppercase bg-[#ff4d4d] text-white px-2.5 py-0.5 border border-[#2d2d2d] inline-block -rotate-2 mb-1">
            Zenith Security Zone
          </span>
          <h2 className="text-3xl font-kalam font-bold text-[#2d2d2d] flex items-center justify-center gap-2">
            <span>Admin Access</span>
            <Lock className="w-6 h-6 text-[#2d2d2d]" />
          </h2>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <p className="font-patrick text-lg text-zinc-600">
            Enter the admin password from your environment file to inspect telemetry and moderate squads.
          </p>

          {loginError && (
            <div className="bg-red-50 border-2 border-[#ff4d4d] border-wobbly-sm p-3 font-patrick text-base font-bold text-[#2d2d2d] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#ff4d4d] flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <div>
            <label className="block font-kalam font-bold text-lg text-[#2d2d2d] mb-1">
              Admin Password *
            </label>
            <input
              type="password"
              required
              placeholder="••••••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#fdfbf7] border-2 border-[#2d2d2d] p-3.5 text-xl font-patrick"
            />
          </div>

          <button
            type="submit"
            disabled={loginLoading}
            className="w-full bg-[#ff4d4d] text-white py-3.5 font-kalam font-bold text-xl border-[3px] border-[#2d2d2d] border-wobbly-sm shadow-hand hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hand-sm active:translate-x-[4px] active:translate-y-[4px] transition-all disabled:opacity-50"
          >
            {loginLoading ? "Checking Password..." : "Unlock Admin Console ->"}
          </button>
        </form>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // AUTHENTICATED DASHBOARD
  // ---------------------------------------------------------------------------
  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-[#fff9c4] border-[3px] border-[#2d2d2d] border-wobbly-md p-6 md:p-8 shadow-hand relative rotate-0.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <Tape rotate="-1deg" />
        <div>
          <span className="font-kalam font-bold text-xs uppercase bg-[#2d5da1] text-white px-2.5 py-0.5 border border-[#2d2d2d] inline-block -rotate-1 mb-1">
            Zenith MANIT Command Room
          </span>
          <h2 className="text-3xl md:text-4xl font-kalam font-bold text-[#2d2d2d] flex items-center gap-2.5">
            <span>Web Forge Admin Console</span>
            <Wrench className="w-7 h-7 text-[#2d2d2d]" />
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={loadDashboardData}
            disabled={loadingData}
            className="flex items-center gap-2 bg-white border-2 border-[#2d2d2d] border-wobbly-sm px-4 py-2 font-kalam font-bold text-sm shadow-hand-sm hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
          >
            <RefreshCw className={`w-4 h-4 ${loadingData ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={handleExportCsv}
            className="flex items-center gap-2 bg-[#2d2d2d] text-white px-5 py-2 font-kalam font-bold text-sm border-2 border-[#2d2d2d] border-wobbly-sm shadow-hand-sm hover:bg-[#ff4d4d] transition-all"
          >
            <Download className="w-4 h-4 stroke-[2.5]" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-[#ff4d4d] text-white px-5 py-2 font-kalam font-bold text-sm border-2 border-[#2d2d2d] border-wobbly-sm shadow-hand-sm hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* 4 Post-It Stat Badges */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white border-[3px] border-[#2d2d2d] border-wobbly-sm p-6 shadow-hand -rotate-1">
            <div className="text-4xl md:text-5xl font-kalam font-bold text-[#2d2d2d]">
              {stats.totalTeams}
            </div>
            <div className="font-patrick text-lg text-zinc-600 mt-1">
              Registered Squads
            </div>
          </div>

          <div className="bg-[#fff9c4] border-[3px] border-[#2d2d2d] border-wobbly-md p-6 shadow-hand rotate-1">
            <div className="text-4xl md:text-5xl font-kalam font-bold text-[#2d2d2d]">
              {stats.totalParticipants}
            </div>
            <div className="font-patrick text-lg text-zinc-600 mt-1">
              Total Hackers
            </div>
          </div>

          <div className="bg-white border-[3px] border-[#2d2d2d] border-wobbly-alt p-6 shadow-hand -rotate-2">
            <div className="text-4xl md:text-5xl font-kalam font-bold text-[#ff4d4d]">
              {stats.diversityPercentage}%
            </div>
            <div className="font-patrick text-lg text-zinc-600 mt-1">
              Diversity Ratio ({stats.teamsWithFemale}/{stats.totalTeams})
            </div>
          </div>

          <div className="bg-[#fff9c4] border-[3px] border-[#2d2d2d] border-wobbly-sm p-6 shadow-hand rotate-1.5">
            <div className="font-kalam font-bold text-sm text-zinc-700 mb-1">
              Year Cohorts (UG)
            </div>
            <div className="grid grid-cols-2 gap-2 font-patrick text-base text-zinc-800">
              <div className="bg-white p-2 border border-[#2d2d2d] border-wobbly-sm text-center">
                1st Year: <strong>{stats.yearCounts["1st Year"] || 0}</strong>
              </div>
              <div className="bg-white p-2 border border-[#2d2d2d] border-wobbly-sm text-center">
                2nd Year: <strong>{stats.yearCounts["2nd Year"] || 0}</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white border-[3px] border-[#2d2d2d] border-wobbly-md p-6 shadow-hand flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 stroke-[2.5]" />
          <input
            type="text"
            placeholder="Search teams, codes, scholar numbers, hackers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#fdfbf7] border-2 border-[#2d2d2d] pl-12 pr-4 py-3 text-lg font-patrick text-[#2d2d2d] placeholder:text-zinc-400"
          />
        </div>

        <div className="flex items-center gap-2 font-kalam font-bold">
          <span className="text-zinc-500 text-sm whitespace-nowrap">Filter:</span>
          <select
            value={filterDiversity}
            onChange={(e) => setFilterDiversity(e.target.value)}
            className="bg-[#fdfbf7] border-2 border-[#2d2d2d] px-4 py-3 text-base font-kalam font-bold text-[#2d2d2d]"
          >
            <option value="all">All Squads ({teams.length})</option>
            <option value="met">Diversity Met (&ge;1 Female)</option>
            <option value="missing">Diversity Missing</option>
          </select>
        </div>
      </div>

      {/* Directory Table */}
      <div className="bg-white border-[3px] border-[#2d2d2d] border-wobbly-lg shadow-hand-lg overflow-hidden">
        <div className="bg-[#fff9c4] p-4 px-6 border-b-2 border-dashed border-[#2d2d2d] flex items-center justify-between">
          <span className="font-kalam font-bold text-base text-[#2d2d2d]">
            Showing {filteredTeams.length} of {teams.length} Squads
          </span>
          <span className="font-patrick text-base text-zinc-600">
            Click on any squad to expand roster
          </span>
        </div>

        {filteredTeams.length === 0 ? (
          <div className="p-16 text-center font-kalam text-xl font-bold text-zinc-500 flex items-center justify-center gap-2">
            <span>No matching squads found!</span>
            <Search className="w-5 h-5 text-zinc-400" />
          </div>
        ) : (
          <div className="divide-y-2 divide-dashed divide-[#2d2d2d]">
            {filteredTeams.map((team) => {
              const isExpanded = expandedTeamId === team.id;
              return (
                <div key={team.id}>
                  <div
                    onClick={() => setExpandedTeamId(isExpanded ? null : team.id)}
                    className={`p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#fff9c4]/30 transition-colors ${
                      isExpanded ? "bg-[#fff9c4]/40" : "bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-kalam font-bold text-base bg-[#2d2d2d] text-white px-3 py-1 border border-[#2d2d2d] border-wobbly-sm">
                        {team.teamCode}
                      </span>
                      <div>
                        <h4 className="text-2xl font-kalam font-bold text-[#2d2d2d]">
                          {team.teamName}
                        </h4>
                        <div className="text-base font-patrick text-zinc-600">
                          Leader: <strong>{team.leader?.name || "N/A"}</strong> ({team.leader?.phone || "N/A"})
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                      <span className="bg-[#fdfbf7] border-2 border-[#2d2d2d] px-3 py-1 font-kalam font-bold text-xs border-wobbly-sm">
                        {team.memberCount} / 3 Coders
                      </span>

                      {team.hasFemaleMember ? (
                        <span className="bg-emerald-600 text-white px-3 py-1 font-kalam font-bold text-xs border border-[#2d2d2d] border-wobbly-sm flex items-center gap-1">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          Diversity OK (1 Girl)
                        </span>
                      ) : (
                        <span className="bg-[#ff4d4d] text-white px-3 py-1 font-kalam font-bold text-xs border border-[#2d2d2d] border-wobbly-sm flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          Girl Missing (Compulsory)
                        </span>
                      )}

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteTeam(team.id, team.teamName);
                        }}
                        disabled={deletingId === team.id}
                        className="p-2 border-2 border-[#2d2d2d] bg-white border-wobbly-sm hover:bg-[#ff4d4d] hover:text-white transition-colors"
                        title="Delete Team"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="w-8 h-8 rounded-full border-2 border-[#2d2d2d] flex items-center justify-center bg-white">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Roster Breakdown */}
                  {isExpanded && (
                    <div className="p-6 md:p-8 bg-[#fdfbf7] border-t-2 border-dashed border-[#2d2d2d] overflow-x-auto">
                      <div className="font-kalam font-bold text-lg text-[#ff4d4d] mb-3">
                        Squad Members // {team.teamName}
                      </div>

                      <table className="w-full text-left font-patrick text-lg">
                        <thead className="bg-[#fff9c4] border-2 border-[#2d2d2d] font-kalam font-bold text-base">
                          <tr>
                            <th className="p-2.5">Role</th>
                            <th className="p-2.5">Name</th>
                            <th className="p-2.5">Scholar No</th>
                            <th className="p-2.5">Phone</th>
                            <th className="p-2.5">Email</th>
                            <th className="p-2.5">Gender</th>
                            <th className="p-2.5">Year</th>
                            <th className="p-2.5">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y border-2 border-[#2d2d2d] bg-white">
                          {team.members.map((member) => (
                            <tr key={member.id} className="hover:bg-zinc-50">
                              <td className="p-2.5">
                                <span className={`px-2 py-0.5 font-kalam text-xs font-bold border border-[#2d2d2d] ${
                                  member.role === "leader" ? "bg-[#2d2d2d] text-white" : "bg-[#fff9c4] text-[#2d2d2d]"
                                }`}>
                                  {member.role}
                                </span>
                              </td>
                              <td className="p-2.5 font-bold text-[#2d2d2d]">
                                {member.name}
                              </td>
                              <td className="p-2.5 font-mono text-base">
                                {member.scholar_number || member.scholarNumber}
                              </td>
                              <td className="p-2.5 font-mono text-base">
                                <a href={`tel:${member.phone}`} className="hover:underline hover:text-[#2d5da1]">
                                  {member.phone}
                                </a>
                              </td>
                              <td className="p-2.5 font-mono text-base">
                                <a href={`mailto:${member.email}`} className="hover:underline hover:text-[#2d5da1]">
                                  {member.email}
                                </a>
                              </td>
                              <td className="p-2.5">
                                <span className={member.gender === "Female" ? "text-[#ff4d4d] font-bold" : ""}>
                                  {member.gender}
                                </span>
                              </td>
                              <td className="p-2.5">
                                {member.year}
                              </td>
                              <td className="p-2.5">
                                <button
                                  onClick={() => handleDeleteMember(member.id, member.name)}
                                  className="text-[#ff4d4d] hover:underline font-bold text-sm"
                                  title="Remove Member"
                                >
                                  Remove
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
