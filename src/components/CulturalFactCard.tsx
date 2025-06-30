import React from 'react';
import { BookOpen, RefreshCw } from 'lucide-react';
import { WikipediaArticle } from '../services/api';

interface CulturalFactCardProps {
  fact: WikipediaArticle | null;
  loading: boolean;
  onRefresh: () => void;
}

export default function CulturalFactCard({ fact, loading, onRefresh }: CulturalFactCardProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            <div className="h-3 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!fact) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
        <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">No cultural fact available</p>
        <button onClick={onRefresh} className="btn-primary mt-4">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-lavender-50 to-mint-50 rounded-xl shadow-sm border border-lavender-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <BookOpen className="w-5 h-5 text-lavender-600" />
          <h3 className="text-lg font-semibold text-gray-900">Cultural Insight</h3>
        </div>
        <button
          onClick={onRefresh}
          className="p-2 text-lavender-600 hover:text-lavender-700 hover:bg-lavender-100 rounded-lg transition-colors"
          title="Get new fact"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>
      
      <div className="flex items-start space-x-4">
        {fact.thumbnail && (
          <img
            src={fact.thumbnail.source}
            alt={fact.title}
            className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
          />
        )}
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 mb-2">{fact.title}</h4>
          <p className="text-gray-700 text-sm leading-relaxed line-clamp-4">
            {fact.extract}
          </p>
          <a
            href={`https://en.wikipedia.org/wiki/${encodeURIComponent(fact.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-lavender-600 hover:text-lavender-700 mt-2"
          >
            Read more on Wikipedia
            <BookOpen className="w-3 h-3 ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
}