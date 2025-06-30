import React, { useState } from 'react';
import { Mail, Bell, Calendar, Globe, Star, Check } from 'lucide-react';

const sampleCapsules = [
  {
    id: 1,
    title: "The Hidden Stories of Street Art",
    date: "2024-01-25",
    preview: "Discover how street art in Buenos Aires became a voice for political resistance and cultural identity...",
    image: "https://images.pexels.com/photos/1789968/pexels-photo-1789968.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1",
    category: "Visual Arts"
  },
  {
    id: 2,
    title: "Ancient Festivals That Still Shape Modern Celebrations",
    date: "2024-01-24",
    preview: "From Roman Saturnalia to modern Christmas traditions, explore how ancient festivals continue to influence...",
    image: "https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1",
    category: "Cultural History"
  },
  {
    id: 3,
    title: "The Language of Flowers in Victorian Culture",
    date: "2024-01-23",
    preview: "In the Victorian era, flowers spoke volumes. Learn about the intricate language of floriography...",
    image: "https://images.pexels.com/photos/1263986/pexels-photo-1263986.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1",
    category: "Social History"
  }
];

const subscriptionPlans = [
  {
    name: "Daily Digest",
    description: "One cultural fact delivered to your inbox every morning",
    frequency: "Daily",
    price: "Free"
  },
  {
    name: "Weekly Deep Dive",
    description: "Comprehensive cultural stories and analysis every week",
    frequency: "Weekly",
    price: "Free"
  },
  {
    name: "Premium Cultural Insights",
    description: "Exclusive content, early access, and curated collections",
    frequency: "Daily + Weekly",
    price: "$5/month"
  }
];

export default function CultureCapsules() {
  const [email, setEmail] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('Daily Digest');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [preferences, setPreferences] = useState({
    visualArts: false,
    culturalHistory: false,
    socialHistory: false,
    worldCultures: false,
    modernCulture: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubscribed(true);
    console.log('Subscription:', { email, selectedPlan, preferences });
  };

  const togglePreference = (key) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Daily Culture Capsules</h1>
        <p className="text-gray-600">Discover fascinating cultural insights, stories, and facts delivered straight to your inbox.</p>
      </div>

      {/* Recent Capsules Preview */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Capsules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleCapsules.map((capsule) => (
            <div key={capsule.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src={capsule.image}
                alt={capsule.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-mint-600 bg-mint-100 px-2 py-1 rounded-full">
                    {capsule.category}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(capsule.date).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{capsule.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-3">{capsule.preview}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subscription Section */}
      <div className="bg-gradient-to-br from-mint-50 to-lavender-50 rounded-xl p-8 mb-8">
        <div className="text-center mb-8">
          <Mail className="w-12 h-12 text-mint-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Subscribe to Culture Capsules</h2>
          <p className="text-gray-600">Choose your preferred frequency and topics to receive personalized cultural content.</p>
        </div>

        {!isSubscribed ? (
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint-500 focus:border-transparent"
                  placeholder="Enter your email address"
                  required
                />
              </div>
            </div>

            {/* Subscription Plans */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">Choose Your Plan</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {subscriptionPlans.map((plan) => (
                  <div
                    key={plan.name}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      selectedPlan === plan.name
                        ? 'border-mint-500 bg-mint-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedPlan(plan.name)}
                  >
                    <div className="flex items-center mb-2">
                      <div className={`w-4 h-4 rounded-full border-2 mr-2 ${
                        selectedPlan === plan.name
                          ? 'border-mint-500 bg-mint-500'
                          : 'border-gray-300'
                      }`}>
                        {selectedPlan === plan.name && (
                          <div className="w-full h-full rounded-full bg-white scale-50"></div>
                        )}
                      </div>
                      <h3 className="font-semibold text-gray-900">{plan.name}</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{plan.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{plan.frequency}</span>
                      <span className="text-sm font-medium text-mint-600">{plan.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Content Preferences */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">Content Preferences</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.entries({
                  visualArts: 'Visual Arts & Design',
                  culturalHistory: 'Cultural History',
                  socialHistory: 'Social History',
                  worldCultures: 'World Cultures',
                  modernCulture: 'Modern Culture'
                }).map(([key, label]) => (
                  <div
                    key={key}
                    className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => togglePreference(key)}
                  >
                    <div className={`w-5 h-5 border-2 rounded flex items-center justify-center ${
                      preferences[key]
                        ? 'border-mint-500 bg-mint-500'
                        : 'border-gray-300'
                    }`}>
                      {preferences[key] && (
                        <Check className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <span className="text-sm text-gray-700">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <button type="submit" className="btn-primary text-lg px-8 py-4">
                Subscribe to Culture Capsules
              </button>
              <p className="text-xs text-gray-500 mt-2">
                You can unsubscribe at any time. We respect your privacy.
              </p>
            </div>
          </form>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 bg-mint-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Welcome to Culture Capsules!</h3>
            <p className="text-gray-600 mb-4">
              You're subscribed to the <strong>{selectedPlan}</strong> plan. 
              Your first capsule will arrive in your inbox soon.
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Bell className="w-4 h-4 mr-1" />
                <span>Notifications enabled</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span>{subscriptionPlans.find(p => p.name === selectedPlan)?.frequency}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-mint-500 to-mint-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Global Perspectives</h3>
          <p className="text-gray-600">Explore cultural stories from around the world, from ancient traditions to modern movements.</p>
        </div>
        
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-lavender-500 to-lavender-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Star className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Curated Content</h3>
          <p className="text-gray-600">Our cultural experts carefully research and craft each capsule for accuracy and engagement.</p>
        </div>
        
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-peach-500 to-peach-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Regular Discovery</h3>
          <p className="text-gray-600">Never miss a fascinating cultural fact with our consistent delivery schedule.</p>
        </div>
      </div>
    </div>
  );
}