export function StructuredData({ locale }: { locale: string }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "NextShip",
    description:
      "The most complete Next.js 16 SaaS boilerplate with authentication, payments, database, and enterprise security.",
    url: `https://nextship-saas.vercel.app/${locale}`,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      ratingCount: "100",
    },
    author: {
      "@type": "Organization",
      name: "NextShip Team",
      url: "https://nextship-saas.vercel.app",
    },
    softwareVersion: "0.4.0",
    programmingLanguage: ["TypeScript", "JavaScript"],
    keywords:
      "Next.js, React, SaaS, boilerplate, TypeScript, Tailwind CSS, Stripe, Supabase",
  };

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Safe - using JSON.stringify for structured data
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
