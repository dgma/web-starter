import { useCallback, createContext, useEffect, useState } from 'react';
import type { FC, PropsWithChildren } from 'react';
import { useNetworkProvider } from '@/libs/network';

interface Web3Provider {
  once(eventName: string | symbol, listener: (...args: any[]) => void): this;
  on(eventName: string | symbol, listener: (...args: any[]) => void): this;
  off(eventName: string | symbol, listener: (...args: any[]) => void): this;
  addListener(eventName: string | symbol, listener: (...args: any[]) => void): this;
  removeListener(eventName: string | symbol, listener: (...args: any[]) => void): this;
  removeAllListeners(event?: string | symbol): this;
}

interface AccountsContext {
  connectToMetaMask: () => Promise<void>;
  currentAccount: string;
  walletApp: () => Web3Provider | undefined;
}

export const WalletContext = createContext<AccountsContext>({
  connectToMetaMask: () => Promise.resolve(),
  currentAccount: '',
  walletApp: () => undefined
});

export const WalletProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState<string>('')
  const { provider } = useNetworkProvider()

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
      return;
    }

    if (window !== undefined) {
      window.open('https://metamask.io/', '_blank')?.focus();
    }
  };

  useEffect(() => {
    getAccounts()
    listenAccounts()
    return () => {
      unlistenAccounts();
    }
  }, [provider, getAccounts, listenAccounts, unlistenAccounts]);

  return (
    <WalletContext.Provider value={{
      connectToMetaMask,
      currentAccount,
      walletApp,
    }}>
      {children}
    </WalletContext.Provider>
  )
};
