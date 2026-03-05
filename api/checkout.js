import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const PRICE_ID = "price_1T7S9iCbCTfrLA4u0absHM3c";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { discountCode, origin } = req.body;

  try {
    const sessionParams = {
      mode: "payment",
      line_items: [{ price: PRICE_ID, quantity: 1 }],
      success_url: `${origin}/?unlocked=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/`,
      allow_promotion_codes: false,
    };

    // Apply discount code if provided
    if (discountCode && discountCode.trim()) {
      // Look up the promotion code
      const promoCodes = await stripe.promotionCodes.list({
        code: discountCode.trim().toUpperCase(),
        active: true,
        limit: 1,
      });

      if (promoCodes.data.length > 0) {
        sessionParams.discounts = [{ promotion_code: promoCodes.data[0].id }];
      } else {
        return res.status(400).json({ error: "Invalid or expired discount code" });
      }
    }

    const session = await stripe.checkout.sessions.create(sessionParams);
    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
}
