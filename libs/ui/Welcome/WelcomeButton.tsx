import { useRouter } from 'next/router';
import MetaMaskOnboarding from '@metamask/onboarding';
import { useWallet } from '@/libs/wallet';

import OpenAppButton from './OpenAppButton';
import ConnectToMetaMaskButton from './ConnectToMetaMaskButton';
import InstallMetaMaskButton from './InstallMetaMaskButton';

import styles from './Welcome.module.css';

const WelcomeButton = () => {
  const router = useRouter();
  const { currentAccount } = useWallet();

  // useEffect(() => {
  //   setIsMetaMaskInstalled(MetaMaskOnboarding.isMetaMaskInstalled());
  // }, []);

  const openApp = () => {
    router.push('/demo');
  }

  const btnClassName = `${styles.gates}`;

  if (MetaMaskOnboarding.isMetaMaskInstalled()) {
    return <ConnectToMetaMaskButton className={btnClassName} openApp={openApp} />
  } else if (!currentAccount) {
    return <InstallMetaMaskButton className={btnClassName} />
  } else {
    return <OpenAppButton className={btnClassName} openApp={openApp} />
  } 
}

export default WelcomeButton;
