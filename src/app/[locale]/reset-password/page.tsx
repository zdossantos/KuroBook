'use client';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
  } from '@/components/ui/card';
  import { useTranslations } from 'next-intl';
import ResetPasswordForm from '@/components/auth/reset-password-form';
import { useSearchParams } from 'next/navigation'
  
  export default function ResetPasswordPage() {
    const t = useTranslations('auth.resetPassword');
    const params= useSearchParams();
    const token = params.get('token');
    
    return (
      <div className="min-h-screen flex justify-center items-center p-8">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">{t('title')}</CardTitle>
            <CardDescription>{t('description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <ResetPasswordForm token={token as string} />
          </CardContent>
        </Card>
      </div>
    );
  }