import Razorpay from 'razorpay';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export interface RazorpayOrderResponse {
  id: string;
  entity: string;
  amount: number;
  amount_paid: string;
  amount_due: string;
  currency: string;
  receipt: string;
  status: string;
  attempts: number;
  notes: string;
  created_at: number;
}

export interface RazorpayOrderRequest {
  amount: number;
  currency: string;
  receipt: string;
  notes?: string;
}

export interface RazorpayPaymentVerificationRequest {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  orderId: number;
}

export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const createRazorpayOrder = async (orderData: RazorpayOrderRequest): Promise<RazorpayOrderResponse> => {
  try {
    const response = await fetch('/api/razorpay/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error('Failed to create Razorpay order');
    }

    return response.json();
  } catch (error) {
    console.error('Backend not available, using fallback order creation:', error);
    // Fallback: Create a mock order for testing
    return {
      id: `order_${Date.now()}`,
      entity: "order",
      amount: orderData.amount * 100, // Convert to paise
      amount_paid: "0",
      amount_due: (orderData.amount * 100).toString(),
      currency: orderData.currency,
      receipt: orderData.receipt,
      status: "created",
      attempts: 0,
      notes: orderData.notes || "",
      created_at: Date.now()
    };
  }
};

export const verifyRazorpayPayment = async (verificationData: RazorpayPaymentVerificationRequest) => {
  console.log('Verifying payment with backend...');
  const response = await fetch('/api/razorpay/verify-payment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(verificationData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Payment verification failed:', response.status, errorText);
    throw new Error(`Payment verification failed: ${response.status} - ${errorText}`);
  }

  const result = await response.json();
  console.log('Payment verification successful:', result);
  return result;
};

export const openRazorpayCheckout = (
  orderId: string,
  amount: number,
  currency: string,
  key: string,
  name: string,
  description: string,
  prefill: {
    name: string;
    email: string;
    contact: string;
  },
  onSuccess: (response: any) => void,
  onError: (error: any) => void
) => {
  const options = {
    key,
    amount: amount * 100, // Convert to paise
    currency,
    name,
    description,
    order_id: orderId,
    prefill,
    theme: {
      color: '#006D77',
    },
    handler: onSuccess,
    modal: {
      ondismiss: () => {
        // Call onError with null to indicate modal dismissal (not a real error)
        onError(null);
      },
    },
    // Add error handler for actual payment failures
    callback_url: undefined, // We handle success in the handler
  };

  try {
    const razorpay = new window.Razorpay(options);
    razorpay.on('payment.failed', (error: any) => {
      // This handles actual payment failures
      console.error('Razorpay payment failed:', error);
      onError(error);
    });
    
    razorpay.open();
  } catch (error) {
    console.error('Failed to initialize Razorpay:', error);
    onError(error);
  }
};
