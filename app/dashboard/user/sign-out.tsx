'use client';

import { signOutAction } from '@/app/actions/auth';

export function SignOut() {
  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await signOutAction();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="w-full" onClick={handleSignOut}>
      Sign Out
    </div>
  );
}
