import React, { useState } from 'react';
import { Upload, Calendar, MapPin, Headphones, Clock, Send, CheckCircle } from 'lucide-react';

export default function CreatorSubmission() {
  const [formData, setFormData] = useState({
    type: 'event',
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: '',
    contactName: '',
    contactEmail: '',
    website: '',
    image: null
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({ ...prev, image: file }));
  };

  if (isSubmitted) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="card text-center">
          <CheckCircle className="w-16 h-16 text-cultural-green-600 mx-auto mb-6" />
          <h1 className="text-3xl font-serif font-bold text-cultural-blue-900 mb-4">
            Submission Received!
          </h1>
          <p className="text-xl text-cultural-blue-700 mb-6">
            Thank you for contributing to CulturaHub. We'll review your submission and get back to you within 48 hours.
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                type: 'event',
                title: '',
                description: '',
                date: '',
                time: '',
                location: '',
                category: '',
                contactName: '',
                contactEmail: '',
                website: '',
                image: null
              });
            }}
            className="btn-primary"
          >
            Submit Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-serif font-bold text-cultural-blue-900 mb-4">Creator Submission</h1>
        <p className="text-xl text-cultural-blue-700">
          Share your cultural events, talks, podcasts, or historical content with our community.
        </p>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Submission Type */}
          <div>
            <label className="block text-lg font-serif font-semibold text-cultural-blue-900 mb-4">
              What would you like to submit?
            </label>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { value: 'event', label: 'Cultural Event', icon: Calendar },
                { value: 'podcast', label: 'Podcast/Audio', icon: Headphones },
                { value: 'timeline', label: 'Historical Content', icon: Clock },
                { value: 'location', label: 'Cultural Location', icon: MapPin }
              ].map((type) => (
                <div
                  key={type.value}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    formData.type === type.value
                      ? 'border-cultural-red-500 bg-cultural-red-50'
                      : 'border-cultural-beige-300 hover:border-cultural-beige-400'
                  }`}
                  onClick={() => handleInputChange('type', type.value)}
                >
                  <type.icon className="w-8 h-8 text-cultural-blue-600 mx-auto mb-2" />
                  <p className="text-center font-medium text-cultural-blue-900">{type.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-cultural-blue-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full p-3 border border-cultural-beige-300 rounded-lg focus:ring-2 focus:ring-cultural-red-500 focus:border-transparent"
                placeholder="Enter title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-cultural-blue-700 mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full p-3 border border-cultural-beige-300 rounded-lg focus:ring-2 focus:ring-cultural-red-500 focus:border-transparent"
              >
                <option value="">Select category</option>
                <option value="exhibition">Art Exhibition</option>
                <option value="workshop">Workshop</option>
                <option value="lecture">Lecture/Talk</option>
                <option value="performance">Performance</option>
                <option value="heritage">Heritage Walk</option>
                <option value="podcast">Podcast</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-cultural-blue-700 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
              className="w-full p-3 border border-cultural-beige-300 rounded-lg focus:ring-2 focus:ring-cultural-red-500 focus:border-transparent"
              placeholder="Provide a detailed description..."
              required
            />
          </div>

          {/* Date and Time (for events) */}
          {formData.type === 'event' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-cultural-blue-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className="w-full p-3 border border-cultural-beige-300 rounded-lg focus:ring-2 focus:ring-cultural-red-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-cultural-blue-700 mb-2">
                  Time
                </label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                  className="w-full p-3 border border-cultural-beige-300 rounded-lg focus:ring-2 focus:ring-cultural-red-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-cultural-blue-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full p-3 border border-cultural-beige-300 rounded-lg focus:ring-2 focus:ring-cultural-red-500 focus:border-transparent"
                  placeholder="Venue or address"
                />
              </div>
            </div>
          )}

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-cultural-blue-700 mb-2">
                Contact Name *
              </label>
              <input
                type="text"
                value={formData.contactName}
                onChange={(e) => handleInputChange('contactName', e.target.value)}
                className="w-full p-3 border border-cultural-beige-300 rounded-lg focus:ring-2 focus:ring-cultural-red-500 focus:border-transparent"
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-cultural-blue-700 mb-2">
                Contact Email *
              </label>
              <input
                type="email"
                value={formData.contactEmail}
                onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                className="w-full p-3 border border-cultural-beige-300 rounded-lg focus:ring-2 focus:ring-cultural-red-500 focus:border-transparent"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          {/* Website */}
          <div>
            <label className="block text-sm font-medium text-cultural-blue-700 mb-2">
              Website or Social Media Link
            </label>
            <input
              type="url"
              value={formData.website}
              onChange={(e) => handleInputChange('website', e.target.value)}
              className="w-full p-3 border border-cultural-beige-300 rounded-lg focus:ring-2 focus:ring-cultural-red-500 focus:border-transparent"
              placeholder="https://..."
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-cultural-blue-700 mb-2">
              Upload Image
            </label>
            <div className="border-2 border-dashed border-cultural-beige-300 rounded-lg p-8 text-center hover:border-cultural-beige-400 transition-colors">
              <Upload className="w-12 h-12 text-cultural-blue-400 mx-auto mb-4" />
              <p className="text-cultural-blue-600 mb-2">
                Drag and drop an image here, or click to select
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="btn-secondary cursor-pointer"
              >
                Choose File
              </label>
              {formData.image && (
                <p className="text-sm text-cultural-green-600 mt-2">
                  Selected: {formData.image.name}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="btn-primary text-lg px-8 py-4 flex items-center space-x-2 mx-auto"
            >
              <Send className="w-5 h-5" />
              <span>Submit for Review</span>
            </button>
            <p className="text-sm text-cultural-blue-600 mt-4">
              We'll review your submission within 48 hours and notify you via email.
            </p>
          </div>
        </form>
      </div>

      {/* Guidelines */}
      <div className="mt-8 card bg-cultural-beige-50">
        <h3 className="text-xl font-serif font-semibold text-cultural-blue-900 mb-4">
          Submission Guidelines
        </h3>
        <ul className="space-y-2 text-cultural-blue-700">
          <li>• Ensure all information is accurate and up-to-date</li>
          <li>• Images should be high-quality and relevant to your submission</li>
          <li>• Provide detailed descriptions to help users understand your content</li>
          <li>• Include contact information for follow-up questions</li>
          <li>• Cultural events should be open to the public or clearly specify audience</li>
        </ul>
      </div>
    </div>
  );
}