import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TeamPassContent from "./TeamPassContent";

export default function TeamPassPage({ params }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#fdfbf7] text-[#2d2d2d] font-patrick paper-dots selection:bg-[#fff9c4]">
      <Header />

      <main className="flex-1 py-8 sm:py-12 md:py-16">
        <Suspense fallback={
          <div className="max-w-4xl mx-auto px-6 py-24 text-center font-kalam text-lg font-bold">
            Searching squad records...
          </div>
        }>
          <TeamPassContent params={params} />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
