import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Plus, Calendar, Edit, Trash2, Crown, Save } from 'lucide-react';

const mockTimelines = [
  {
    id: 1,
    title: 'History of Jazz in New Orleans',
    description: 'The evolution of jazz music from its birth in New Orleans through the modern era.',
    events: [
      { id: 1, date: '1895', title: 'Birth of Jazz', description: 'Jazz emerges in New Orleans' },
      { id: 2, date: '1917', title: 'First Jazz Recording', description: 'Original Dixieland Jazz Band makes first recording' },
      { id: 3, date: '1920s', title: 'Jazz Age Begins', description: 'Jazz spreads nationwide during the Roaring Twenties' }
    ],
    created: '2024-01-15',
    views: 89
  }
];

export default function Timelines() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('manage');
  const [isCreating, setIsCreating] = useState(false);
  const [editingTimeline, setEditingTimeline] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    events: []
  });
  const [newEvent, setNewEvent] = useState({
    date: '',
    title: '',
    description: ''
  });

  const canCreateNew = user?.plan === 'pro' || mockTimelines.length < 1;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Creating timeline:', formData);
    alert('Timeline created successfully!');
    setFormData({ title: '', description: '', events: [] });
    setIsCreating(false);
    setActiveTab('manage');
  };

  const addEvent = () => {
    if (newEvent.date && newEvent.title) {
      setFormData({
        ...formData,
        events: [...formData.events, { ...newEvent, id: Date.now() }]
      });
      setNewEvent({ date: '', title: '', description: '' });
    }
  };

  const removeEvent = (eventId) => {
    setFormData({
      ...formData,
      events: formData.events.filter(event => event.id !== eventId)
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Timeline Creator</h1>
        <p className="text-gray-600">Create interactive timelines to showcase cultural history and significant events.</p>
      </div>

      {/* Action Buttons */}
      <div className="mb-8 flex justify-between items-center">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('manage')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'manage'
                ? 'bg-mint-100 text-mint-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            My Timelines
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'create'
                ? 'bg-mint-100 text-mint-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Create Timeline
          </button>
        </div>
      </div>

      {activeTab === 'manage' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">My Timelines</h2>
            {canCreateNew && (
              <button 
                onClick={() => setActiveTab('create')}
                className="btn-primary flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Create Timeline</span>
              </button>
            )}
          </div>

          {!canCreateNew && mockTimelines.length >= 1 && (
            <div className="bg-gradient-to-r from-lavender-50 to-sky-50 p-6 rounded-xl border border-lavender-200">
              <div className="flex items-center space-x-3 mb-2">
                <Crown className="w-5 h-5 text-lavender-500" />
                <h3 className="text-lg font-semibold text-gray-900">Upgrade to Create More</h3>
              </div>
              <p className="text-gray-600 mb-4">You've reached the free plan limit of 1 timeline. Upgrade to Pro to create unlimited timelines.</p>
              <button className="btn-primary">Upgrade to Pro - $9/month</button>
            </div>
          )}

          <div className="grid gap-6">
            {mockTimelines.map((timeline) => (
              <div key={timeline.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{timeline.title}</h3>
                    <p className="text-gray-600 mb-4">{timeline.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{timeline.events.length} events</span>
                      <span>{timeline.views} views</span>
                      <span>Created {new Date(timeline.created).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-600 hover:text-mint-600 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-red-600 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Timeline Preview */}
                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-900 mb-3">Timeline Preview</h4>
                  <div className="space-y-3">
                    {timeline.events.slice(0, 3).map((event, index) => (
                      <div key={event.id} className="flex items-start space-x-3">
                        <div className="flex flex-col items-center">
                          <div className="w-3 h-3 bg-mint-500 rounded-full"></div>
                          {index < timeline.events.length - 1 && (
                            <div className="w-0.5 h-8 bg-gray-300 mt-1"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm font-medium text-mint-600">{event.date}</span>
                            <span className="text-sm font-semibold text-gray-900">{event.title}</span>
                          </div>
                          <p className="text-sm text-gray-600">{event.description}</p>
                        </div>
                      </div>
                    ))}
                    {timeline.events.length > 3 && (
                      <div className="text-sm text-gray-500 ml-6">
                        ...and {timeline.events.length - 3} more events
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {mockTimelines.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No timelines yet</h3>
              <p className="text-gray-600 mb-4">Create your first timeline to showcase cultural history.</p>
              <button 
                onClick={() => setActiveTab('create')}
                className="btn-primary"
              >
                Create Timeline
              </button>
            </div>
          )}
        </div>
      )}

      {activeTab === 'create' && (
        <div className="space-y-8">
          {!canCreateNew && (
            <div className="bg-gradient-to-r from-lavender-50 to-sky-50 p-6 rounded-xl border border-lavender-200">
              <div className="flex items-center space-x-3 mb-2">
                <Crown className="w-5 h-5 text-lavender-500" />
                <h3 className="text-lg font-semibold text-gray-900">Upgrade to Create More</h3>
              </div>
              <p className="text-gray-600 mb-4">You've reached the free plan limit of 1 timeline. Upgrade to Pro to create unlimited timelines.</p>
              <button className="btn-primary">Upgrade to Pro - $9/month</button>
            </div>
          )}

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Create New Timeline</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Timeline Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint-500 focus:border-transparent"
                  placeholder="Enter timeline title"
                  required
                  disabled={!canCreateNew}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint-500 focus:border-transparent"
                  placeholder="Describe your timeline"
                  required
                  disabled={!canCreateNew}
                />
              </div>

              {/* Add Events Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Events</h3>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                      <input
                        type="text"
                        value={newEvent.date}
                        onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-mint-500 focus:border-transparent"
                        placeholder="e.g., 1920, June 1945"
                        disabled={!canCreateNew}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
                      <input
                        type="text"
                        value={newEvent.title}
                        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-mint-500 focus:border-transparent"
                        placeholder="Event name"
                        disabled={!canCreateNew}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <input
                        type="text"
                        value={newEvent.description}
                        onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-mint-500 focus:border-transparent"
                        placeholder="Brief description"
                        disabled={!canCreateNew}
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={addEvent}
                    disabled={!canCreateNew}
                    className={`btn-secondary ${!canCreateNew ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Add Event
                  </button>
                </div>

                {/* Events List */}
                {formData.events.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Timeline Events</h4>
                    {formData.events.map((event, index) => (
                      <div key={event.id} className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg">
                        <div className="flex flex-col items-center">
                          <div className="w-3 h-3 bg-mint-500 rounded-full"></div>
                          {index < formData.events.length - 1 && (
                            <div className="w-0.5 h-8 bg-gray-300 mt-1"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm font-medium text-mint-600">{event.date}</span>
                            <span className="text-sm font-semibold text-gray-900">{event.title}</span>
                          </div>
                          <p className="text-sm text-gray-600">{event.description}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeEvent(event.id)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                          disabled={!canCreateNew}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setActiveTab('manage')}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!canCreateNew}
                  className={`btn-primary flex items-center space-x-2 ${!canCreateNew ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <Save className="w-4 h-4" />
                  <span>Create Timeline</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}