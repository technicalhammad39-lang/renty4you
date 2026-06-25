'use client';

import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { rtdb } from '@/lib/firebase/config';
import { 
  Building2, 
  FileText, 
  Mail, 
  MousePointerClick, 
  TrendingUp, 
  Users 
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const mockChartData = [
  { name: 'Mon', views: 400, leads: 24 },
  { name: 'Tue', views: 300, leads: 13 },
  { name: 'Wed', views: 550, leads: 48 },
  { name: 'Thu', views: 480, leads: 39 },
  { name: 'Fri', views: 600, leads: 55 },
  { name: 'Sat', views: 750, leads: 82 },
  { name: 'Sun', views: 800, leads: 95 },
];

export default function AdminDashboardOverview() {
  const [activeVisitors, setActiveVisitors] = useState(0);

  useEffect(() => {
    if (!rtdb) return;
    const visitorsRef = ref(rtdb, 'active_visitors');
    const unsubscribe = onValue(visitorsRef, (snapshot) => {
      if (snapshot.exists()) {
        setActiveVisitors(Object.keys(snapshot.val()).length);
      } else {
        setActiveVisitors(0);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
          <p className="text-white/50 mt-1">Here&apos;s what&apos;s happening with Rent4uSolutions today.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Listings', value: '24', icon: Building2, trend: '+12% from last month' },
          { label: 'Active Blogs', value: '18', icon: FileText, trend: '+3 new this week' },
          { label: 'Total Leads', value: '1,249', icon: Users, trend: '+18% conversion rate' },
          { label: 'Live Visitors', value: activeVisitors.toString(), icon: MousePointerClick, trend: 'Right now', isLive: true },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-6 transition-all hover:bg-white/[0.02] hover:border-white/20">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-white/60">{stat.label}</span>
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                  <Icon size={16} className={stat.isLive ? "text-red-500 animate-pulse" : "text-primary"} />
                </div>
              </div>
              <div className="text-3xl font-bold">{stat.value}</div>
              <div className="flex items-center gap-1.5 mt-2 text-xs text-emerald-400">
                {stat.isLive ? <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> : <TrendingUp size={14} />}
                <span className={stat.isLive ? "text-red-500 font-semibold" : ""}>{stat.trend}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#111] border border-white/10 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-6">Traffic & Views (Last 7 Days)</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d4af37" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#d4af37" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="views" stroke="#d4af37" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#111] border border-white/10 rounded-xl p-6 flex flex-col">
          <h2 className="text-lg font-semibold mb-6">Recent Activity</h2>
          <div className="flex-1 space-y-6 overflow-y-auto pr-2">
            {[
              { title: 'New Deal Pack Requested', desc: 'John Doe requested pack for "Manchester SA"', time: '2 mins ago', icon: FileText },
              { title: 'Discovery Call Booked', desc: 'Sarah Smith booked for tomorrow 2 PM', time: '1 hour ago', icon: Users },
              { title: 'New Newsletter Subscriber', desc: 'mike@example.com joined the list', time: '3 hours ago', icon: Mail },
              { title: 'Listing Published', desc: '"Liverpool HMO" is now live', time: '5 hours ago', icon: Building2 },
              { title: 'Contact Form Submitted', desc: 'Query regarding property sourcing fees', time: '1 day ago', icon: Mail },
            ].map((act, i) => {
              const Icon = act.icon;
              return (
                <div key={i} className="flex gap-4">
                  <div className="relative mt-1">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center z-10 relative">
                      <Icon size={14} className="text-primary" />
                    </div>
                    {i !== 4 && <div className="absolute top-8 left-1/2 -translate-x-1/2 w-px h-10 bg-white/10"></div>}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">{act.title}</h4>
                    <p className="text-xs text-white/50 mt-0.5">{act.desc}</p>
                    <span className="text-[10px] text-white/30 mt-1 block">{act.time}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
