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

      // Calculate total amount with GST
      const gstAmount = Math.round(amount * 0.18);
      const totalAmount = amount + gstAmount;

      // In a real app, you would call your backend to create an order
      const orderData = {
        amount: totalAmount * 100, // Razorpay expects amount in paise
        currency: 'INR',
        receipt: `culturahub_${Date.now()}`,
      };

      const options = {
        key: 'rzp_test_27oQCfpmWrbGa7', // Your actual test key
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'CulturaHub',
        description: `${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan Subscription`,
        image: 'https://cultura-hub.netlify.app/favicon.ico',
        handler: function (response: any) {
          console.log('Payment successful:', response);
          // In production, verify payment on backend using response.razorpay_payment_id
          onSuccess();
        },
        prefill: {
          name: 'Cultural Explorer',
          email: 'user@culturahub.com',
          contact: '9999999999'
        },
        notes: {
          plan: plan,
          subscription_type: 'monthly',
          website: 'https://cultura-hub.netlify.app'
        },
        theme: {
          color: '#22c55e'
        },
        modal: {
          ondismiss: function() {
            setIsLoading(false);
          }
        },
        retry: {
          enabled: true,
          max_count: 3
        },
        timeout: 300, // 5 minutes
        remember_customer: true
      };

      const razorpay = new window.Razorpay(options);
      
      razorpay.on('payment.failed', function (response: any) {
        console.error('Payment failed:', response.error);
        onError(response.error.description || 'Payment failed. Please try again.');
        setIsLoading(false);
      });

      razorpay.open();
    } catch (error) {
      console.error('Payment error:', error);
      onError('Failed to initialize payment. Please check your internet connection.');
      setIsLoading(false);
    }
  };

  const gstAmount = Math.round(amount * 0.18);
  const totalAmount = amount + gstAmount;

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
          <span className="text-gray-600">₹{gstAmount}</span>
        </div>
        <div className="border-t pt-2 flex justify-between items-center font-semibold">
          <span className="text-gray-900">Total Amount</span>
          <span className="text-lg text-mint-600">₹{totalAmount}</span>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Payment Methods Accepted:</h4>
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
          <div className="flex items-center space-x-1">
            <Check className="w-3 h-3 text-mint-500" />
            <span>UPI (GPay, PhonePe, Paytm)</span>
          </div>
          <div className="flex items-center space-x-1">
            <Check className="w-3 h-3 text-mint-500" />
            <span>Credit/Debit Cards</span>
          </div>
          <div className="flex items-center space-x-1">
            <Check className="w-3 h-3 text-mint-500" />
            <span>Net Banking</span>
          </div>
          <div className="flex items-center space-x-1">
            <Check className="w-3 h-3 text-mint-500" />
            <span>Digital Wallets</span>
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Shield className="w-4 h-4 text-mint-500" />
          <span>Secure 256-bit SSL encryption</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Check className="w-4 h-4 text-mint-500" />
          <span>14-day free trial included</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Check className="w-4 h-4 text-mint-500" />
          <span>Cancel anytime, no questions asked</span>
        </div>
      </div>

      <button
        onClick={handlePayment}
        disabled={isLoading}
        className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed text-lg py-4"
      >
        <Shield className="w-5 h-5" />
        <span>{isLoading ? 'Initializing Payment...' : `Pay ₹${totalAmount} Securely`}</span>
      </button>

      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          🔒 Your payment is secured by Razorpay with bank-level security
        </p>
        <p className="text-xs text-gray-500 mt-1">
          By proceeding, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>

      {/* Test Mode Indicator */}
      <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
          <span className="text-xs font-medium text-yellow-800">Test Mode Active</span>
        </div>
        <p className="text-xs text-yellow-700 mt-1">
          This is a test transaction. Use test card: 4111 1111 1111 1111
        </p>
      </div>
    </div>
  );
}