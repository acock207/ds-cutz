
import { Client, Environment } from 'square';
import { randomUUID } from 'crypto';

// Initialize Square Client
// Note: In production, ensure these environment variables are set in Vercel
const client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: process.env.SQUARE_ENVIRONMENT === 'production' ? Environment.Production : Environment.Sandbox,
});

const services = [
  { id: 1, title: "Hair Cut 18+", price: 2000 }, // £20.00 in pence
  { id: 2, title: "Hair Cut 17 & under", price: 1500 }, // £15.00
  { id: 3, title: "Shape Up", price: 1000 }, // £10.00
  { id: 4, title: "Hot towel", price: 500 }, // £5.00
  { id: 5, title: "Beard Trim", price: 500 }, // £5.00
  { id: 6, title: "Restart Dreads", price: 2500 } // £25.00
];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
    return;
  }

  try {
    const { sourceId, selectedServiceIds, manualCapture } = req.body;
    
    // Calculate total amount
    let totalAmount = 0n;
    selectedServiceIds.forEach(id => {
      const service = services.find(s => s.id === id);
      if (service) {
        totalAmount += BigInt(service.price);
      }
    });

    // Create a unique idempotency key for this request
    const idempotencyKey = randomUUID();

    const response = await client.paymentsApi.createPayment({
      sourceId: sourceId,
      idempotencyKey: idempotencyKey,
      amountMoney: {
        amount: totalAmount,
        currency: 'GBP',
      },
      autocomplete: !manualCapture, // If manualCapture is true, autocomplete is false (Delayed Capture)
      locationId: process.env.SQUARE_LOCATION_ID,
    });

    if (response.result.payment) {
      res.status(200).json({ 
        success: true, 
        paymentId: response.result.payment.id,
        status: response.result.payment.status 
      });
    } else {
      throw new Error('Payment creation failed');
    }

  } catch (err) {
    console.error(err);
    // Square errors can be complex, try to extract a meaningful message
    let message = err.message;
    if (err.errors && err.errors.length > 0) {
      message = err.errors[0].detail || err.errors[0].code;
    }
    res.status(500).json({ statusCode: 500, message: message });
  }
}
