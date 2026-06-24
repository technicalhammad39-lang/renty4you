'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Building2, 
  FileText, 
  Mail, 
  Users, 
  Image as ImageIcon, 
  Settings, 
  LogOut 
} from 'lucide-react';
import { auth } from '@/lib/firebase/config';
import { signOut } from 'firebase/auth';

const navItems = [
  { name: 'Dashboard', href: '/rent4-admin', icon: LayoutDashboard },
  { name: 'Listings', href: '/rent4-admin/listings', icon: Building2 },
  { name: 'Blogs', href: '/rent4-admin/blogs', icon: FileText },
  { name: 'Newsletter', href: '/rent4-admin/newsletter', icon: Mail },
  { name: 'Contacts & Leads', href: '/rent4-admin/contacts', icon: Users },
  { name: 'Media Library', href: '/rent4-admin/media', icon: ImageIcon },
  { name: 'Settings', href: '/rent4-admin/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="w-64 bg-[#0a0a0a] border-r border-white/10 h-screen flex flex-col fixed left-0 top-0 z-50">
      <div className="p-6">
        <Link href="/rent4-admin" className="block group">
          <Image
            src="/Rent4you-dark-mode.png"
            alt="Rent4uSolutions"
            width={160}
            height={40}
            className="h-8 w-auto object-contain transition-transform group-hover:scale-[1.02]"
            priority
          />
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-4 overflow-y-auto">
        <div className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4 px-3">Menu</div>
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium ${
                isActive 
                  ? 'bg-white/10 text-white shadow-sm' 
                  : 'text-white/60 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon size={18} className={isActive ? 'text-primary' : 'opacity-70'} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg w-full text-left transition-all duration-200 text-sm font-medium text-white/60 hover:bg-red-500/10 hover:text-red-400 group"
        >
          <LogOut size={18} className="opacity-70 group-hover:opacity-100" />
          Logout
        </button>
      </div>
    </div>
  );
}
