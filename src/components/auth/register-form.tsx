"use client"

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { signUp } from "@/app/actions/auth";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const registerSchema = z.object({
  name: z.string().min(2, 'errors.name.min'),
  email: z.string().email('errors.email.invalid'),
  password: z.string().min(8, { message: 'errors.password.min' })
  .max(20, { message: 'errors.password.max' })
  .refine((password) => /[A-Z]/.test(password), {
    message: 'errors.password.uppercase',
  })
  .refine((password) => /[a-z]/.test(password), {
    message: 'errors.password.lowercase',
  })
  .refine((password) => /[0-9]/.test(password), { message: 'errors.password.number' })
  .refine((password) => /[!@#$%^&*+]/.test(password), {
    message: 'errors.password.special',
  })
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const router = useRouter();
  const t = useTranslations('auth.register');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await signUp(data);
      router.push('/');
    } catch (error: any) {
      setError('email', { message: t('errors.email.exists') });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">{t('fields.name')}</Label>
        <Input
          id="name"
          type="text"
          {...register('name')}
          className={errors.name ? 'border-red-500' : ''}
          disabled={isSubmitting}
        />
        {errors.name && (
          <p className="text-sm text-red-500">{t(errors.name.message as string)}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">{t('fields.email')}</Label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          className={errors.email ? 'border-red-500' : ''}
          disabled={isSubmitting}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{t(errors.email.message as string)}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">{t('fields.password')}</Label>
        <Input
          id="password"
          type="password"
          {...register('password')}
          className={errors.password ? 'border-red-500' : ''}
          disabled={isSubmitting}
        />
        {errors.password && (
          <p className="text-sm text-red-500">{t(errors.password.message as string)}</p>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {t('title')}
      </Button>
    </form>
  );
}
