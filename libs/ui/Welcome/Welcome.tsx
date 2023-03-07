import { FC } from 'react';
import { useState } from 'react';
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

  const btnClassName = isShowed ? `${styles.gates} ${styles.gatesShowed}` : `${styles.gates} ${styles.gatesHidden}`;

  const openApp = () => router.push("/demo");

  const connect = async () => {
    const account = await connectToMetaMask();
    if (account) {
      openApp();
    }
  }

  const onGate = currentAccount ? openApp : connect;
  const gateMessage = currentAccount ? 'Open Demo App' : 'Connect to MetaMask';

  return (
    <Button onClick={onGate} className={btnClassName}>
      {gateMessage}
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
      {/* <AppGates isShowed={isWelcomeMessageShowed}/> */}
      Site under maintenance, will be open 8 March 00:00
    </div>
  )
}

export default Welcome