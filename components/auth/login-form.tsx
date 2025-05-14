"use client"

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { signIn } from "@/app/actions/auth";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, { message: 'Password must be at least 8 characters' })
    .max(20, { message: 'Password must be at most 20 characters' })
    .refine((password) => /[A-Z]/.test(password), {
      message: 'Password must contain at least one uppercase letter',
    })
    .refine((password) => /[a-z]/.test(password), {
      message: 'Password must contain at least one lowercase letter',
    })
    .refine((password) => /[0-9]/.test(password), { message: 'Password must contain at least one number' })
    .refine((password) => /[!@#$%^&*]/.test(password), {
      message: 'Password must contain at least one special character',
    })
});

export default function LoginForm() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError
    } = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (data: z.infer<typeof loginSchema>) => {
        try {
            await signIn({
                email: data.email,
                password: data.password
            });
            router.push('/');
        } catch (error) {
            setError('email', { message: 'Invalid email or password' });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    {...register('email')}
                    className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                    <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
            </div>
            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    type="password"
                    {...register('password')}
                    className={errors.password ? 'border-red-500' : ''}
                />
                {errors.password && (
                    <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
                Login
            </Button>
        </form>
    );
}