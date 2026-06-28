'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { doc, getDoc, setDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Opportunity } from '@/lib/firebase/firestore';
import { ImageUploader } from '@/components/admin/image-uploader';

export default function ListingEditor({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const isNew = resolvedParams.id === 'new';
  const router = useRouter();
  
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<Opportunity>>({
    title: '',
    slug: '',
    location: '',
    mapCoordinates: { lat: 51.5074, lng: -0.1278 },
    googleMapsLink: '',
    strategy: 'Serviced Accommodation',
    propertyType: '',
    budget: 0,
    rentRange: '',
    estimatedCashflow: '',
    roi: '',
    occupancyRequired: '',
    images: ['https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1665&auto=format&fit=crop'],
    bedrooms: 1,
    bathrooms: 1,
    description: '',
    compliance: { licensing: false, planning: false, leaseRestrictions: false },
    demand: { corporate: 40, tourists: 40, families: 10, students: 10 },
    risks: { keyRisk: '', assumption: '' },
    featured: false,
  });

  useEffect(() => {
    if (!isNew && db) {
      const fetchDoc = async () => {
        try {
          const docRef = doc(db, 'listings', resolvedParams.id);
          const snap = await getDoc(docRef);
          if (snap.exists()) {
            setFormData(snap.data() as Partial<Opportunity>);
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (field: string, value: any) => {
    setFormData(prev => {
      const keys = field.split('.');
      if (keys.length === 2) {
        return {
          ...prev,
          [keys[0]]: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ...(prev as any)[keys[0]],
            [keys[1]]: value
          }
        };
      }
      return { ...prev, [field]: value };
    });
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
        await addDoc(collection(db, 'listings'), dataToSave);
      } else {
        await setDoc(doc(db, 'listings', resolvedParams.id), dataToSave, { merge: true });
      }
      router.push('/rent4-admin/listings');
    } catch (err) {
      console.error(err);
      alert('Error saving listing');
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
          <Link href="/rent4-admin/listings" className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{isNew ? 'Create Listing' : 'Edit Listing'}</h1>
            <p className="text-white/50 mt-1">{isNew ? 'Add a new property opportunity.' : 'Update existing property details.'}</p>
          </div>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="bg-primary hover:bg-primary-hover text-black font-semibold px-6 py-2.5 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-[#111] border border-white/10 rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold border-b border-white/10 pb-4 mb-4">Basic Information</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-white/70 mb-1.5">Title</label>
                <input required type="text" value={formData.title} onChange={e => {
                  handleChange('title', e.target.value);
                  if (isNew) handleChange('slug', e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
                }} className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary/50 transition-colors" />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-white/70 mb-1.5">Slug</label>
                <input required type="text" value={formData.slug} onChange={e => handleChange('slug', e.target.value)} className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary/50 transition-colors text-white/50" />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-white/70 mb-1.5">Location</label>
                <input required type="text" value={formData.location} onChange={e => handleChange('location', e.target.value)} className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary/50 transition-colors" />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-white/70 mb-1.5">Property Type</label>
                <input required type="text" value={formData.propertyType} onChange={e => handleChange('propertyType', e.target.value)} placeholder="e.g. 2-Bed Apartment" className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary/50 transition-colors" />
              </div>
            </div>
            
            <div className="pt-4">
              <label className="block text-sm font-medium text-white/70 mb-1.5">Description</label>
              <textarea required rows={4} value={formData.description} onChange={e => handleChange('description', e.target.value)} className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors resize-none" />
            </div>
          </div>

          <div className="bg-[#111] border border-white/10 rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold border-b border-white/10 pb-4 mb-4">Financials</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1.5">Budget (£)</label>
                <input required type="number" value={formData.budget} onChange={e => handleChange('budget', Number(e.target.value))} className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary/50 transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1.5">Monthly Rent Range</label>
                <input required type="text" value={formData.rentRange} onChange={e => handleChange('rentRange', e.target.value)} placeholder="e.g. £1,200 - £1,400" className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary/50 transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1.5">Estimated Cashflow (Monthly)</label>
                <input required type="text" value={formData.estimatedCashflow} onChange={e => handleChange('estimatedCashflow', e.target.value)} placeholder="e.g. £800" className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary/50 transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1.5">Expected ROI (%)</label>
                <input required type="text" value={formData.roi} onChange={e => handleChange('roi', e.target.value)} placeholder="e.g. 45%" className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary/50 transition-colors" />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-white/70 mb-1.5">Break-even Occupancy (%)</label>
                <input required type="text" value={formData.occupancyRequired} onChange={e => handleChange('occupancyRequired', e.target.value)} placeholder="e.g. 35%" className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary/50 transition-colors" />
              </div>
            </div>
          </div>

          <div className="bg-[#111] border border-white/10 rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold border-b border-white/10 pb-4 mb-4">Media Gallery</h2>
            <ImageUploader 
              images={formData.images || []}
              onChange={(newImages) => handleChange('images', newImages)}
              folder="listings"
              maxImages={10}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#111] border border-white/10 rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold border-b border-white/10 pb-4 mb-4">Google Maps</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1.5">Latitude</label>
                <input required type="number" step="any" value={formData.mapCoordinates?.lat || 0} onChange={e => handleChange('mapCoordinates.lat', Number(e.target.value))} className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary/50 transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1.5">Longitude</label>
                <input required type="number" step="any" value={formData.mapCoordinates?.lng || 0} onChange={e => handleChange('mapCoordinates.lng', Number(e.target.value))} className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary/50 transition-colors" />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-white/70 mb-1.5">Google Maps Link (Optional)</label>
                <input type="text" value={formData.googleMapsLink || ''} onChange={e => handleChange('googleMapsLink', e.target.value)} placeholder="e.g. https://maps.app.goo.gl/..." className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary/50 transition-colors" />
              </div>
            </div>
          </div>

          <div className="bg-[#111] border border-white/10 rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold border-b border-white/10 pb-4 mb-4">Configuration</h2>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1.5">Strategy</label>
              <select value={formData.strategy} onChange={e => handleChange('strategy', e.target.value)} className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary/50 transition-colors appearance-none">
                <option value="Serviced Accommodation">Serviced Accommodation</option>
                <option value="Council Leasing">Council Leasing</option>
                <option value="Rent-to-Rent">Rent-to-Rent</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1.5">Bedrooms</label>
                <input required type="number" value={formData.bedrooms} onChange={e => handleChange('bedrooms', Number(e.target.value))} className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary/50 transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1.5">Bathrooms</label>
                <input required type="number" value={formData.bathrooms} onChange={e => handleChange('bathrooms', Number(e.target.value))} className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary/50 transition-colors" />
              </div>
            </div>
            
            <div className="pt-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${formData.featured ? 'bg-primary border-primary text-black' : 'border-white/20 bg-black'}`}>
                  {formData.featured && <svg viewBox="0 0 14 14" fill="none" className="w-3 h-3"><path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
                <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">Featured Listing</span>
                <input type="checkbox" checked={formData.featured} onChange={e => handleChange('featured', e.target.checked)} className="hidden" />
              </label>
            </div>
          </div>

          <div className="bg-[#111] border border-white/10 rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold border-b border-white/10 pb-4 mb-4">Compliance</h2>
            <div className="space-y-3">
              {(['licensing', 'planning', 'leaseRestrictions'] as const).map(key => (
                <label key={key} className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${formData.compliance?.[key] ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-white/20 bg-black'}`}>
                    {formData.compliance?.[key] && <svg viewBox="0 0 14 14" fill="none" className="w-3 h-3"><path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </div>
                  <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors capitalize">{key.replace(/([A-Z])/g, ' $1').trim()} Required/Checked</span>
                  <input type="checkbox" checked={formData.compliance?.[key] || false} onChange={e => handleChange(`compliance.${key}`, e.target.checked)} className="hidden" />
                </label>
              ))}
            </div>
          </div>

          <div className="bg-[#111] border border-white/10 rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold border-b border-white/10 pb-4 mb-4">Area Demand Analytics</h2>
            <p className="text-xs text-white/50 mb-4">Set the estimated demand percentages. Total should ideally be 100%.</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1.5">Corporate (%)</label>
                <input type="number" min="0" max="100" value={formData.demand?.corporate || 0} onChange={e => handleChange('demand.corporate', Number(e.target.value))} className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary/50 transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1.5">Tourists (%)</label>
                <input type="number" min="0" max="100" value={formData.demand?.tourists || 0} onChange={e => handleChange('demand.tourists', Number(e.target.value))} className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary/50 transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1.5">Families (%)</label>
                <input type="number" min="0" max="100" value={formData.demand?.families || 0} onChange={e => handleChange('demand.families', Number(e.target.value))} className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary/50 transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1.5">Students (%)</label>
                <input type="number" min="0" max="100" value={formData.demand?.students || 0} onChange={e => handleChange('demand.students', Number(e.target.value))} className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary/50 transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
