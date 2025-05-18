'use client';

import { AuthLayout } from '@/components/auth/auth-layout';
import LoginForm from '@/components/auth/login-form';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function LoginPage() {
  const t = useTranslations('auth');
  const commonT = useTranslations('common');

  return (
    <AuthLayout 
      title={t('login.title')}
      description={t('login.description')}
    >
      <LoginForm />
      <div className="space-y-2 mt-4 text-sm text-center text-muted-foreground">
        <p>
          <Link href="/forgot-password" className="font-medium text-primary hover:underline">
            {commonT('buttons.forgotPassword')}
          </Link>
        </p>
        <p>
          {t('noAccount')}{' '}
          <Link href="/register" className="font-medium text-primary hover:underline">
            {commonT('buttons.register')}
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
