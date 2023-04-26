import useSWR from "swr";
import type { MetamaskError } from "@/app/error-handling";
import { synth, collateralToken } from "@/libs/constants";
import { useApp } from "@/libs/context/app";
import useVault from "@/libs/hooks/useVault";

const useIsVaultOpened = () => {
  const { currentAccount, provider, isConnectedToProperNetwork } = useApp();
  const contract = useVault(provider);

  const fetcher = () => {
    try {
      console.log("check isAccountOpened");
      return contract.isAccountOpened(synth, collateralToken, currentAccount);
    } catch (error) {
      console.log((error as MetamaskError)?.reason);
    }
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
