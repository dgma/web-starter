import { FC, useRef, useEffect } from 'react';
import { useState } from 'react';
import MetaMaskOnboarding from '@metamask/onboarding';
import Typewriter from 'typewriter-effect';
import Button from '@/libs/ui/Button';
import { useRouter } from 'next/router'
import { useWallet } from '@/libs/wallet';
import styles from './Welcome.module.css';

interface AppGatesProps {
  isShowed: boolean,
}

const AppGates: FC<AppGatesProps> = ({ isShowed }) => {
  const { connectToMetaMask, currentAccount } = useWallet();
  const router = useRouter();

  const onboarding = useRef<MetaMaskOnboarding>();

  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);

  const btnClassName = isShowed ? `${styles.gates} ${styles.gatesShowed}` : `${styles.gates} ${styles.gatesHidden}`;

  const openApp = () => router.push("/demo");

  const connect = async () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      const account = await connectToMetaMask();
    
      if (account) {
        openApp();
      }
    } else {
      onboarding.current?.startOnboarding();
    }
  }

  const onClick = () => {
    if (currentAccount) {
      openApp();
      return;
    }
    
    connect();
  };
  
  const message = currentAccount ? 'Open Demo App' : 'Connect to MetaMask';

  return (
    <Button onClick={onClick} className={btnClassName}>
      {message}
    </Button>
  )
}

const Welcome: FC<{}> = () => {
  const [isWelcomeMessageShowed, setIsWelcomeMessageShowed] = useState(false);

  return (
    <div className={styles.root}>
      <h1 className={styles.title}>
        <Typewriter
          onInit={(typewriter) => {
            typewriter.typeString('Welcome to Dogma')
              .callFunction(() => {
                setIsWelcomeMessageShowed(true);
              })
              .start();
          }}
          options={{
            delay: 85
          }}
        />
      </h1>
      <AppGates isShowed={isWelcomeMessageShowed}/>
    </div>
  )
}

export default Welcome