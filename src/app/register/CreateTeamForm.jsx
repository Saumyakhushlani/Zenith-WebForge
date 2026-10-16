"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Rocket, 
  PenTool, 
  Sparkles, 
  AlertCircle, 
  Check, 
  Copy, 
  Share2, 
  User, 
  ShieldCheck,
  ArrowRight,
  ArrowLeft
} from "lucide-react";
import { createTeamAction } from "@/app/actions/registration";
import {
  validatePhone,
  validateEmail,
  validateScholarNumber,
  validateName,
  validateTeamName,
  validateGender,
  validateYear,
} from "@/lib/validation";
import { Tape, Pin } from "@/components/HandDrawnSvg";

export default function CreateTeamForm() {
  const [formData, setFormData] = useState({
    teamName: "",
    name: "",
    email: "",
    phone: "",
    scholarNumber: "",
    gender: "",
    year: "2nd Year",
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [formError, setFormError] = useState("");
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const validate = () => {
    const errors = {};
    const teamNameVal = validateTeamName(formData.teamName);
    if (!teamNameVal.isValid) errors.teamName = teamNameVal.error;

    const nameVal = validateName(formData.name);
    if (!nameVal.isValid) errors.name = nameVal.error;

    const emailVal = validateEmail(formData.email);
    if (!emailVal.isValid) errors.email = emailVal.error;

    const phoneVal = validatePhone(formData.phone);
    if (!phoneVal.isValid) errors.phone = phoneVal.error;

    const scholarVal = validateScholarNumber(formData.scholarNumber);
    if (!scholarVal.isValid) errors.scholarNumber = scholarVal.error;

    const genderVal = validateGender(formData.gender);
    if (!genderVal.isValid) errors.gender = genderVal.error;

    const yearVal = validateYear(formData.year);
    if (!yearVal.isValid) errors.year = yearVal.error;

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!validate()) {
      setFormError("Please fix the highlighted fields in red below.");
      return;
    }

    setIsSubmitting(true);
    const res = await createTeamAction(formData);
    setIsSubmitting(false);

    if (res.success) {
      setResult(res);
    } else {
      setFormError(res.error || "Failed to create team. Please try again.");
    }
  };

  const copyToClipboard = (text, type = "code") => {
    navigator.clipboard.writeText(text);
    if (type === "code") {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } else {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="bg-white border-2 md:border-[3px] border-[#2d2d2d] border-wobbly-lg p-4 sm:p-7 md:p-10 shadow-hand sm:shadow-hand-lg relative">
      <Tape rotate="-1deg" />

      {!result ? (
        <div>
          <div className="pb-4 mb-6 border-b-2 border-dashed border-[#2d2d2d]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
              <h2 className="text-xl sm:text-3xl md:text-4xl font-kalam font-bold text-[#2d2d2d] flex items-center gap-2">
                <span>Create Team &amp; Generate Code</span>
                <PenTool className="w-5 h-5 sm:w-7 sm:h-7 text-[#ff4d4d] flex-shrink-0" />
              </h2>

              <span className="font-kalam text-xs font-bold uppercase bg-[#ff4d4d] text-white px-2.5 py-1 border border-[#2d2d2d] inline-block -rotate-1 self-start sm:self-auto">
                Step 1 of 2: Leader Setup
              </span>
            </div>
            <p className="text-base sm:text-lg font-patrick text-zinc-600 mt-0.5">
              You will be registered as the <strong>Team Leader</strong> and receive a unique 5-character Team Code to share with your teammates.
            </p>
          </div>

          {/* Diversity Notice */}
          <div className="bg-[#fff9c4] border-2 border-[#2d2d2d] border-wobbly-sm p-4 mb-6 flex items-start gap-3 shadow-hand-sm">
            <ShieldCheck className="w-5 h-5 text-[#ff4d4d] flex-shrink-0 mt-0.5" />
            <div className="text-sm sm:text-base font-patrick text-[#2d2d2d]">
              <strong className="font-kalam text-[#ff4d4d]">Zenith Squad Mandate:</strong> Squad size is strictly 3 members (1 Girl Compulsory). Form your squad with you as Leader + 2 teammates.
            </div>
          </div>

          {formError && (
            <div className="bg-red-50 border-2 border-[#ff4d4d] border-wobbly-sm text-[#2d2d2d] p-3 mb-5 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#ff4d4d] flex-shrink-0" />
              <span className="font-patrick text-base font-bold">{formError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
            {/* Squad Name */}
            <div>
              <label className="block font-kalam font-bold text-lg text-[#2d2d2d] mb-1">
                Squad / Team Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. CodeAlchemists, ByteForce"
                value={formData.teamName}
                onChange={(e) => {
                  setFormData({ ...formData, teamName: e.target.value });
                  if (fieldErrors.teamName) setFieldErrors({ ...fieldErrors, teamName: undefined });
                }}
                className={`w-full bg-[#fdfbf7] border-2 p-3 text-lg font-patrick text-[#2d2d2d] placeholder:text-zinc-400 ${
                  fieldErrors.teamName ? "border-[#ff4d4d] bg-red-50" : "border-[#2d2d2d]"
                }`}
              />
              {fieldErrors.teamName && (
                <p className="text-xs font-patrick font-bold text-[#ff4d4d] mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {fieldErrors.teamName}
                </p>
              )}
            </div>

            <div className="pt-3 border-t-2 border-dashed border-[#2d2d2d]">
              <h3 className="font-kalam font-bold text-xl text-[#2d2d2d] mb-3 flex items-center gap-2">
                <span>Team Leader Details</span>
                <User className="w-5 h-5 text-[#2d2d2d]" />
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Leader Name */}
                <div>
                  <label className="block font-kalam font-bold text-base text-[#2d2d2d] mb-0.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Leader full name"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: undefined });
                    }}
                    className={`w-full bg-[#fdfbf7] border-2 p-2.5 text-base font-patrick text-[#2d2d2d] placeholder:text-zinc-400 ${
                      fieldErrors.name ? "border-[#ff4d4d] bg-red-50" : "border-[#2d2d2d]"
                    }`}
                  />
                  {fieldErrors.name && (
                    <p className="text-xs font-patrick font-bold text-[#ff4d4d] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {fieldErrors.name}
                    </p>
                  )}
                </div>

                {/* Leader Email */}
                <div>
                  <label className="block font-kalam font-bold text-base text-[#2d2d2d] mb-0.5">
                    College / Personal Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: undefined });
                    }}
                    className={`w-full bg-[#fdfbf7] border-2 p-2.5 text-base font-patrick text-[#2d2d2d] placeholder:text-zinc-400 ${
                      fieldErrors.email ? "border-[#ff4d4d] bg-red-50" : "border-[#2d2d2d]"
                    }`}
                  />
                  {fieldErrors.email && (
                    <p className="text-xs font-patrick font-bold text-[#ff4d4d] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {fieldErrors.email}
                    </p>
                  )}
                </div>

                {/* Leader Phone (Strict 10 digit Indian validation) */}
                <div>
                  <label className="block font-kalam font-bold text-base text-[#2d2d2d] mb-0.5">
                    WhatsApp Phone Number * (10 Digits)
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="e.g. 9876543210"
                    value={formData.phone}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "");
                      setFormData({ ...formData, phone: val });
                      if (fieldErrors.phone) setFieldErrors({ ...fieldErrors, phone: undefined });
                    }}
                    className={`w-full bg-[#fdfbf7] border-2 p-2.5 text-base font-patrick text-[#2d2d2d] placeholder:text-zinc-400 ${
                      fieldErrors.phone ? "border-[#ff4d4d] bg-red-50" : "border-[#2d2d2d]"
                    }`}
                  />
                  {fieldErrors.phone && (
                    <p className="text-xs font-patrick font-bold text-[#ff4d4d] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {fieldErrors.phone}
                    </p>
                  )}
                </div>

                {/* Leader Scholar Number */}
                <div>
                  <label className="block font-kalam font-bold text-base text-[#2d2d2d] mb-0.5">
                    MANIT Scholar Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 231112044"
                    value={formData.scholarNumber}
                    onChange={(e) => {
                      setFormData({ ...formData, scholarNumber: e.target.value });
                      if (fieldErrors.scholarNumber) setFieldErrors({ ...fieldErrors, scholarNumber: undefined });
                    }}
                    className={`w-full bg-[#fdfbf7] border-2 p-2.5 text-base font-patrick text-[#2d2d2d] placeholder:text-zinc-400 ${
                      fieldErrors.scholarNumber ? "border-[#ff4d4d] bg-red-50" : "border-[#2d2d2d]"
                    }`}
                  />
                  {fieldErrors.scholarNumber && (
                    <p className="text-xs font-patrick font-bold text-[#ff4d4d] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {fieldErrors.scholarNumber}
                    </p>
                  )}
                </div>

                {/* Gender */}
                <div>
                  <label className="block font-kalam font-bold text-base text-[#2d2d2d] mb-0.5">
                    Gender *
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Male", "Female", "Other"].map((g) => (
                      <button
                        type="button"
                        key={g}
                        onClick={() => {
                          setFormData({ ...formData, gender: g });
                          if (fieldErrors.gender) setFieldErrors({ ...fieldErrors, gender: undefined });
                        }}
                        className={`p-2 font-kalam font-bold text-sm border-2 border-wobbly-sm transition-all ${
                          formData.gender === g
                            ? "bg-[#2d2d2d] text-white border-[#2d2d2d] shadow-hand-sm"
                            : "bg-[#fdfbf7] text-[#2d2d2d] border-[#2d2d2d] hover:bg-[#fff9c4]"
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                  {fieldErrors.gender && (
                    <p className="text-xs font-patrick font-bold text-[#ff4d4d] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {fieldErrors.gender}
                    </p>
                  )}
                </div>

                {/* Academic Year (UG ONLY) */}
                <div>
                  <label className="block font-kalam font-bold text-base text-[#2d2d2d] mb-0.5">
                    Academic Year * (Undergraduate)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {["1st Year", "2nd Year", "3rd Year", "4th Year"].map((yr) => (
                      <button
                        type="button"
                        key={yr}
                        onClick={() => {
                          setFormData({ ...formData, year: yr });
                          if (fieldErrors.year) setFieldErrors({ ...fieldErrors, year: undefined });
                        }}
                        className={`p-2 font-kalam font-bold text-xs sm:text-sm border-2 border-wobbly-sm transition-all text-center ${
                          formData.year === yr
                            ? "bg-[#2d5da1] text-white border-[#2d2d2d] shadow-hand-sm"
                            : "bg-[#fdfbf7] text-[#2d2d2d] border-[#2d2d2d] hover:bg-[#fff9c4]"
                        }`}
                      >
                        {yr}
                      </button>
                    ))}
                  </div>
                  {fieldErrors.year && (
                    <p className="text-xs font-patrick font-bold text-[#ff4d4d] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {fieldErrors.year}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs font-patrick text-zinc-500 order-2 sm:order-1">
                A Brevo confirmation email with your squad credentials will be sent automatically.
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto order-1 sm:order-2 bg-[#ff4d4d] text-white px-8 py-3.5 font-kalam font-bold text-xl border-[3px] border-[#2d2d2d] border-wobbly-sm shadow-hand hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hand-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all disabled:opacity-50"
              >
                {isSubmitting ? "Generating Code..." : "Create Team Now ->"}
              </button>
            </div>
          </form>

          {/* Already have code link */}
          <div className="mt-8 pt-4 border-t-2 border-dashed border-[#2d2d2d] flex items-center justify-between text-sm font-patrick">
            <span className="text-zinc-600">Already have a team code from your leader?</span>
            <Link
              href="/register/join"
              className="font-kalam font-bold text-[#2d5da1] hover:underline flex items-center gap-1"
            >
              <span>Join with Code instead</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        /* SUCCESS STATE FOR CREATE */
        <div className="text-center py-6">
          <div className="w-14 h-14 rounded-full bg-[#fff9c4] border-2 border-[#2d2d2d] border-wobbly-circle shadow-hand mx-auto flex items-center justify-center mb-4">
            <Check className="w-8 h-8 stroke-[3] text-[#ff4d4d]" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-kalam font-bold text-[#2d2d2d] mb-1 flex items-center justify-center gap-2">
            <span>Team {result.teamName} Created!</span>
            <Sparkles className="w-7 h-7 text-[#ff4d4d]" />
          </h2>
          <p className="text-lg font-patrick text-zinc-700 max-w-md mx-auto mb-6">
            Share this code with your teammates so they can join your squad directly.
          </p>

          {/* Code Note */}
          <div className="max-w-xs mx-auto bg-[#fff9c4] border-2 border-[#2d2d2d] border-wobbly-md p-6 shadow-hand-lg mb-6 relative rotate-1">
            <Pin />
            <div className="font-kalam font-bold text-xs text-zinc-600 mb-1">
              OFFICIAL TEAM CODE
            </div>
            <div className="text-5xl font-kalam font-bold text-[#2d2d2d] my-2 tracking-wider">
              {result.teamCode}
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <button
                onClick={() => copyToClipboard(result.teamCode, "code")}
                className="w-full bg-white border-2 border-[#2d2d2d] py-2 px-3 font-kalam font-bold text-sm flex items-center justify-center gap-1.5 shadow-hand-sm hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
              >
                {copiedCode ? <Check className="w-4 h-4 stroke-[3]" /> : <Copy className="w-4 h-4" />}
                <span>{copiedCode ? "Code Copied!" : "Copy Team Code"}</span>
              </button>

              <button
                onClick={() => {
                  const joinUrl = `${window.location.origin}/register/join?code=${result.teamCode}`;
                  copyToClipboard(joinUrl, "link");
                }}
                className="w-full bg-[#2d5da1] text-white border-2 border-[#2d2d2d] py-2 px-3 font-kalam font-bold text-sm flex items-center justify-center gap-1.5 shadow-hand-sm hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
              >
                {copiedLink ? <Check className="w-4 h-4 stroke-[3]" /> : <Share2 className="w-4 h-4" />}
                <span>{copiedLink ? "Join Link Copied!" : "Copy Direct Join Link"}</span>
              </button>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={`/team/${result.teamCode}`}
              className="bg-[#2d2d2d] text-white px-6 py-2.5 font-kalam font-bold text-lg border-2 border-[#2d2d2d] border-wobbly-sm shadow-hand hover:bg-[#ff4d4d] transition-all"
            >
              View Official Squad Pass &rarr;
            </Link>

            <button
              onClick={() => {
                setResult(null);
                setFormData({
                  teamName: "",
                  name: "",
                  email: "",
                  phone: "",
                  scholarNumber: "",
                  gender: "",
                  year: "2nd Year",
                });
                setFieldErrors({});
              }}
              className="bg-white text-[#2d2d2d] border-2 border-[#2d2d2d] border-wobbly-sm px-6 py-2.5 font-kalam font-bold text-lg shadow-hand-sm hover:bg-[#fff9c4] transition-all"
            >
              Create Another Team
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
