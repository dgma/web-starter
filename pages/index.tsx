import Head from 'next/head'
import styles from '@/styles/main.module.css'
import { Welcome } from '@/libs/ui/Welcome';
import { ToastContainer } from 'react-toastify';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Dogma Protocol</title>
        <meta name="description" content="Home for synthetics" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Welcome/>
        <ToastContainer theme="colored"/>
      </main>
    </>
  )
}
