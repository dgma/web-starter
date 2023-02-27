import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { useWallet } from '@/libs/wallet';
import { useNetworkProvider } from '@/libs/network'
import styles from './DemoSetup.module.css'

const targetChainId = '0xb49ca1a';

interface DemoSetupProps {}

const DemoSetup: FC<DemoSetupProps> = ({}) => {

  const [isConnectedToProperNetwork, setIsConnectedToProperNetwork] = useState(true);

  const { provider } = useNetworkProvider();
  const { walletApp } = useWallet()

  const checkNetwork = (chainId: string) => {
    if (targetChainId !== chainId) {
      setIsConnectedToProperNetwork(false);
    } else {
      setIsConnectedToProperNetwork(true);
    }
  }

  useEffect(
    () => {
      provider?.send('eth_chainId', []).then(checkNetwork);
      walletApp()?.on('chainChanged', checkNetwork);
      return () => { 
        walletApp()?.removeListener('chainChanged', checkNetwork); 
      }
    },
    [walletApp, provider]
  )

  if (!isConnectedToProperNetwork) {
    return (
      <div className={styles.root}>
        <div className={styles.network}>
          <p>
            Insure that you metamask wallet connected to the Rabbit network
          </p>
          <p>
            {`To add Rabbit network manually to metamask, open extension and go to 'settings > networks > add network'`}
          </p>
          <div className={styles.networkParams}>
            <p>
              Network params:
            </p>
            <p>
              RPC: https://dgma.dev:8443
            </p>
            <p>
              Chain Id: 189385242
            </p>
            <p>
              Token: PYGMY
            </p>
          </div>
        </div>
      </div>
    )
  }

  return null;
};

export default DemoSetup;
