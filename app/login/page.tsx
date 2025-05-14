import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import LoginForm from './login-form';
import { redirect } from 'next/navigation';
import { getUser } from '@/app/actions/auth';

export default async function LoginPage() {
  const user = await getUser();
  if (user) {
    redirect('/');
  }

  return (
    <div className="min-h-screen flex justify-center items-center p-8">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Please enter your credentials to continue.</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            Don't have an account? <a href="/register" className="text-primary hover:underline">Register</a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
