const Razorpay = require('razorpay');

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const key_id = process.env.RAZORPAY_KEY_ID || 'rzp_test_TWRYKe5DWcerEE';
    const key_secret = process.env.RAZORPAY_KEY_SECRET || 'fMyMeroQLQ0JhvN45Ec6H6Y7';

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

    const rawAmount = body.amount !== undefined ? parseInt(body.amount, 10) : 10000;

    if (isNaN(rawAmount) || rawAmount < 100) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'Invalid amount: Minimum required order amount is 100 paise (₹1.00)' })
      };
    }

    const currency = body.currency || 'INR';
    const receipt = body.receipt || `p2ppro_${Date.now()}`;
    const notes = body.notes || { platform: 'P2PPro.me RWA Protocol', item: 'RWA Asset Token' };

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
