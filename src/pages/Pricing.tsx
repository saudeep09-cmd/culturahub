import React, { useState } from 'react';
import { Check, Crown, Zap, Star } from 'lucide-react';
import RazorpayPayment from '../components/RazorpayPayment';

const plans = [
  {
    name: 'Free',
    price: 0,
    period: 'forever',
    description: 'Perfect for exploring cultural experiences',
    features: [
      'Access to Explore Events',
      'Browse Heritage Trails',
      'View Grants & Residencies database',
      'Create 1 Timeline',
      'Create 1 Audio Guide',
      'Basic Culture Capsules'
    ],
    limitations: [
      'Limited to 1 timeline',
      'Limited to 1 audio guide',
      'No collection manager',
      'No priority support'
    ],
    popular: false,
    cta: 'Get Started Free'
  },
  {
    name: 'Pro',
    price: 749,
    period: 'per month',
    description: 'Full access for cultural creators and enthusiasts',
    features: [
      'Everything in Free',
      'Unlimited Timelines',
      'Unlimited Audio Guides',
      'Collection Manager',
      'Event Alerts & Notifications',
      'Priority Support',
      'Premium Culture Capsules',
      'Export & Share Features',
      'Advanced Analytics',
      'Early Access to New Features'
    ],
    limitations: [],
    popular: true,
    cta: 'Start Pro Trial'
  }
];

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState('monthly');
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handlePaymentSuccess = () => {
    alert('Payment successful! Welcome to CulturaHub Pro!');
    setShowPayment(false);
    setSelectedPlan(null);
  };

  const handlePaymentError = (error: string) => {
    alert(`Payment failed: ${error}`);
    setShowPayment(false);
  };

  const handleUpgrade = (planName: string) => {
    if (planName === 'Pro') {
      setSelectedPlan(planName);
      setShowPayment(true);
    }
  };

  const getPrice = (plan: typeof plans[0]) => {
    if (plan.name === 'Free') return 0;
    return billingPeriod === 'yearly' ? Math.round(plan.price * 0.8) : plan.price;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Choose Your Cultural Journey
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Start free and upgrade when you're ready to unlock the full potential of cultural exploration.
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex justify-center mb-12">
        <div className="bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setBillingPeriod('monthly')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              billingPeriod === 'monthly'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingPeriod('yearly')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              billingPeriod === 'yearly'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Yearly
            <span className="ml-1 text-xs bg-mint-100 text-mint-600 px-2 py-1 rounded-full">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* Payment Modal */}
      {showPayment && selectedPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Complete Your Purchase</h2>
              <button
                onClick={() => setShowPayment(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <RazorpayPayment
              plan="pro"
              amount={getPrice(plans[1])}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />
          </div>
        </div>
      )}

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative bg-white rounded-2xl shadow-lg border-2 p-8 ${
              plan.popular
                ? 'border-mint-500 ring-2 ring-mint-200'
                : 'border-gray-200'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-mint-500 to-lavender-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-1">
                  <Star className="w-4 h-4" />
                  <span>Most Popular</span>
                </div>
              </div>
            )}

            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                {plan.name === 'Free' ? (
                  <Zap className="w-8 h-8 text-mint-500" />
                ) : (
                  <Crown className="w-8 h-8 text-peach-500" />
                )}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <p className="text-gray-600 mb-4">{plan.description}</p>
              <div className="flex items-baseline justify-center">
                <span className="text-4xl font-bold text-gray-900">
                  ₹{getPrice(plan)}
                </span>
                <span className="text-gray-500 ml-1">
                  {plan.name === 'Free' ? '' : billingPeriod === 'yearly' ? '/month' : plan.period}
                </span>
              </div>
              {billingPeriod === 'yearly' && plan.name === 'Pro' && (
                <p className="text-sm text-mint-600 mt-1">Billed annually (₹{getPrice(plan) * 12}/year)</p>
              )}
            </div>

            <div className="space-y-4 mb-8">
              <h4 className="font-semibold text-gray-900">What's included:</h4>
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-mint-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => handleUpgrade(plan.name)}
              className={`w-full py-3 px-6 rounded-lg font-semibold text-center transition-colors ${
                plan.popular
                  ? 'bg-gradient-to-r from-mint-500 to-lavender-500 text-white hover:from-mint-600 hover:to-lavender-600 transform hover:scale-105 shadow-lg'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}
            >
              {plan.cta}
            </button>

            {plan.name === 'Pro' && (
              <p className="text-xs text-gray-500 text-center mt-2">
                14-day free trial • Cancel anytime
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Feature Comparison */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Feature Comparison</h3>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Feature</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">Free</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">Pro</th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                {[
                  { feature: 'Explore Events', free: true, pro: true },
                  { feature: 'Heritage Trails', free: true, pro: true },
                  { feature: 'Grants Database', free: true, pro: true },
                  { feature: 'Timelines', free: '1', pro: 'Unlimited' },
                  { feature: 'Audio Guides', free: '1', pro: 'Unlimited' },
                  { feature: 'Collection Manager', free: false, pro: true },
                  { feature: 'Event Alerts', free: false, pro: true },
                  { feature: 'Priority Support', free: false, pro: true },
                  { feature: 'Analytics', free: false, pro: true },
                  { feature: 'Export Features', free: false, pro: true }
                ].map((row, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-3 px-4 text-gray-700">{row.feature}</td>
                    <td className="py-3 px-4 text-center">
                      {typeof row.free === 'boolean' ? (
                        row.free ? (
                          <Check className="w-5 h-5 text-mint-500 mx-auto" />
                        ) : (
                          <span className="text-gray-400">-</span>
                        )
                      ) : (
                        <span className="text-gray-700">{row.free}</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {typeof row.pro === 'boolean' ? (
                        row.pro ? (
                          <Check className="w-5 h-5 text-mint-500 mx-auto" />
                        ) : (
                          <span className="text-gray-400">-</span>
                        )
                      ) : (
                        <span className="text-gray-700">{row.pro}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-6">
          {[
            {
              question: "Can I upgrade or downgrade my plan anytime?",
              answer: "Yes! You can upgrade to Pro at any time. If you downgrade, you'll retain Pro features until the end of your billing period."
            },
            {
              question: "What payment methods do you accept?",
              answer: "We accept all major credit cards, debit cards, UPI, net banking, and digital wallets through our secure Razorpay integration."
            },
            {
              question: "Is there a free trial for the Pro plan?",
              answer: "Yes! We offer a 14-day free trial for the Pro plan. No payment required to start your trial."
            },
            {
              question: "Can I cancel my subscription anytime?",
              answer: "Absolutely. You can cancel your subscription at any time from your account settings. There are no cancellation fees."
            },
            {
              question: "Is my payment information secure?",
              answer: "Yes, all payments are processed through Razorpay with bank-level security and 256-bit SSL encryption."
            }
          ].map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}