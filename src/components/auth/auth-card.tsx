"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "motion/react";

interface AuthCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function AuthCard({ title, description, children, footer }: AuthCardProps) {

  return (
    <div className="min-h-screen max-w-screen overflow-hidden flex justify-center items-center p-8 relative">
      <div className="relative min-w-2/3">
      <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 0.5, 
              ease: "easeOut"
            }}
            className="absolute w-full h-full z-10 pointer-events-none"
          > 
          <Image src="/image/kuro/kuro_all.png" width={1024} height={1024} alt="Kuro body" className="absolute pointer-events-none -z-10 -top-3 -right-20 w-[90%] h-[90%] object-contain translate-y-[-50%]" />
        </motion.div>
        <motion.div
          initial={{ x: -50 }}
          animate={{ x: 0 }}
          transition={{
            duration: 0.5, 
            ease: "easeOut" 
          }}
          className="absolute w-full h-full z-20 pointer-events-none"
        >
          <Image src="/image/kuro/kuro_hands.png" width={1024} height={1024} alt="Kuro hands" className="z-20 absolute pointer-events-none -top-3 -right-20 w-[90%] h-[90%] object-contain translate-y-[-50%]" />
        </motion.div>
        <Card className="w-full max-w-sm backdrop-blur-lg bg-background/50 z-10 relative">
          <CardHeader>
            <CardTitle className="text-2xl">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent>
            {children}
          </CardContent>
          {footer && (
            <CardFooter className="flex flex-col items-start gap-2">
              {footer}
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
}
