import { setRequestLocale } from "next-intl/server";
import CTA from "./(site)/Cta";
import FAQ from "./(site)/Faq";
import FeaturesSection from "./(site)/FeaturesSection";
import Footer from "./(site)/Footer";
import HeroSection from "./(site)/Hero";
import Navbar from "./(site)/Navbar";
import PricingSection from "./(site)/Pricing";
import TechStack from "./(site)/TechStack";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="bg-background">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <TechStack />
      <PricingSection />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
