"use server";
import { auth } from '@/app/server/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export async function signOutAction() {
  try {
    await auth.api.signOut({
      headers: await headers()
    });
    redirect('/');
  } catch (error) {
    console.error('Error during sign out:', error);
    throw error;
  }
}
