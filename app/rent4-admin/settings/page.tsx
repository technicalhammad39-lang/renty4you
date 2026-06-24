export default function SettingsPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Platform Settings</h1>
        <p className="text-white/50 mt-1">Configure integrations and global website behavior.</p>
      </div>

      <div className="bg-[#111] border border-white/10 rounded-xl p-6 space-y-6">
        <h2 className="text-xl font-semibold border-b border-white/10 pb-4">SMTP Email Configuration</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1.5">SMTP Host</label>
            <input type="text" placeholder="smtp.gmail.com" className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1.5">SMTP Port</label>
            <input type="text" placeholder="465" className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary/50" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-white/70 mb-1.5">Sender Email</label>
            <input type="email" placeholder="no-reply@rent4yousolutions.com" className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1.5">Username</label>
            <input type="text" className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1.5">App Password</label>
            <input type="password" placeholder="••••••••" className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary/50" />
          </div>
        </div>
        <button className="bg-primary hover:bg-primary-hover text-black font-semibold px-6 py-2.5 rounded-lg transition-colors mt-4">
          Save Settings
        </button>
      </div>
    </div>
  );
}
