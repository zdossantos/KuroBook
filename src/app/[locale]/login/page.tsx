'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import LoginForm from '@/components/auth/login-form';
import { useTranslations } from 'next-intl';

export default function LoginPage() {
  const t = useTranslations('auth.login');

  return (
    <div className="min-h-screen flex justify-center items-center p-8">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">{t('title')}</CardTitle>
          <CardDescription>{t('description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter className='flex flex-col items-start gap-2'>
          <p className="text-sm text-muted-foreground">
            {t('forgot_password')} <a href="/forgot-password" className="text-primary hover:underline">{t('reset_password')}</a>
          </p>
          <p className="text-sm text-muted-foreground">
            {t('no_account')} <a href="/register" className="text-primary hover:underline">{t('register')}</a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
