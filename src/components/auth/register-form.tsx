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

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterForm() {
  const router = useRouter();
  const t = useTranslations('auth.register');
  const commonT = useTranslations('common');
  
  const registerSchema = z.object({
    name: z.string().min(2, commonT('errors.name.min')),
    email: z.string().email(commonT('errors.email.invalid')),
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
      })
  });

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
        <Label htmlFor="name">{commonT('fields.name')}</Label>
        <Input
          id="name"
          type="text"
          {...register('name')}
          className={errors.name ? 'border-red-500' : ''}
          disabled={isSubmitting}
          placeholder={commonT('fields.namePlaceholder')}
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">{commonT('fields.email')}</Label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          className={errors.email ? 'border-red-500' : ''}
          disabled={isSubmitting}
          placeholder={commonT('fields.emailPlaceholder')}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">{commonT('fields.password')}</Label>
        <Input
          id="password"
          type="password"
          {...register('password')}
          className={errors.password ? 'border-red-500' : ''}
          disabled={isSubmitting}
          placeholder={commonT('fields.passwordPlaceholder')}
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {commonT('buttons.register')}
      </Button>
    </form>
  );
}
