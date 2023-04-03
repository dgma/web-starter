import useSWR from 'swr'
import { ethers } from 'ethers'

import { useApp } from '@/libs/context/app'
import useVault from '@/libs/hooks/useVault'
import { synth, collateralToken } from '@/libs/constants';

const useGetMaxMint = () => {
  const {
    currentAccount,
    isConnectedToProperNetwork,
    provider,
  } = useApp();
    
  const vault = useVault(provider);

  const fetcher = async () => {
    const availableToMint = await vault.maxMint(synth, collateralToken, currentAccount)
    return ethers.utils.formatEther(availableToMint)
  };

  const shouldFetch = isConnectedToProperNetwork && currentAccount

  const { data, isLoading, mutate } = useSWR(() => shouldFetch ? 'vault.maxMint' : null, fetcher)

  return { data, isLoading, mutate }
}

export default useGetMaxMint
