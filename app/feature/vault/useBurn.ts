import useSWRMutation from 'swr/mutation'
import type { MutationFetcher } from 'swr/mutation'
import { ethers } from 'ethers'

import { useApp } from '@/libs/context/app'
import useVault from '@/libs/hooks/useVault'
import { collateralToken, synth } from '@/libs/constants';

const useBurn = () => {
  const { provider } = useApp()

  const vault = useVault(provider)

  const fetcher: MutationFetcher<void, string, string> = async (_, { arg }) => {
    const ts = await vault.burn(synth, collateralToken, ethers.utils.parseUnits(arg))
    await ts?.wait(1)
  }

  const { trigger } = useSWRMutation('vault.burn', fetcher, { throwOnError: false })

  return { burn: trigger }
}

export default useBurn
