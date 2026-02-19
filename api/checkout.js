
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const services = [
  { id: 1, title: "Hair Cut 18+", price: 2000 }, // £20.00 in pence
  { id: 2, title: "Hair Cut 17 & under", price: 1500 }, // £15.00
  { id: 3, title: "Shape Up", price: 1000 }, // £10.00
  { id: 4, title: "Hot towel", price: 500 }, // £5.00
  { id: 5, title: "Beard Trim", price: 1000 } // £10.00
];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
    return;
  }

  try {
    const { selectedServiceIds } = req.body;
    
    // Calculate line items based on secure server-side prices
    const line_items = selectedServiceIds.map(id => {
      const service = services.find(s => s.id === id);
      if (!service) throw new Error(`Invalid service ID: ${id}`);
      return {
        price_data: {
          currency: 'gbp',
          product_data: {
            name: service.title,
          },
          unit_amount: service.price,
        },
        quantity: 1,
      };
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      payment_intent_data: {
        capture_method: 'manual', // Auth-only (Pre-authorization)
      },
      success_url: `${req.headers.origin}/?status=success`,
      cancel_url: `${req.headers.origin}/?status=cancel`,
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
}
