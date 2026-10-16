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
// SWISS INTERNATIONAL EMAIL TEMPLATES
// -----------------------------------------------------------------------------

export function generateTeamCreatedEmail({ teamName, teamCode, leaderName, appUrl }) {
  const joinUrl = `${appUrl || "http://localhost:3000"}/register/join?code=${teamCode}`;
  
  return {
    subject: `[WEB FORGE] Team Registered: ${teamName} (Code: ${teamCode})`,
    htmlContent: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #F2F2F2; margin: 0; padding: 24px; color: #000000; }
    .container { max-width: 600px; margin: 0 auto; background: #FFFFFF; border: 4px solid #000000; padding: 32px; }
    .header-tag { font-size: 11px; letter-spacing: 3px; font-weight: 700; color: #FF3000; text-transform: uppercase; margin-bottom: 8px; }
    .title { font-size: 32px; font-weight: 900; letter-spacing: -1px; text-transform: uppercase; margin: 0 0 16px 0; line-height: 1.1; }
    .code-box { background: #000000; color: #FFFFFF; padding: 24px; margin: 24px 0; border-left: 8px solid #FF3000; }
    .code-label { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #FF3000; font-weight: 700; }
    .code-val { font-size: 36px; font-weight: 900; letter-spacing: 4px; font-family: monospace; margin: 8px 0; }
    .instructions { font-size: 14px; line-height: 1.6; color: #333333; margin: 20px 0; border-top: 2px solid #000000; padding-top: 20px; }
    .btn { display: inline-block; background: #FF3000; color: #FFFFFF; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; padding: 14px 24px; text-decoration: none; border: 2px solid #000000; margin-top: 16px; }
    .footer { margin-top: 32px; font-size: 11px; letter-spacing: 1px; text-transform: uppercase; color: #777777; border-top: 1px solid #DDDDDD; padding-top: 16px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header-tag">ZENITH CODING SOCIETY // MANIT BHOPAL</div>
    <h1 class="title">WEB FORGE PROTOCOL // TEAM CREATED</h1>
    
    <p>Greetings <strong>${leaderName}</strong>,</p>
    <p>Your team <strong>${teamName}</strong> has been successfully registered for <strong>Web Forge</strong>, the 12-hour high-intensity virtual hackathon at MANIT Bhopal.</p>
    
    <div class="code-box">
      <div class="code-label">OFFICIAL TEAM CODE</div>
      <div class="code-val">${teamCode}</div>
      <p style="margin: 0; font-size: 12px; color: #CCCCCC;">Distribute this code to your team members so they can join your roster.</p>
    </div>

    <div class="instructions">
      <h3 style="margin-top:0; text-transform: uppercase;">TEAM GUIDELINES:</h3>
      <ul>
        <li><strong>Team Size:</strong> Squad size is strictly 3 members (Leader + 2 teammates).</li>
        <li><strong>Diversity Criteria:</strong> 1 female developer is strictly compulsory per 3-person squad.</li>
        <li><strong>Event Format:</strong> Strictly virtual on Google Meet with continuous screen-sharing mandate (at least 1 active screen stream).</li>
        <li><strong>AI Mandate:</strong> ChatGPT, Claude, GitHub Copilot, and Cursor are 100% allowed.</li>
      </ul>
      
      <a href="${joinUrl}" class="btn">JOIN TEAM LINK</a>
    </div>

    <div class="footer">
      ZENITH CODING SOCIETY • MAULANA AZAD NATIONAL INSTITUTE OF TECHNOLOGY (MANIT), BHOPAL<br/>
      Contact &amp; Support: <a href="mailto:zenith.nitb.manit@gmail.com" style="color: #2D5DA1; text-decoration: none; font-weight: bold;">zenith.nitb.manit@gmail.com</a>
    </div>
  </div>
</body>
</html>
    `,
  };
}

export function generateMemberJoinedEmail({ teamName, teamCode, memberName, leaderEmail, leaderName }) {
  return {
    subject: `[WEB FORGE] You Joined Team: ${teamName}`,
    htmlContent: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #F2F2F2; margin: 0; padding: 24px; color: #000000; }
    .container { max-width: 600px; margin: 0 auto; background: #FFFFFF; border: 4px solid #000000; padding: 32px; }
    .header-tag { font-size: 11px; letter-spacing: 3px; font-weight: 700; color: #FF3000; text-transform: uppercase; margin-bottom: 8px; }
    .title { font-size: 30px; font-weight: 900; letter-spacing: -1px; text-transform: uppercase; margin: 0 0 16px 0; }
    .details { background: #F2F2F2; border: 2px solid #000000; padding: 20px; margin: 20px 0; }
    .footer { margin-top: 32px; font-size: 11px; letter-spacing: 1px; text-transform: uppercase; color: #777777; border-top: 1px solid #DDDDDD; padding-top: 16px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header-tag">ZENITH CODING SOCIETY // MANIT BHOPAL</div>
    <h1 class="title">WEB FORGE // ROSTER CONFIRMATION</h1>
    
    <p>Hello <strong>${memberName}</strong>,</p>
    <p>You have successfully joined the team <strong>${teamName}</strong> for <strong>Web Forge</strong>.</p>
    
    <div class="details">
      <p style="margin: 0 0 8px 0;"><strong>Team Name:</strong> ${teamName}</p>
      <p style="margin: 0 0 8px 0;"><strong>Team Code:</strong> ${teamCode}</p>
      ${leaderName ? `<p style="margin: 0;"><strong>Team Leader:</strong> ${leaderName} (${leaderEmail})</p>` : ''}
    </div>

    <p style="font-size: 14px; line-height: 1.6;">
      Get ready for the 12-hour sprint! The event kick-off and problem statement reveal will take place on Google Meet. Keep in touch with your team leader.
    </p>

    <div class="footer">
      ZENITH CODING SOCIETY • MAULANA AZAD NATIONAL INSTITUTE OF TECHNOLOGY (MANIT), BHOPAL<br/>
      Contact &amp; Support: <a href="mailto:zenith.nitb.manit@gmail.com" style="color: #2D5DA1; text-decoration: none; font-weight: bold;">zenith.nitb.manit@gmail.com</a>
    </div>
  </div>
</body>
</html>
    `,
  };
}
