import { FC, useRef, useEffect } from 'react';
import { useState } from 'react';
import MetaMaskOnboarding from '@metamask/onboarding';
import Typewriter from 'typewriter-effect';
import Button from '@/libs/ui/Button';
import { useRouter } from 'next/router'
import { useWallet } from '@/libs/wallet';
import styles from './Welcome.module.css';

interface AppGatesProps {
  className?: string;
}

const AppGates: FC<AppGatesProps> = ({ className }) => {
  const { connectToMetaMask, currentAccount } = useWallet();
  const router = useRouter();

  const onboarding = useRef<MetaMaskOnboarding>();

  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);

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
    <Button onClick={onClick} className={className}>
      {message}
      <div className='' />
    </Button>
  )
}

const Welcome: FC<{}> = () => {
  const [isWelcomeMessageShowed, setIsWelcomeMessageShowed] = useState(false);

  const btnClassName = isWelcomeMessageShowed ? `${styles.gates} ${styles.gatesShowed}` : `${styles.gates} ${styles.gatesHidden}`;

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
      <AppGates className={btnClassName} />
    </div>
  )
}

export default Welcome