import Razorpay from 'razorpay';

export async function handler(event, context) {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  if (!key_id || !key_secret) {
    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ error: 'Razorpay API keys not configured' })
    };
  }

  let body = {};
  try {
    if (event.body) {
      body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
    }
  } catch (e) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Invalid JSON request body' })
    };
  }

  const amount = Number(body.amount);
  const currency = body.currency || 'INR';
  const receipt = body.receipt || `receipt_${Date.now()}`;

  if (isNaN(amount) || amount < 100) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Minimum amount required is 100 paise (₹1.00)' })
    };
  }

  try {
    const razorpay = new Razorpay({
      key_id: key_id,
      key_secret: key_secret
    });

    const order = await razorpay.orders.create({
      amount: Math.round(amount),
      currency: currency,
      receipt: receipt
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        order_id: order.id,
        amount: order.amount,
        currency: order.currency
      })
    };
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    const statusCode = error.statusCode || 500;
    return {
      statusCode,
      headers,
      body: JSON.stringify({
        error: error.description || error.message || 'Failed to create Razorpay order'
      })
    };
  }
}
