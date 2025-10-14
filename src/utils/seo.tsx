// components/SEO.tsx
import Head from "next/head";

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImageUrl?: string;
  ogType?: string;
  twitterHandle?: string;
}

export default function SEO({
  title,
  description,
  canonicalUrl,
  ogImageUrl,
  ogType = "website",
  twitterHandle,
}: SEOProps) {
  return (
    <Head>
      {/* Basic SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:url" content={canonicalUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl} />
      {twitterHandle && (
        <meta name="twitter:site" content={`@${twitterHandle}`} />
      )}
    </Head>
  );
}
