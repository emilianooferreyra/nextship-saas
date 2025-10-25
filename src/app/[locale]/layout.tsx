import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import type React from "react";
import { locales } from "@/i18n";

// Generate static params for all locales
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const translations: Record<string, { title: string; description: string }> = {
    en: {
      title: "NextShip - Ship Your SaaS in Hours",
      description:
        "The most complete Next.js 15 SaaS boilerplate with authentication, payments, database, and enterprise security. Ship your SaaS in hours, not weeks.",
    },
    es: {
      title: "NextShip - Lanza tu SaaS en Horas",
      description:
        "El boilerplate de SaaS más completo para Next.js 15 con autenticación, pagos, base de datos y seguridad empresarial. Lanza tu SaaS en horas, no semanas.",
    },
    pt: {
      title: "NextShip - Lance seu SaaS em Horas",
      description:
        "O boilerplate de SaaS mais completo para Next.js 15 com autenticação, pagamentos, banco de dados e segurança empresarial. Lance seu SaaS em horas, não semanas.",
    },
  };

  const { title, description } = translations[locale] || translations.en;

  return {
    title,
    description,
    keywords: [
      "nextjs",
      "next.js 15",
      "saas boilerplate",
      "react 19",
      "nextship",
      "saas starter",
      "stripe",
      "supabase",
      "arcjet",
      "typescript",
      "tailwind",
      "shadcn",
      "open source",
      "mit license",
    ],
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Get messages for the current locale
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
