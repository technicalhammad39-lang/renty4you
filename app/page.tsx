import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { SearchBar } from "@/components/search-bar";
import { SearchScrollWrapper } from "@/components/search-scroll-wrapper";
import { ComplianceStrip } from "@/components/compliance-strip";
import { CoreStrategies } from "@/components/core-strategies";
import { WhyPartner } from "@/components/why-partner";
import { DealPackDashboard } from "@/components/deal-pack";
import { ProcessWorkflow } from "@/components/process-workflow";
import { Pricing } from "@/components/pricing";
import { SampleDealPack } from "@/components/sample-deal-pack";
import { FAQ } from "@/components/faq";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <div className="relative z-10 w-full bg-surface rounded-t-[40px] shadow-[0_-20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_-20px_50px_rgba(0,0,0,0.8)] mt-[-20px]">
        {/* Search Bar floats at the top of the scrolling area, centering on the boundary */}
        <div className="relative z-20 w-full px-4 md:px-8 xl:px-12 -translate-y-1/2 mb-[-10px]">
          <SearchScrollWrapper>
            <SearchBar variant="full" />
          </SearchScrollWrapper>
        </div>
        <CoreStrategies />
        <WhyPartner />
        <ComplianceStrip />
        <DealPackDashboard />
        <ProcessWorkflow />
        <Pricing />
        <SampleDealPack />
        <FAQ />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
