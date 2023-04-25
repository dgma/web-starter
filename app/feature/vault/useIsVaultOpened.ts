import useSWR from "swr";
import { useEffect } from "react";
import { synth, collateralToken } from "@/libs/constants";
import { useApp } from "@/libs/context/app";
import useVault from "@/libs/hooks/useVault";

const useIsVaultOpened = () => {
  const { currentAccount, provider, isConnectedToProperNetwork } = useApp();
  const contract = useVault(provider);

  const fetcher = () => {
    console.log("check isAccountOpened");
    return contract.isAccountOpened(synth, collateralToken, currentAccount);
  };

  const shouldFetch = isConnectedToProperNetwork && currentAccount;

  const {
    data: isVaultOpened,
    mutate,
    isLoading,
  } = useSWR(() => (shouldFetch ? "vault.isOpened" : null), fetcher);

  return { isVaultOpened, mutate, isLoading };
};

export default useIsVaultOpened;
