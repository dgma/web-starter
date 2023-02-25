import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '@/styles/main.module.css'
import { Demo } from '@/libs/ui/Demo';
import { useNetworkProvider } from '@/libs/network'
import SyncLoader from "react-spinners/SyncLoader";

export default function DemoPage() {

  const { isConnectionInProcess } = useNetworkProvider();
  
  return (
    <>
      <Head>
        <title>Dogma Protocol</title>
        <meta name="description" content="Home for synthetics" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {
          isConnectionInProcess 
          ? <div className={styles.overlay}>
              <SyncLoader color={"#037dd6"} />
            </div>
          : <Demo />
        }
      </main>
    </>
  )
}
