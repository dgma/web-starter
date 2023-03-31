import '@/styles/globals.css';
import type { AppProps } from 'next/app';

import { AppProvider } from '@/libs/context/app';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  )
}
