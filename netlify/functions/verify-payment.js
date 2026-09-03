import crypto from 'node:crypto';

export async function handler(event, context) {
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

  const key_secret = process.env.RAZORPAY_KEY_SECRET;
  if (!key_secret) {
    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ error: 'Razorpay Key Secret not configured' })
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

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Missing required fields for signature verification' })
    };
  }

  try {
    const generated_signature = crypto
      .createHmac('sha256', key_secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generated_signature === razorpay_signature) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          status: 'success',
          message: 'Payment verified successfully',
          order_id: razorpay_order_id,
          payment_id: razorpay_payment_id
        })
      };
    } else {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          status: 'failure',
          error: 'Signature mismatch. Payment verification failed.'
        })
      };
    }
  } catch (error) {
    console.error('Error verifying payment signature:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error during verification' })
    };
  }
}
