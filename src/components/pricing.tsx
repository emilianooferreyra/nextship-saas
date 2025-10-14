import CheckoutButton from "@/components/CheckoutButton";
import SEO from "@/utils/seo";

const plans = [
  {
    name: "Basic",
    price: "$9.99/month",
    features: ["Feature 1", "Feature 2"],
    priceId: "price_1234",
  },
  {
    name: "Pro",
    price: "$19.99/month",
    features: ["Feature 1", "Feature 2", "Feature 3"],
    priceId: "price_5678",
  },
];

export default function PricingPage() {
  return (
    <>
      <SEO
        title="My SaaS Boilerplate"
        description="A Next.js TypeScript Prcing page."
        canonicalUrl="https://yourdomain.com"
        ogImageUrl="https://yourdomain.com/og-image.png"
        twitterHandle="yourtwitterhandle"
      />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Choose Your Plan
        </h1>
        <div className="grid md:grid-cols-2 gap-8">
          {plans.map((plan) => (
            <div key={plan.name} className="border rounded-lg p-6 shadow-md">
              <h2 className="text-2xl font-semibold mb-4">{plan.name}</h2>
              <p className="text-xl mb-4">{plan.price}</p>
              <ul className="mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="mb-2">
                    ✓ {feature}
                  </li>
                ))}
              </ul>
              <CheckoutButton priceId={plan.priceId} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
