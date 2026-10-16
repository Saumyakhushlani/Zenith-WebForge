"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Users, 
  Sparkles, 
  AlertCircle, 
  Check, 
  User, 
  ShieldCheck,
  ArrowRight,
  Search
} from "lucide-react";
import { joinTeamAction } from "@/app/actions/registration";
import {
  validatePhone,
  validateEmail,
  validateScholarNumber,
  validateName,
  validateGender,
  validateYear,
  validateTeamCode,
} from "@/lib/validation";
import { Tape, Pin } from "@/components/HandDrawnSvg";

export default function JoinTeamForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCode = searchParams.get("code") || "";

  const [formData, setFormData] = useState({
    teamCode: initialCode,
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

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      setFormData((prev) => ({ ...prev, teamCode: code.toUpperCase() }));
    }
  }, [searchParams]);

  const validate = () => {
    const errors = {};
    const codeVal = validateTeamCode(formData.teamCode);
    if (!codeVal.isValid) errors.teamCode = codeVal.error;

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
    const res = await joinTeamAction(formData);
    setIsSubmitting(false);

    if (res.success) {
      const targetCode = res.team?.teamCode || formData.teamCode.toUpperCase();
      router.push(`/team/${targetCode}`);
    } else {
      setFormError(res.error || "Failed to join squad. Please verify your team code.");
    }
  };

  return (
    <div className="bg-white border-2 md:border-[3px] border-[#2d2d2d] border-wobbly-lg p-4 sm:p-7 md:p-10 shadow-hand sm:shadow-hand-lg relative">
      <Pin />

      {!result ? (
        <div>
          <div className="pb-4 mb-6 border-b-2 border-dashed border-[#2d2d2d]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
              <h2 className="text-xl sm:text-3xl md:text-4xl font-kalam font-bold text-[#2d2d2d] flex items-center gap-2">
                <span>Join an Existing Squad</span>
                <Users className="w-5 h-5 sm:w-7 sm:h-7 text-[#2d5da1] flex-shrink-0" />
              </h2>

              <span className="font-kalam text-xs font-bold uppercase bg-[#2d5da1] text-white px-2.5 py-1 border border-[#2d2d2d] inline-block rotate-1 self-start sm:self-auto">
                Step 2: Teammate Join
              </span>
            </div>
            <p className="text-base sm:text-lg font-patrick text-zinc-600 mt-0.5">
              Enter the unique 5-character Team Code given by your team leader to join the official squad roster (strictly 3 members per squad, 1 girl compulsory).
            </p>
          </div>

          {formError && (
            <div className="bg-red-50 border-2 border-[#ff4d4d] border-wobbly-sm text-[#2d2d2d] p-3 mb-5 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#ff4d4d] flex-shrink-0" />
              <span className="font-patrick text-base font-bold">{formError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
            {/* Team Code Input Box */}
            <div className="bg-[#fff9c4] border-2 border-[#2d2d2d] border-wobbly-md p-4 sm:p-5 shadow-hand-sm">
              <label className="block font-kalam font-bold text-lg text-[#2d2d2d] mb-1">
                Official Team Code * (5 Characters)
              </label>
              <input
                type="text"
                required
                maxLength={10}
                placeholder="e.g. WF-8K92L or 8K92L"
                value={formData.teamCode}
                onChange={(e) => {
                  setFormData({ ...formData, teamCode: e.target.value.toUpperCase() });
                  if (fieldErrors.teamCode) setFieldErrors({ ...fieldErrors, teamCode: undefined });
                }}
                className={`w-full bg-white border-2 p-3 text-xl font-kalam font-bold text-[#2d2d2d] placeholder:text-zinc-400 uppercase tracking-wider ${
                  fieldErrors.teamCode ? "border-[#ff4d4d] bg-red-50" : "border-[#2d2d2d]"
                }`}
              />
              {fieldErrors.teamCode && (
                <p className="text-xs font-patrick font-bold text-[#ff4d4d] mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {fieldErrors.teamCode}
                </p>
              )}
              <span className="text-xs font-patrick text-zinc-600 block mt-1">
                Ask your squad leader for their generated code.
              </span>
            </div>

            <div className="pt-3 border-t-2 border-dashed border-[#2d2d2d]">
              <h3 className="font-kalam font-bold text-xl text-[#2d2d2d] mb-3 flex items-center gap-2">
                <span>Your Information</span>
                <User className="w-5 h-5 text-[#2d2d2d]" />
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Member Name */}
                <div>
                  <label className="block font-kalam font-bold text-base text-[#2d2d2d] mb-0.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your full name"
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

                {/* Member Email */}
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

                {/* Member Phone */}
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

                {/* Member Scholar Number */}
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
                Both you and your squad leader will receive a Brevo confirmation email.
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto order-1 sm:order-2 bg-[#2d5da1] text-white px-8 py-3.5 font-kalam font-bold text-xl border-[3px] border-[#2d2d2d] border-wobbly-sm shadow-hand hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hand-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all disabled:opacity-50"
              >
                {isSubmitting ? "Attaching to Squad..." : "Join Squad Now ->"}
              </button>
            </div>
          </form>

          {/* Don't have a team link */}
          <div className="mt-8 pt-4 border-t-2 border-dashed border-[#2d2d2d] flex items-center justify-between text-sm font-patrick">
            <span className="text-zinc-600">Want to start your own team instead?</span>
            <Link
              href="/register/create"
              className="font-kalam font-bold text-[#ff4d4d] hover:underline flex items-center gap-1"
            >
              <span>Create a New Team</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        /* SUCCESS STATE FOR JOIN */
        <div className="text-center py-6">
          <div className="w-14 h-14 rounded-full bg-[#fff9c4] border-2 border-[#2d2d2d] border-wobbly-circle shadow-hand mx-auto flex items-center justify-center mb-4">
            <Check className="w-8 h-8 stroke-[3] text-[#2d5da1]" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-kalam font-bold text-[#2d2d2d] mb-1 flex items-center justify-center gap-2">
            <span>Welcome to {result.teamName}!</span>
            <Sparkles className="w-7 h-7 text-[#2d5da1]" />
          </h2>
          <p className="text-lg font-patrick text-zinc-700 max-w-md mx-auto mb-6">
            You are officially confirmed on the squad roster under code <strong>{result.teamCode}</strong>.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={`/team/${result.teamCode}`}
              className="bg-[#2d2d2d] text-white px-6 py-2.5 font-kalam font-bold text-lg border-2 border-[#2d2d2d] border-wobbly-sm shadow-hand hover:bg-[#2d5da1] transition-all"
            >
              View Squad Pass &amp; Roster &rarr;
            </Link>

            <button
              onClick={() => {
                setResult(null);
                setFormData({
                  teamCode: "",
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
              Join Another Squad
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
