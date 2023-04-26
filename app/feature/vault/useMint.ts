import useSWRMutation from "swr/mutation";
import type { MutationFetcher } from "swr/mutation";
import { ethers } from "ethers";

import { useApp } from "@/libs/context/app";
import useVault from "@/libs/hooks/useVault";
import { collateralToken, synth } from "@/libs/constants";
import { UIError, MetamaskError } from "@/app/error-handling";

const useMint = () => {
  const { currentAccount, provider } = useApp();

  const vault = useVault(provider);

  const fetcher: MutationFetcher<void, string, string> = async (
    key,
    { arg }
  ) => {
    try {
      const ts = await vault.mint(
        synth,
        collateralToken,
        currentAccount,
        ethers.utils.parseUnits(arg)
      );
      await ts.wait();
    } catch (error) {
      const msg =
        (error as MetamaskError)?.reason ||
        "Unable to mint due to unknown error";
      throw new UIError(msg, error);
    }
  };

  const { trigger } = useSWRMutation("vault.mint", fetcher, {
    throwOnError: false,
  });

  return { mint: trigger };
};

export default useMint;
