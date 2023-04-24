import { useMemo } from "react";
import { ethers } from "ethers";
import { appDiamond, abis } from "@/libs/constants";

export default function useVault(provider?: ethers.providers.Web3Provider) {
  return useMemo(() => {
    const signer = provider?.getSigner();
    return new ethers.Contract(appDiamond, abis.vaultFacet, signer);
  }, [provider]);
}
