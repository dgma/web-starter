import type { FC } from 'react';
import { useRouter } from 'next/router';
import MetaMaskOnboarding from '@metamask/onboarding';

import OpenAppButton from './OpenAppButton';
import ConnectToMetaMaskButton from './ConnectToMetaMaskButton';
import InstallMetaMaskButton from './InstallMetaMaskButton';

import styles from './Welcome.module.css';

interface WelcomeButtonProps {
  currentAccount?: string;
  startOnboarding: () => void;
  show: boolean
}

const WelcomeButton: FC<WelcomeButtonProps> = ({ currentAccount, startOnboarding, show }) => {
  const router = useRouter();

  const openApp = () => {
    router.push('/demo');
  }

  const btnClassName = show ? `${styles.welcomeButton}` : styles.hiddenBtn;

  if (MetaMaskOnboarding.isMetaMaskInstalled()) {
    if (!currentAccount) {
      return <ConnectToMetaMaskButton className={btnClassName} openApp={openApp} />
    } else {
      return <OpenAppButton className={btnClassName} openApp={openApp} />
    }
  } else {
    return <InstallMetaMaskButton className={btnClassName} startOnboarding={startOnboarding} />
  }
}

export default WelcomeButton;
