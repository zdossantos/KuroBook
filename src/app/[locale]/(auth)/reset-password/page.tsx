'use client';

import { useTranslations } from 'next-intl';
import ResetPasswordForm from '@/components/auth/reset-password-form';
import { useSearchParams } from 'next/navigation'
import { AuthCard } from '@/components/auth/auth-card';  

export default function ResetPasswordPage() {
    const t = useTranslations('auth.resetPassword');
    const params= useSearchParams();
    const token = params.get('token');
    
    return (
      <AuthCard 
        title={t('title')} 
        description={t('description')}
      >
        <ResetPasswordForm token={token as string} />
      </AuthCard>
    );
}