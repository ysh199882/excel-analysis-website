'use client';

import styles from 'styles/page.module.css';
import ExcelUploader from '../components/ExcelUploader';
import { observer } from 'mobx-react';
import { useCallback, useState } from 'react';
import Analysis from '@/components/Analysis';
import { dataStore } from '@/store/sheetData';

function Home() {
  const [isAnalysisVisible, setIsAnalysisVisible] = useState(false);
  const [isReset, setIsReset] = useState(false);

  // 触发分析函数
  const triggerAnalysis = useCallback(() => {
    setIsAnalysisVisible(true);
  }, []);

  const resetData = useCallback(() => {
    setIsReset(true);
    setIsAnalysisVisible(false);
    dataStore.clearSheetData();
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.center}>{/* <div>微信账单GPT分析</div> */}</div>
      <ExcelUploader reset={isReset} onReset={() => setIsReset(false)} />

      {dataStore.sheetData.length !== 0 && (
        <div className={styles.buttons}>
          <button className={styles.resetBtn} onClick={resetData}>
            重新上传
          </button>
          <button className={styles.analyzeBtn} onClick={triggerAnalysis}>
            分析数据
          </button>
        </div>
      )}
      {isAnalysisVisible && <Analysis />}
    </main>
  );
}

export default observer(Home);
