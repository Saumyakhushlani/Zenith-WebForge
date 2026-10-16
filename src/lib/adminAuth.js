import crypto from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "wf_admin_session";
const SESSION_DURATION = 12 * 60 * 60 * 1000; // 12 Hours

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "zenith_forge_sec_fallback_key";
}

// Generate signed token
export function createSessionToken() {
  const expiresAt = Date.now() + SESSION_DURATION;
  const payload = JSON.stringify({ role: "admin", exp: expiresAt });
  const base64Payload = Buffer.from(payload).toString("base64url");
  
  const hmac = crypto.createHmac("sha256", getSecret());
  hmac.update(base64Payload);
  const signature = hmac.digest("base64url");
  
  return `${base64Payload}.${signature}`;
}

// Verify token signature and expiration
export function verifySessionToken(token) {
  if (!token || typeof token !== "string" || !token.includes(".")) {
    return false;
  }

  const [base64Payload, signature] = token.split(".");
  if (!base64Payload || !signature) return false;

  const hmac = crypto.createHmac("sha256", getSecret());
  hmac.update(base64Payload);
  const expectedSignature = hmac.digest("base64url");

  // Constant-time comparison to prevent timing attacks
  const sigBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (sigBuffer.length !== expectedBuffer.length) {
    return false;
  }

  if (!crypto.timingSafeEqual(sigBuffer, expectedBuffer)) {
    return false;
  }

  try {
    const jsonStr = Buffer.from(base64Payload, "base64url").toString("utf8");
    const payload = JSON.parse(jsonStr);

    if (payload.role !== "admin" || !payload.exp || Date.now() > payload.exp) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

// Server-side session verification from cookies
export async function isAuthenticatedAdmin() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(COOKIE_NAME);
  if (!sessionCookie?.value) return false;
  return verifySessionToken(sessionCookie.value);
}

// Set admin session cookie
export async function setAdminSession() {
  const token = createSessionToken();
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: SESSION_DURATION / 1000,
    path: "/",
  });
}

// Clear admin session cookie
export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

// Verify provided password against env
export function checkAdminPassword(providedPassword) {
  const envPassword = process.env.ADMIN_PASSWORD;
  if (!envPassword || !providedPassword) return false;

  const provBuffer = Buffer.from(providedPassword);
  const envBuffer = Buffer.from(envPassword);

  if (provBuffer.length !== envBuffer.length) return false;
  return crypto.timingSafeEqual(provBuffer, envBuffer);
}
