import { useCallback, createContext, useEffect, useRef, useState } from 'react';
import type { FC, PropsWithChildren } from 'react';

import { useNetworkProvider } from '@/libs/network'

interface AccountsContext {
  connectToMetaMask: () => Promise<void>;
  currentAccount: string;
}

export const WalletContext = createContext<AccountsContext>({
  connectToMetaMask: () => Promise.resolve(),
  currentAccount: '',
});

export const WalletProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState<string>('')
  const { getProvider } = useNetworkProvider()

  const handleAccountsChanged = useCallback(([nextCurrentAccount]: string[]) => {
    setCurrentAccount(nextCurrentAccount)
  }, [setCurrentAccount])

  const getAccounts = useCallback(async () => {
    const provider = await getProvider()
    const accounts = await provider.send('eth_accounts', [])
    handleAccountsChanged(accounts)
  }, [getProvider, handleAccountsChanged])

  const listenAccounts = useCallback(async () => {
    const provider = await getProvider()
    provider.on('accountsChanged', handleAccountsChanged)
  }, [getProvider, handleAccountsChanged])

  const unlistenAccounts = useCallback(async () => {
    const provider = await getProvider()
    provider.off('accountsChanged', handleAccountsChanged)
  }, [getProvider, handleAccountsChanged])

  const connectToMetaMask = async () => {
    const provider = await getProvider()
    const accounts = await provider.send('eth_requestAccounts', [])
    handleAccountsChanged(accounts)
  };

  useEffect(() => {
    listenAccounts()

    getAccounts()

    return () => {
      unlistenAccounts();
    }
  }, [getAccounts, listenAccounts, unlistenAccounts]);

  return (
    <WalletContext.Provider value={{
      connectToMetaMask,
      currentAccount,
    }}>
      {children}
    </WalletContext.Provider>
  )
};
