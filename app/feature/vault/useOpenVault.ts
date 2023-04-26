import useSWRMutation from "swr/mutation";
import { ethers } from "ethers";

import { synth, collateralToken } from "@/libs/constants";
import { useApp } from "@/libs/context/app";
import useVault from "@/libs/hooks/useVault";
import { UIError, MetamaskError } from "@/app/error-handling";

import useIsVaultOpened from "./useIsVaultOpened";

const useOpenVault = () => {
  const { setTransactionPending, currentAccount, provider } = useApp();

  const contract = useVault(provider);

  const { mutate } = useIsVaultOpened();

  const fetcher = async () => {
    try {
      setTransactionPending(true);
      const tx = await contract.open(synth, collateralToken, currentAccount, {
        value: ethers.utils.parseEther("0.1"),
      });
      await tx.wait();
      await mutate();
    } catch (error) {
      const msg =
        (error as MetamaskError)?.reason ||
        "Unable to transfer open vault to your wallet due to unknown error";
      throw new UIError(msg, error);
    } finally {
      setTransactionPending(false);
    }
  };

  const { trigger } = useSWRMutation("vault.open", fetcher, {
    throwOnError: false,
  });

  return { openVault: trigger };
};

export default useOpenVault;
