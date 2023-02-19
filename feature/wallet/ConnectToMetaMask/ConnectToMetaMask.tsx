import Button from '@/libs/ui/Button'

import { useWallet } from '../useWallet';

export const ConnectToMetaMask = () => {
  const { connectToMetaMask, currentAccount } = useWallet();

  if (currentAccount) {
    return <p>Address: {currentAccount}</p>;
  }

  return (
    <Button onClick={connectToMetaMask}>
      Connect to MetaMask
    </Button>
  );
}
