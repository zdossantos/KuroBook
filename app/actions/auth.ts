"use server";
import { auth } from '@/app/server/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

type SignInProps = {
  email: string;
  password: string;
}
export const signIn = async ({ email, password }: SignInProps) => {
 return await auth.api.signInEmail({
      body: {
          email,
          password,
      }
  })
}

export const getUser = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    return session?.user;
}


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