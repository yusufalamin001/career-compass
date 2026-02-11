'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Compass, LogOut, User } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function AuthenticatedNav() {
  const router = useRouter();
  const supabase = createClient();
  const [userEmail, setUserEmail] = useState<string>('');

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email || '');
      }
    };

    getUser();
  }, [supabase.auth]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <nav className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <Compass className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold">Career Compass</span>
          </Link>
          <div className="flex items-center space-x-4">
            {userEmail && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="h-4 w-4" />
                <span>{userEmail}</span>
              </div>
            )}
            <Link href="/explore">
              <button className="px-4 py-2 text-gray-700 hover:text-gray-900">
                Explore Careers
              </button>
            </Link>
            <Link href="/dashboard">
              <button className="px-4 py-2 text-gray-700 hover:text-gray-900">
                Dashboard
              </button>
            </Link>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 text-red-600 hover:text-red-700 flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}