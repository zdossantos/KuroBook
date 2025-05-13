"use client"

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { signIn } from "../server/db/user/sign-in";

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters')
});

export default function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (data: z.infer<typeof loginSchema>) => {
        try {
            const result = await signIn({
                email: data.email,
                password: data.password
            });
            if (result.token) {
                window.location.href = '/';
            } else {
                throw new Error('Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
            if (error instanceof Error) {
                console.error('Error message:', error.message);
            }
            throw error;
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
            <Button type="submit" className="w-full">
                Login
            </Button>
        </form>
    );
}