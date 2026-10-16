import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdminDashboard from "./AdminDashboard";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";
import { Tape } from "@/components/HandDrawnSvg";

export const metadata = {
  title: "Admin Command Matrix // WEB FORGE 2026",
  description: "Secure administrative control panel for Zenith Web Forge hackathon at MANIT Bhopal.",
};

export default function AdminPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fdfbf7] text-[#2d2d2d] font-patrick paper-dots">
      <Header />

      <main className="flex-1 py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="mb-6 flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-kalam font-bold text-base bg-white border-2 border-[#2d2d2d] border-wobbly-sm px-4 py-2 shadow-hand-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
              <span>Back to Home</span>
            </Link>

            <div className="flex items-center gap-2 bg-[#fff9c4] border border-[#2d2d2d] border-wobbly-sm px-3 py-1 -rotate-1 font-kalam font-bold text-sm text-[#2d2d2d]">
              <Shield className="w-4 h-4 text-[#ff4d4d]" />
              <span>Admin Security Zone</span>
            </div>
          </div>

          <Suspense fallback={
            <div className="border-[3px] border-[#2d2d2d] border-wobbly-md p-16 bg-white text-center font-kalam text-xl font-bold text-zinc-600 shadow-hand">
              Initializing Admin Session...
            </div>
          }>
            <AdminDashboard />
          </Suspense>

        </div>
      </main>

      <Footer />
    </div>
  );
}
