const Razorpay = require('razorpay');

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  try {
    const key_id = process.env.RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    if (!key_id || !key_secret) {
      // Demo fallback order if keys aren't configured in environment
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: 'demo_order_' + Date.now(),
          amount: 10000,
          currency: 'INR'
        })
      };
    }

    const instance = new Razorpay({ key_id, key_secret });

    const order = await instance.orders.create({
      amount: 10000, // ₹100 in paise
      currency: 'INR',
      receipt: `lasavo_school_${Date.now()}`,
      notes: { membership: 'School.lasavo.org Lifetime Access' }
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order)
    };
  } catch (error) {
    console.error('Razorpay Error:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Failed to create Razorpay order' })
    };
  }
};