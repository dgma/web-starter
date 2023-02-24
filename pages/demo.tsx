import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '@/styles/main.module.css'
import { Demo } from '@/libs/ui/Demo';

export default function DemoPage() {
  
  return (
    <>
      <Head>
        <title>Dogma Protocol</title>
        <meta name="description" content="Home for synthetics" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Demo />
      </main>
    </>
  )
}
