import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useWallet } from '@/libs/wallet';
import { useNetworkProvider } from '@/libs/network';
import Button from '@/libs/ui/Button';
import styles from './DemoSetup.module.css'

const targetChainId = '0xb49ca1a';

interface DemoSetupProps {
  isConnectedToProperNetwork: boolean
}

const DemoSetup: FC<DemoSetupProps> = ({ isConnectedToProperNetwork }) => {

  const { provider } = useNetworkProvider();

  const addNetwork = async () => {
    try {
      await provider?.send(
        'wallet_addEthereumChain',
        [{
          chainId: targetChainId,
          chainName: 'Rabbit network',
          nativeCurrency: {
            name: 'PYGMY',
            symbol: 'PYGMY',
            decimals: 18,
          },
          rpcUrls: ['https://dgma.dev:8443'],
        }]
      );
    } catch (error) {
      toast.error('Adding network was unsuccessful, please refresh page and try again')
    }
  }

  if (!isConnectedToProperNetwork) {
    return (
      <div className={styles.root}>
        <p>
          Insure that you metamask wallet connected to the Rabbit network
        </p>
        <Button onClick={addNetwork} className={styles.addNetwork}>
          Add Rabbit Network
        </Button>
      </div>
    )
  }

  return null;
};

export default DemoSetup;
