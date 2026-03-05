import Stripe from "stripe";

const PRICE_ID = "price_1T7Sw5Lt8E5SgMjKjiyDth1y";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    return res.status(500).json({ error: "Missing STRIPE_SECRET_KEY env var" });
  }

  const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });

  const { discountCode, origin } = req.body;

  try {
    const sessionParams = {
      mode: "payment",
      line_items: [{ price: PRICE_ID, quantity: 1 }],
      success_url: `${origin}/?unlocked=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/`,
    };

    if (discountCode && discountCode.trim()) {
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
    console.error("Stripe error:", err.message);
    res.status(500).json({ error: err.message || "Failed to create checkout session" });
  }
}
