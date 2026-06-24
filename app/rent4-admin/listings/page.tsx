'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { Building2, Plus, Edit2, Trash2, Search, Loader2 } from 'lucide-react';
import { Opportunity } from '@/lib/firebase/firestore';

export default function AdminListingsPage() {
  const [listings, setListings] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    if (!db) {
      setLoading(false);
      return;
    }
    try {
      const querySnapshot = await getDocs(collection(db, "listings"));
      const fetched = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Opportunity));
      setListings(fetched);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this listing?')) return;
    try {
      if (!db) return;
      await deleteDoc(doc(db, "listings", id));
      setListings(listings.filter(l => l.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete listing.");
    }
  };

  const filtered = listings.filter(l => l.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Properties</h1>
          <p className="text-white/50 mt-1">Manage your sourcing opportunities.</p>
        </div>
        <Link 
          href="/rent4-admin/listings/new"
          className="bg-primary hover:bg-primary-hover text-black font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-colors w-fit"
        >
          <Plus size={18} />
          Add Listing
        </Link>
      </div>

      <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-white/10 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
            <input 
              type="text"
              placeholder="Search properties..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
        </div>

        {/* Grid View */}
        <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? (
            <div className="col-span-full py-20 flex flex-col items-center justify-center text-white/50">
              <Loader2 className="animate-spin mb-4 text-primary" size={32} />
              <p>Loading properties...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="col-span-full py-20 text-center text-white/50">
              No properties found matching your search.
            </div>
          ) : (
            filtered.map((listing) => (
              <div key={listing.id} className="bg-[#1a1a1a] border border-white/10 rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-2xl transition-all group flex flex-col">
                {/* Image Cover */}
                <div className="relative aspect-[4/3] bg-black/50 overflow-hidden">
                  <img 
                    src={listing.images && listing.images.length > 0 ? listing.images[0] : 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1665&auto=format&fit=crop'} 
                    alt={listing.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider border border-white/10">
                      {listing.strategy}
                    </span>
                    {listing.featured && (
                      <span className="px-2.5 py-1 rounded-full bg-primary text-black text-[10px] font-bold uppercase tracking-wider shadow-lg w-fit">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-emerald-400 text-[10px] font-bold uppercase tracking-wider border border-white/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      Published
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-bold text-white text-lg mb-1 line-clamp-1">{listing.title}</h3>
                  <p className="text-white/50 text-sm mb-4 line-clamp-1 flex items-center gap-1.5">
                    <Building2 size={14} /> {listing.location}
                  </p>
                  
                  <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-wider text-white/40 font-semibold mb-0.5">Budget</span>
                      <span className="text-sm font-bold text-primary">£{listing.budget.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Link 
                        href={`/rent4-admin/listings/${listing.id}`}
                        className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-primary hover:text-black transition-colors"
                        title="Edit Property"
                      >
                        <Edit2 size={14} />
                      </Link>
                      <button 
                        onClick={() => handleDelete(listing.id)}
                        className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-red-500 hover:text-white transition-colors"
                        title="Delete Property"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
