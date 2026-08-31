const Razorpay = require('razorpay');

exports.handler = async function (event) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const key_id = process.env.RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    if (!key_id || !key_secret) {
      return {
        statusCode: 401,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'Authentication failure: Razorpay API credentials missing in server environment' })
      };
    }

    let body = {};
    if (event.body) {
      try {
        body = JSON.parse(event.body);
      } catch (e) {
        return {
          statusCode: 400,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
          body: JSON.stringify({ error: 'Invalid JSON payload' })
        };
      }
    }

    // Default amount to 4000000 paise (₹40,000) if not specified, or parse amount
    const rawAmount = body.amount !== undefined ? parseInt(body.amount, 10) : 4000000;

    // Validate minimum amount (must be >= 100 paise)
    if (isNaN(rawAmount) || rawAmount < 100) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'Invalid amount: Minimum required order amount is 100 paise (₹1.00)' })
      };
    }

    const currency = body.currency || 'INR';
    const receipt = body.receipt || `receipt_${Date.now()}`;
    const notes = body.notes || { platform: 'School.lasavo.org', item: 'EdTech 1-Year Pass' };

    const instance = new Razorpay({ key_id, key_secret });

    const order = await instance.orders.create({
      amount: rawAmount,
      currency: currency,
      receipt: receipt,
      notes: notes
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({
        id: order.id,
        order_id: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt,
        status: order.status
      })
    };
  } catch (error) {
    console.error('Razorpay Create Order Error:', error);
    const statusCode = error.statusCode || 500;
    return {
      statusCode: statusCode,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        error: error.description || error.message || 'Failed to create Razorpay order'
      })
    };
  }
};
