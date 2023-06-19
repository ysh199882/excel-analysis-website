'use client';

import styles from 'styles/page.module.css';
import ExcelUploader from '../components/ExcelUploader';
import Login from '../components/Auth';
import isLogin from '../helpers/islogin';
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
      <ExcelUploader />
      {/* {isLogin() ? <ExcelUploader /> : <Login />} */}
    </main>
  );
}

export default observer(Home);
