import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import type React from "react";
import { StructuredData } from "@/components/structured-data";
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
        "The most complete Next.js 16 SaaS boilerplate with authentication, payments, database, and enterprise security. Ship your SaaS in hours, not weeks.",
    },
    es: {
      title: "NextShip - Lanza tu SaaS en Horas",
      description:
        "El boilerplate de SaaS más completo para Next.js 16 con autenticación, pagos, base de datos y seguridad empresarial. Lanza tu SaaS en horas, no semanas.",
    },
    pt: {
      title: "NextShip - Lance seu SaaS em Horas",
      description:
        "O boilerplate de SaaS mais completo para Next.js 16 com autenticação, pagamentos, banco de dados e segurança empresarial. Lance seu SaaS em horas, não semanas.",
    },
  };

  const { title, description } = translations[locale] || translations.en;
  const baseUrl = "https://nextship-saas.vercel.app";

  return {
    title,
    description,
    keywords: [
      "nextjs",
      "next.js 16",
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
    authors: [{ name: "NextShip Team" }],
    creator: "NextShip",
    metadataBase: new URL(baseUrl),
    openGraph: {
      type: "website",
      locale: locale,
      url: `${baseUrl}/${locale}`,
      title,
      description,
      siteName: "NextShip",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
      creator: "@nextship",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
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
      <StructuredData locale={locale} />
      {children}
    </NextIntlClientProvider>
  );
}
