"use client"

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { signIn } from "@/app/actions/auth";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const router = useRouter();
  const t = useTranslations('auth.login');
  const commonT = useTranslations('common');

  const loginSchema = z.object({
    email: z.string().email(commonT('errors.email.invalid')),
    password: z.string()
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await signIn({
        email: data.email,
        password: data.password
      });
      router.push('/');
    } catch (error) {
      setError('email', { message: commonT('errors.email.credentials') });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">{commonT('fields.email')}</Label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          className={errors.email ? 'border-red-500' : ''}
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
          placeholder={commonT('fields.passwordPlaceholder')}
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {commonT('buttons.signIn')}
      </Button>
    </form>
  );
}