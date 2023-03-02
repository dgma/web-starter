import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '@/styles/main.module.css'
import { Demo } from '@/libs/ui/Demo';
import { useNetworkProvider } from '@/libs/network'
import { useWallet } from '@/libs/wallet';
import SyncLoader from "react-spinners/SyncLoader";
import { toast, ToastContainer } from 'react-toastify';
import { useEffect, useState, useCallback } from 'react';

const targetChainId = '0xb49ca1a';
const reload = () => { window.location.reload(); };

export default function DemoPage() {

  const { provider } = useNetworkProvider();

  const [showLoader, setShowLoader] = useState(true); 

  const [isConnectedToProperNetwork, setIsConnectedToProperNetwork] = useState(true);

  const { walletApp } = useWallet();

  const initChain = useCallback(async () => {
    try {
      const chainID = await provider?.send('eth_chainId', []);
      if (targetChainId !== chainID) {
        setIsConnectedToProperNetwork(false);
      } else {
        setIsConnectedToProperNetwork(true);
      }
    } catch (error) {
      toast.error('Cannot check network');
    } finally {
      return setTimeout(() => {
        setShowLoader(false);
      }, 1000);
    }
  }, [provider])

  useEffect(
    () => {
      let timeout: NodeJS.Timeout;
      initChain().then(timer => { timeout = timer });
      walletApp()?.on('chainChanged', reload);
      return () => { 
        walletApp()?.removeListener('chainChanged', reload); 
        if (timeout) {
          clearTimeout(timeout)
        }
      }
    },
    [walletApp, provider, initChain]
  );
  
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
          showLoader
          ? <div className={styles.overlay}>
              <SyncLoader color={"gray"} />
            </div>
          : <Demo isConnectedToProperNetwork={isConnectedToProperNetwork} />
        }
        <ToastContainer theme="colored"/>
      </main>
    </>
  )
}
