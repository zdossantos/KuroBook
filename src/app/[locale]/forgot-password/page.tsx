'use client';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
  } from '@/components/ui/card';
  import ForgotPasswordForm from '@/components/auth/forgot-password-form';
  import { useTranslations } from 'next-intl';
  
  export default function ForgotPasswordPage() {
    const t = useTranslations('auth.forgotPassword');
  
    return (
      <div className="min-h-screen flex justify-center items-center p-8">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">{t('title')}</CardTitle>
            <CardDescription>{t('description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <ForgotPasswordForm />
          </CardContent>
        </Card>
      </div>
    );
  }