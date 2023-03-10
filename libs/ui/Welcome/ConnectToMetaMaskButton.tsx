import type { FC } from 'react';
import { useWallet } from '@/libs/wallet';
import Button from '@/libs/ui/Button';

interface ConnecctToMetaMaskButtonProps {
  className?: string;
  openApp: () => void;
}

const ConnectToMetaMaskButton: FC<ConnecctToMetaMaskButtonProps> = ({ className, openApp }) => {
  const { connectToMetaMask } = useWallet();

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
