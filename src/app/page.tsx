'use client';

import Image from 'next/image';
import styles from './page.module.css';
import ExcelUploader from './components/ExcelUploader';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>
      <div>微信账单GPT分析</div>
      <ExcelUploader />
    </main>
  );
}
