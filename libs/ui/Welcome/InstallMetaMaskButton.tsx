import { useEffect, useRef } from 'react';
import type { FC } from 'react';
import Button from '@/libs/ui/Button';
import MetaMaskOnboarding from '@metamask/onboarding';

interface ConnecctToMetaMaskButtonProps {
  className?: string;
}

const InstallMetaMaskButton: FC<ConnecctToMetaMaskButtonProps> = ({ className }) => {
  const onboarding = useRef<MetaMaskOnboarding>();

  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);

  const onClick = () => {
    onboarding.current?.startOnboarding();
  };

  return (
    <Button onClick={onClick} className={className}>
      Install MetaMask
    </Button>
  );
};

export default InstallMetaMaskButton;
