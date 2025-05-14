'use client';

import { signOut } from '@/app/actions/auth';
import { redirect } from 'next/navigation';

export function SignOut() {
  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault();
    await signOut();
    redirect('/');
  };

  return (
    <div className="w-full" onClick={handleSignOut}>
      Sign Out
    </div>
  );
}
