import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { sessionId } = req.body;

  if (!sessionId) {
    return res.status(400).json({ error: "Missing session ID" });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      // Return a simple unlock token — the session ID itself is the proof
      res.status(200).json({
        unlocked: true,
        token: session.id,
        email: session.customer_details?.email || "",
      });
    } else {
      res.status(400).json({ unlocked: false, error: "Payment not completed" });
    }
  } catch (err) {
    console.error("Stripe verify error:", err);
    res.status(500).json({ error: "Failed to verify payment" });
  }
}
