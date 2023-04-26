import useSWRMutation from "swr/mutation";
import type { MutationFetcher } from "swr/mutation";
import { ethers } from "ethers";

import { useApp } from "@/libs/context/app";
import useVault from "@/libs/hooks/useVault";
import { synth } from "@/libs/constants";
import { UIError, MetamaskError } from "@/app/error-handling";

const useDeposit = () => {
  const { currentAccount, provider } = useApp();

  const vault = useVault(provider);

  const fetcher: MutationFetcher<void, string, string> = async (_, { arg }) => {
    try {
      const ts = await vault.depositNative(synth, currentAccount, {
        value: ethers.utils.parseEther(arg),
      });
      await ts.wait(1);
    } catch (error) {
      const msg =
        (error as MetamaskError)?.reason ||
        "Unable to deposit due to unknown error";
      throw new UIError(msg, error);
    }
  };

  const { trigger } = useSWRMutation("vault.deposit", fetcher, {
    throwOnError: false,
  });

  return { deposit: trigger };
};

export default useDeposit;
