"use server";

import { getSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase";
import { 
  sendBrevoEmail, 
  generateTeamCreatedEmail, 
  generateMemberJoinedEmail 
} from "@/lib/brevo";
import {
  validatePhone,
  validateEmail,
  validateScholarNumber,
  validateName,
  validateTeamName,
  validateGender,
  validateYear,
  validateTeamCode,
} from "@/lib/validation";

// Generate clean, readable Swiss-style team codes (e.g. WF-8X4K)
function generateTeamCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "WF-";
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Fallback in-memory store for instant UI testing if Supabase is not yet connected
const mockTeams = new Map();

/**
 * Server Action: Create Team
 */
export async function createTeamAction(data) {
  try {
    // 1. Strict Validation of All Required Fields
    const teamNameVal = validateTeamName(data.teamName);
    if (!teamNameVal.isValid) return { success: false, error: teamNameVal.error };

    const nameVal = validateName(data.name);
    if (!nameVal.isValid) return { success: false, error: nameVal.error };

    const emailVal = validateEmail(data.email);
    if (!emailVal.isValid) return { success: false, error: emailVal.error };

    const phoneVal = validatePhone(data.phone);
    if (!phoneVal.isValid) return { success: false, error: phoneVal.error };

    const scholarVal = validateScholarNumber(data.scholarNumber);
    if (!scholarVal.isValid) return { success: false, error: scholarVal.error };

    const genderVal = validateGender(data.gender);
    if (!genderVal.isValid) return { success: false, error: genderVal.error };

    const yearVal = validateYear(data.year);
    if (!yearVal.isValid) return { success: false, error: yearVal.error };

    const normalizedEmail = emailVal.cleanedEmail;
    const normalizedScholar = scholarVal.cleanedScholar;
    const normalizedPhone = phoneVal.cleanedPhone;
    const normalizedTeamName = teamNameVal.cleanedTeamName;
    const normalizedName = nameVal.cleanedName;

    const teamCode = generateTeamCode();

    if (isSupabaseConfigured) {
      const supabase = getSupabaseServerClient();

      // Check if email, scholar number, or phone is already registered
      const { data: existingMember } = await supabase
        .from("team_members")
        .select("id, email, scholar_number, phone")
        .or(`email.eq.${normalizedEmail},scholar_number.eq.${normalizedScholar},phone.eq.${normalizedPhone}`)
        .maybeSingle();

      if (existingMember) {
        if (existingMember.email.toLowerCase() === normalizedEmail) {
          return { success: false, error: "This email address is already registered with an existing team." };
        }
        if (existingMember.scholar_number.toUpperCase() === normalizedScholar) {
          return { success: false, error: "This Scholar Number is already registered with an existing team." };
        }
        if (existingMember.phone === normalizedPhone) {
          return { success: false, error: "This phone number is already registered with an existing team." };
        }
      }

      // Check team name conflict
      const { data: existingTeam } = await supabase
        .from("teams")
        .select("id")
        .ilike("team_name", normalizedTeamName)
        .maybeSingle();

      if (existingTeam) {
        return { success: false, error: "A team with this name already exists. Please choose another name." };
      }

      // Insert Team
      const { data: team, error: teamErr } = await supabase
        .from("teams")
        .insert({
          team_code: teamCode,
          team_name: normalizedTeamName,
        })
        .select()
        .single();

      if (teamErr) {
        console.error("Team creation error:", teamErr);
        return { success: false, error: teamErr.message || "Failed to create team record." };
      }

      // Insert Leader
      const { error: memberErr } = await supabase
        .from("team_members")
        .insert({
          team_id: team.id,
          role: "leader",
          name: normalizedName,
          email: normalizedEmail,
          phone: normalizedPhone,
          scholar_number: normalizedScholar,
          gender: genderVal.gender,
          year: yearVal.year,
        });

      if (memberErr) {
        console.error("Leader registration error:", memberErr);
        // Rollback team
        await supabase.from("teams").delete().eq("id", team.id);
        return { success: false, error: memberErr.message || "Failed to register leader." };
      }
    } else {
      // Mock mode for local testing prior to env setup
      console.warn("[MOCK MODE] Supabase not configured. Using temporary memory state.");
      mockTeams.set(teamCode, {
        team_code: teamCode,
        team_name: normalizedTeamName,
        created_at: new Date().toISOString(),
        members: [{
          role: "leader",
          name: normalizedName,
          email: normalizedEmail,
          phone: normalizedPhone,
          scholar_number: normalizedScholar,
          gender: genderVal.gender,
          year: yearVal.year,
        }],
      });
    }

    // Trigger Brevo Confirmation Email
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const emailPayload = generateTeamCreatedEmail({
      teamName: normalizedTeamName,
      teamCode,
      leaderName: normalizedName,
      appUrl,
    });

    await sendBrevoEmail({
      to: { email: normalizedEmail, name: normalizedName },
      subject: emailPayload.subject,
      htmlContent: emailPayload.htmlContent,
    });

    return {
      success: true,
      teamCode,
      teamName: normalizedTeamName,
      isMock: !isSupabaseConfigured,
    };
  } catch (err) {
    console.error("createTeamAction unexpected exception:", err);
    return { success: false, error: err.message || "An unexpected error occurred." };
  }
}

/**
 * Server Action: Join Existing Team
 */
export async function joinTeamAction(data) {
  try {
    // 1. Strict Validation of All Fields
    const codeVal = validateTeamCode(data.teamCode);
    if (!codeVal.isValid) return { success: false, error: codeVal.error };

    const nameVal = validateName(data.name);
    if (!nameVal.isValid) return { success: false, error: nameVal.error };

    const emailVal = validateEmail(data.email);
    if (!emailVal.isValid) return { success: false, error: emailVal.error };

    const phoneVal = validatePhone(data.phone);
    if (!phoneVal.isValid) return { success: false, error: phoneVal.error };

    const scholarVal = validateScholarNumber(data.scholarNumber);
    if (!scholarVal.isValid) return { success: false, error: scholarVal.error };

    const genderVal = validateGender(data.gender);
    if (!genderVal.isValid) return { success: false, error: genderVal.error };

    const yearVal = validateYear(data.year);
    if (!yearVal.isValid) return { success: false, error: yearVal.error };

    const cleanCode = codeVal.cleanedCode;
    const normalizedEmail = emailVal.cleanedEmail;
    const normalizedScholar = scholarVal.cleanedScholar;
    const normalizedPhone = phoneVal.cleanedPhone;
    const normalizedName = nameVal.cleanedName;

    if (isSupabaseConfigured) {
      const supabase = getSupabaseServerClient();

      // Find the team
      const { data: team, error: teamLookupErr } = await supabase
        .from("teams")
        .select("id, team_name, team_code")
        .eq("team_code", cleanCode)
        .maybeSingle();

      if (teamLookupErr || !team) {
        return { success: false, error: `Invalid Team Code "${cleanCode}". Please verify with your squad leader.` };
      }

      // Check current member count
      const { count, error: countErr } = await supabase
        .from("team_members")
        .select("*", { count: "exact", head: true })
        .eq("team_id", team.id);

      if (countErr) {
        return { success: false, error: "Could not verify team capacity." };
      }

      if (count >= 3) {
        return { success: false, error: `Team ${team.team_name} has already reached maximum capacity (strictly 3 members).` };
      }

      // Check if email, scholar number, or phone is already registered
      const { data: existingMember } = await supabase
        .from("team_members")
        .select("id, email, scholar_number, phone, team_id")
        .or(`email.eq.${normalizedEmail},scholar_number.eq.${normalizedScholar},phone.eq.${normalizedPhone}`)
        .maybeSingle();

      if (existingMember) {
        if (existingMember.email.toLowerCase() === normalizedEmail) {
          return { success: false, error: "This email address is already registered in a team." };
        }
        if (existingMember.scholar_number.toUpperCase() === normalizedScholar) {
          return { success: false, error: "This Scholar Number is already registered in a team." };
        }
        if (existingMember.phone === normalizedPhone) {
          return { success: false, error: "This phone number is already registered in a team." };
        }
      }

      // Insert Member
      const { error: insertErr } = await supabase
        .from("team_members")
        .insert({
          team_id: team.id,
          role: "member",
          name: normalizedName,
          email: normalizedEmail,
          phone: normalizedPhone,
          scholar_number: normalizedScholar,
          gender: genderVal.gender,
          year: yearVal.year,
        });

      if (insertErr) {
        return { success: false, error: insertErr.message || "Failed to join team roster." };
      }

      // Fetch leader info to notify
      const { data: leader } = await supabase
        .from("team_members")
        .select("name, email")
        .eq("team_id", team.id)
        .eq("role", "leader")
        .maybeSingle();

      // Send confirmation to newly joined member
      const memberEmailPayload = generateMemberJoinedEmail({
        teamName: team.team_name,
        teamCode: team.team_code,
        memberName: normalizedName,
        leaderEmail: leader?.email,
        leaderName: leader?.name,
      });

      await sendBrevoEmail({
        to: { email: normalizedEmail, name: normalizedName },
        subject: memberEmailPayload.subject,
        htmlContent: memberEmailPayload.htmlContent,
      });

      return {
        success: true,
        teamName: team.team_name,
        teamCode: team.team_code,
        isMock: false,
      };
    } else {
      // Mock mode
      console.warn("[MOCK MODE] Joining team in temporary mock state.");
      const team = mockTeams.get(cleanCode);
      if (!team) {
        return { success: false, error: "Team code not found in mock store. (Create a team first)" };
      }
      if (team.members.length >= 3) {
        return { success: false, error: "Team has reached maximum capacity (strictly 3 members)." };
      }

      team.members.push({
        role: "member",
        name: normalizedName,
        email: normalizedEmail,
        phone: normalizedPhone,
        scholar_number: normalizedScholar,
        gender: genderVal.gender,
        year: yearVal.year,
      });

      return {
        success: true,
        teamName: team.team_name,
        teamCode: team.team_code,
        isMock: true,
      };
    }
  } catch (err) {
    console.error("joinTeamAction exception:", err);
    return { success: false, error: err.message || "An unexpected error occurred." };
  }
}

/**
 * Server Action: Get Team Details by Code
 */
export async function getTeamDetailsAction(teamCode) {
  const codeVal = validateTeamCode(teamCode);
  if (!codeVal.isValid) return { success: false, error: codeVal.error };
  const cleanCode = codeVal.cleanedCode;

  try {
    if (isSupabaseConfigured) {
      const supabase = getSupabaseServerClient();

      // Use view if exists, otherwise join
      const { data: teamView, error: viewErr } = await supabase
        .from("teams_summary_view")
        .select("*")
        .eq("team_code", cleanCode)
        .maybeSingle();

      if (!viewErr && teamView) {
        return {
          success: true,
          team: {
            teamCode: teamView.team_code,
            teamName: teamView.team_name,
            totalMembers: teamView.total_members,
            hasFemaleMember: teamView.has_female_member,
            members: teamView.members || [],
            createdAt: teamView.created_at,
          },
        };
      }

      // Fallback direct query
      const { data: team, error: teamErr } = await supabase
        .from("teams")
        .select("id, team_code, team_name, created_at")
        .eq("team_code", cleanCode)
        .maybeSingle();

      if (teamErr || !team) {
        return { success: false, error: `Team with code ${cleanCode} was not found.` };
      }

      const { data: members, error: membersErr } = await supabase
        .from("team_members")
        .select("id, name, email, phone, scholar_number, gender, year, role, created_at")
        .eq("team_id", team.id)
        .order("created_at", { ascending: true });

      if (membersErr) {
        return { success: false, error: "Failed to load team members." };
      }

      const hasFemale = members.some((m) => m.gender === "Female");

      return {
        success: true,
        team: {
          teamCode: team.team_code,
          teamName: team.team_name,
          totalMembers: members.length,
          hasFemaleMember: hasFemale,
          members: members,
          createdAt: team.created_at,
        },
      };
    } else {
      const mock = mockTeams.get(cleanCode);
      if (!mock) return { success: false, error: `Team ${cleanCode} not found in local state.` };
      const hasFemale = mock.members.some((m) => m.gender === "Female");
      return {
        success: true,
        team: {
          teamCode: mock.team_code,
          teamName: mock.team_name,
          totalMembers: mock.members.length,
          hasFemaleMember: hasFemale,
          members: mock.members,
          createdAt: mock.created_at,
        },
      };
    }
  } catch (err) {
    return { success: false, error: err.message };
  }
}
