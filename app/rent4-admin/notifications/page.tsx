'use client';

import { useState } from 'react';
import { Send, Image as ImageIcon, Link as LinkIcon, Loader2, Bell } from 'lucide-react';

import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

export default function NotificationsPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    message: '',
    url: '',
    icon: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      const subscriptionsRef = collection(db, 'subscriptions');
      const snapshot = await getDocs(subscriptionsRef);
      
      if (snapshot.empty) {
         setError('No active subscribers found.');
         setLoading(false);
         return;
      }

      const allSubscriptions = snapshot.docs.map(d => ({
        docId: d.id,
        ...d.data()
      }));

      // Deduplicate subscriptions by endpoint
      const uniqueSubscriptions = [];
      const seenEndpoints = new Set();
      for (const sub of allSubscriptions) {
        if (!seenEndpoints.has((sub as any).endpoint)) {
           seenEndpoints.add((sub as any).endpoint);
           uniqueSubscriptions.push(sub);
        }
      }

      const res = await fetch('/api/web-push/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, subscriptions: uniqueSubscriptions })
      });
      const data = await res.json();
      
      if (data.success) {
        setSuccess(`Successfully sent to ${data.count} subscribers!`);
        setFormData({ title: '', message: '', url: '', icon: '' });
        
        if (data.expiredDocIds && data.expiredDocIds.length > 0) {
           for (const id of data.expiredDocIds) {
             await deleteDoc(doc(db, 'subscriptions', id));
           }
        }
      } else {
        setError(data.error || 'Failed to send notifications');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while sending.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Bell className="text-primary" />
          Push Notifications
        </h1>
        <p className="text-white/50 mt-1">Blast announcements directly to your users' devices.</p>
      </div>

      <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden p-6 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">Notification Title *</label>
            <input 
              required
              value={formData.title}
              onChange={(e) => setFormData(p => ({ ...p, title: e.target.value }))}
              placeholder="e.g. New Property Listed!"
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">Message *</label>
            <textarea 
              required
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))}
              placeholder="e.g. Check out this amazing 3-bed semi-detached property..."
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80 flex items-center gap-2">
              <LinkIcon size={16} className="text-white/40" /> Target URL (Optional)
            </label>
            <input 
              value={formData.url}
              onChange={(e) => setFormData(p => ({ ...p, url: e.target.value }))}
              placeholder="e.g. https://rent4yousolutions.com/opportunities/property-slug"
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80 flex items-center gap-2">
              <ImageIcon size={16} className="text-white/40" /> Icon Image URL (Optional)
            </label>
            <input 
              value={formData.icon}
              onChange={(e) => setFormData(p => ({ ...p, icon: e.target.value }))}
              placeholder="e.g. https://domain.com/icon.png"
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary/50 transition-colors"
            />
            <p className="text-xs text-white/40">If left blank, the Rent4You Solutions logo will be used.</p>
          </div>

          {success && <div className="p-4 rounded-lg bg-green-500/20 text-green-400 border border-green-500/30 text-sm font-medium">{success}</div>}
          {error && <div className="p-4 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30 text-sm font-medium">{error}</div>}

          <button 
            disabled={loading}
            type="submit"
            className="w-full bg-primary hover:bg-primary-hover disabled:bg-primary/50 text-black font-bold px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
            {loading ? 'Sending to all subscribers...' : 'Blast Notification'}
          </button>
        </form>
      </div>
    </div>
  );
}
