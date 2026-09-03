import { useState } from 'react';

export function useRazorpayCheckout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const initiatePayment = async ({
    amount = 1299, // default in INR
    productName = 'Lasavo Pro TWS Wireless Earbuds',
    description = '60H Playtime, 45ms Gaming Latency, Type-C Fast Charge',
    userDetails = {},
    onSuccess,
    onError,
    onDismiss
  }) => {
    setLoading(true);
    setError(null);

    try {
      // 1. Create order on backend (amount in paise)
      const amountInPaise = Math.round(amount * 100);

      const orderRes = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount: amountInPaise,
          currency: 'INR',
          receipt: `rcpt_${Date.now()}`
        })
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok || !orderData.order_id) {
        throw new Error(orderData.error || 'Failed to create Razorpay order');
      }

      // Check if Razorpay Checkout script is loaded
      if (typeof window.Razorpay === 'undefined') {
        throw new Error('Razorpay SDK failed to load. Please check your network connection.');
      }

      const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_TWRYKe5DWcerEE';

      // 2. Setup Razorpay Modal options
      const options = {
        key: razorpayKey,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Lasavo Audio',
        description: `${productName} - ${description}`,
        image: '/lasavo-logo.jpg', // logo fallback if present
        order_id: orderData.order_id,
        handler: async function (response) {
          try {
            setLoading(true);
            // 3. Verify Payment Signature on backend
            const verifyRes = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              })
            });

            const verifyData = await verifyRes.json();

            if (verifyRes.ok && verifyData.status === 'success') {
              setLoading(false);
              if (onSuccess) {
                onSuccess({
                  order_id: response.razorpay_order_id,
                  payment_id: response.razorpay_payment_id,
                  signature: response.razorpay_signature,
                  amount: amount
                });
              }
            } else {
              throw new Error(verifyData.error || 'Payment signature verification failed.');
            }
          } catch (err) {
            setLoading(false);
            const errMsg = err.message || 'Payment verification error';
            setError(errMsg);
            if (onError) onError(errMsg);
          }
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
            if (onDismiss) onDismiss();
          }
        },
        prefill: {
          name: userDetails.name || '',
          email: userDetails.email || '',
          contact: userDetails.phone || ''
        },
        notes: {
          product: productName
        },
        theme: {
          color: '#06b6d4' // Cyan color matching site theme
        }
      };

      const rzp = new window.Razorpay(options);

      rzp.on('payment.failed', function (response) {
        setLoading(false);
        const failureReason = response.error?.description || 'Payment process failed or was cancelled.';
        setError(failureReason);
        if (onError) onError(failureReason);
      });

      rzp.open();
    } catch (err) {
      setLoading(false);
      const errMsg = err.message || 'Payment initialization failed.';
      setError(errMsg);
      if (onError) onError(errMsg);
    }
  };

  return {
    initiatePayment,
    loading,
    error,
    setError
  };
}
