import { useCallback, useEffect, useState } from 'react';
import { ethers } from 'ethers'

interface Web3Provider {
  once(eventName: string | symbol, listener: (...args: any[]) => void): this;
  on(eventName: string | symbol, listener: (...args: any[]) => void): this;
  off(eventName: string | symbol, listener: (...args: any[]) => void): this;
  addListener(eventName: string | symbol, listener: (...args: any[]) => void): this;
  removeListener(eventName: string | symbol, listener: (...args: any[]) => void): this;
  removeAllListeners(event?: string | symbol): this;
}

export const useWallet = (provider?: ethers.providers.Web3Provider) => {
  const [currentAccount, setCurrentAccount] = useState<string>('')

  const handleAccountsChanged = useCallback(([nextCurrentAccount]: string[]) => {
    setCurrentAccount(nextCurrentAccount)
  }, [setCurrentAccount]);

  const walletApp = useCallback(
    () => {
      if (window !== undefined && provider) {
        return (window as any).ethereum as Web3Provider
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
