import { betterAuth } from "better-auth";
import { db } from "./db";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as authSchema from "./db/auth-schema";
import { nextCookies, toNextJsHandler } from "better-auth/next-js";
import { sendEmail } from "./email";
import { SupportedLocale } from "@/i18n/config";
import { getLocale } from "next-intl/server";

// Définir l'interface pour les données de la réinitialisation du mot de passe
declare module 'better-auth' {
  interface ResetPasswordPayload {
    locale?: SupportedLocale;
  }
}

export const auth = betterAuth({
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  emailAndPassword: {
    enabled: true,
    resetPasswordTokenExpiresIn: 10 * 60,
    sendResetPassword: async (options) => {
      const { user: { email, name }, url } = options;
      try {
        const locale = await getLocale();
        const templates = await import('@/app/server/email/templates');
        await sendEmail({
          to: email,
          subject: templates.emailTemplates.passwordReset.subject(locale),
          text: templates.emailTemplates.passwordReset.text(locale, name || 'user', url),
          html: templates.emailTemplates.passwordReset.html(locale, name || 'user', url),
        });
      } catch (error) {
        throw new Error('Failed to send password reset email');
      }
    }
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: authSchema
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
    }
  },
  plugins: [nextCookies()],
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_BASE_URL
});
// Exporter aussi le handler pour l'API
export const { GET, POST } = toNextJsHandler(auth.handler);