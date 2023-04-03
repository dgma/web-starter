import { useCallback, useEffect, useState } from 'react';
import { ethers } from 'ethers'

export interface UseWalletResult {
  connectToMetaMask: () => Promise<string | null>;
  currentAccount?: string;
  walletApp: () => ethers.providers.Web3Provider | undefined;
}

export const useWallet = (provider?: ethers.providers.Web3Provider): UseWalletResult => {
  const [currentAccount, setCurrentAccount] = useState<string>('')

  const handleAccountsChanged = useCallback(([nextCurrentAccount]: string[]) => {
    setCurrentAccount(nextCurrentAccount)
  }, [setCurrentAccount]);

  const walletApp = useCallback(
    () => {
      if (window !== undefined && provider) {
        return (window as any).ethereum as ethers.providers.Web3Provider
      }
    },
    [provider]
  )

  const getAccounts = useCallback(async () => {
    if (provider) {
      const accounts = await provider.send('eth_accounts', [])
      handleAccountsChanged(accounts)
    }
  }, [provider, handleAccountsChanged])

  const listenAccounts = useCallback(
    () => walletApp()?.on('accountsChanged', handleAccountsChanged),
    [handleAccountsChanged, walletApp]
  );

  const unlistenAccounts = useCallback(
    () => walletApp()?.removeListener('accountsChanged', handleAccountsChanged),
    [handleAccountsChanged, walletApp]
  )

  const connectToMetaMask = async () => {
    if (provider) {
      const accounts = await provider.send('eth_requestAccounts', [])
      handleAccountsChanged(accounts);
      return accounts[0];
    }

    if (window !== undefined) {
      window.open('https://metamask.io/', '_blank')?.focus();
      return null;
    }
  };

  useEffect(() => {
    getAccounts()
    listenAccounts()
    return () => {
      unlistenAccounts();
    }
  }, [provider, getAccounts, listenAccounts, unlistenAccounts]);

  return {
    connectToMetaMask,
    currentAccount,
    walletApp,
  }
};
