"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import Image from "next/image";


interface AuthCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function AuthCard({ title, description, children, footer }: AuthCardProps) {

  return (
    <div className="min-h-screen max-w-screen overflow-hidden flex justify-center items-center p-8 relative">
      <div className="relative">
      <Image src="/image/kuro/kuro_all.png" width={1024} height={1024} alt="Kuro body" className="absolute pointer-events-none -z-10 -top-3 -right-20 w-[90%] h-[90%] object-contain translate-y-[-50%]" />
      <Image src="/image/kuro/kuro_hands.png" width={1024} height={1024} alt="Kuro hands" className="z-20 absolute pointer-events-none -top-3 -right-20 w-[90%] h-[90%] object-contain translate-y-[-50%]" />
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
