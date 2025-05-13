"use server";
import { auth } from "@/app/server/auth"
 
type SignInProps = {
    email: string;
    password: string;
}
export const signIn = async ({ email, password }: SignInProps) => {
   return await auth.api.signInEmail({
        body: {
            email,
            password,
        }
    })
}