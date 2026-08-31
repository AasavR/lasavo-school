const crypto = require('crypto');

exports.handler = async function (event) {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
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

  try {
    const key_secret = process.env.RAZORPAY_KEY_SECRET || 'fMyMeroQLQ0JhvN45Ec6H6Y7';

    let body = {};
    if (event.body) {
      try {
        body = JSON.parse(event.body);
      } catch (e) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Invalid JSON payload in request body' })
        };
      }
    }

    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = body;

    // Validate required fields
    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Missing required fields: razorpay_payment_id, razorpay_order_id, and razorpay_signature are required'
        })
      };
    }

    // Generate expected signature: HMAC-SHA256(order_id + "|" + payment_id, KEY_SECRET)
    const generated_signature = crypto
      .createHmac('sha256', key_secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    // Secure timing-safe signature comparison
    let isSignatureValid = false;
    try {
      isSignatureValid = crypto.timingSafeEqual(
        Buffer.from(generated_signature, 'utf-8'),
        Buffer.from(razorpay_signature, 'utf-8')
      );
    } catch (e) {
      isSignatureValid = (generated_signature === razorpay_signature);
    }

    if (isSignatureValid) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Payment signature verified successfully',
          payment_id: razorpay_payment_id,
          order_id: razorpay_order_id
        })
      };
    } else {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Signature verification failed: Invalid payment signature'
        })
      };
    }
  } catch (error) {
    console.error('Razorpay Verify Payment Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: error.message || 'Internal server error during payment verification'
      })
    };
  }
};
