'use client';

import Image from 'next/image';
import styles from './page.module.css';
import ExcelUploader from './components/ExcelUploader';
import Login from './components/Auth';
import isLogin from './helpers/islogin';
import { observer } from 'mobx-react';

function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        {/* <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        /> */}
        <div>微信账单GPT分析</div>
      </div>

      {isLogin() ? <ExcelUploader /> : <Login />}
    </main>
  );
}

export default observer(Home);
