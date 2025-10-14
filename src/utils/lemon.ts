import axios from "axios";

const LEMON_SQUEEZY_API_KEY = process.env.LEMON_SQUEEZY_API_KEY;
const LEMON_SQUEEZY_STORE_ID = process.env.LEMON_SQUEEZY_STORE_ID;

const lemonSqueezyClient = axios.create({
  baseURL: "https://api.lemonsqueezy.com/v1",
  headers: {
    Authorization: `Bearer ${LEMON_SQUEEZY_API_KEY}`,
  },
});

export const createCheckout = async (
  variantId: string,
  redirectUrl: string
) => {
  const response = await lemonSqueezyClient.post("/checkouts", {
    data: {
      type: "checkouts",
      attributes: {
        checkout_data: {
          custom: {
            user_id: "123", // Replace with actual user ID
          },
        },
        product_options: {
          redirect_url: redirectUrl,
        },
      },
      relationships: {
        store: {
          data: {
            type: "stores",
            id: LEMON_SQUEEZY_STORE_ID,
          },
        },
        variant: {
          data: {
            type: "variants",
            id: variantId,
          },
        },
      },
    },
  });

  return response.data;
};

export const handleWebhook = async (payload: any) => {
  // Handle webhook payload here
  console.log("Webhook received:", payload);
};
