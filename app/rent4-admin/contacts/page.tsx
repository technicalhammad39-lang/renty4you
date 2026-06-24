export default function ContactsPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Contacts & Leads</h1>
        <p className="text-white/50 mt-1">Manage discovery calls, deal pack requests, and general queries.</p>
      </div>

      <div className="bg-[#111] border border-white/10 rounded-xl p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-2">No Leads Yet</h3>
        <p className="text-white/50 max-w-sm">When users fill out forms on the website, they will appear here in a Kanban board.</p>
      </div>
    </div>
  );
}
