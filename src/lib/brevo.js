/**
 * Brevo (Sendinblue) Transactional Email Service
 * Uses Brevo v3 REST API (https://api.brevo.com/v3/smtp/email)
 */

export const isBrevoConfigured = Boolean(
  process.env.BREVO_API_KEY && 
  !process.env.BREVO_API_KEY.includes("your-brevo-api-key")
);

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

export async function sendBrevoEmail({ to, subject, htmlContent, textContent }) {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL || "zenith@manit.ac.in";
  const senderName = process.env.BREVO_SENDER_NAME || "Zenith MANIT - Web Forge";

  if (!isBrevoConfigured) {
    console.warn("[BREVO] API key not configured. Mocking email delivery to:", to);
    return { success: true, mocked: true };
  }

  try {
    const response = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        sender: { name: senderName, email: senderEmail },
        to: Array.isArray(to) ? to : [{ email: to.email, name: to.name }],
        subject,
        htmlContent,
        textContent: textContent || subject,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("[BREVO ERROR]", response.status, errorData);
      return { success: false, error: errorData };
    }

    const data = await response.json();
    return { success: true, messageId: data.messageId };
  } catch (err) {
    console.error("[BREVO EXCEPTION]", err);
    return { success: false, error: err.message };
  }
}

// -----------------------------------------------------------------------------
// HAND-DRAWN SKETCHBOOK EMAIL TEMPLATES
// -----------------------------------------------------------------------------

export function generateTeamCreatedEmail({ teamName, teamCode, leaderName, appUrl }) {
  const baseUrl = appUrl || "https://zenith-webforge.vercel.app";
  const joinUrl = `${baseUrl}/register/join?code=${teamCode}`;
  const passUrl = `${baseUrl}/team/${teamCode}`;
  
  return {
    subject: `[WEB FORGE] Squad Registered: ${teamName} (Code: ${teamCode})`,
    htmlContent: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Web Forge 2026 Squad Registered</title>
</head>
<body style="margin: 0; padding: 24px 12px; background-color: #fdfbf7; font-family: 'Patrick Hand', 'Comic Sans MS', 'Segoe Print', cursive, sans-serif; color: #2d2d2d;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #fdfbf7;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background-color: #ffffff; border: 3px solid #2d2d2d; border-radius: 12px; box-shadow: 6px 6px 0px #2d2d2d; overflow: hidden; text-align: left;">
          
          <!-- Top Yellow Header -->
          <tr>
            <td style="background-color: #fff9c4; padding: 18px 24px; border-bottom: 2px dashed #2d2d2d;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <span style="display: inline-block; background-color: #ff4d4d; color: #ffffff; font-size: 11px; font-weight: bold; letter-spacing: 1px; padding: 3px 8px; border: 1px solid #2d2d2d; border-radius: 4px; text-transform: uppercase;">
                      MANIT Bhopal &bull; Zenith
                    </span>
                    <h1 style="margin: 8px 0 0 0; font-size: 28px; line-height: 1.1; font-weight: bold; color: #2d2d2d;">
                      Web <span style="color: #ff4d4d;">Forge</span> 2026 !
                    </h1>
                  </td>
                  <td align="right" valign="top">
                    <span style="display: inline-block; background-color: #2d5da1; color: #ffffff; font-size: 11px; font-weight: bold; padding: 4px 8px; border: 1px solid #2d2d2d; border-radius: 4px;">
                      22ND OCT 2026
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Body -->
          <tr>
            <td style="padding: 28px 24px; font-size: 17px; line-height: 1.5; color: #2d2d2d;">
              <p style="margin: 0 0 16px 0; font-size: 19px;">
                Hey <strong>${leaderName}</strong>,
              </p>
              <p style="margin: 0 0 20px 0;">
                Your squad <strong>&ldquo;${teamName}&rdquo;</strong> has been successfully registered for <strong>Web Forge 2026</strong> &mdash; the 12-hour high-intensity virtual coding sprint hosted by <strong>Zenith</strong>, the official programming club of MANIT Bhopal.
              </p>

              <!-- Sticky Note Code Box -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 24px 0;">
                <tr>
                  <td style="background-color: #fff9c4; border: 3px dashed #2d2d2d; border-radius: 10px; padding: 20px; text-align: center;">
                    <div style="font-size: 12px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; color: #666666; margin-bottom: 4px;">
                      Official Squad Code
                    </div>
                    <div style="font-size: 34px; font-weight: bold; letter-spacing: 4px; font-family: monospace, Courier, sans-serif; color: #2d2d2d; margin: 4px 0 8px 0;">
                      ${teamCode}
                    </div>
                    <div style="font-size: 14px; color: #555555;">
                      Send this code to your 2 batchmates so they can join your squad!
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Action Buttons -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 24px 0;">
                <tr>
                  <td align="center" style="padding-bottom: 8px;">
                    <a href="${passUrl}" style="display: inline-block; background-color: #ff4d4d; color: #ffffff; font-size: 17px; font-weight: bold; text-decoration: none; padding: 14px 28px; border: 2px solid #2d2d2d; border-radius: 8px; box-shadow: 4px 4px 0px #2d2d2d;">
                      Open Squad Pass &rarr;
                    </a>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <p style="margin: 8px 0 0 0; font-size: 13px; color: #666666;">
                      Squad Link: <a href="${passUrl}" style="color: #2d5da1; font-weight: bold;">${passUrl}</a>
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Rules & Guidelines -->
              <div style="background-color: #fdfbf7; border: 2px solid #2d2d2d; border-radius: 8px; padding: 16px 20px; margin-top: 24px;">
                <div style="font-size: 14px; font-weight: bold; text-transform: uppercase; color: #2d5da1; margin-bottom: 8px;">
                  Quick Rules Checklist:
                </div>
                <ul style="margin: 0; padding-left: 20px; font-size: 15px; line-height: 1.6; color: #333333;">
                  <li><strong>Event Date:</strong> 22nd October 2026 (08:30 AM to 09:15 PM).</li>
                  <li><strong>Strict Squad Size:</strong> Exactly 3 members per squad (all MANIT UG students).</li>
                  <li><strong>Diversity Compulsory:</strong> At least 1 female developer per squad is mandatory.</li>
                  <li><strong>Screen Sharing:</strong> At least 1 team member must actively keep their screen shared in your Google Meet breakout room.</li>
                  <li><strong>AI Tools Allowed:</strong> Cursor, Claude, and Copilot are 100% encouraged!</li>
                </ul>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #fdfbf7; padding: 18px 24px; border-top: 2px dashed #2d2d2d; font-size: 13px; color: #666666; line-height: 1.5;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <strong>Zenith &bull; Programming Club</strong><br/>
                    Maulana Azad National Institute of Technology (MANIT), Bhopal<br/>
                    Questions or Support: <a href="mailto:zenith.nitb.manit@gmail.com" style="color: #2d5da1; font-weight: bold; text-decoration: none;">zenith.nitb.manit@gmail.com</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  };
}

export function generateMemberJoinedEmail({ teamName, teamCode, memberName, leaderEmail, leaderName, appUrl }) {
  const baseUrl = appUrl || "https://zenith-webforge.vercel.app";
  const passUrl = `${baseUrl}/team/${teamCode}`;

  return {
    subject: `[WEB FORGE] You Joined Squad: ${teamName}`,
    htmlContent: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Joined Web Forge Squad</title>
</head>
<body style="margin: 0; padding: 24px 12px; background-color: #fdfbf7; font-family: 'Patrick Hand', 'Comic Sans MS', 'Segoe Print', cursive, sans-serif; color: #2d2d2d;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #fdfbf7;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background-color: #ffffff; border: 3px solid #2d2d2d; border-radius: 12px; box-shadow: 6px 6px 0px #2d2d2d; overflow: hidden; text-align: left;">
          
          <!-- Top Yellow Header -->
          <tr>
            <td style="background-color: #fff9c4; padding: 18px 24px; border-bottom: 2px dashed #2d2d2d;">
              <span style="display: inline-block; background-color: #2d5da1; color: #ffffff; font-size: 11px; font-weight: bold; letter-spacing: 1px; padding: 3px 8px; border: 1px solid #2d2d2d; border-radius: 4px; text-transform: uppercase;">
                Squad Roster Confirmed
              </span>
              <h1 style="margin: 8px 0 0 0; font-size: 26px; line-height: 1.1; font-weight: bold; color: #2d2d2d;">
                Welcome to <span style="color: #ff4d4d;">${teamName}</span> !
              </h1>
            </td>
          </tr>

          <!-- Main Body -->
          <tr>
            <td style="padding: 28px 24px; font-size: 17px; line-height: 1.5; color: #2d2d2d;">
              <p style="margin: 0 0 16px 0; font-size: 19px;">
                Hey <strong>${memberName}</strong>,
              </p>
              <p style="margin: 0 0 20px 0;">
                You have officially joined squad <strong>&ldquo;${teamName}&rdquo;</strong> for <strong>Web Forge 2026</strong> on <strong>22nd October 2026</strong>!
              </p>

              <!-- Team Info Box -->
              <div style="background-color: #fff9c4; border: 2px solid #2d2d2d; border-radius: 8px; padding: 16px 20px; margin: 20px 0;">
                <p style="margin: 0 0 6px 0;"><strong>Squad Name:</strong> ${teamName}</p>
                <p style="margin: 0 0 6px 0;"><strong>Official Code:</strong> <span style="font-family: monospace; font-size: 18px; font-weight: bold;">${teamCode}</span></p>
                ${leaderName ? `<p style="margin: 0;"><strong>Squad Leader:</strong> ${leaderName} (${leaderEmail})</p>` : ''}
              </div>

              <!-- Button -->
              <div style="text-align: center; margin: 24px 0;">
                <a href="${passUrl}" style="display: inline-block; background-color: #ff4d4d; color: #ffffff; font-size: 17px; font-weight: bold; text-decoration: none; padding: 14px 28px; border: 2px solid #2d2d2d; border-radius: 8px; box-shadow: 4px 4px 0px #2d2d2d;">
                  Open Squad Pass &rarr;
                </a>
                <p style="margin: 8px 0 0 0; font-size: 13px; color: #666666;">
                  Squad Link: <a href="${passUrl}" style="color: #2d5da1; font-weight: bold;">${passUrl}</a>
                </p>
              </div>

              <p style="font-size: 15px; color: #555555; line-height: 1.6;">
                Coordinate with your squad leader before kick-off on 22nd October. Make sure your team has 3 members and satisfies the 1 girl diversity requirement.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #fdfbf7; padding: 18px 24px; border-top: 2px dashed #2d2d2d; font-size: 13px; color: #666666; line-height: 1.5;">
              <strong>Zenith &bull; Programming Club</strong><br/>
              Maulana Azad National Institute of Technology (MANIT), Bhopal<br/>
              Contact: <a href="mailto:zenith.nitb.manit@gmail.com" style="color: #2d5da1; font-weight: bold; text-decoration: none;">zenith.nitb.manit@gmail.com</a>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  };
}
