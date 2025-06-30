import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Upload, Mic, MapPin, Play, Pause, Volume2, Save, Crown, Plus } from 'lucide-react';

const mockAudioGuides = [
  {
    id: 1,
    title: 'Historic Library Tour',
    location: 'Central Library',
    duration: '12:45',
    plays: 89,
    created: '2024-01-15'
  },
  {
    id: 2,
    title: 'Art Gallery Walk',
    location: 'Modern Art Museum',
    duration: '18:30',
    plays: 156,
    created: '2024-01-10'
  }
];

export default function AudioGuide() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('create');
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentGuide, setCurrentGuide] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    audioFile: null,
    coordinates: { lat: '', lng: '' }
  });

  const canCreateNew = user?.plan === 'pro' || mockAudioGuides.length < 1;

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('audio/')) {
      setFormData({ ...formData, audioFile: file });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Creating audio guide:', formData);
    // Here you would typically save to backend
    alert('Audio guide created successfully!');
    setFormData({
      title: '',
      description: '',
      location: '',
      audioFile: null,
      coordinates: { lat: '', lng: '' }
    });
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Here you would implement actual recording functionality
  };

  const togglePlayback = (guide) => {
    if (currentGuide?.id === guide.id && isPlaying) {
      setIsPlaying(false);
    } else {
      setCurrentGuide(guide);
      setIsPlaying(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Audio Guide Creator</h1>
        <p className="text-gray-600">Create immersive audio experiences for locations, museums, and cultural sites.</p>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('create')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'create'
                  ? 'border-mint-500 text-mint-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Create Guide
            </button>
            <button
              onClick={() => setActiveTab('manage')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'manage'
                  ? 'border-mint-500 text-mint-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              My Guides
            </button>
          </nav>
        </div>
      </div>

      {activeTab === 'create' && (
        <div className="space-y-8">
          {!canCreateNew && (
            <div className="bg-gradient-to-r from-peach-50 to-mint-50 p-6 rounded-xl border border-peach-200">
              <div className="flex items-center space-x-3 mb-2">
                <Crown className="w-5 h-5 text-peach-500" />
                <h3 className="text-lg font-semibold text-gray-900">Upgrade to Create More</h3>
              </div>
              <p className="text-gray-600 mb-4">You've reached the free plan limit of 1 audio guide. Upgrade to Pro to create unlimited guides.</p>
              <button className="btn-primary">Upgrade to Pro - $9/month</button>
            </div>
          )}

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Create New Audio Guide</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint-500 focus:border-transparent"
                    placeholder="Enter guide title"
                    required
                    disabled={!canCreateNew}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint-500 focus:border-transparent"
                      placeholder="Enter location"
                      required
                      disabled={!canCreateNew}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint-500 focus:border-transparent"
                  placeholder="Describe your audio guide"
                  disabled={!canCreateNew}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Latitude</label>
                  <input
                    type="number"
                    step="any"
                    value={formData.coordinates.lat}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      coordinates: { ...formData.coordinates, lat: e.target.value }
                    })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint-500 focus:border-transparent"
                    placeholder="40.7128"
                    disabled={!canCreateNew}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Longitude</label>
                  <input
                    type="number"
                    step="any"
                    value={formData.coordinates.lng}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      coordinates: { ...formData.coordinates, lng: e.target.value }
                    })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint-500 focus:border-transparent"
                    placeholder="-74.0060"
                    disabled={!canCreateNew}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Audio Recording</label>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <button
                      type="button"
                      onClick={toggleRecording}
                      disabled={!canCreateNew}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                        isRecording
                          ? 'bg-red-500 text-white hover:bg-red-600'
                          : 'bg-mint-500 text-white hover:bg-mint-600'
                      } ${!canCreateNew ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <Mic className="w-4 h-4" />
                      <span>{isRecording ? 'Stop Recording' : 'Start Recording'}</span>
                    </button>
                    
                    <span className="text-gray-500">or</span>
                    
                    <label className={`flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${!canCreateNew ? 'opacity-50 cursor-not-allowed' : ''}`}>
                      <Upload className="w-4 h-4" />
                      <span>Upload Audio File</span>
                      <input
                        type="file"
                        accept="audio/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        disabled={!canCreateNew}
                      />
                    </label>
                  </div>
                  
                  {formData.audioFile && (
                    <div className="flex items-center space-x-2 p-3 bg-mint-50 rounded-lg">
                      <Volume2 className="w-4 h-4 text-mint-600" />
                      <span className="text-sm text-mint-700">{formData.audioFile.name}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!canCreateNew}
                  className={`btn-primary flex items-center space-x-2 ${!canCreateNew ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <Save className="w-4 h-4" />
                  <span>Create Audio Guide</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {activeTab === 'manage' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">My Audio Guides</h2>
            {canCreateNew && (
              <button 
                onClick={() => setActiveTab('create')}
                className="btn-primary flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Create New</span>
              </button>
            )}
          </div>

          <div className="grid gap-4">
            {mockAudioGuides.map((guide) => (
              <div key={guide.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{guide.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {guide.location}
                      </span>
                      <span>{guide.duration}</span>
                      <span>{guide.plays} plays</span>
                    </div>
                    <p className="text-xs text-gray-500">Created {new Date(guide.created).toLocaleDateString()}</p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => togglePlayback(guide)}
                      className="flex items-center space-x-2 px-4 py-2 bg-mint-100 text-mint-600 rounded-lg hover:bg-mint-200 transition-colors"
                    >
                      {currentGuide?.id === guide.id && isPlaying ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                      <span>{currentGuide?.id === guide.id && isPlaying ? 'Pause' : 'Play'}</span>
                    </button>
                    <button className="text-gray-600 hover:text-gray-800 transition-colors">
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {mockAudioGuides.length === 0 && (
            <div className="text-center py-12">
              <Mic className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No audio guides yet</h3>
              <p className="text-gray-600 mb-4">Create your first audio guide to get started.</p>
              <button 
                onClick={() => setActiveTab('create')}
                className="btn-primary"
              >
                Create Audio Guide
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}