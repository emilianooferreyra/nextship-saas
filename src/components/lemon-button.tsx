// app/checkout/page.tsx
"use client";

import { createCheckout } from "@/utils/lemon";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);

  useEffect(() => {
    const initiateCheckout = async () => {
      const variantId = "your_variant_id_here"; // Replace with actual variant ID
      const redirectUrl = `${window.location.origin}/success`; // Redirect URL after successful payment
      const checkout = await createCheckout(variantId, redirectUrl);
      setCheckoutUrl(checkout.data.attributes.url);
    };

    initiateCheckout();
  }, []);

  if (!checkoutUrl) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <a href={checkoutUrl} target="_blank" rel="noopener noreferrer">
        Proceed to Checkout
      </a>
    </div>
  );
}
