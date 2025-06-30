import { useState, useEffect } from 'react';
import { fetchWikipediaArticle, getRandomCulturalFact, WikipediaArticle } from '../services/api';

export const useWikipediaArticle = (title: string | null) => {
  const [article, setArticle] = useState<WikipediaArticle | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!title) return;

    const loadArticle = async () => {
      try {
        setLoading(true);
        setError(null);
        const articleData = await fetchWikipediaArticle(title);
        setArticle(articleData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load article');
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [title]);

  return { article, loading, error };
};

export const useRandomCulturalFact = () => {
  const [fact, setFact] = useState<WikipediaArticle | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNewFact = async () => {
    try {
      setLoading(true);
      setError(null);
      const factData = await getRandomCulturalFact();
      setFact(factData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load cultural fact');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewFact();
  }, []);

  return { fact, loading, error, fetchNewFact };
};