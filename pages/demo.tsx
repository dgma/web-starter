import Head from 'next/head'
import styles from '@/styles/main.module.css'
import { Demo } from '@/libs/ui/Demo';
import SyncLoader from "react-spinners/SyncLoader";
import { ToastContainer } from 'react-toastify';
import { useApp } from '@/libs/context/app';

export default function DemoPage() {

  const {showLoader, vaultOpened} = useApp();
  
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
          showLoader || vaultOpened === undefined
          ? <div className={styles.overlay}>
              <SyncLoader color={"gray"} />
            </div>
          : <Demo />
        }
        <ToastContainer theme="colored"/>
      </main>
    </>
  )
}
