import useSWRMutation from 'swr/mutation'
import { ethers } from 'ethers'

import { synth, collateralToken } from '@/libs/constants'
import { useApp } from '@/libs/context/app'
import useVault from '@/libs/hooks/useVault'

import useIsVaultOpened from './useIsVaultOpened'

const useOpenVault = () => {
  const {
    setTransactionPending,
    currentAccount,
    provider,
  } = useApp()

  const contract = useVault(provider)

  const { mutate } = useIsVaultOpened()

  const fetcher = async () => {
    setTransactionPending(true)
    const tx = await contract.open(
      synth,
      collateralToken,
      currentAccount,
      { value: ethers.utils.parseEther("0.1") }
    )
    await tx.wait()
    await mutate()
    setTransactionPending(false)
  }

  const { trigger } = useSWRMutation('vault.open', fetcher)

  return { openVault: trigger }
}

export default useOpenVault;
