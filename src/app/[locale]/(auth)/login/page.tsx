'use client';

import { AuthLayout } from '@/components/auth/auth-layout';
import LoginForm from '@/components/auth/login-form';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function LoginPage() {
  const t = useTranslations('auth.login');

  return (
    <AuthLayout 
      title={t('title')}
      description={t('description')}
    >
      <LoginForm />
      <div className="space-y-2 mt-4 text-sm text-center text-muted-foreground">
        <p>
          {t('forgot_password')}{' '}
          <Link href="/forgot-password" className="font-medium text-primary hover:underline">
            {t('reset_password')}
          </Link>
        </p>
        <p>
          {t('no_account')}{' '}
          <Link href="/register" className="font-medium text-primary hover:underline">
            {t('register')}
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
