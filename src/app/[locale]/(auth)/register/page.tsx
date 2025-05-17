'use client'

import { AuthCard } from '@/components/auth/auth-card';
import RegisterForm from '@/components/auth/register-form';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function RegisterPage() {
  const t = useTranslations('auth');

  return (
    <AuthCard 
      title={t('register.title')} 
      description={t('register.description')}
      footer={
        <div className="mt-4 text-sm text-muted-foreground">
        {t('alreadyHaveAccount')}
        <Link href="/login" className="text-primary hover:text-primary/80">
          {t('signIn')}
        </Link>
      </div>
      }
    >
      <RegisterForm />
    </AuthCard>
  );
}
