import useSWRMutation from 'swr/mutation'
import type { MutationFetcher } from 'swr/mutation'
import { ethers } from 'ethers'

import { useApp } from '@/libs/context/app'
import useVault from '@/libs/hooks/useVault'
import { synth } from '@/libs/constants';

const useWithdraw = () => {
  const { currentAccount, provider } = useApp()

  const vault = useVault(provider)

  const fetcher: MutationFetcher<void, string, string> = async (_, { arg }) => {
    const ts = await vault.withdrawNative(synth, currentAccount, ethers.utils.parseEther(arg))
    await ts?.wait(1);
  }

  const { trigger } = useSWRMutation('vault.withdraw', fetcher, { throwOnError: false })

  return { withdraw: trigger }
}

export default useWithdraw
