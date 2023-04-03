import useSWR from 'swr'

import { synth, collateralToken } from '@/libs/constants'
import { useApp } from '@/libs/context/app'
import useVault from '@/libs/hooks/useVault'

const useIsVaultOpened = () => {
  const { currentAccount, provider } = useApp()
  const contract = useVault(provider);

  const fetcher = () => contract.isAccountOpened(synth, collateralToken, currentAccount)

  const { data: isVaultOpened, mutate } = useSWR(() => currentAccount ? 'vault.isOpened' : null, fetcher)

  return { isVaultOpened, mutate }
}

export default useIsVaultOpened
