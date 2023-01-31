import { createContext, useContext, useState } from 'react';
import type { Dispatch, FC, PropsWithChildren } from 'react';

interface AccountsContext {
  currentAccount: string;
  setCurrentAccount: Dispatch<string>;
}

export const WalletContext = createContext<AccountsContext>({
  currentAccount: '',
  setCurrentAccount: () => {},
});

export const WalletProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState<string>('');

  return (
    <WalletContext.Provider value={{
      currentAccount,
      setCurrentAccount,
    }}>
      {children}
    </WalletContext.Provider>
  )
};
