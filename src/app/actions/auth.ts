"use server";
import { auth } from '@/app/server/auth';
import { headers } from 'next/headers';
import { getLocale } from 'next-intl/server';

type SignUpProps = {
  name: string;
  email: string;
  password: string;
}

export const signUp = async ({ name, email, password }: SignUpProps) => {
    return await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      }
    });
}

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


export async function signOut() {
    await auth.api.signOut({
      headers: await headers()
    });
}

export const forgotPassword = async ({ email }: { email: string }) => {
    const locale = await getLocale();
    
    return await auth.api.forgetPassword({
        body: {
            email,
            redirectTo: `/${locale}/reset-password`,
        },
    });
}

export const resetPassword = async ({ newPassword, token }: { newPassword: string; token?: string }) => {
    return await auth.api.resetPassword({
        body: {
            newPassword,
            token,
        }
    });
}