// Analysis.js
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
          messages: [
            {
              role: 'system',
              content:
                '你是一位有帮助的助手，专门分析财务数据并提供深入的信息。',
            },
            {
              role: 'user',
              content:
                'Here is my financial data for the past month: {Your data here}. Could you please analyze it and provide me some insights?',
            },
          ],
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

  return (
    <div>{analysis ? JSON.stringify(analysis, null, 2) : 'Loading...'}</div>
  );
}
