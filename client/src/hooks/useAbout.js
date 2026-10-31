import { useState, useEffect } from 'react';
import api from '../utils/api';

export const useAbout = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await api.getAbout();
        setAboutData(response);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching about data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  return { aboutData, loading, error };
};