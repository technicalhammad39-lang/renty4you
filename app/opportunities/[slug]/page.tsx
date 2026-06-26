import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { getOpportunityBySlug, getOpportunities } from "@/lib/firebase/firestore";
import { MapPin, House, Users, ShieldCheck, CurrencyGbp, ChartBar, CheckCircle, ArrowLeft } from "@phosphor-icons/react/dist/ssr";

type Props = {
  params: Promise<{ slug: string }>;
};

// Next.js 15 requires awaiting params
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const opportunity = await getOpportunityBySlug(slug);
  
  if (!opportunity) return { title: "Opportunity Not Found" };

  return {
    title: `${opportunity.title} | Rent4uSolutions Investments`,
    description: opportunity.description,
    openGraph: {
      title: opportunity.title,
      description: opportunity.description,
      images: [opportunity.images[0]],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: opportunity.title,
      description: opportunity.description,
      images: [opportunity.images[0]],
    }
  };
}

export default async function OpportunityDetailPage({ params }: Props) {
  const { slug } = await params;
  const opportunity = await getOpportunityBySlug(slug);

  if (!opportunity) {
    notFound();
  }

  // Generate Structured Data (JSON-LD)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: opportunity.title,
    description: opportunity.description,
    image: opportunity.images,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'GBP',
      price: opportunity.budget,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: opportunity.location.split(',')[0].trim(),
      addressCountry: 'UK'
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white dark:bg-black pt-28 md:pt-36 pb-24">
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          
          {/* Back Button */}
          <Link href="/opportunities" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-primary transition-colors group mb-8 md:mb-12 bg-slate-50 hover:bg-white dark:bg-slate-900/50 dark:hover:bg-slate-900 px-5 py-2.5 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md w-fit">
            <ArrowLeft size={16} weight="bold" className="transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Back to Opportunities</span>
          </Link>

          {/* Header Section */}
          <div className="mb-12 max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold flex items-center gap-2 uppercase tracking-wider border border-primary/20">
                <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse"></span>
                {opportunity.strategy}
              </span>
              <span className="text-slate-600 dark:text-slate-400 text-sm font-medium flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900/50 px-4 py-1.5 rounded-full border border-slate-200/50 dark:border-slate-800/50">
                <MapPin size={16} weight="duotone" className="text-primary" /> {opportunity.location}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-[4.5rem] font-black tracking-tight text-slate-900 dark:text-white leading-[1.05]">
              {opportunity.title}
            </h1>
          </div>

        {/* Hero Image Gallery (Airbnb Style) */}
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-3 md:gap-4 h-[400px] md:h-[500px] lg:h-[550px] rounded-[32px] lg:rounded-[40px] overflow-hidden mb-16 shadow-xl">
          {/* Main Large Image */}
          <div className="md:col-span-2 row-span-2 relative h-full w-full bg-slate-100 dark:bg-slate-800">
            <Image 
              src={opportunity.images[0]} 
              alt={`${opportunity.title} Main`} 
              fill 
              className="object-cover hover:scale-105 transition-transform duration-700 cursor-pointer"
              priority
            />
          </div>
          {/* 4 Supporting Images */}
          {opportunity.images.slice(1, 5).map((img, index) => (
            <div key={index} className="relative h-full w-full hidden md:block bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <Image 
                src={img} 
                alt={`${opportunity.title} Gallery ${index + 1}`} 
                fill 
                className="object-cover hover:scale-105 transition-transform duration-700 cursor-pointer"
              />
            </div>
          ))}
        </div>

        {/* Two-Column Layout */}
        <div className="flex flex-col lg:flex-row gap-12 relative">
          
          {/* Left Column (Main Content) */}
          <div className="flex-1 space-y-12">
            
            {/* Overview & Key Stats */}
            <section className="border-b border-slate-100 dark:border-slate-800 pb-12">
              <div className="flex flex-wrap gap-8 mb-8">
                <div className="flex items-center gap-3">
                  <House size={28} className="text-slate-400" />
                  <div>
                    <p className="text-sm font-semibold text-slate-500">{opportunity.propertyType}</p>
                    <p className="font-bold text-slate-900 dark:text-white">{opportunity.bedrooms} Beds • {opportunity.bathrooms} Baths</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users size={28} className="text-slate-400" />
                  <div>
                    <p className="text-sm font-semibold text-slate-500">Target Market</p>
                    <p className="font-bold text-slate-900 dark:text-white">{opportunity.strategy === "Council Leasing" ? "Families / Social" : "Corporate & Tourism"}</p>
                  </div>
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-4 dark:text-white">Opportunity Overview</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                {opportunity.description}
              </p>
            </section>

            {/* Financial Dashboard (Premium UI) */}
            <section>
              <h2 className="text-2xl font-bold mb-6 dark:text-white">Financial Snapshot</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Financials Card */}
                <div className="dash-block p-1.5 rounded-[2rem] bg-gradient-to-b from-primary/40 via-accent/10 to-transparent shadow-xl flex flex-col">
                  <div className="h-full w-full rounded-[1.8rem] bg-white dark:bg-slate-900 p-8 flex flex-col relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none"></div>
                    <div className="flex items-center gap-3 text-primary mb-10 relative z-10">
                      <CurrencyGbp size={28} weight="duotone" /> 
                      <span className="font-bold tracking-tight text-xl">Investment Returns</span>
                    </div>
                    <div className="space-y-6 relative z-10 flex-grow flex flex-col">
                      <div className="flex justify-between items-end border-b border-slate-100 dark:border-slate-800 pb-4">
                        <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">Setup Budget</span>
                        <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">£{opportunity.budget.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-end border-b border-slate-100 dark:border-slate-800 pb-4">
                        <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">Est. Rent Range</span>
                        <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">£{opportunity.rentRange.replace(/£/g, '')}</span>
                      </div>
                      <div className="pt-6 pb-2 mt-auto">
                        <span className="text-xs font-bold uppercase tracking-widest text-primary block mb-2">Net Cashflow</span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-4xl lg:text-5xl font-black tracking-tighter text-slate-900 dark:text-white">£{opportunity.estimatedCashflow.replace(/£/g, '')}</span>
                          <span className="text-xl font-bold text-slate-400">/mo</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Performance & Break-Even Card */}
                <div className="dash-block p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-lg flex flex-col items-center justify-center gap-6">
                   <div className="flex justify-between items-center w-full">
                    <span className="font-semibold text-slate-600 dark:text-slate-400 text-sm">Target ROI</span>
                    <span className="font-bold text-slate-900 dark:text-white text-base">{opportunity.roi}</span>
                   </div>
                   <div className="flex justify-between items-center w-full border-t border-slate-100 dark:border-slate-800 pt-4">
                    <span className="font-semibold text-slate-600 dark:text-slate-400 text-sm">Break-even Occupancy</span>
                    <span className="font-bold text-slate-900 dark:text-white text-base">{opportunity.occupancyRequired}</span>
                   </div>
                   {/* Simplified Donut Chart Representation */}
                   <div className="relative w-40 h-40 flex-shrink-0 drop-shadow-sm mt-4">
                     <svg className="w-full h-full transform -rotate-90 overflow-visible" viewBox="0 0 42 42">
                       <circle cx="21" cy="21" r="15.9155" className="text-primary hover:scale-[1.06] hover:drop-shadow-xl transition-all duration-300 origin-center cursor-pointer" strokeWidth="8" strokeDasharray={`${parseInt(opportunity.occupancyRequired)} 100`} strokeDashoffset="0" stroke="currentColor" fill="none" />
                       <circle cx="21" cy="21" r="15.9155" className="text-slate-200 dark:text-slate-700 hover:scale-[1.06] hover:drop-shadow-xl transition-all duration-300 origin-center cursor-pointer" strokeWidth="8" strokeDasharray={`${100 - parseInt(opportunity.occupancyRequired)} 100`} strokeDashoffset={`-${parseInt(opportunity.occupancyRequired)}`} stroke="currentColor" fill="none" />
                     </svg>
                     <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                       <span className="font-black text-slate-900 dark:text-white text-3xl">{opportunity.occupancyRequired}</span>
                       <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-0.5">Required</span>
                     </div>
                   </div>
                </div>
              </div>
            </section>

            {/* Compliance & Risks */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="dash-block p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-lg flex flex-col h-full">
                <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300 mb-6">
                  <ShieldCheck size={24} weight="duotone" className="text-green-500" /> 
                  <span className="font-bold tracking-tight text-lg">Compliance Status</span>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-300">
                    <CheckCircle weight="fill" className={opportunity.compliance.licensing ? "text-green-500" : "text-slate-300"} size={20} />
                    Licensing Checked
                  </li>
                  <li className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-300">
                    <CheckCircle weight="fill" className={opportunity.compliance.planning ? "text-green-500" : "text-slate-300"} size={20} />
                    Planning Permission Clear
                  </li>
                  <li className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-300">
                    <CheckCircle weight="fill" className={!opportunity.compliance.leaseRestrictions ? "text-green-500" : "text-red-500"} size={20} />
                    No Lease Restrictions
                  </li>
                </ul>
              </div>

              <div className="dash-block p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-lg flex flex-col h-full">
                <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300 mb-6">
                  <ChartBar size={24} weight="duotone" className="text-red-500" /> 
                  <span className="font-bold tracking-tight text-lg">Risks & Assumptions</span>
                </div>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30">
                    <span className="font-bold text-slate-900 dark:text-white text-sm block mb-1">Key Risk</span>
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{opportunity.risks.keyRisk}</span>
                  </div>
                  <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30">
                    <span className="font-bold text-slate-900 dark:text-white text-sm block mb-1">Assumption</span>
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{opportunity.risks.assumption}</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Extended Deal Analysis (New Sections) */}
            <section className="space-y-8 pt-8 border-t border-slate-100 dark:border-slate-800">
              <h2 className="text-2xl font-bold dark:text-white">Comprehensive Deal Analysis</h2>
              
              <div className="space-y-6">
                {/* Location & Demand */}
                <div className="bg-slate-50 dark:bg-slate-900/50 p-6 md:p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-inner overflow-hidden">
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex-1 space-y-4">
                      <h3 className="font-bold text-xl mb-3 flex items-center gap-2 dark:text-white">
                        <MapPin size={24} weight="fill" className="text-primary drop-shadow-sm" /> Area Demand & Demographics
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
                        This property is located in a high-demand zone for {opportunity.strategy}. The local demographics show strong growth across key target profiles. Proximity to major employment hubs guarantees a steady stream of tenants.
                      </p>
                    </div>
                    
                    {/* Animated Custom SVG Chart */}
                    <div className="w-full md:w-64 shrink-0 flex flex-col gap-3 relative z-10">
                      {opportunity.demand ? (
                        <>
                          {[
                            { label: 'Corporate', value: opportunity.demand.corporate, color: 'bg-blue-500' },
                            { label: 'Tourists', value: opportunity.demand.tourists, color: 'bg-emerald-500' },
                            { label: 'Families', value: opportunity.demand.families, color: 'bg-primary' },
                            { label: 'Students', value: opportunity.demand.students, color: 'bg-purple-500' }
                          ].map((item, idx) => (
                            item.value > 0 && (
                              <div key={idx} className="w-full group cursor-default">
                                <div className="flex justify-between text-xs font-bold mb-1.5 text-slate-700 dark:text-slate-300">
                                  <span>{item.label}</span>
                                  <span className="transition-transform group-hover:scale-110 group-hover:text-primary">{item.value}%</span>
                                </div>
                                <div className="h-2.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner relative">
                                  {/* Base colored bar */}
                                  <div 
                                    className={`h-full rounded-full ${item.color} shadow-[0_0_10px_rgba(0,0,0,0.1)] transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] w-0`}
                                    style={{ width: `${item.value}%`, transitionDelay: `${idx * 150}ms` }}
                                  ></div>
                                  {/* Glow effect on hover */}
                                  <div className="absolute top-0 left-0 h-full w-full bg-white/30 opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-700 ease-in-out transform -translate-x-full"></div>
                                </div>
                              </div>
                            )
                          ))}
                        </>
                      ) : (
                        <div className="text-center p-4 bg-slate-100 dark:bg-slate-800 rounded-xl text-sm text-slate-500 dark:text-slate-400">
                          Detailed demand analytics pending.
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Strategy Specific Notes */}
                <div className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900/80 dark:to-slate-900 p-6 md:p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
                  <h3 className="font-bold text-xl mb-4 flex items-center gap-2 dark:text-white relative z-10">
                    <ShieldCheck size={24} weight="fill" className="text-blue-500" /> Strategy: {opportunity.strategy}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed relative z-10">
                    {opportunity.strategy === "Council Leasing" ? "This strategy offers a hands-off, guaranteed rent approach. The local council signs a multi-year lease, covering all voids and minor maintenance. You receive income on day 1." : opportunity.strategy === "Serviced Accommodation" ? "Optimized for short-term lets. Highest yields are achieved through dynamic pricing across Airbnb and Booking.com, targeting both weekend tourists and mid-week corporate contractors." : "Rent-to-Rent strategy focuses on maximizing cashflow without the need to purchase the asset. We secure the property on a corporate let and sublet to targeted tenant profiles."}
                  </p>
                </div>

                {/* Due Diligence */}
                <div className="bg-gradient-to-br from-emerald-50/50 to-white dark:from-emerald-900/10 dark:to-slate-900/50 p-6 md:p-8 rounded-[2rem] border border-emerald-100/50 dark:border-emerald-900/30 shadow-sm">
                  <h3 className="font-bold text-xl mb-5 flex items-center gap-2 dark:text-white">
                    <CheckCircle size={24} weight="fill" className="text-emerald-500" /> Due Diligence Completed
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm md:text-base font-medium text-slate-700 dark:text-slate-300">
                    <li className="flex items-center gap-3 bg-white dark:bg-slate-800 p-3 rounded-xl shadow-sm border border-slate-50 dark:border-slate-700/50"><CheckCircle size={20} weight="fill" className="text-emerald-500" /> Title Deed Verification</li>
                    <li className="flex items-center gap-3 bg-white dark:bg-slate-800 p-3 rounded-xl shadow-sm border border-slate-50 dark:border-slate-700/50"><CheckCircle size={20} weight="fill" className="text-emerald-500" /> Local Market Rent Appraisal</li>
                    <li className="flex items-center gap-3 bg-white dark:bg-slate-800 p-3 rounded-xl shadow-sm border border-slate-50 dark:border-slate-700/50"><CheckCircle size={20} weight="fill" className="text-emerald-500" /> Competitor Nightly Rate Analysis</li>
                    <li className="flex items-center gap-3 bg-white dark:bg-slate-800 p-3 rounded-xl shadow-sm border border-slate-50 dark:border-slate-700/50"><CheckCircle size={20} weight="fill" className="text-emerald-500" /> Block Management Lease Check</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column (Sticky CTA Sidebar) */}
          <div className="w-full lg:w-[380px]">
            <div className="sticky top-28 bg-white dark:bg-slate-900 rounded-[32px] p-8 border border-slate-200 dark:border-slate-800 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-none">
              <h3 className="text-2xl font-black mb-2 text-slate-900 dark:text-white">Request Deal Pack</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">
                Get full access to the property address, financial breakdown spreadsheets, and compliance documents.
              </p>
              
              <div className="space-y-4">
                <button className="w-full py-4 rounded-xl font-bold bg-slate-900 text-white hover:bg-primary dark:bg-white dark:text-slate-900 dark:hover:bg-primary dark:hover:text-white transition-colors shadow-lg">
                  Unlock Full Deal Pack
                </button>
                <button className="w-full py-4 rounded-xl font-bold border-2 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white hover:border-slate-900 dark:hover:border-white transition-colors">
                  Book Discovery Call
                </button>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                <p className="text-xs font-semibold text-center text-slate-400 uppercase tracking-widest mb-4">Investment Process</p>
                <div className="flex justify-between text-center px-2">
                  <div>
                    <span className="block font-black text-slate-900 dark:text-white text-xl">£500</span>
                    <span className="text-xs text-slate-500">Reservation</span>
                  </div>
                  <div>
                    <span className="block font-black text-slate-900 dark:text-white text-xl">£3k</span>
                    <span className="text-xs text-slate-500">Completion</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    </>
  );
}
