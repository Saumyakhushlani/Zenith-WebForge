"use server";

import { 
  isAuthenticatedAdmin, 
  setAdminSession, 
  clearAdminSession, 
  checkAdminPassword 
} from "@/lib/adminAuth";
import { getSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase";

/**
 * Server Action: Admin Login
 */
export async function adminLoginAction(password) {
  try {
    if (!password) {
      return { success: false, error: "Password is required." };
    }

    const isValid = checkAdminPassword(password);
    if (!isValid) {
      // Artificial delay to prevent rapid brute-forcing
      await new Promise((resolve) => setTimeout(resolve, 800));
      return { success: false, error: "Invalid admin password. Access denied." };
    }

    await setAdminSession();
    return { success: true };
  } catch (err) {
    console.error("adminLoginAction error:", err);
    return { success: false, error: "Authentication system error." };
  }
}

/**
 * Server Action: Admin Logout
 */
export async function adminLogoutAction() {
  await clearAdminSession();
  return { success: true };
}

/**
 * Server Action: Get Admin Session Status
 */
export async function getAdminAuthStatusAction() {
  const isAuth = await isAuthenticatedAdmin();
  return { authenticated: isAuth };
}

/**
 * Server Action: Fetch All Teams, Members, & Metrics (Protected)
 */
export async function getAdminDashboardDataAction() {
  const isAuth = await isAuthenticatedAdmin();
  if (!isAuth) {
    return { success: false, error: "UNAUTHORIZED: Session expired or invalid." };
  }

  try {
    if (!isSupabaseConfigured) {
      return {
        success: true,
        stats: {
          totalTeams: 0,
          totalParticipants: 0,
          teamsWithFemale: 0,
          diversityPercentage: 0,
          yearCounts: {},
          genderCounts: {},
        },
        teams: [],
      };
    }

    const supabase = getSupabaseServerClient();

    // Fetch all teams
    const { data: teams, error: teamsErr } = await supabase
      .from("teams")
      .select("id, team_code, team_name, created_at")
      .order("created_at", { ascending: false });

    if (teamsErr) {
      return { success: false, error: teamsErr.message };
    }

    // Fetch all members
    const { data: members, error: membersErr } = await supabase
      .from("team_members")
      .select("id, team_id, role, name, email, phone, scholar_number, gender, year, created_at")
      .order("created_at", { ascending: true });

    if (membersErr) {
      return { success: false, error: membersErr.message };
    }

    // Map members into their teams
    const membersByTeam = new Map();
    members.forEach((m) => {
      const list = membersByTeam.get(m.team_id) || [];
      list.push(m);
      membersByTeam.set(m.team_id, list);
    });

    let totalParticipants = members.length;
    let teamsWithFemale = 0;
    const yearCounts = { "1st Year": 0, "2nd Year": 0, "3rd Year": 0, "4th Year": 0 };
    const genderCounts = { Female: 0, Male: 0, Other: 0 };

    members.forEach((m) => {
      if (yearCounts[m.year] !== undefined) yearCounts[m.year]++;
      if (genderCounts[m.gender] !== undefined) genderCounts[m.gender]++;
    });

    const structuredTeams = teams.map((team) => {
      const teamMemberList = membersByTeam.get(team.id) || [];
      const leader = teamMemberList.find((m) => m.role === "leader") || teamMemberList[0] || null;
      const hasFemale = teamMemberList.some((m) => m.gender === "Female");
      if (hasFemale) teamsWithFemale++;

      return {
        id: team.id,
        teamCode: team.team_code,
        teamName: team.team_name,
        createdAt: team.created_at,
        memberCount: teamMemberList.length,
        hasFemaleMember: hasFemale,
        leader: leader
          ? {
              name: leader.name,
              email: leader.email,
              phone: leader.phone,
              scholarNumber: leader.scholar_number,
              gender: leader.gender,
              year: leader.year,
            }
          : null,
        members: teamMemberList,
      };
    });

    const totalTeams = structuredTeams.length;
    const diversityPercentage = totalTeams > 0 ? Math.round((teamsWithFemale / totalTeams) * 100) : 0;

    return {
      success: true,
      stats: {
        totalTeams,
        totalParticipants,
        teamsWithFemale,
        diversityPercentage,
        yearCounts,
        genderCounts,
      },
      teams: structuredTeams,
    };
  } catch (err) {
    console.error("getAdminDashboardDataAction exception:", err);
    return { success: false, error: err.message };
  }
}

/**
 * Server Action: Delete Team (Protected)
 */
export async function deleteTeamAction(teamId) {
  const isAuth = await isAuthenticatedAdmin();
  if (!isAuth) {
    return { success: false, error: "UNAUTHORIZED" };
  }

  try {
    const supabase = getSupabaseServerClient();
    const { error } = await supabase.from("teams").delete().eq("id", teamId);
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Server Action: Delete Member (Protected)
 */
export async function deleteMemberAction(memberId) {
  const isAuth = await isAuthenticatedAdmin();
  if (!isAuth) {
    return { success: false, error: "UNAUTHORIZED" };
  }

  try {
    const supabase = getSupabaseServerClient();
    const { error } = await supabase.from("team_members").delete().eq("id", memberId);
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}
