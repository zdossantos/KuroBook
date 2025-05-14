'use client'

import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslations } from 'next-intl';
import { resetPassword } from '@/app/actions/auth';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  password: z.string().min(8, { message: 'min' })
    .max(20, { message: 'max' })
    .refine((password) => /[A-Z]/.test(password), {
      message: 'uppercase',
    })
    .refine((password) => /[a-z]/.test(password), {
      message: 'lowercase',
    })
    .refine((password) => /[0-9]/.test(password), {
      message: 'number',
    })
    .refine((password) => /[!@#$%^&*+]/.test(password), {
      message: 'special',
    }),
  confirmPassword: z.string().min(8, { message: 'min' })
    .max(20, { message: 'max' })
    .refine((password) => /[A-Z]/.test(password), {
      message: 'uppercase',
    })
    .refine((password) => /[a-z]/.test(password), {
      message: 'lowercase',
    })
    .refine((password) => /[0-9]/.test(password), {
      message: 'number',
    })
    .refine((password) => /[!@#$%^&*+]/.test(password), {
      message: 'special',
    }),
}).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: 'doesNotMatch',
    path: ['confirmPassword']
  }
);

type ResetPasswordFormProps = {
  token: string;
};

type FormValues = z.infer<typeof formSchema>;

export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const t = useTranslations('auth.resetPassword');
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: ''
    },
  });

  const handleSubmit = async (data: FormValues) => {
    try {
      
      await resetPassword({ token, newPassword: data.confirmPassword });
      router.push('/login');
    } catch (err) {
      form.setError('root', { message: t('errors.generic') });
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="password">{t('passwordLabel')}</Label>
        <Input
          id="password"
          type="password"
          {...form.register('password')}
          className={`w-full ${form.formState.errors.password ? 'border-red-500' : ''}`}
          placeholder={t('passwordPlaceholder')}
        />
        {form.formState.errors.password && (
          <p className="text-sm text-red-500">
            {t(`errors.${form.formState.errors.password.message}`)}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">{t('confirmPasswordLabel')}</Label>
        <Input
          id="confirmPassword"
          type="password"
          {...form.register('confirmPassword')}
          className={`w-full ${form.formState.errors.confirmPassword ? 'border-red-500' : ''}`}
          placeholder={t('confirmPasswordPlaceholder')}
        />
        {form.formState.errors.confirmPassword && (
          <p className="text-sm text-red-500">
            {t(`errors.${form.formState.errors.confirmPassword.message}`)}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
        {t('submitButton')}
      </Button>
    </form>
  );
}
