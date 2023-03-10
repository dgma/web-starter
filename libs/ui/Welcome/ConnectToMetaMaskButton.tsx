import type { FC } from 'react';
import { useApp } from '@/libs/context/app';
import Button from '@/libs/ui/Button';

interface ConnecctToMetaMaskButtonProps {
  className?: string;
  openApp: () => void;
}

const ConnectToMetaMaskButton: FC<ConnecctToMetaMaskButtonProps> = ({ className, openApp }) => {
  const { connectToMetaMask } = useApp();

  const onClick = async () => {
    const account = await connectToMetaMask();

    if (account) {
      openApp();
    }
  } 

  return (
    <Button onClick={onClick} className={className}>
      Connect To MetaMask
    </Button>
  );
};

export default ConnectToMetaMaskButton;
