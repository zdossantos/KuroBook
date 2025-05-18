'use client';

import ForgotPasswordForm from '@/components/auth/forgot-password-form';
import { useTranslations } from 'next-intl';
import { AuthLayout } from '@/components/auth/auth-layout';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const t = useTranslations('auth');
  const commonT = useTranslations('common');

  return (
    <AuthLayout 
      title={t('forgotPassword.title')}
      description={t('forgotPassword.description')}
    >
      <ForgotPasswordForm />
      <div className="mt-4 text-sm text-center text-muted-foreground">
        {t('alreadyHaveAccount')}
        <Link href="/login" className="ml-1 font-medium text-primary hover:text-primary/80">
          {commonT('buttons.signIn')}
        </Link>
      </div>
    </AuthLayout>
  );
}