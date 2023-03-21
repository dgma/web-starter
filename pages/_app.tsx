import '@/styles/globals.css';
import pkg from 'package.json';
import type { AppProps } from 'next/app'

import { AppProvider } from '@/libs/context/app';
import 'react-toastify/dist/ReactToastify.css';

console.log('version:', pkg.version);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  )
}
