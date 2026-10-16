import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TeamPassContent from "./TeamPassContent";

export default function TeamPassPage({ params }) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-black font-sans selection:bg-[#FF3000] selection:text-white">
      <Header />

      <main className="flex-1 swiss-grid-pattern py-12 md:py-16">
        <Suspense fallback={
          <div className="max-w-4xl mx-auto px-6 py-24 text-center font-mono text-sm font-bold uppercase tracking-widest">
            AUTHENTICATING SQUAD TELEMETRY...
          </div>
        }>
          <TeamPassContent params={params} />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
