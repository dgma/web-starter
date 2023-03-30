import type { FC } from 'react';
import Button from '@/libs/ui/Button';

import styles from './InstallMetaMaskButton.module.css';

interface ConnecctToMetaMaskButtonProps {
  className?: string;
  startOnboarding: () => void;
}

const InstallMetaMaskButton: FC<ConnecctToMetaMaskButtonProps> = ({ className, startOnboarding }) => {
  const onClick = () => {
    startOnboarding();
  };

  return (
    <div className={`${className} ${styles.root}`}>
      <p>You need to install MetaMask before start using Dogma</p>
      <Button onClick={onClick}>
        Install MetaMask
      </Button>
    </div>
  );
};

export default InstallMetaMaskButton;