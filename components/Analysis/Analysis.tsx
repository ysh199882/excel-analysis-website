import { useState, useEffect } from 'react';
import { dataStore } from '@/store/sheetData';

export default function Analysis() {
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: dataStore.sheetData[0],
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setAnalysis(data);
      } else {
        console.error('HTTP error', response.status);
      }
    };

    fetchData();
  }, []);

  return <div>{analysis}</div>;
}
