'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { doc, getDoc, setDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { ArrowLeft, Save, Loader2, Bold, Italic, Heading1, Heading2, List, ListOrdered, Quote, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { Blog } from '@/lib/firebase/firestore';
import { RichTextEditor } from '@/components/admin/rich-text-editor';

export default function BlogEditor({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const isNew = resolvedParams.id === 'new';
  const router = useRouter();
  
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<Blog>>({
    title: '',
    slug: '',
    category: 'Market Update',
    author: 'Hammad',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1673&auto=format&fit=crop',
    excerpt: '',
    content: '',
  });

  // Removed inline editor
  useEffect(() => {
    if (!isNew && db) {
      const fetchDoc = async () => {
        try {
          const docRef = doc(db, 'blogs', resolvedParams.id);
          const snap = await getDoc(docRef);
          if (snap.exists()) {
            const data = snap.data() as Partial<Blog>;
            setFormData(data);
          }
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchDoc();
    }
  }, [isNew, resolvedParams.id]);

  const handleChange = (field: string, value: any /* eslint-disable-line */) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!db) return;
    setSaving(true);
    try {
      const dataToSave = {
        ...formData,
        createdAt: formData.createdAt || serverTimestamp()
      };

      if (isNew) {
        await addDoc(collection(db, 'blogs'), dataToSave);
      } else {
        await setDoc(doc(db, 'blogs', resolvedParams.id), dataToSave, { merge: true });
      }
      router.push('/rent4-admin/blogs');
    } catch (err) {
      console.error(err);
      alert('Error saving blog post');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="animate-spin text-primary" size={32} /></div>;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out pb-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/rent4-admin/blogs" className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{isNew ? 'Create Post' : 'Edit Post'}</h1>
            <p className="text-white/50 mt-1">{isNew ? 'Publish a new insight or case study.' : 'Update existing blog post.'}</p>
          </div>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="bg-primary hover:bg-primary-hover text-black font-semibold px-6 py-2.5 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          Save Post
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-[#111] border border-white/10 rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold border-b border-white/10 pb-4 mb-4">Content</h2>
            
            <div className="col-span-2">
              <label className="block text-sm font-medium text-white/70 mb-1.5">Title</label>
              <input required type="text" value={formData.title} onChange={e => {
                handleChange('title', e.target.value);
                if (isNew) handleChange('slug', e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
              }} className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary/50 transition-colors text-lg font-semibold" />
            </div>
            
            <div className="pt-2">
              <label className="block text-sm font-medium text-white/70 mb-1.5">Excerpt (Short Summary)</label>
              <textarea required rows={3} value={formData.excerpt} onChange={e => handleChange('excerpt', e.target.value)} className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors resize-none" />
            </div>

            <div className="pt-4">
              <label className="block text-sm font-medium text-white/70 mb-1.5">Body</label>
              <div className="rounded-lg overflow-hidden border border-white/10 bg-[#1a1a1a]">
                <RichTextEditor 
                  content={formData.content || ''} 
                  onChange={(html) => handleChange('content', html)} 
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#111] border border-white/10 rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold border-b border-white/10 pb-4 mb-4">Metadata</h2>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1.5">Slug (URL)</label>
              <input required type="text" value={formData.slug} onChange={e => handleChange('slug', e.target.value)} className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2 text-white/50 focus:outline-none focus:border-primary/50 transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1.5">Category</label>
              <select value={formData.category} onChange={e => handleChange('category', e.target.value)} className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary/50 transition-colors appearance-none">
                <option value="Market Update">Market Update</option>
                <option value="Case Study">Case Study</option>
                <option value="Compliance">Compliance</option>
                <option value="Strategy">Strategy</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1.5">Author</label>
              <input required type="text" value={formData.author} onChange={e => handleChange('author', e.target.value)} className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary/50 transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1.5">Read Time</label>
              <input required type="text" value={formData.readTime} onChange={e => handleChange('readTime', e.target.value)} placeholder="e.g. 5 min read" className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary/50 transition-colors" />
            </div>
          </div>

          <div className="bg-[#111] border border-white/10 rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold border-b border-white/10 pb-4 mb-4">Featured Image</h2>
            <div className="relative aspect-video rounded-lg overflow-hidden bg-[#1a1a1a] border border-white/10 flex items-center justify-center">
              {formData.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={formData.image} alt="Featured" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
              ) : (
                <ImageIcon className="text-white/20" size={32} />
              )}
            </div>
            <input required type="text" value={formData.image} onChange={e => handleChange('image', e.target.value)} placeholder="Image URL (Storage integration pending)" className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2 text-white text-xs focus:outline-none focus:border-primary/50 transition-colors" />
          </div>
        </div>
      </div>
    </form>
  );
}
