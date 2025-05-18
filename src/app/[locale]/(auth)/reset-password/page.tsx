'use client';

import { useTranslations } from 'next-intl';
import ResetPasswordForm from '@/components/auth/reset-password-form';
import { redirect, useSearchParams } from 'next/navigation';
import { AuthLayout } from '@/components/auth/auth-layout';

export default function ResetPasswordPage() {
  const t = useTranslations('auth.resetPassword');
  const params = useSearchParams();
  const token = params.get('token');
  const error = params.get('error');
  
  if (!token || error) {
    redirect('/login');
  }

  return (
    <AuthLayout 
      title={t('title')}
      description={t('description')}
    >
      <ResetPasswordForm token={token as string} />
    </AuthLayout>
  );
}