// Analysis.js
import { useState, useEffect } from 'react';
import { dataStore } from '@/store/sheetData';
import styles from './index.module.scss';

export default function Analysis() {
  const [analysis, setAnalysis] = useState(null);
  const [assistantResponse, setAssistantResponse] = useState('');
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
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
                '你是一位账单流水理财助手，专门分析财务数据并提供深入的信息。',
            },
            {
              role: 'user',
              content: `这是我上个月的财务数据：${JSON.stringify(
                dataStore.sheetData.slice(0, 20)
              )}。请分析并提供一些见解：`,
            },
          ],
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setAnalysis(data);
        if (data.choices && data.choices.length > 0) {
          setAssistantResponse(data.choices[0].message.content);
        }
      } else {
        throw new Error('HTTP error, status = ' + response.status);
      }
    } catch (error) {
      setError('网络错误');
      console.error('Error:网络错误', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <p className={styles.assistantResponse}>{assistantResponse}</p>
      <pre>{analysis ? JSON.stringify(analysis, null, 2) : 'Loading...'}</pre>
    </div>
  );
}
