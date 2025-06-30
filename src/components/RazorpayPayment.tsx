import React, { useState } from 'react';
import { CreditCard, Shield, Check } from 'lucide-react';

interface RazorpayPaymentProps {
  plan: 'pro';
  amount: number;
  onSuccess: () => void;
  onError: (error: string) => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function RazorpayPayment({ plan, amount, onSuccess, onError }: RazorpayPaymentProps) {
  const [isLoading, setIsLoading] = useState(false);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setIsLoading(true);
    
    try {
      const scriptLoaded = await loadRazorpayScript();
      
      if (!scriptLoaded) {
        throw new Error('Razorpay SDK failed to load');
      }

      // In a real app, you would call your backend to create an order
      const orderData = {
        amount: amount * 100, // Razorpay expects amount in paise
        currency: 'INR',
        receipt: `receipt_${Date.now()}`,
      };

      const options = {
        key: 'rzp_test_1234567890', // Replace with your Razorpay key ID
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'CulturaHub',
        description: `${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan Subscription`,
        image: '/favicon.ico',
        handler: function (response: any) {
          console.log('Payment successful:', response);
          onSuccess();
        },
        prefill: {
          name: 'Cultural Explorer',
          email: 'user@culturahub.com',
          contact: '9999999999'
        },
        notes: {
          plan: plan,
          subscription_type: 'monthly'
        },
        theme: {
          color: '#22c55e'
        },
        modal: {
          ondismiss: function() {
            setIsLoading(false);
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on('payment.failed', function (response: any) {
        console.error('Payment failed:', response.error);
        onError(response.error.description || 'Payment failed');
        setIsLoading(false);
      });

      razorpay.open();
    } catch (error) {
      console.error('Payment error:', error);
      onError('Failed to initialize payment');
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-mint-500 to-lavender-500 rounded-lg flex items-center justify-center">
          <CreditCard className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Secure Payment</h3>
          <p className="text-sm text-gray-600">Powered by Razorpay</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-700">Pro Plan (Monthly)</span>
          <span className="font-semibold text-gray-900">₹{amount}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">GST (18%)</span>
          <span className="text-gray-600">₹{Math.round(amount * 0.18)}</span>
        </div>
        <div className="border-t pt-2 flex justify-between items-center font-semibold">
          <span className="text-gray-900">Total</span>
          <span className="text-gray-900">₹{Math.round(amount * 1.18)}</span>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Check className="w-4 h-4 text-mint-500" />
          <span>Secure 256-bit SSL encryption</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Check className="w-4 h-4 text-mint-500" />
          <span>14-day free trial included</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Check className="w-4 h-4 text-mint-500" />
          <span>Cancel anytime</span>
        </div>
      </div>

      <button
        onClick={handlePayment}
        disabled={isLoading}
        className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Shield className="w-4 h-4" />
        <span>{isLoading ? 'Processing...' : `Pay ₹${Math.round(amount * 1.18)}`}</span>
      </button>

      <p className="text-xs text-gray-500 text-center mt-3">
        By proceeding, you agree to our Terms of Service and Privacy Policy
      </p>
    </div>
  );
}