'use client';

import { useMediaQuery } from '@uidotdev/usehooks';
import { ReactNode } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { AuthCard } from './auth-card';
import { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { motion } from 'motion/react';

type AuthLayoutProps = {
  children: ReactNode;
  title: string;
  description: string;
};

export function AuthLayout({ children, title, description }: AuthLayoutProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Contenu de la carte pour la version mobile
  const mobileView = (
    <div className="w-full">
      <AuthCard title={title} description={description}>
        {children}
      </AuthCard>
    </div>
  );

  const t = useTranslations('auth.layout');
  const currentLocale = useLocale();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLanguageChange = (newLocale: string) => {
    const path = window.location.pathname;
    const pathParts = path.split('/');
    
    // Replace the locale in the URL
    if (pathParts.length > 1 && ['en', 'fr'].includes(pathParts[1])) {
      pathParts[1] = newLocale;
    } else {
      pathParts.splice(1, 0, newLocale);
    }
    
    const newPath = pathParts.join('/');
    window.location.href = newPath;
  };

  // Contenu pour la version desktop
  const desktopView = (
    <div className="flex w-full">
      {/* Left side - Mascot */}
      <div className="w-1/2 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center p-12">
        <div className="relative w-full h-full max-w-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-3xl blur-3xl -z-10" />
          <motion.div
            className="relative z-10 flex flex-col items-center justify-center h-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="relative w-64 h-64"
            >
              <Image
                src="/image/kuro/kuro.png"
                alt="Kuro Mascot"
                fill
                className="object-contain"
                priority
              />
            </div>
            <h2 className="mt-8 text-2xl font-semibold text-foreground">
              {t('welcomeTitle')}
            </h2>
            <p className="mt-2 text-center text-muted-foreground max-w-sm">
              {t('welcomeSubtitle')}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-1/2 flex flex-col justify-center p-16">
        <motion.div className="w-full max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}>
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {title}
            </h1>
            <p className="text-muted-foreground">{description}</p>
          </div>
          {children}
        </motion.div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex">
      <div className="absolute top-4 right-4 z-10">
        <Select value={currentLocale} onValueChange={handleLanguageChange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fr">
              <span className="inline-flex items-center gap-2">
                <span>🇫🇷</span>
                <span>Français</span>
              </span>
            </SelectItem>
            <SelectItem value="en">
              <span className="inline-flex items-center gap-2">
                <span>🇬🇧</span>
                <span>English</span>
              </span>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      {isMobile ? mobileView : desktopView}
    </div>
  );
}
