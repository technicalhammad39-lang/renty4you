export default function NewsletterPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Newsletter</h1>
          <p className="text-white/50 mt-1">Manage subscribers and send campaigns.</p>
        </div>
        <button className="bg-primary hover:bg-primary-hover text-black font-semibold px-4 py-2 rounded-lg transition-colors">
          New Campaign
        </button>
      </div>

      <div className="bg-[#111] border border-white/10 rounded-xl p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-2">Zero Subscribers</h3>
        <p className="text-white/50 max-w-sm">You haven't collected any newsletter emails yet.</p>
      </div>
    </div>
  );
}
