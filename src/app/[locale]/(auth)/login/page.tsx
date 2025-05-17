'use client'

import { AuthCard } from '@/components/auth/auth-card';
import LoginForm from '@/components/auth/login-form';
import { useTranslations } from 'next-intl';

export default function LoginPage() {
  const t = useTranslations('auth.login');

  const footer = (
    <>
      <p className="text-sm text-muted-foreground">
        {t('forgot_password')} <a href="/forgot-password" className="text-primary hover:underline">{t('reset_password')}</a>
      </p>
      <p className="text-sm text-muted-foreground">
        {t('no_account')} <a href="/register" className="text-primary hover:underline">{t('register')}</a>
      </p>
    </>
  );

  return (
    <AuthCard 
      title={t('title')} 
      description={t('description')}
      footer={footer}
    >
      <LoginForm />
    </AuthCard>
  );
}
