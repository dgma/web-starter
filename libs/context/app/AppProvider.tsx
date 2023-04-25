import { useEffect, useState, useCallback, createContext } from "react";
import type { Dispatch, FC, PropsWithChildren } from "react";
import dynamic from "next/dynamic";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { useNetwork } from "./useNetwork";
import { useWallet } from "./useWallet";
import type { UseWalletResult } from "./useWallet";
import { wait, reload } from "@/libs/utils";
import { chainId } from "@/libs/constants";

type AppContext = UseWalletResult & {
  isTransactionPending: boolean;
  setTransactionPending: Dispatch<boolean>;
  provider?: ethers.providers.Web3Provider;
  isConnectedToProperNetwork: boolean;
  setIsConnectedToProperNetwork: Dispatch<boolean>;
  isNetworkVerificationInProgress: boolean;
};

export const AppContext = createContext<AppContext>({
  isTransactionPending: false,
  setTransactionPending: () => {},
  isConnectedToProperNetwork: false,
  setIsConnectedToProperNetwork: () => {},
  connectToMetaMask: () => Promise.resolve(null),
  walletApp: () => undefined,
  isNetworkVerificationInProgress: true,
});

const verifyChain = async (provider: ethers.providers.Web3Provider) => {
  try {
    const resetTimer = setTimeout(reload, 5000);
    const [chainID] = await Promise.all([
      provider.send("eth_chainId", []),
      wait(1000),
    ]);
    clearTimeout(resetTimer);
    return chainId === chainID;
  } catch (error) {
    throw new Error("Cannot check network, please refresh page");
  }
};

const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isTransactionPending, setTransactionPending] = useState(false);
  const [isNetworkVerificationInProgress, setNetworkVerificationInProgress] =
    useState(true);

  const {
    provider,
    isConnectedToProperNetwork,
    setIsConnectedToProperNetwork,
  } = useNetwork();

  const { connectToMetaMask, currentAccount, walletApp } = useWallet(provider);

  const verification = useCallback(
    async (provider: ethers.providers.Web3Provider) => {
      try {
        console.log("start verification");
        const isConnectedToProperNetwork = await verifyChain(provider);
        console.log("isConnectedToProperNetwork", isConnectedToProperNetwork);
        setIsConnectedToProperNetwork(isConnectedToProperNetwork);
        setNetworkVerificationInProgress(false);
      } catch (error) {
        // hide loader before error notification appears
        setNetworkVerificationInProgress(false);
        toast.error((error as Error)?.message);
        console.log(error);
      }
    },
    [setIsConnectedToProperNetwork]
  );

  useEffect(() => {
    walletApp()?.on("chainChanged", reload);
    return () => {
      walletApp()?.removeListener("chainChanged", reload);
    };
  }, [walletApp]);

  useEffect(() => {
    setNetworkVerificationInProgress(true);
    if (provider) {
      verification(provider);
    }
  }, [verification, provider]);

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
        isNetworkVerificationInProgress,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default dynamic(() => Promise.resolve(AppProvider), { ssr: false });
