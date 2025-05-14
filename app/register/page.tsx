import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { auth } from '@/app/server/auth';
import { headers } from 'next/headers';
import RegisterForm from '@/components/auth/register-form';

export default function RegisterPage() {
  async function registerUser({ name, email, password }: { name: string; email: string; password: string }) {
    'use server';
    
    try {
      await auth.api.signUpEmail({
        headers: await headers(),
        body: {
          name,
          email,
          password
        }
      });
      
      // Redirect logic could be handled here or in the client component
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  }
  
  const registerUserAction = registerUser;

  return (
    <div className="min-h-screen flex justify-center items-center p-8">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Create Account</CardTitle>
          <CardDescription>Enter your details to create an account.</CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm registerAction={registerUserAction} />
        </CardContent>
      </Card>
    </div>
  );
}
