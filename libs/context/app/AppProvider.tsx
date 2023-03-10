import { useEffect, useState, useCallback, createContext } from "react";
import type { FC, PropsWithChildren } from "react";
import { ethers } from 'ethers'
import { toast } from 'react-toastify';
import { useNetwork } from './useNetwork'
import { useWallet } from './useWallet';
import { wait, reload } from '@/libs/utils';
import { synth, collateralToken } from '@/libs/constants';

import useVault from "@/libs/hooks/useVault";

const targetChainId = '0xb49ca1a';

export const AppContext = createContext<any>({
  isTransactionPending: false,
  setTransactionPending: () => {},
})

const verifyChain = async (provider: ethers.providers.Web3Provider) => {
  try {
    const resetTimer = setTimeout(reload, 5000);
    const [chainID] = await Promise.all(
      [provider.send('eth_chainId', []), wait(1000)]);
    clearTimeout(resetTimer)
    return targetChainId === chainID;
  } catch (error) {
    throw new Error("Cannot check network, please refresh page");
  }
};

const checkIsVaultOpened = async (currentAccount: string, isConnectedToProperNetwork: boolean, contract: ethers.Contract) => {
  if (currentAccount && isConnectedToProperNetwork) {
    try {
      const resetTimer = setTimeout(reload, 4000);
      const isVaultOpened =  await contract.accountOpened(synth, collateralToken);
      clearTimeout(resetTimer);
      return isVaultOpened;
    } catch (error) {
      throw new Error((error as any)?.reason || 'Something went wrong');
    }
  }
};

const AppProvider: FC<PropsWithChildren> = ({ children }) => {

  const [isTransactionPending, setTransactionPending] = useState(false);
  const [vaultOpened, setVaultOpened] = useState<boolean>();
  const [showLoader, setShowLoader] = useState(true); 

  const {
    provider,  
    isConnectedToProperNetwork, 
    setIsConnectedToProperNetwork 
  } = useNetwork();

  console.log('provider:', provider)

  const {
    connectToMetaMask,
    currentAccount,
    walletApp,
  } = useWallet(provider);

  console.log('walletApp:', walletApp)

  const contract = useVault(provider);

  const verification = useCallback(
    async () => {
      try {
        if (currentAccount && provider) {
          console.log('start verification');
          const isConnectedToProperNetwork = await verifyChain(provider);
          console.log('isConnectedToProperNetwork', isConnectedToProperNetwork);
          const isVaultOpened = await checkIsVaultOpened(currentAccount, isConnectedToProperNetwork, contract);
          console.log('isVaultOpened', isVaultOpened);
          setIsConnectedToProperNetwork(isConnectedToProperNetwork);
          setVaultOpened(!!isVaultOpened);
        }
      } catch (error) {
        toast.error((error as Error)?.message);
        console.log(error);
      }
    }, 
    [setIsConnectedToProperNetwork, provider, currentAccount, contract]
  )

  useEffect(
    () => {
      walletApp()?.on('chainChanged', reload);
      return () => { 
        walletApp()?.removeListener('chainChanged', reload); 
      }
    },
    [walletApp]
  );

  useEffect(
    () => {
      setShowLoader(true)
      verification()
        .finally(() => {setShowLoader(false)});
    },
    [verification]
  );

  return (
    <AppContext.Provider 
      value={{ 
        isTransactionPending, 
        setTransactionPending,
        provider,  
        isConnectedToProperNetwork, 
        setIsConnectedToProperNetwork,
        connectToMetaMask,
        currentAccount,
        walletApp,
        showLoader,
        vaultOpened,
        setVaultOpened,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;