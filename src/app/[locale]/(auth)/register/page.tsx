'use client';

import { AuthLayout } from '@/components/auth/auth-layout';
import RegisterForm from '@/components/auth/register-form';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function RegisterPage() {
  const t = useTranslations('auth');

  return (
    <AuthLayout 
      title={t('register.title')}
      description={t('register.description')}
    >
      <RegisterForm />
      <div className="mt-4 text-sm text-center text-muted-foreground">
        {t('alreadyHaveAccount')}
        <Link href="/login" className="ml-1 font-medium text-primary hover:text-primary/80">
          {t('signIn')}
        </Link>
      </div>
    </AuthLayout>
  );
}
