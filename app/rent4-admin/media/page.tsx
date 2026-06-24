export default function MediaLibraryPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Media Library</h1>
          <p className="text-white/50 mt-1">Manage images, deal packs, and documents stored in Firebase.</p>
        </div>
        <button className="bg-primary hover:bg-primary-hover text-black font-semibold px-4 py-2 rounded-lg transition-colors">
          Upload File
        </button>
      </div>

      <div className="bg-[#111] border border-white/10 rounded-xl p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-2">No Media Found</h3>
        <p className="text-white/50 max-w-sm">Files uploaded from the Listing or Blog editor will appear here automatically.</p>
      </div>
    </div>
  );
}
