import 'styles/globals.css';

import { AppProps } from 'next/app';

export const metadata = {
  title: 'GPT分析账单',
  description: 'GPT分析账单',
};

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
