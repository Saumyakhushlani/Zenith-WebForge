/**
 * Web Forge // Zenith MANIT Validation Utilities
 * Strict validation rules for phone numbers, scholar numbers, emails, and mandatory fields.
 */

// Phone number: clean and validate 10-digit Indian mobile number
export function validatePhone(phone) {
  if (!phone || typeof phone !== "string") {
    return { isValid: false, error: "Phone number is required." };
  }

  // Remove spaces, hyphens, brackets, and +91 prefix
  let cleaned = phone.trim().replace(/[\s\-\(\)]/g, "");
  if (cleaned.startsWith("+91")) {
    cleaned = cleaned.slice(3);
  } else if (cleaned.startsWith("91") && cleaned.length === 12) {
    cleaned = cleaned.slice(2);
  } else if (cleaned.startsWith("0") && cleaned.length === 11) {
    cleaned = cleaned.slice(1);
  }

  // Check exactly 10 digits starting with 6, 7, 8, or 9
  const indianMobileRegex = /^[6-9]\d{9}$/;
  if (!indianMobileRegex.test(cleaned)) {
    return {
      isValid: false,
      error: "Please enter a valid 10-digit Indian mobile number (e.g. 9876543210).",
    };
  }

  return { isValid: true, cleanedPhone: cleaned };
}

// Email format validation
export function validateEmail(email) {
  if (!email || typeof email !== "string" || !email.trim()) {
    return { isValid: false, error: "Email address is required." };
  }

  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  const trimmed = email.trim().toLowerCase();

  if (!emailRegex.test(trimmed)) {
    return { isValid: false, error: "Please enter a valid email address (e.g. name@manit.ac.in or user@gmail.com)." };
  }

  return { isValid: true, cleanedEmail: trimmed };
}

// MANIT Scholar Number validation (e.g. 211112001, 231110045)
export function validateScholarNumber(scholarNumber) {
  if (!scholarNumber || typeof scholarNumber !== "string" || !scholarNumber.trim()) {
    return { isValid: false, error: "MANIT Scholar Number is required." };
  }

  const cleaned = scholarNumber.trim().toUpperCase();
  // Typically 6 to 12 alphanumeric characters
  const scholarRegex = /^[A-Z0-9]{6,15}$/;

  if (!scholarRegex.test(cleaned)) {
    return {
      isValid: false,
      error: "Please enter a valid Scholar Number (e.g. 231110045).",
    };
  }

  return { isValid: true, cleanedScholar: cleaned };
}

// Full Name validation
export function validateName(name) {
  if (!name || typeof name !== "string" || !name.trim()) {
    return { isValid: false, error: "Full Name is required." };
  }

  const trimmed = name.trim();
  if (trimmed.length < 2) {
    return { isValid: false, error: "Full Name must be at least 2 characters long." };
  }

  if (trimmed.length > 80) {
    return { isValid: false, error: "Full Name must not exceed 80 characters." };
  }

  return { isValid: true, cleanedName: trimmed };
}

// Team Name validation
export function validateTeamName(teamName) {
  if (!teamName || typeof teamName !== "string" || !teamName.trim()) {
    return { isValid: false, error: "Team Name is required." };
  }

  const trimmed = teamName.trim();
  if (trimmed.length < 3) {
    return { isValid: false, error: "Team Name must be at least 3 characters long." };
  }

  if (trimmed.length > 50) {
    return { isValid: false, error: "Team Name must not exceed 50 characters." };
  }

  return { isValid: true, cleanedTeamName: trimmed };
}

// Gender validation
export function validateGender(gender) {
  const allowed = ["Female", "Male", "Other"];
  if (!gender || !allowed.includes(gender)) {
    return { isValid: false, error: "Please select a gender (Female, Male, or Other)." };
  }
  return { isValid: true, gender };
}

// Year validation (UG only: 1st, 2nd, 3rd, 4th Year)
export function validateYear(year) {
  const allowed = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
  if (!year || !allowed.includes(year)) {
    return { isValid: false, error: "Please select your academic year (1st, 2nd, 3rd, or 4th Year)." };
  }
  return { isValid: true, year };
}

// Team Code validation (for join form)
export function validateTeamCode(teamCode) {
  if (!teamCode || typeof teamCode !== "string" || !teamCode.trim()) {
    return { isValid: false, error: "Team Code is required." };
  }

  const cleaned = teamCode.trim().toUpperCase();
  if (cleaned.length < 4 || cleaned.length > 16) {
    return { isValid: false, error: "Invalid Team Code format (e.g. WF-8K92L)." };
  }

  return { isValid: true, cleanedCode: cleaned };
}
