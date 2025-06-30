import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Calendar, Map, Headphones, Clock, TextSelection as Collection, Crown, Plus } from 'lucide-react';

const tabs = [
  { id: 'overview', label: 'Overview', icon: Calendar },
  { id: 'trails', label: 'My Trails', icon: Map },
  { id: 'audio', label: 'Audio Guides', icon: Headphones },
  { id: 'timelines', label: 'Timelines', icon: Clock },
  { id: 'collections', label: 'Collections', icon: Collection },
];

const mockData = {
  trails: [
    { id: 1, name: 'Historic Downtown', locations: 12, views: 245, created: '2024-01-15' },
    { id: 2, name: 'Art District Walk', locations: 8, views: 189, created: '2024-01-10' },
  ],
  audioGuides: [
    { id: 1, title: 'Museum Tour', duration: '45 min', plays: 156, created: '2024-01-12' },
  ],
  timelines: [
    { id: 1, title: 'City History', events: 25, views: 89, created: '2024-01-08' },
  ],
  collections: [
    { id: 1, name: 'Favorite Events', items: 15, created: '2024-01-20' },
    { id: 2, name: 'Must-Visit Places', items: 8, created: '2024-01-18' },
  ]
};

export default function Dashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Heritage Trails</h3>
                <p className="text-3xl font-bold text-mint-600">{mockData.trails.length}</p>
                <p className="text-sm text-gray-600">Created</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Audio Guides</h3>
                <p className="text-3xl font-bold text-lavender-600">{mockData.audioGuides.length}</p>
                <p className="text-sm text-gray-600">Active</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Timelines</h3>
                <p className="text-3xl font-bold text-peach-600">{mockData.timelines.length}</p>
                <p className="text-sm text-gray-600">Published</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-mint-500 rounded-full"></div>
                  <p className="text-gray-700">Created new heritage trail "Historic Downtown"</p>
                  <span className="text-sm text-gray-500">2 days ago</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-lavender-500 rounded-full"></div>
                  <p className="text-gray-700">Published audio guide "Museum Tour"</p>
                  <span className="text-sm text-gray-500">5 days ago</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-peach-500 rounded-full"></div>
                  <p className="text-gray-700">Updated timeline "City History"</p>
                  <span className="text-sm text-gray-500">1 week ago</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'trails':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">My Heritage Trails</h2>
              <button className="btn-primary flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Create Trail</span>
              </button>
            </div>
            <div className="grid gap-4">
              {mockData.trails.map((trail) => (
                <div key={trail.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{trail.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>{trail.locations} locations</span>
                        <span>{trail.views} views</span>
                        <span>Created {new Date(trail.created).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <button className="text-mint-600 hover:text-mint-700 font-medium">Edit</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'audio':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">My Audio Guides</h2>
              <button className="btn-primary flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Create Guide</span>
              </button>
            </div>
            <div className="grid gap-4">
              {mockData.audioGuides.map((guide) => (
                <div key={guide.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{guide.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>{guide.duration}</span>
                        <span>{guide.plays} plays</span>
                        <span>Created {new Date(guide.created).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <button className="text-lavender-600 hover:text-lavender-700 font-medium">Edit</button>
                  </div>
                </div>
              ))}
              {user.plan === 'free' && mockData.audioGuides.length >= 1 && (
                <div className="bg-gradient-to-r from-peach-50 to-mint-50 p-6 rounded-xl border border-peach-200">
                  <div className="flex items-center space-x-3 mb-2">
                    <Crown className="w-5 h-5 text-peach-500" />
                    <h3 className="text-lg font-semibold text-gray-900">Upgrade to Create More</h3>
                  </div>
                  <p className="text-gray-600 mb-4">You've reached the free plan limit. Upgrade to Pro to create unlimited audio guides.</p>
                  <button className="btn-primary">Upgrade to Pro</button>
                </div>
              )}
            </div>
          </div>
        );

      case 'timelines':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">My Timelines</h2>
              <button className="btn-primary flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Create Timeline</span>
              </button>
            </div>
            <div className="grid gap-4">
              {mockData.timelines.map((timeline) => (
                <div key={timeline.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{timeline.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>{timeline.events} events</span>
                        <span>{timeline.views} views</span>
                        <span>Created {new Date(timeline.created).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <button className="text-peach-600 hover:text-peach-700 font-medium">Edit</button>
                  </div>
                </div>
              ))}
              {user.plan === 'free' && mockData.timelines.length >= 1 && (
                <div className="bg-gradient-to-r from-lavender-50 to-sky-50 p-6 rounded-xl border border-lavender-200">
                  <div className="flex items-center space-x-3 mb-2">
                    <Crown className="w-5 h-5 text-lavender-500" />
                    <h3 className="text-lg font-semibold text-gray-900">Upgrade to Create More</h3>
                  </div>
                  <p className="text-gray-600 mb-4">You've reached the free plan limit. Upgrade to Pro to create unlimited timelines.</p>
                  <button className="btn-primary">Upgrade to Pro</button>
                </div>
              )}
            </div>
          </div>
        );

      case 'collections':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">My Collections</h2>
              {user.plan === 'pro' && (
                <button className="btn-primary flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>New Collection</span>
                </button>
              )}
            </div>
            {user.plan === 'free' ? (
              <div className="bg-gradient-to-r from-mint-50 to-lavender-50 p-8 rounded-xl border border-mint-200 text-center">
                <Crown className="w-12 h-12 text-mint-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Collections Manager</h3>
                <p className="text-gray-600 mb-4">Organize your favorite events, trails, and guides with Pro collections.</p>
                <button className="btn-primary">Upgrade to Pro</button>
              </div>
            ) : (
              <div className="grid gap-4">
                {mockData.collections.map((collection) => (
                  <div key={collection.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{collection.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>{collection.items} items</span>
                          <span>Created {new Date(collection.created).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <button className="text-sky-600 hover:text-sky-700 font-medium">Edit</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}</h1>
            <p className="text-gray-600 mt-1">Manage your cultural content and explore new opportunities.</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              user.plan === 'pro' 
                ? 'bg-peach-100 text-peach-800' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {user.plan === 'pro' ? 'Pro Plan' : 'Free Plan'}
            </span>
            {user.plan === 'pro' && <Crown className="w-5 h-5 text-peach-500" />}
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-64">
          <nav className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === tab.id
                    ? 'bg-mint-100 text-mint-700 border border-mint-200'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="flex-1">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}