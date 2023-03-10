import { useMemo } from 'react';
import { ethers } from 'ethers'
import { appDiamond } from '@/libs/constants';
import vaultFacetAbi from '@dgma/protocol/abi/contracts/app/facets/vaults.sol/VaultFacet.json';


export default function useVault(provider?: ethers.providers.Web3Provider) {
  return useMemo(() => {
    const signer = provider?.getSigner();
    return new ethers.Contract(appDiamond, vaultFacetAbi, signer)
  }, [provider]);
}