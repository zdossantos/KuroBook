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
import { toast } from 'sonner';

type ResetPasswordFormProps = {
  token: string;
};

export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const commonT = useTranslations('common');
  const t = useTranslations('auth.resetPassword');
  const router = useRouter();

  const formSchema = z.object({
    password: z.string()
      .min(8, commonT('errors.password.min'))
      .max(20, commonT('errors.password.max'))
      .refine((password) => /[A-Z]/.test(password), {
        message: commonT('errors.password.uppercase'),
      })
      .refine((password) => /[a-z]/.test(password), {
        message: commonT('errors.password.lowercase'),
      })
      .refine((password) => /[0-9]/.test(password), {
        message: commonT('errors.password.number'),
      })
      .refine((password) => /[!@#$%^&*+]/.test(password), {
        message: commonT('errors.password.special'),
      }),
    confirmPassword: z.string(),
  }).refine(
    (data) => data.password === data.confirmPassword,
    {
      message: commonT('errors.password.doesNotMatch'),
      path: ['confirmPassword']
    }
  );

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await resetPassword({
        token,
        newPassword: data.password,
      });
      toast.success(commonT('messages.passwordResetSuccess'));
      router.push('/login');
    } catch (err) {
      toast.error(commonT('errors.token.invalid'));
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <div>
          <Label htmlFor="password">{commonT('fields.password')}</Label>
          <Input
            id="password"
            type="password"
            placeholder={commonT('fields.passwordPlaceholder')}
            {...form.register('password')}
          />
          {form.formState.errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.password.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="confirmPassword">{commonT('fields.confirmPassword')}</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder={commonT('fields.confirmPasswordPlaceholder')}
            {...form.register('confirmPassword')}
          />
          {form.formState.errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.confirmPassword.message}
            </p>
          )}
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
        {commonT('buttons.resetPassword')}
      </Button>
    </form>
  );
}
