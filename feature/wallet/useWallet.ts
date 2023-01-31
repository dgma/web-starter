import { useContext } from 'react';
import { ethers } from 'ethers';

import { WalletContext } from './WalletContext';

export const useWallet = () => {
  const { currentAccount, setCurrentAccount } = useContext(WalletContext);

  const connectToMetaMask = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const address = await provider.getSigner().getAddress()
      setCurrentAccount(address);
    }
  };

  return { currentAccount, connectToMetaMask };
}
