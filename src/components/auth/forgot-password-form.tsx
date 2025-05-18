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

type ForgotPasswordFormData = {
  email: string;
};

export default function ForgotPasswordForm() {
  const t = useTranslations('auth.forgotPassword');
  const commonT = useTranslations('common');

  const formSchema = z.object({
    email: z.string().email(commonT('errors.email.invalid')),
  });

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const handleSubmit = async (data: ForgotPasswordFormData) => {
    try {
      await forgotPassword(data);
      toast.success(commonT('messages.resetLinkSent'));
    } catch (err) {
      form.setError('email', { message: commonT('errors.email.error') });
      toast.error(commonT('errors.email.error'));
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="email">{commonT('fields.email')}</Label>
        <Input
          id="email"
          type="email"
          placeholder={commonT('fields.emailPlaceholder')}
          {...form.register('email')}
        />
        {form.formState.errors.email && (
          <p className="text-red-500 text-sm mt-1">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>

      <Button type="submit">
        {commonT('buttons.sendResetLink')}
      </Button>
    </form>
  );
}
