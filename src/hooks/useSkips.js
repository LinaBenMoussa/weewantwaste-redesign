// hooks/useSkipsByLocation.js
import { useState, useEffect } from 'react';
import { getSkipsByLocation } from '../services/skipApi';

export function useSkipsByLocation(postcode, area = '') {
  const [skips, setSkips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!postcode) return;

    setLoading(true);
    setError(null);

    getSkipsByLocation(postcode, area)
      .then(data => {
        setSkips(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || 'Erreur inconnue');
        setLoading(false);
      });
  }, [postcode, area]);

  return { skips, loading, error };
}
