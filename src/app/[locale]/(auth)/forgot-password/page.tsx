'use client';
import ForgotPasswordForm from '@/components/auth/forgot-password-form';
import { useTranslations } from 'next-intl';
import { AuthCard } from '@/components/auth/auth-card';
import Link from 'next/link';
  
export default function ForgotPasswordPage() {
    const t = useTranslations('auth');
  
    return (
      <AuthCard 
        title={t('forgotPassword.title')} 
        description={t('forgotPassword.description')}
        footer={
          <span className="mt-4 text-sm text-muted-foreground">
          {t('alreadyHaveAccount')}
          <Link href="/login" className="text-primary hover:text-primary/80">
            {t('signIn')}
          </Link>
        </span>
        }
      >
        <ForgotPasswordForm />
      </AuthCard>
    );
}