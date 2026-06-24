'use client';

import { AuthProvider, useAuth } from '@/components/admin/auth-provider';
import { Sidebar } from '@/components/admin/sidebar';
import { usePathname } from 'next/navigation';

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const isLoginPage = pathname === '/rent4-admin/login';

  // If loading or (not authenticated and not on login page), render nothing to prevent UI leaks
  if (loading || (!user && !isLoginPage)) {
    return null;
  }

  // If on login page, render just the children (the login form) without Sidebar
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Authenticated Dashboard Layout
  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-white">
      <Sidebar />
      <main className="flex-1 ml-64 p-8 overflow-y-auto relative">
        {children}
      </main>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AdminLayoutContent>
        {children}
      </AdminLayoutContent>
    </AuthProvider>
  );
}
