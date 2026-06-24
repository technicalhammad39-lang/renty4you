'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { FileText, Plus, Edit2, Trash2, Search, Loader2 } from 'lucide-react';
import { Blog } from '@/lib/firebase/firestore';
import { format } from 'date-fns';

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    if (!db) {
      setLoading(false);
      return;
    }
    try {
      const querySnapshot = await getDocs(collection(db, "blogs"));
      const fetched = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Blog));
      setBlogs(fetched);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    try {
      if (!db) return;
      await deleteDoc(doc(db, "blogs", id));
      setBlogs(blogs.filter(b => b.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete blog post.");
    }
  };

  const filtered = blogs.filter(b => b.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog Posts</h1>
          <p className="text-white/50 mt-1">Manage your insights and case studies.</p>
        </div>
        <Link 
          href="/rent4-admin/blogs/new"
          className="bg-primary hover:bg-primary-hover text-black font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-colors w-fit"
        >
          <Plus size={18} />
          Create Post
        </Link>
      </div>

      <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-white/10 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
            <input 
              type="text"
              placeholder="Search posts..."
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
              <p>Loading posts...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="col-span-full py-20 text-center text-white/50">
              No posts found.
            </div>
          ) : (
            filtered.map((blog) => (
              <div key={blog.id} className="bg-[#1a1a1a] border border-white/10 rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-2xl transition-all group flex flex-col">
                {/* Cover Image */}
                <div className="relative aspect-video bg-black/50 overflow-hidden">
                  <img 
                    src={blog.imageUrl || 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=1664&auto=format&fit=crop'} 
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider border border-white/10">
                      {blog.category}
                    </span>
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
                  <h3 className="font-bold text-white text-lg mb-2 line-clamp-2 leading-tight">{blog.title}</h3>
                  <div className="flex items-center gap-2 text-white/50 text-xs mb-4">
                    <span>{blog.author}</span>
                    <span>•</span>
                    <span>{blog.createdAt ? format(new Date(blog.createdAt), 'MMM dd, yyyy') : 'Draft'}</span>
                  </div>
                  
                  <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-white/40 text-xs font-medium">
                      <FileText size={14} /> Post
                    </div>
                    <div className="flex items-center gap-1">
                      <Link 
                        href={`/rent4-admin/blogs/${blog.id}`}
                        className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-primary hover:text-black transition-colors"
                        title="Edit Post"
                      >
                        <Edit2 size={14} />
                      </Link>
                      <button 
                        onClick={() => handleDelete(blog.id)}
                        className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-red-500 hover:text-white transition-colors"
                        title="Delete Post"
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
