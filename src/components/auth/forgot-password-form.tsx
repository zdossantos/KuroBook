'use client'

import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslations } from 'next-intl';
import { forgotPassword } from '@/app/actions/auth';
import { toast } from "sonner"

const formSchema = z.object({
  email: z.string().email('Email invalide'),
});

type FormValues = z.infer<typeof formSchema>;

export default function ForgotPasswordForm() {
  const t = useTranslations('auth.forgotPassword');

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const handleSubmit = async (data: FormValues) => {
    try {
      await forgotPassword(data);
      toast.success(t('success'));
    } catch (err) {
      form.setError('email', { message: t('errors.email.error') });
      toast.error(t('errors.email.error'));
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="email">{t('emailLabel')}</Label>
        <Input
          id="email"
          type="email"
          placeholder="example@domain.com"
          {...form.register('email')}
        />
        {form.formState.errors.email && (
          <p className="text-red-500 text-sm mt-1">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>

      <Button type="submit">
        {t('submit')}
      </Button>
    </form>
  );
}
